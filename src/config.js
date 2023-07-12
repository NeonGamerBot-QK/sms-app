const { join  } = require('path');
const crypto = require('crypto');
module.exports = function useConfig() {
    const env = process.env;
  let res =  {
        TITLE: env.TITLE || `SMS App`,
        PORT: env.PORT || env.SERVER_PORT || 3000,
        FILESTORE_PATH: env.FILESTORE_PATH || join(__dirname, '..', 'db.json'),
        DESCRIPTION: env.DESCRIPTION || `An SMS setup`,
        URL: env.URL,
        KEY: env.KEY || crypto.randomBytes(4).toString('hex'),
        session: {
            secret: env.SESSION_SECRET || crypto.randomUUID().split('-').join(''),
            cookie: {  maxAge: 30 * 24 * 60 * 60 * 1000 }
        },
emails: [
    // at&t
{
    name: "AT&T mms",
    domain: "%s@mms.att.net",
    trim: []
}, 
{
    name: "AT&T sms",
    domain: "%s@txt.att.net",
    trim: []
},
{
    name: "Dev Server",
    domain: "%s@saahild.com",
    trim: []
}
]
    }
    if(!res.URL) res.URL = `http://localhost:${res.PORT}`
    return res;
}