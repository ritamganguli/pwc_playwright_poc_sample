import { test, expect } from "@playwright/test";
import IconPage from "../../../src/PageObjectModel/Icon.page";
import ENV from "../../../src/Utils/env";
import Report from "../../../src/ReusableFunctions/Report";
import { json } from "stream/consumers";

import ReusableFunctions from "../../../src/ReusableFunctions/ReusableFunctions";

test.beforeEach(async ({ page }, testInfo) => {
  await new Report().startReport(testInfo, null);
});

test.afterEach(async ({ page }, testInfo) => {
  console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);
  await new Report().endReport(testInfo, null);
  await page.close();
});

test("IconButton @v1", async ({ page }) => {
  const iconPage = new IconPage(page);
  const reusableFunction = new ReusableFunctions();
  const report = new Report();
  report.SetTestPlanDetails("252", "254", "256");
  iconPage.MaximizeWindow(1024, 786);
  await iconPage.GoTo(
    "https://west-svc.ds-nightly.pwcglb.com/button-react-components/?path=/docs/interactive-ui-elements-button-components-iconbutton--docs"
  );
  await iconPage.IconValidation();
  const element = page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .locator("#story--components-iconbutton--default--primary-inner")
    .getByLabel("Tooltip");

  // const cssValues = await element.evaluate((el) => {
  //     return window.getComputedStyle(el);
  // });

  // var v= await reusableFunction.createFile(cssValues,"icon-1.json");
  // const diff= await reusableFunction.compareJson("cssDataJsonBaseLine/icon-1.json","cssDataJson/icon-1.json");
  // if(diff.toString().length>2)
  //   report.LogReport("Json CSS Diff"+diff.toString(),"info","");

  // if(diff.length<=2){
  //   report.LogReport("CSS are matched","pass","");
  // }else
  // {
  //   report.LogReport("CSS are not matched","fail","");
  // }
});
