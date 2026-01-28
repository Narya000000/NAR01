const { spawn } = require("child_process");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const startBot = (filename) => {

  console.log(`Menjalankan ${filename}...`);

  const bot = spawn("node", [filename], { stdio: "inherit" });

  bot.on("close", (code) => {

    console.log(`${filename} selesai dengan code ${code}`);

  });

};

const runBots = async () => {
  
  startBot("alt1.js");

  await delay(5000);
  
  startBot("alt2.js");

  await delay(5000);
  
  startBot("alt3.js");

  await delay(5000);

  startBot("alt4.js");

  await delay(5000);

  startBot("alt5.js");

  await delay(5000);

  startBot("alt6.js");

  await delay(5000);

  startBot("alt7.js");

  await delay(5000);
  
  startBot("alt8.js");

  await delay(5000);
  
  startBot("alt9.js");

  await delay(5000);

  startBot("alt10.js");

  await delay(5000);

  startBot("alt11.js");

  await delay(5000);

  startBot("alt12.js");

  await delay(5000);

  startBot("alt13.js");

  await delay(5000);

  startBot("alt14.js");

  await delay(5000);

  startBot("alt15.js");

};

runBots();