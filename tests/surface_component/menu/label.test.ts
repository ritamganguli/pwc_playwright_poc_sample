import { test } from "@playwright/test";
import Label from "../../../src/PageObjectModel/Label.page";
import Report from "../../../src/ReusableFunctions/Report";

import ReusableFunctions from "../../../src/ReusableFunctions/ReusableFunctions";

test.beforeEach(async ({ }, testInfo) => {
  await new Report().startReport(testInfo, null);
});

test.afterEach(async ({ page }, testInfo) => {
  console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);
  await new Report().endReport(testInfo, null);
  await page.close();
});

test("label-1 @v2 ", async ({ page }) => {
  const report = new Report();
  const label = new Label(page);

  await report.SetTestPlanDetails("252", "254", "257");
  const reusableFunction = new ReusableFunctions();
  await label.MaximizeWindow(1024, 786);
  await label.GoTo(
    "https://west-svc.ds-nightly.pwcglb.com/react-components/?path=/docs/introduction--docs"
  );
  const InComp = page.getByRole("button", { name: "Input Components" });
  await label.ClickLocator(InComp);
  const InCompL = page.getByRole("button", { name: "Label" });
  await label.ClickLocator(InCompL);
  await label.LabelValidation();

  //CSS validation section
  try {
    const element = page
      .frameLocator('iframe[title="storybook-ref-input-react-components"]')
      .locator(".innerZoomElementWrapper > div")
      .first();

    const diffLen: string = await reusableFunction.StyeSheetValidation(
      element,
      "labelcss.json"
    );
  } catch (e) { }
});
