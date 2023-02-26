import {Contact, Message, ScanStatus, WechatyBuilder} from "wechaty";
import {PuppetPadlocal} from "wechaty-puppet-padlocal";
import QRCode from "qrcode";
import { ChatGPTBot } from "./bot.js";
const chatGPTBot = new ChatGPTBot();
//使用uos协议有封号危险
const bot =  WechatyBuilder.build({
  name: "wechat-assistant", // generate xxxx.memory-card.json and save login data for the next login
  puppetOptions: {
    uos: true, // 开启uos协议
  },
  puppet: "wechaty-puppet-wechat",
});
//推荐使用付费PuppetPadlocal服务
// const token: string = "puppet_padlocal_72ee99189d5648b9baf70c2d24f7d808"; // padlocal token

// const token: string = " "; // padlocal token
// const puppet = new PuppetPadlocal({ token }); 
// const bot =  WechatyBuilder.build({
//   name: "chatgptBot",
//   puppet,
// });

// get a Wechaty instance

async function main() {
  await chatGPTBot.startGPTBot();

  bot
  // .on("scan", async (qrcode, status) => {
  //   const url = `https://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`;
  //   console.log(`Scan QR Code to login: ${status}\n${url}`);
  //   console.log(
  //     await QRCode.toString(qrcode, { type: "terminal", small: true })
  //   );
  // })
  .on("scan", (qrcode: string, status: ScanStatus) => {
    if (status === ScanStatus.Waiting && qrcode) {
        const qrcodeImageUrl = ["https://api.qrserver.com/v1/create-qr-code/?data=", encodeURIComponent(qrcode)].join("");
        console.log(`onScan: ${ScanStatus[status]}(${status}) - ${qrcodeImageUrl}`);
        console.log(
             QRCode.toString(qrcode, { type: "terminal", small: true })
          );
    } else {
        console.log(`onScan: ${ScanStatus[status]}(${status})`);
    }
  })

  // .on("login", async (user) => {
  //   console.log(`User ${user} logged in`);
  //   chatGPTBot.setBotName(user.name());
  // })

  .on("login", (user: Contact) => {
    console.log(`User ${user} logged in`);
    chatGPTBot.setBotName(user.name());
  })
  .on("message", async (message: Message) => {
    if (!chatGPTBot.ready) {
      return;
    }
    if (message.text().startsWith("/ping")) {
      await message.say("pong");
      return;
    }
    try {
      console.log(`Message: ${message}`);
      await chatGPTBot.onMessage(message);
    } catch (e) {
      console.error(e);
    }
  })
  // .on("message", async (message) => {
  //   if (!chatGPTBot.ready) {
  //     return;
  //   }
  //   if (message.text().startsWith("/ping")) {
  //     await message.say("pong");
  //     return;
  //   }
  //   try {
  //     console.log(`Message: ${message}`);
  //     await chatGPTBot.onMessage(message);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // });
try {
  await bot.start();
} catch (e) {
  console.error(
    `⚠️ Bot start failed, can you log in through wechat on the web?: ${e}`
  );
}
//======================== puppet: "wechaty-puppet-wechat"=======================
//   bot
//     .on("scan", async (qrcode, status) => {
//       const url = `https://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`;
//       console.log(`Scan QR Code to login: ${status}\n${url}`);
//       console.log(
//         await QRCode.toString(qrcode, { type: "terminal", small: true })
//       );
//     })
//     .on("login", async (user) => {
//       console.log(`User ${user} logged in`);
//       chatGPTBot.setBotName(user.name());
//     })
//     .on("message", async (message) => {
//       if (!chatGPTBot.ready) {
//         return;
//       }
//       if (message.text().startsWith("/ping")) {
//         await message.say("pong");
//         return;
//       }
//       try {
//         console.log(`Message: ${message}`);
//         await chatGPTBot.onMessage(message);
//       } catch (e) {
//         console.error(e);
//       }
//     });
//   try {
//     await bot.start();
//   } catch (e) {
//     console.error(
//       `⚠️ Bot start failed, can you log in through wechat on the web?: ${e}`
//     );
//   }
}
main();
