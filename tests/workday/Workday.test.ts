import { test, expect } from "@playwright/test";
import LoginCheck from "../../src/PageObjectModel/login.page";
import ENV from "../../src/Utils/env";
import Report from "../../src/ReusableFunctions/Report";

import ReusableFunctions from "../../src/ReusableFunctions/ReusableFunctions";

test.beforeEach(async ({ page }, testInfo) => {
  await new Report().startReport(testInfo, null);
});

test.afterEach(async ({ page }, testInfo) => {
  console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);
  await new Report().endReport(testInfo, null);
  await page.close();
});

test("Workday @w1", async ({ page }, testInfo) => {
  //console.log(ENV.BASE_URL);
  //const a = ENV.BASE_URL;
  //console.log(a.length);

  const LoginCheck1 = new LoginCheck(page);
  const report = new Report();
  //mapping the test case for update test case in ADO
  report.SetTestPlanDetails("252", "254", "260");
  const reusableFunction = new ReusableFunctions();

  //await reusableFunction.updateTestPlan("252","254","255","3");
  await LoginCheck1.MaximizeWindow(0, 0);
  await LoginCheck1.GoTo("https://wd3.myworkday.com/pwc/d/home.htmld");
  //const myFr= await LoginCheck1.findFrame("storybook-preview-iframe");
  const accsesswrkDay = page.getByText("Access Workday");
  await LoginCheck1.ClickLocator(accsesswrkDay);
  const emailId = page.getByPlaceholder("Email");
  await LoginCheck1.TypeTextLocator(emailId, "a@pwc.com");
  const nextButton = page.locator("//button[text()='Next']");
  await LoginCheck1.ClickLocator(nextButton);
  const SearchPeople = page.locator(
    "//*[@data-automation-id='globalSearchInput']"
  );
  await LoginCheck1.ClickLocator(SearchPeople);
  await LoginCheck1.TypeTextLocator(SearchPeople, "anjan.mondal@pwc.com");
  await page.keyboard.press("Enter");
  const SearchOpen = page.locator(
    "//*[@data-automation-id='pex-search-results-header-title-link']"
  );

  await LoginCheck1.ClickLocator(SearchOpen);
  const Job = page.locator(
    "//*[@title='Job' and @data-automation-id='workerProfileMenuItemLabel']"
  );
  await LoginCheck1.ClickLocator(Job);
});
