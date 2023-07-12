require('dotenv').config();
const express = require('express')
const app = express()
const config = require('./config')()
const morgan = require('morgan')
const ejs = require('ejs');
const fs = require('fs');
const session = require('express-session')
const path = require('path')
const port = 3000
const JSONDB = require('simple-json-db')
const db = new JSONDB(path.join(__dirname, 'db.json'))
const nodemailer= require('nodemailer')
//  socket .io 
const server = require('http').createServer(app);
const io = require('socket.io')(server);

//  middle ware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
console.log(config)
app.use(session(config.session))
app.use(morgan("combined"))
app.disable("x-powered-by")

const renderPage = (page, ops) => {
    return ejs.render(fs.readFileSync(path.join(__dirname, 'views', `${page}.ejs`), 'utf8'), ops)
}
function Authenticated(req,res,next) {
    if(!req.session.loggedin) return res.redirect("/login");
    else next()
}
const renderTemplate = (page, res, ops) => {
const data = renderPage("layout", { content: renderPage(page, ops), renderPage, ...ops })
res.send(data)
}

app.get('/', (req, res) => {
//   render main somehoww
    // res.sendFile(__dirname + '/index.html')
    renderTemplate("index", res, { title: config.TITLE, description: config.DESCRIPTION })
})
app.get('/transports', (req,res) => {
    res.json(config.emails)
})
app.get('/login', (req, res) => {
    renderTemplate("login", res, { title: config.TITLE, description: config.DESCRIPTION })
})
app.get('/dash', Authenticated, (req, res) => {
    renderTemplate("dash", res, { title: config.TITLE, description: config.DESCRIPTION })
})
app.get('/convo/:id', Authenticated, (req, res) => {
    const { id } = req.params
    require("./imap")({
        host: req.session.imapHost,
        port: req.session.imapPort,
        tls: req.session.imapSecure,
        user: req.session.imapUser,
        password: req.session.imapPassword
    }).then((data) => {
    let texts = db.get(`${req.session.email}_${id}_texts`) || []
data.forEach(e => {
if(texts.some(r => r.messageId == e.messageId)) return;
texts.push(e)
})
texts = texts.sort((a,b) => new Date(a.date).getTime() < new Date(b.date).getTime() ? -1 : 1)
        db.set(`${req.session.email}_${id}_texts`, texts.sort((a,b) => new Date(a.date).getTime() < new Date(b.date).getTime() ? -1 : 1))
        res.json({ status: 200, data: texts })
              }).catch(e => console.error(e, "UH OH"))
})
app.post('/convos', Authenticated, (req, res) => {
    require("./imap")({
        host: req.session.imapHost,
        port: req.session.imapPort,
        tls: req.session.imapSecure,
        user: req.session.imapUser,
        password: req.session.imapPassword
    }).then((data) => {
        res.json({ status: 200, data: [...new Set(data.map(e => e.from.text))] })
              }).catch(e => console.error(e, "UH OH"))
    })
app.post('/send', Authenticated, (req, res) => {
    const { to,message, emailId } = req.body
    const { email, smtpHost, smtpPort, smtpSecure, smtpUser, smtpPassword } = req.session
    console.debug(req.session)
const transport = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
        user: smtpUser,
        pass: smtpPassword
    },
    tls: {
        rejectUnauthorized: false
    }
})

transport.sendMail({
    from: email,
    to: require('util').format(config.emails[emailId].domain, to),
    text: message
}).then((e) => {
    console.log(require('util').format(config.emails[emailId].domain, to), message, emailId, to)
    const texts = db.get(`${email}_${require('util').format(config.emails[emailId].domain, to)}_texts`) || []
    console.debug(e)
    e.date = new Date()
    e.toEmail = require('util').format(config.emails[emailId].domain, to)
    e.fromEmail = email
    e.contentSent = message
    texts.push(e)
    db.set(`${email}_${require('util').format(config.emails[emailId].domain, to)}_texts`, texts)
    res.status(201).json({ success: true })
}).catch((err) => {
    console.error(err)
    res.status(500).json({ success: false, error: err })
})
    // res.redirect("/")
})

app.post("/login", (req,res) => {
    const {   
        // imap
        imapHost,
        imapPort,
        imapSecure,
        imapUser,
        imapPassword,
        // smtp
        smtpHost,
        smtpPort,
        smtpSecure,
        smtpUser,
        smtpPassword,
        // email
        email,
    } = req.body;
    // define all of them in the session :D
    req.session.imapHost = imapHost
    req.session.imapPort = parseInt(imapPort)
    req.session.imapSecure = imapSecure == 'true'
    req.session.imapUser = imapUser
    req.session.imapPassword = imapPassword
    // smtp
    req.session.smtpHost = smtpHost
    req.session.smtpPort = parseInt(smtpPort)
    req.session.smtpSecure = smtpSecure == 'true'
    req.session.smtpUser = smtpUser
    req.session.smtpPassword = smtpPassword
    // email
    req.session.email = email
    req.session.loggedin = true
    req.session.save()
    res.redirect("/")
// console.log(req.body)
res.end()
    //  res.redirect("/login?error=1")
 })

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
    console.log('user disconnected');
    });
})
server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})