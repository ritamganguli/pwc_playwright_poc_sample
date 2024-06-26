import { test } from '@playwright/test'
import Report from "../../../src/ReusableFunctions/Report";
import ReactComponents from '../../../src/PageObjectModel/ReactComponents.page';

test.beforeEach(async ({ page }, testInfo) => {
    await new Report().startReport(testInfo, null);
});

test.afterEach(async ({ page }, testInfo) => {
    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);
    await new Report().endReport(testInfo, null);
    await page.close();
});

test("BaseMessageThread", async ({ page }) => {
    const reactComponentsPage = new ReactComponents(page);
    await reactComponentsPage.MaximizeWindow(1024, 786);
    await reactComponentsPage.GoTo("https://west-svc.ds-nightly.pwcglb.com/react-components/");

    await reactComponentsPage.NavigateToChatComponents();

    await reactComponentsPage.NavigateToChatSubNavOption("BaseMessageThread");

    // Image validation
    await reactComponentsPage.ToHaveScreenshot(reactComponentsPage.baseMessageThread, "BaseMessageThread.png"
        , {
            frameName: reactComponentsPage.frameName,
            maskElements: [await reactComponentsPage.lastChatMessageHeaderInfo(),
            await reactComponentsPage.lastDaySeparator()]
        });
})