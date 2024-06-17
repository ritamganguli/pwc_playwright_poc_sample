import * as PageOperations from "../ReusableFunctions/PageOperations";
import Wrapper from "../ReusableFunctions/Wrapper";
import { Locator, Page, TestInfo, expect } from "@playwright/test";

export default class LabelPage extends Wrapper {
  constructor(public page: Page) {
    super(page);
  }

  public async LabelValidation() {
    try {
      const locRadioLarge: Locator = await this.page
        .frameLocator('iframe[title="storybook-ref-input-react-components"]')
        .getByLabel("large");
      await this.ClickLocator(locRadioLarge);

      const locSamibRadio: Locator = await this.page
        .frameLocator('iframe[title="storybook-ref-input-react-components"]')
        .getByLabel("semibold");
      await this.ClickLocator(locSamibRadio);

      // const innerZoomElementWrapper: Locator = await this.page
      //   .frameLocator('iframe[title="storybook-ref-input-react-components"]')
      //   .locator(".innerZoomElementWrapper > div")
      //   .first();
      // await this.ClickLocator(innerZoomElementWrapper);

      // await this.page
      //   .frameLocator('iframe[title="storybook-ref-input-react-components"]')
      //   .getByRole("heading", { name: "Label", exact: true })
      //   .click();
      // const locator = this.page
      //   .frameLocator('iframe[title="storybook-ref-input-react-components"]')
      //   .locator(
      //     "#story--interactive-ui-elements-input-components-label--default--primary-inner"
      //   )
      //   .getByText("This is a label.");

      expect.soft(
        await this.ToHaveScreenshot(
          "(//*[@class='innerZoomElementWrapper']/div)[1]",
          "Scenario-label.png",
          { frameName: 'iframe[title="storybook-ref-input-react-components"]' }
        )
      );
      // expect.soft(
      //   await this.ToHaveScreenshot(
      //     "(//*[@class='innerZoomElementWrapper']/div)[1]",
      //     "Scenario-label2.png",
      //     { frameName: 'iframe[title="storybook-ref-input-react-components"]' }
      //   )
      // );
    } catch (err) {
      await this.report.LogReport(
        "Error in LabelValidation" + err.message,
        "fail",
        ""
      );
    }
  }
}
