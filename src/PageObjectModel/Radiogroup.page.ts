import * as PageOperations from "../ReusableFunctions/PageOperations";
import Wrapper from "../ReusableFunctions/Wrapper";
import { Locator, Page, TestInfo, expect } from "@playwright/test";

export default class Radiogroup extends Wrapper {
  constructor(public page: Page) {
    super(page);
  }

  public async RadiogroupValidation() {
    try {
      await this.page
        .frameLocator('iframe[title="storybook-preview-iframe"]')
        .locator(".innerZoomElementWrapper > div")
        .first()
        .click();
      //report
      await this.report.LogReport(
        "clicked on the innerZoomElementWrapper",
        "pass",
        (await this.page.screenshot()).toString("base64")
      );
      await this.page
        .frameLocator('iframe[title="storybook-preview-iframe"]')
        .locator("#set-disabled")
        .click();
      await this.report.LogReport(
        "clicked on the #set-disabled",
        "pass",
        (await this.page.screenshot()).toString("base64")
      );
      await this.page
        .frameLocator('iframe[title="storybook-preview-iframe"]')
        .getByLabel("FalseTrue")
        .check();
      await this.report.LogReport(
        "clicked on the Label FalseTrue",
        "pass",
        (await this.page.screenshot()).toString("base64")
      );
      //const locator =  page.frameLocator('iframe[title="storybook-preview-iframe"]').locator('#fui-2').getByText('Option A')
      //await expect.soft(this.page.frameLocator('iframe[title="storybook-preview-iframe"]').locator('#fui-2').getByText('Option A')).toHaveScreenshot('Scenario-Radio.png',{timeout:50000});
      const locator = this.page
        .frameLocator('iframe[title="storybook-preview-iframe"]')
        .locator("#fui-2")
        .getByText("Option A");
      await this.ToHaveScreenshotLocator(locator, "Scenario-Radio.png");
    } catch (err) {
      await this.report.LogReport(
        "Error in RadiogroupValidation" + err.message,
        "fail",
        ""
      );
    }
  }
}
