const Imap = require("imap");
var debug = require("debug")("main:imap");
const baseConfig = require("./config")();
//  const simpleParser = require('simpleParser')
const { simpleParser } = require("mailparser");
const getEmails = (config, email = null) => {
  return new Promise((res, rej) => {
    try {
      const raw_emails = [];
      const imap = new Imap(config);
      imap.once("ready", () => {
        imap.openBox("INBOX", false, () => {
          imap.search(
            ["UNSEEN", ["SINCE", Date.now() - 24 * 60 * 60 * 1000]],
            (err, results) => {
              if (err) {
                console.error("#err5");
                return rej(err.message);
              }
              let f;
              try {
                f = imap.fetch(results, { bodies: "" });
              } catch (e) {
                console.error("#err6");
                // return rej(e)
                if (e.message === "Nothing to fetch") {
                  return res([]);
                }
                console.error(e.message, "YES");
                return;
              }
              f.on("message", (msg) => {
                msg.on("body", (stream) => {
                  debug("#email raw");
                  raw_emails.push(stream);
                });
                msg.once("attributes", (attrs) => {
                  const { uid } = attrs;
                  // imap.addFlags(uid, ['\\Seen'], () => {
                  //   // Mark the email as read after reading it
                  //   // debug('Marked as read!');
                  // });
                });
              });
              f.once("error", (ex) => {
                debug("err4");
                return rej(ex.message);
              });
              f.once("end", async () => {
                debug("Done fetching all messages!");
                imap.end();
                let emails = [];

                for (const stream of raw_emails) {
                  let parsed = await simpleParser(stream);
                  console.log("#parsed", parsed.from);
                  debug(parsed, "#parsed");
                  if (parsed.attachments.length > 0) {
                    parsed.attachments = parsed.attachments.map((a) => {
                      console.log(a.content, "#c");
                      a.content = a.content.toString("base64");
                      return a;
                    });
                  }
                  // debug(parsed.to.value[0].address, email)
                  if (email && parsed.from.value[0].address === email) {
                    emails.push(parsed);
                  } else if (
                    !email &&
                    baseConfig.emails.some(
                      (e) =>
                        parsed.to &&
                        parsed.to.value[0].address.includes(
                          e.domain.replace("%s", ""),
                        ),
                    )
                  ) {
                    emails.push(parsed);
                  }
                }
                res(emails);
              });
            },
          );
        });
      });

      imap.once("error", (err) => {
        debug("ERR2");
        rej(err.message);
      });

      imap.once("end", async () => {
        debug("#ending");

        debug("Connection ended");
      });

      imap.connect();
    } catch (ex) {
      // debug('an error occurred', ex);
      console.error("ERR");
      //  if(ex.message === '')
      rej(ex.message);
    }
  });
};

module.exports = getEmails;
