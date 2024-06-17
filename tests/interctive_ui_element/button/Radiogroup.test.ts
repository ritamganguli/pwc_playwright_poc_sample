import { test, expect } from "@playwright/test";
import LoginCheck from "../../../src/PageObjectModel/Radiogroup.page";
import ENV from "../../../src/Utils/env";
import Reusable from "../../../ReusableFunctions/Reusable";
import Report from "../../../src/ReusableFunctions/Report";
import { json } from "stream/consumers";
import data from "../../../results/testreport.json";
import ReusableFunctions from "../../../src/ReusableFunctions/ReusableFunctions";
import Radiogroup from "../../../src/PageObjectModel/Radiogroup.page";

test.beforeEach(async ({ page }, testInfo) => {
  await new Report().startReport(testInfo, null);
});

test.afterEach(async ({ page }, testInfo) => {
  console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);
  await new Report().endReport(testInfo, null);
  await page.close();
});

test("Radiogroup @v1", async ({ page }) => {
  const report = new Report();
  report.SetTestPlanDetails("252", "254", "258");
  const radiogroup = new Radiogroup(page);
  const reusableFunction = new ReusableFunctions();
  radiogroup.MaximizeWindow(1024, 786);
  await radiogroup.GoTo(
    "https://west-svc.ds-nightly.pwcglb.com/input-react-components/?path=/docs/interactive-ui-elements-input-components-radiogroup--docs"
  );

  await radiogroup.RadiogroupValidation();

  const element = page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .locator("#fui-2")
    .getByText("Option A");

  const diffLen: string = await reusableFunction.StyeSheetValidation(
    element,
    "radiocss.json"
  );

  if (diffLen.toString().length > 2)
    report.LogReport("Json CSS Diff" + diffLen.toString(), "info", "");

  if (diffLen.length <= 2) {
    report.LogReport("CSS are matched", "pass", "");
  } else {
    report.LogReport("CSS are not matched", "fail", "");
  }
});
