const find = require("find-process");
const winInfo = require("@arcsine/win-info");
const rpc = require("discord-rich-presence")("658349770359963650");

let title,
  idle = false;
let now = Date.now();

function init() {
  find("name", "Photoshop.exe").then(process => {
    if (!process.length) return console.warn("Photoshop is not running!");
    winInfo.getByPid(process[0].pid).then(name => {
      title = name.title;
      if (title.startsWith("Adobe Photoshop")) idle = true;
      if (idle) {
        title = "Idling";
        idle = true;
        rpc.updatePresence({
          state: `Idling`,
          startTimestamp: now,
          largeImageKey: "large_ps",
          smallImageKey: "large_ps",
          instance: true
        });
      } else {
        title = title.slice(0, title.indexOf("@"));
        idle = false;
        rpc.updatePresence({
          state: `Editing ${title}`,
          startTimestamp: now,
          largeImageKey: "large_ps",
          smallImageKey: "large_ps",
          instance: true
        });
      }
      idle = false;
      console.log("Updated!");
    });
  });
}

setInterval(init, 15000);
