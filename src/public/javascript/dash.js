// declare all funcs in an annomous function to avoid global scope
dayjs.extend(window.dayjs_plugin_relativeTime)

class Message {
  constructor(emailData) {
    this.id = emailData.messageId;
    this.date = emailData.date;
    this.text = emailData.contentSent || atob(emailData.attachments.find(e => e.contentType == "text/plain")?.content || "");
    this.from = emailData.fromEmail || emailData.from.text;
    this.to = emailData.toEmail || emailData.to.text;
    this.attachments  = emailData.attachments ?? [];
  }
  
}
//  Formatted version of a popular md5 implementation
//  Original copyright (c) Paul Johnston & Greg Holt.
//  The function itself is now 42 lines long.

function md5(inputString) {
  var hc="0123456789abcdef";
  function rh(n) {var j,s="";for(j=0;j<=3;j++) s+=hc.charAt((n>>(j*8+4))&0x0F)+hc.charAt((n>>(j*8))&0x0F);return s;}
  function ad(x,y) {var l=(x&0xFFFF)+(y&0xFFFF);var m=(x>>16)+(y>>16)+(l>>16);return (m<<16)|(l&0xFFFF);}
  function rl(n,c)            {return (n<<c)|(n>>>(32-c));}
  function cm(q,a,b,x,s,t)    {return ad(rl(ad(ad(a,q),ad(x,t)),s),b);}
  function ff(a,b,c,d,x,s,t)  {return cm((b&c)|((~b)&d),a,b,x,s,t);}
  function gg(a,b,c,d,x,s,t)  {return cm((b&d)|(c&(~d)),a,b,x,s,t);}
  function hh(a,b,c,d,x,s,t)  {return cm(b^c^d,a,b,x,s,t);}
  function ii(a,b,c,d,x,s,t)  {return cm(c^(b|(~d)),a,b,x,s,t);}
  function sb(x) {
      var i;var nblk=((x.length+8)>>6)+1;var blks=new Array(nblk*16);for(i=0;i<nblk*16;i++) blks[i]=0;
      for(i=0;i<x.length;i++) blks[i>>2]|=x.charCodeAt(i)<<((i%4)*8);
      blks[i>>2]|=0x80<<((i%4)*8);blks[nblk*16-2]=x.length*8;return blks;
  }
  var i,x=sb(""+inputString),a=1732584193,b=-271733879,c=-1732584194,d=271733878,olda,oldb,oldc,oldd;
  for(i=0;i<x.length;i+=16) {olda=a;oldb=b;oldc=c;oldd=d;
      a=ff(a,b,c,d,x[i+ 0], 7, -680876936);d=ff(d,a,b,c,x[i+ 1],12, -389564586);c=ff(c,d,a,b,x[i+ 2],17,  606105819);
      b=ff(b,c,d,a,x[i+ 3],22,-1044525330);a=ff(a,b,c,d,x[i+ 4], 7, -176418897);d=ff(d,a,b,c,x[i+ 5],12, 1200080426);
      c=ff(c,d,a,b,x[i+ 6],17,-1473231341);b=ff(b,c,d,a,x[i+ 7],22,  -45705983);a=ff(a,b,c,d,x[i+ 8], 7, 1770035416);
      d=ff(d,a,b,c,x[i+ 9],12,-1958414417);c=ff(c,d,a,b,x[i+10],17,     -42063);b=ff(b,c,d,a,x[i+11],22,-1990404162);
      a=ff(a,b,c,d,x[i+12], 7, 1804603682);d=ff(d,a,b,c,x[i+13],12,  -40341101);c=ff(c,d,a,b,x[i+14],17,-1502002290);
      b=ff(b,c,d,a,x[i+15],22, 1236535329);a=gg(a,b,c,d,x[i+ 1], 5, -165796510);d=gg(d,a,b,c,x[i+ 6], 9,-1069501632);
      c=gg(c,d,a,b,x[i+11],14,  643717713);b=gg(b,c,d,a,x[i+ 0],20, -373897302);a=gg(a,b,c,d,x[i+ 5], 5, -701558691);
      d=gg(d,a,b,c,x[i+10], 9,   38016083);c=gg(c,d,a,b,x[i+15],14, -660478335);b=gg(b,c,d,a,x[i+ 4],20, -405537848);
      a=gg(a,b,c,d,x[i+ 9], 5,  568446438);d=gg(d,a,b,c,x[i+14], 9,-1019803690);c=gg(c,d,a,b,x[i+ 3],14, -187363961);
      b=gg(b,c,d,a,x[i+ 8],20, 1163531501);a=gg(a,b,c,d,x[i+13], 5,-1444681467);d=gg(d,a,b,c,x[i+ 2], 9,  -51403784);
      c=gg(c,d,a,b,x[i+ 7],14, 1735328473);b=gg(b,c,d,a,x[i+12],20,-1926607734);a=hh(a,b,c,d,x[i+ 5], 4,    -378558);
      d=hh(d,a,b,c,x[i+ 8],11,-2022574463);c=hh(c,d,a,b,x[i+11],16, 1839030562);b=hh(b,c,d,a,x[i+14],23,  -35309556);
      a=hh(a,b,c,d,x[i+ 1], 4,-1530992060);d=hh(d,a,b,c,x[i+ 4],11, 1272893353);c=hh(c,d,a,b,x[i+ 7],16, -155497632);
      b=hh(b,c,d,a,x[i+10],23,-1094730640);a=hh(a,b,c,d,x[i+13], 4,  681279174);d=hh(d,a,b,c,x[i+ 0],11, -358537222);
      c=hh(c,d,a,b,x[i+ 3],16, -722521979);b=hh(b,c,d,a,x[i+ 6],23,   76029189);a=hh(a,b,c,d,x[i+ 9], 4, -640364487);
      d=hh(d,a,b,c,x[i+12],11, -421815835);c=hh(c,d,a,b,x[i+15],16,  530742520);b=hh(b,c,d,a,x[i+ 2],23, -995338651);
      a=ii(a,b,c,d,x[i+ 0], 6, -198630844);d=ii(d,a,b,c,x[i+ 7],10, 1126891415);c=ii(c,d,a,b,x[i+14],15,-1416354905);
      b=ii(b,c,d,a,x[i+ 5],21,  -57434055);a=ii(a,b,c,d,x[i+12], 6, 1700485571);d=ii(d,a,b,c,x[i+ 3],10,-1894986606);
      c=ii(c,d,a,b,x[i+10],15,   -1051523);b=ii(b,c,d,a,x[i+ 1],21,-2054922799);a=ii(a,b,c,d,x[i+ 8], 6, 1873313359);
      d=ii(d,a,b,c,x[i+15],10,  -30611744);c=ii(c,d,a,b,x[i+ 6],15,-1560198380);b=ii(b,c,d,a,x[i+13],21, 1309151649);
      a=ii(a,b,c,d,x[i+ 4], 6, -145523070);d=ii(d,a,b,c,x[i+11],10,-1120210379);c=ii(c,d,a,b,x[i+ 2],15,  718787259);
      b=ii(b,c,d,a,x[i+ 9],21, -343485551);a=ad(a,olda);b=ad(b,oldb);c=ad(c,oldc);d=ad(d,oldd);
  }
  return rh(a)+rh(b)+rh(c)+rh(d);
}

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
    function main() {

// dash code / HELP
let formatPhoneNumber = (str) => {
  //Filter only numbers from the input
  let cleaned = ('' + str).replace(/\D/g, '');
  
  //Check if the input is of correct length
  let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  };

  return null
};
const numberSelect = document.getElementById("number");
const divToInsertMessages = document.getElementById("messages");

let data = []
fetch('/convos', { method: 'POST'}).then(r => r.json()).then(r => {
  data = r.data 
  r.data.forEach((name, index) => {
const option = document.createElement("option");
option.value = index;
option.text = formatPhoneNumber(name);
numberSelect.appendChild(option);
    })
})
async function messagesCB(index) {
  const convoID = data[index];
const msgs = await fetch('/convo/'+convoID).then(r => r.json()).then(r => r.data)
msgs.forEach(msg => {
  console.debug(msg, "#msg")
  const div = document.createElement("div");
  const imageDiv = document.createElement("div");
  const avatar = document.createElement("img");
  const chatHeader = document.createElement("div");
  const time = document.createElement("time");
  const chatBubble = document.createElement("div");
  const footer = document.createElement("div");
  const message = new Message(msg);

  console.log(message, "#message")
  // div.innerHTML = `<p>${message.text}</p>, <span>${message.from}</span> ${message.date}, ${data.find(e => e == message.to) ? "sent" : "recieved"}`;
  div.className = "chat chat-"+(data.find(e => e == message.to) ? "end" : "start");
  imageDiv.className = "chat-image avatar";
  chatHeader.className = "chat-header";
  time.className = "text-xs opacity-50";
  chatBubble.className = "chat-bubble";
footer.className = `chat-footer opacity-50`
chatHeader.innerHTML = `${data.find(e => e == message.to) ? message.from.split("@")[0] : formatPhoneNumber(message.from)}`
  time.innerHTML = `${dayjs().to(message.date) }`
  chatBubble.innerHTML = `${message.text}`
  if(message.attachments.length > 0) {
 message.attachments.forEach(attachment => {
  if(attachment.contentType.includes("image")) {
    const img = document.createElement("img");
    img.src = `data:${attachment.contentType};base64,${attachment.content}`
    chatBubble.appendChild(img);
  }
 })
  }
avatar.src = `https://www.gravatar.com/avatar/${md5(message.from)}`;
chatHeader.appendChild(time);
imageDiv.appendChild(avatar);
div.appendChild(imageDiv);
div.appendChild(chatHeader)
div.appendChild(chatBubble);
// div.appendChild(footer)
  // div.innerHTML = `<p>${msg.message}</p>`;
  divToInsertMessages.appendChild(div);
})
}
numberSelect.addEventListener("change", (e) => {
  const index = e.target.value;

  messagesCB(index)
  // divToInsertMessages.innerHTML = "";
})
document.getElementById("loadconvo").addEventListener("click", () => {
  const index = numberSelect.value;
  messagesCB(index)
  // divToInsertMessages.innerHTML = "";
})
async function sendMessage(input) {
  const index = numberSelect.value;
  const transports = await fetch('/transports').then(r => r.json())
  const transport =transports.findIndex(e => {
  console.log("#q", 
  data[index].split("@")[1].includes(e.domain.split("@")[1]),
  data[index].split("@")[1],
  e.domain
  )
   return data[index].split("@")[1].includes(e.domain.split("@")[1])
  })
  const msg = {
    to: data[index].split("@")[0],
    // from: transport.email,
    emailId: transport,
    message: input
  }
  console.debug(msg)
  fetch('/send', { method: 'POST', body: JSON.stringify(msg), headers: { 'Content-Type': 'application/json' } }).then(r => r.json()).then(r => {
    console.debug(r)
  alert("sent maybe idk")
  })
}
// send
document.getElementById("send").addEventListener("click", () => {
 const inputValue = document.getElementById("message").value;
  sendMessage(inputValue)
  // divToInsertMessages.innerHTML = "";
})
    }
  })();
  console.debug("[DEBUG] LOADING FILE");
  