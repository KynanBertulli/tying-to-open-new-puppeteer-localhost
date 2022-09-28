const puppeteer = require("../lib");

module.exports = async () => {
  let serverAddr = `0.0.0.0:8080`;

  console.log("running example ......");

  const browser = await puppeteer.connect({
    browserWSEndpoint: `ws://${serverAddr}`,
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();
  const page2 = await browser.newPage();

  await page.goto(`https://www.tiktok.com/`, {
    waitUntil: "networkidle2",
  });
  const pagesCount = (await browser.pages()).length;
  const browserWSEndpoint = await browser.wsEndpoint();
  console.log({ browserWSEndpoint, pagesCount });
};
