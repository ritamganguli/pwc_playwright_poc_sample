import { ICustomWorld } from "../support/custom-world";
import { config } from "../support/config";
import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import SamplePage from "../../PageObjectModel/SamplePage";

Given("Go to the playwright website", async function (this: ICustomWorld) {
  const page = this.page!;
  //await page.goto(config.BASE_URL);
  //await page.locator('nav >> a >> text="Playwright"').waitFor();
  const samplePage = new SamplePage(page);
  await samplePage.GoTo(config.BASE_URL);
});

When(
  "Change theme to {string} mode",
  async function (this: ICustomWorld, mode: string) {
    const page = this.page!;
    const html = page.locator("html");
    const current = await html.getAttribute("data-theme");
    if (current !== mode) {
      await page.locator('nav >> button[title*="dark and light mode"]').click();
    }
    await page.waitForSelector(`html[data-theme=${mode}]`);
  }
);

Then("We see {string} mode", async function (this: ICustomWorld, mode: string) {
  const page = this.page!;
  const theme = await page.locator("html").getAttribute("data-theme");
  expect(theme).toEqual(mode);
});

Given("Open the tab", async function () {
  // Write code here that turns the phrase above into concrete actions
});
Given("Open the tab1", async function () {
  // Write code here that turns the phrase above into concrete actions
});
