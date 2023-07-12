// declare all funcs in an annomous function to avoid global scope

(function() {
    var getScriptURL = (function() {
      var scripts = document.getElementsByTagName("script");
      var index = scripts.length - 1;
      var myScript = scripts[index];
      return function() {
        return myScript.src;
      };
    })();
    const fileName = getScriptURL().split("/").find(e => e.endsWith(".js"));
    console.log("[DEBUG] loading instance for " + fileName);
    // start code after loaded
    window.addEventListener("load", () => {
      console.debug("[DEBUG] starting instance for " + fileName);
      try {
        let proc = main();
        if (proc instanceof Promise) {
          proc.catch(e => console.error(e.message));
        }
      } catch (e) {
        console.error(e.message);
      }
    });
    function readFile(file) {
      return new Promise((res, reject) => {
        const reader = new FileReader();
      reader.addEventListener('load', (event) => {
        const result = event.target.result;
        // Do something with result
        res (result)
      });
    
      reader.addEventListener('progress', (event) => {
        if (event.loaded && event.total) {
          const percent = (event.loaded / event.total) * 100;
          console.log(`Progress: ${Math.round(percent)}`);
        }
      });
      reader.readAsText(file);
      })
    }
    function readJSON(data) {
      let json = null;
      try {
        json = JSON.parse(data);
      } catch (e) {
        // console.error(e.message);
      }
      return json;
    }
    async function setupFileSupport() {
      const fileInput = document.getElementById("fileInput");
      fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
 readFile(file).then((r) => {
let data = readJSON(r)
console.log(data, r)
if(!data) return;
console.log(data)
document.getElementsByName("email")[0].value = data.email
// document.getElementsByName("password")[0].value = data.password
document.getElementsByName("imapHost")[0].value = data.imapHost
document.getElementsByName("imapPort")[0].value = data.imapPort
document.getElementsByName("imapSecure")[0].value = data.imapSecure
document.getElementsByName("smtpHost")[0].value = data.smtpHost
document.getElementsByName("smtpPort")[0].value = data.smtpPort
document.getElementsByName("smtpSecure")[0].value = data.smtpSecure
document.getElementsByName("imapPassword")[0].value = data.password
document.getElementsByName("smtpPassword")[0].value = data.password
document.getElementsByName("imapUser")[0].value = data.email
document.getElementsByName("smtpUser")[0].value = data.email

})
      });

    }
    function main() {
      // ...
      // ...
      // ..
      // code
      setupFileSupport()
      const gmailConfig = {
        email: "your_email@gmail.com",
        // password: "your_password",
        imapHost: "imap.gmail.com",
        imapPort: 993,
        imapSecure: true,
        smtpHost: "smtp.gmail.com",
        smtpPort: 465,
        smtpSecure: true
            
      };
        const outlookConfig = {
        email: "example@outlook.com",
        // password: "",
        imapHost: "imap-mail.outlook.com",
        imapPort: 993,
        imapSecure: true,
        smtpHost: "smtp-mail.outlook.com",
        smtpPort: 587,
        smtpSecure: false
        };
        
        const yahooConfig = {
        email: "example@yahoo.com",
        // password: "",
        imapHost: "imap.mail.yahoo.com",
        imapPort: 993,
        imapSecure: true,
        smtpHost: "smtp.mail.yahoo.com",
        smtpPort: 465,
        smtpSecure: true
        };

        // buttons for this
        const gmailButton = document.getElementById("gmail");
        const outlookButton = document.getElementById("outlook");
        const yahooButton = document.getElementById("yahoo");
        const email = document.getElementsByName("email")[0]
        const imapEmail = document.getElementsByName("imapUser")[0]
        const imapPassword = document.getElementsByName("imapPassword")[0]
        const imapHost = document.getElementsByName("imapHost")[0]
        const imapPort = document.getElementsByName("imapPort")[0]
        const imapSecure = document.getElementsByName("imapSecure")[0]
        const smtpEmail = document.getElementsByName("smtpUser")[0]
        const smtpHost = document.getElementsByName("smtpHost")[0]
        const smtpPort = document.getElementsByName("smtpPort")[0]
        const smtpSecure = document.getElementsByName("smtpSecure")[0]
        const smtpPassword = document.getElementsByName("smtpPassword")[0]

   function setData(name) {
    const props = { gmailConfig, outlookConfig, yahooConfig }
    const config = props[name]
    email.value = config.email
    imapHost.value = config.imapHost
    imapPort.value = config.imapPort
    imapSecure.value = config.imapSecure
    imapEmail.value = config.email
    imapPassword.value = config.password
    smtpHost.value = config.smtpHost
    smtpPort.value = config.smtpPort
    smtpSecure.value = config.smtpSecure
    smtpEmail.value = config.email

    // password.value = config.password
   }
gmailButton.addEventListener("click", () => setData("gmailConfig"))
outlookButton.addEventListener("click", () => setData("outlookConfig"))
yahooButton.addEventListener("click", () => setData("yahooConfig"))

// save config on btn click
const saveBtn = document.getElementById("saveConfig")
saveBtn.addEventListener("click", () => {
  const data = {
    email: email.value,
    imapHost: imapHost.value,
    imapPort: imapPort.value,
    imapSecure: imapSecure.value,
    smtpHost: smtpHost.value,
    smtpPort: smtpPort.value,
    smtpSecure: smtpSecure.value,
    password: imapPassword.value
    }
    const json = JSON.stringify(data)
    const blob = new Blob([json], {type: "application/json"})
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "config.json"
    a.click()
    URL.revokeObjectURL(url)
})

    }

  })();
  console.debug("[DEBUG] LOADING FILE");
  