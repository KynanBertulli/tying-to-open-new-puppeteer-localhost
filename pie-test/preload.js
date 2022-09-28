const { contextBridge } = require("electron");
const puppeteer = require("puppeteer-core");
var exec = require("child_process").exec;

const fs = require("fs");
const remote = require("electron").remote;
const app = require("electron").app;
const { electron, BrowserWindow } = require("electron");
const pie = require("puppeteer-in-electron");
var currentWindow = electron.remote.getCurrentWindow();
const browser = currentWindow.browser;

contextBridge.exposeInMainWorld("versions", {
  node: () => {
    console.log("fuck");
  },
  electron: async () => {
    // await pie.initialize(app);
    // const browser = await pie.connect(app, puppeteer);
    // const window = new BrowserWindow();
    // const url = "https://www.google.com/";
    // await window.loadURL(url);
    // const page = await pie.getPage(browser, window);
    // console.log(page.url());
  },
});
