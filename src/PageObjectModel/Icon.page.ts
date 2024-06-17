import * as PageOperations from "../ReusableFunctions/PageOperations";
import Wrapper from "../ReusableFunctions/Wrapper";
import { Locator, Page, TestInfo, expect } from "@playwright/test";

export default class IconPage extends Wrapper {
  constructor(public page: Page) {
    super(page);
  }

  public async enterUserName(username: string) {
    this.findLocator("");
  }
  public async IconValidation() {
    try {
      var loc: Locator = await this.page
        .frameLocator('iframe[title="storybook-preview-iframe"]')
        .getByRole("heading", { name: "Iconbutton" });
      this.ClickLocator(loc);
      await this.report.LogReport(
        "clicked on the icon button",
        "pass",
        (await this.page.screenshot()).toString("base64")
      );
      await this.page
        .frameLocator('iframe[title="storybook-preview-iframe"]')
        .locator("#story--components-iconbutton--default--primary-inner")
        .getByLabel("Tooltip")
        .click();
      await this.report.LogReport(
        "clicked on the tool tip button",
        "pass",
        (await this.page.screenshot()).toString("base64")
      );
      await this.page
        .frameLocator('iframe[title="storybook-preview-iframe"]')
        .getByLabel("primary", { exact: true })
        .check();
      await this.report.LogReport(
        "checked on the primary button",
        "pass",
        (await this.page.screenshot()).toString("base64")
      );
      await this.page
        .frameLocator('iframe[title="storybook-preview-iframe"]')
        .getByLabel("small", { exact: true })
        .check();
      await this.report.LogReport(
        "checked on the small button",
        "pass",
        (await this.page.screenshot()).toString("base64")
      );
      const locator = this.page
        .frameLocator('iframe[title="storybook-preview-iframe"]')
        .locator("#story--components-iconbutton--default--primary-inner")
        .getByLabel("Tooltip");
      expect.soft(
        await this.ToHaveScreenshot(
          "//*[@id='story--components-iconbutton--default--primary-inner']//button[@aria-label='Tooltip']",
          "Scenario-Iconbutton.png",
          { frameName: 'iframe[title="storybook-preview-iframe"]' }
        )
      );
      expect.soft(
        await this.ToHaveScreenshot(
          "//*[@id='story--components-iconbutton--default--primary-inner']//button[@aria-label='Tooltip']",
          "Scenario-Iconbutton2.png",
          { frameName: 'iframe[title="storybook-preview-iframe"]' }
        )
      );
    } catch (err) {
      await this.report.LogReport(
        "Error in IconValidation" + err.message,
        "fail",
        ""
      );
    }
  }
}
