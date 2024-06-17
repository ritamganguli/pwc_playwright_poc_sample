// global-setup.ts
import { chromium, BrowserContext, Page } from 'playwright';

let sharedBrowserContext: BrowserContext;
let sharedPage: Page;

class ReusableFunctions {
  // Define your reusable functions here
}

const capabilities = {
  browserName: "Chrome",
  browserVersion: "latest",
  "LT:Options": {
    platform: "Windows 10",
    build: "Playwright TS Build--1",
    name: 'Global Setup',
    user: 'ritamg',
    accessKey: 'dl8Y8as59i1YyGZZUeLF897aCFvIDmaKkUU1e6RgBmlgMLIIhh',
    network: true,
    video: true,
    console: true,
    tunnel: false,
    tunnelName: "",
    geoLocation: ''
  },
};

const globalSetup = async () => {
  const browser = await chromium.connect({
    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
      JSON.stringify(capabilities)
    )}`,
  });
  sharedBrowserContext = await browser.newContext();
  sharedPage = await sharedBrowserContext.newPage();

  // Exporting global variables
  global.sharedBrowserContext = sharedBrowserContext;
  global.sharedPage = sharedPage;
  global.ReusableFunctions = new ReusableFunctions();
};

const globalTeardown = async () => {
  await sharedPage.close();
  await sharedBrowserContext.close();
};

export { globalSetup, globalTeardown };
