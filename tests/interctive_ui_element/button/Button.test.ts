import { test, expect } from "@playwright/test";
import LoginCheck from "../../../src/PageObjectModel/login.page";
import ENV from "../../../src/Utils/env";
import Report from "../../../src/ReusableFunctions/Report";

import ReusableFunctions from "../../../src/ReusableFunctions/ReusableFunctions";

test.beforeEach(async ({ page }, testInfo) => {
  await new Report().startReport(testInfo, null);
});

test.afterEach(async ({ page }, testInfo) => {
  console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);
  await new Report().endReport(testInfo, null);
  await page.close();
});

test("ButtonTest-2 @v1", async ({ page }, testInfo) => {
  //console.log(ENV.BASE_URL);
  //const a = ENV.BASE_URL;
  //console.log(a.length);

  const LoginCheck1 = new LoginCheck(page);
  const report = new Report();
  //mapping the test case for update test case in ADO
  report.SetTestPlanDetails("252", "254", "259");
  const reusableFunction = new ReusableFunctions();

  //await reusableFunction.updateTestPlan("252","254","255","3");
  await LoginCheck1.MaximizeWindow(1024, 786);
  await LoginCheck1.GoTo(
    "https://west-svc.ds-nightly.pwcglb.com/button-react-components/?path=/docs/interactive-ui-elements-button-components-button--docs"
  );
  //const myFr= await LoginCheck1.findFrame("storybook-preview-iframe");
  await LoginCheck1.Click(LoginCheck1.checkBtn1, {
    frameName: LoginCheck1.FrName,
  });
  await LoginCheck1.TypeText(LoginCheck1.textArea, "Text", {
    frameName: LoginCheck1.FrName,
  });
  await LoginCheck1.ToHaveScreenshot(LoginCheck1.Btn1, "Scenario-button2.png", {
    frameName: LoginCheck1.FrName,
  });
  const element = await LoginCheck1.findLocator(LoginCheck1.Btn1, {
    frame: LoginCheck1.FrName,
  });

  const diffLen: string = await reusableFunction.StyeSheetValidation(
    element,
    "button.json"
  );

  //compare single css tag
  await reusableFunction.GetJsonCompare(
    "cssDataJsonBaseLine/button.json",
    "cssDataJson/button.json",
    "height",
    "height"
  );
  await reusableFunction.GetJsonCompare(
    "cssDataJsonBaseLine/button.json",
    "cssDataJson/button.json",
    "display",
    "display"
  );
  await reusableFunction.GetJsonCompare(
    "cssDataJsonBaseLine/button.json",
    "cssDataJson/button.json",
    "alignItems",
    "alignItems"
  );
  await reusableFunction.GetJsonCompare(
    "cssDataJsonBaseLine/button.json",
    "cssDataJson/button.json",
    "justifyContent",
    "justifyContent"
  );
  await reusableFunction.GetJsonCompare(
    "cssDataJsonBaseLine/button.json",
    "cssDataJson/button.json",
    "lineHeight",
    "lineHeight"
  );
  await reusableFunction.GetJsonCompare(
    "cssDataJsonBaseLine/button.json",
    "cssDataJson/button.json",
    "fontStyle",
    "fontStyle"
  );
  await reusableFunction.GetJsonCompare(
    "cssDataJsonBaseLine/button.json",
    "cssDataJson/button.json",
    "fontSize",
    "fontSize"
  );
  await reusableFunction.GetJsonCompare(
    "cssDataJsonBaseLine/button.json",
    "cssDataJson/button.json",
    "fontWeight",
    "fontWeight"
  );
});
