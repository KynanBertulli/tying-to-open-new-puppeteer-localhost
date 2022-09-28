const { BrowserWindow, app } = require("electron");
const pie = require("puppeteer-in-electron");
const puppeteer = require("puppeteer-core");
const path = require("path");
const url = require("url");

let mainWindow;
let browserPromise = pie.connect(app, puppeteer);
async function createWindow(browserPromise) {
  console.log(path.join(__dirname, "preload.js"));

  console.log("global.scraper");

  mainWindow = new BrowserWindow({
    width: 790,
    height: 680,
    icon: "",
    webPreferences: {
      devTools: !app.isPackaged,
      nodeIntegration: true,
      enableRemoteModule: true, //this must be true
      preload: path.join(__dirname, "preload.js"),
    },
  });
  //
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname + "/client/", "index.html"),
      protocol: "file:",
      slashes: true,
    });
  await mainWindow.loadURL(startUrl);

  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", () => {
  createWindow(browserPromise);
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
