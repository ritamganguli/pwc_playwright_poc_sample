import { BrowserContext, Page, chromium, expect, test } from "@playwright/test";
import ReusableFunctions from "../../../../src/ReusableFunctions/ReusableFunctions";
import Report from "../../../../src/ReusableFunctions/Report";
import LeftPane from "../../../../src/PageObjectModel/LeftPane.page";
import AvatarGroup from "../../../../src/PageObjectModel/AvatarGroup.page";
import * as config from "../../../../config/testConfig.json";
import * as AvatarEnums from "../../../../src/CustomUserTypes/AvatarGroup";

const testName = process.env.TEST_NAME || 'Playwright Test';


test.describe('AvatarGroupTests', {
    tag: ['@AvatarGroup', '@MaverickRegression']
}, () => {



    let sharedBrowserContext: BrowserContext;
    let sharedPage: Page;
    let browserInstance: any;
    const Reusable = new ReusableFunctions();

    const isLambdaTest = process.env.LAMBDA_TEST === 'true';

    test.beforeAll(async () => {
        if (isLambdaTest) {
            const capabilities = {
                browserName: "Chrome",
                browserVersion: "latest",
                "LT:Options": {
                    platform: "Windows 10",
                    build: "Playwright TS Build--1",
                    name: testName,
                    user: 'shubhamr',
                    accessKey: 'dl8Y8as59i1YyGZZUeLF897aCFvIDmaKkUU1e6RgBmlgMLIIhh',
                    network: true,
                    video: true,
                    console: true,
                    tunnel: false,
                    tunnelName: "",
                    geoLocation: ''
                },
            };

            const browser = await chromium.connect({
                wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
                    JSON.stringify(capabilities)
                )}`,
            });
            sharedBrowserContext = await browser.newContext();
            sharedPage = await sharedBrowserContext.newPage();
        } else {
            const browserObj = await Reusable.LaunchBrowserInstance(1280, 720, 1.5);
            sharedBrowserContext = browserObj.browserContext;
            sharedPage = browserObj.page;
        }
    });
    test.beforeEach(async ({ }, testInfo) => {
        await new Report().startReport(testInfo, null);
        const Reusable = new ReusableFunctions()
        const leftPane = new LeftPane(sharedPage)
        await leftPane.GoTo(Reusable.RetrieveEnvTestData(config.env, "storybookUrl"))

        await leftPane.GoToAvatarGroup()
        const avatarGroup = new AvatarGroup(sharedPage)

        await avatarGroup.waitForAvatarGroupPageLoad()
    });

    test.afterEach(async ({ }, testInfo) => {
        const Reusable = new ReusableFunctions();
        console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);
        await new Report().endReport(testInfo, null);
    });

    test.afterAll(async () => {
        await Reusable.CloseAllPagesBrowserContext(sharedBrowserContext);
        if (isLambdaTest) {
            await sharedBrowserContext.browser().close();
        }
    });

    test("TC1431864_AvatarGroup_Activity_ring-all_avatars_visible-spread_layout_PBI1431572", async ({ }, testInfo) => {

        const avatarGroup = new AvatarGroup(sharedPage)

        await avatarGroup.setOverflowAfter("20")
        await avatarGroup.clickOutside()

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatargroup-overflowAfter-20.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.setVariant(AvatarEnums.Variant.activity)
        await avatarGroup.clickOutside()

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatargroup-overflowAfter-20-variant-activity.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

    })

    test("TC1431865_AvatarGroup_Activity_ring-all_avatars_visible-stack_layout_PBI1431572", async ({ }, testInfo) => {

        const avatarGroup = new AvatarGroup(sharedPage);

        await avatarGroup.setOverflowAfter("20");
        await avatarGroup.clickOutside();

        await avatarGroup.setLayout(AvatarEnums.Layout.stack);
        await avatarGroup.clickOutside();

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatargroup-overflowAfter-20-variant-undefined-layout-stack.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") });


        await avatarGroup.setVariant(AvatarEnums.Variant.activity);

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatargroup-overflowAfter-20-variant-activity-layout-stack.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") });


    })

    test("TC1431866_AvatarGroup_Activity_ring-pie_layout_PBI1431572", async ({ }, testInfo) => {

        const avatarGroup = new AvatarGroup(sharedPage)

        await avatarGroup.setOverflowAfter("20")
        await avatarGroup.clickOutside()

        await avatarGroup.setLayout(AvatarEnums.Layout.pie)
        await avatarGroup.clickOutside()

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatargroup-overflowAfter-20-variant-undefined-layout-stack.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })


        await avatarGroup.setVariant(AvatarEnums.Variant.activity)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatargroup-overflowAfter-20-variant-activity-layout-stack.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

    })

    test("TC1431867_AvatarGroup_Activity_ring-overflown_users-spread_layout_PBI1431572", async ({ }, testInfo) => {

        const avatarGroup = new AvatarGroup(sharedPage)

        await avatarGroup.waitForAvatarGroupPageLoad()
        await avatarGroup.setOverflowAfter("3")
        await avatarGroup.clickOutside()

        await avatarGroup.setLayout(AvatarEnums.Layout.spread)
        await avatarGroup.clickOutside()

        await avatarGroup.setVariant(AvatarEnums.Variant.activity)
        await avatarGroup.clickOutside()

        await avatarGroup.clickOverflowIndicator()

        await avatarGroup.ToHaveScreenshot(avatarGroup.overflowPopover, "avatargroup-overflowAfter-3-variant-activity-layout-spread-overflowPopover.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.ScrollIntoView(avatarGroup.overflowPopoverEnd, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.ToHaveScreenshot(avatarGroup.overflowPopover, "avatargroup-overflowAfter-3-variant-activity-layout-spread-overflowPopover2.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })


        await avatarGroup.setVariant(AvatarEnums.Variant.undefined)
        await avatarGroup.clickOutside()

        await avatarGroup.clickOverflowIndicator()

        await avatarGroup.ToHaveScreenshot(avatarGroup.overflowPopover, "avatargroup-overflowAfter-3-variant-undefined-layout-spread-overflowPopover.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.ScrollIntoView(avatarGroup.overflowPopoverEnd, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.ToHaveScreenshot(avatarGroup.overflowPopover, "avatargroup-overflowAfter-3-variant-undefined-layout-spread-overflowPopover2.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

    })

    test("TC1431868_AvatarGroup_Activity_ring-overflown_users-stack_layout_PBI1431572", async ({ }, testInfo) => {

        const avatarGroup = new AvatarGroup(sharedPage)

        await avatarGroup.waitForAvatarGroupPageLoad()
        await avatarGroup.setOverflowAfter("3")
        await avatarGroup.clickOutside()

        await avatarGroup.setLayout(AvatarEnums.Layout.stack)
        await avatarGroup.clickOutside()

        await avatarGroup.setVariant(AvatarEnums.Variant.activity)
        await avatarGroup.clickOutside()

        await avatarGroup.clickOverflowIndicator()

        await avatarGroup.ToHaveScreenshot(avatarGroup.overflowPopover, "avatargroup-overflowAfter-3-variant-activity-layout-stack-overflowPopover.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.ScrollIntoView(avatarGroup.overflowPopoverEnd, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.ToHaveScreenshot(avatarGroup.overflowPopover, "avatargroup-overflowAfter-3-variant-activity-layout-stack-overflowPopover2.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })


        await avatarGroup.setVariant(AvatarEnums.Variant.undefined)
        await avatarGroup.clickOutside()

        await avatarGroup.clickOverflowIndicator()

        await avatarGroup.ToHaveScreenshot(avatarGroup.overflowPopover, "avatargroup-overflowAfter-3-variant-undefined-layout-stack-overflowPopover.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.ScrollIntoView(avatarGroup.overflowPopoverEnd, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.ToHaveScreenshot(avatarGroup.overflowPopover, "avatargroup-overflowAfter-3-variant-undefined-layout-stack-overflowPopover2.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

    })

    test("TC1431869_AvatarGroup_Activity_ring-overflown_users-pie_layout_PBI1431572", async ({ }, testInfo) => {

        const avatarGroup = new AvatarGroup(sharedPage)

        await avatarGroup.waitForAvatarGroupPageLoad()
        await avatarGroup.setOverflowAfter("3")
        await avatarGroup.clickOutside()

        await avatarGroup.setLayout(AvatarEnums.Layout.pie)
        await avatarGroup.clickOutside()

        await avatarGroup.setVariant(AvatarEnums.Variant.activity)
        await avatarGroup.clickOutside()

        await avatarGroup.clickOverflowIndicator()

        await avatarGroup.ToHaveScreenshot(avatarGroup.overflowPopover, "avatargroup-overflowAfter-3-variant-activity-layout-pie-overflowPopover.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.ScrollIntoView(avatarGroup.overflowPopoverEnd, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.ToHaveScreenshot(avatarGroup.overflowPopover, "avatargroup-overflowAfter-3-variant-activity-layout-pie-overflowPopover2.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })


        await avatarGroup.setVariant(AvatarEnums.Variant.undefined)
        await avatarGroup.clickOutside()

        await avatarGroup.clickOverflowIndicator()

        await avatarGroup.ToHaveScreenshot(avatarGroup.overflowPopover, "avatargroup-overflowAfter-3-variant-undefined-layout-pie-overflowPopover.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.ScrollIntoView(avatarGroup.overflowPopoverEnd, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.ToHaveScreenshot(avatarGroup.overflowPopover, "avatargroup-overflowAfter-3-variant-undefined-layout-pie-overflowPopover2.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

    })

    test("TC1431870_AvatarGroup_Tooltip_text-default-all_layouts_PBI1431572", async ({ }, testInfo) => {
        const avatarGroup = new AvatarGroup(sharedPage)

        await avatarGroup.setLayout(AvatarEnums.Layout.spread)

        await avatarGroup.HoverOver(avatarGroup.overflowIndicator, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })
        await avatarGroup.waitForTooltipToBeVisible()


        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatargroup-layout-spread-overflowIndicatorTooltip-default.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })


        await avatarGroup.setLayout(AvatarEnums.Layout.stack)
        await avatarGroup.HoverOver(avatarGroup.overflowIndicator, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatargroup-layout-stack-overflowIndicatorTooltip-default.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })


        await avatarGroup.setLayout(AvatarEnums.Layout.pie)
        await avatarGroup.HoverOver(avatarGroup.overflowIndicator, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatargroup-layout-pie-overflowIndicatorTooltip-default.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

    })

    test("TC1431871_AvatarGroup_Tooltip_text-custom-all_layouts_PBI1431572", async ({ }, testInfo) => {
        const avatarGroup = new AvatarGroup(sharedPage)

        await avatarGroup.setCustomTooltipText("Custom tooltip text")

        await avatarGroup.setLayout(AvatarEnums.Layout.spread)

        await avatarGroup.HoverOver(avatarGroup.overflowIndicator, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })
        await avatarGroup.waitForTooltipToBeVisible()

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatargroup-layout-spread-overflowIndicatorTooltip-custom.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })


        await avatarGroup.setLayout(AvatarEnums.Layout.stack)
        await avatarGroup.HoverOver(avatarGroup.overflowIndicator, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatargroup-layout-stack-overflowIndicatorTooltip-custom.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.setLayout(AvatarEnums.Layout.pie)
        await avatarGroup.HoverOver(avatarGroup.overflowIndicator, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatargroup-layout-pie-overflowIndicatorTooltip-custom.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

    })

    test("TC1431872_AvatarGroup_overflowIndicator-count-allLayouts_PBI1431572", async ({ }, testInfo) => {
        const avatarGroup = new AvatarGroup(sharedPage)

        await avatarGroup.setOverflowIndicatorType(AvatarEnums.OverflowIndicator.count)
        await avatarGroup.clickOutside()

        await avatarGroup.setLayout(AvatarEnums.Layout.spread)
        await avatarGroup.clickOutside()

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatargroup-layout-spread-overflowindicator-count.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.setLayout(AvatarEnums.Layout.stack)
        await avatarGroup.clickOutside()

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatargroup-layout-stack-overflowindicator-count.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.setLayout(AvatarEnums.Layout.pie)
        await avatarGroup.clickOutside()

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatargroup-layout-pie-overflowindicator-count.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })
    })

    test("TC1431873_AvatarGroup_overflowIndicator-icon-allLayouts_PBI1431572", async ({ }, testInfo) => {
        const avatarGroup = new AvatarGroup(sharedPage)

        await avatarGroup.setOverflowIndicatorType(AvatarEnums.OverflowIndicator.icon)

        await avatarGroup.setLayout(AvatarEnums.Layout.spread)
        await avatarGroup.clickOutside()

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatargroup-layout-spread-overflowindicator-icon.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })


        await avatarGroup.clickOverflowIndicator();

        await avatarGroup.ToHaveScreenshot(avatarGroup.overflowPopover, "avatargroup-layout-spread-overflowindicator-icon-overflowpopover.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })


        await avatarGroup.setLayout(AvatarEnums.Layout.stack)
        await avatarGroup.clickOutside()

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatargroup-layout-stack-overflowindicator-icon.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })


        await avatarGroup.clickOverflowIndicator();


        await avatarGroup.ToHaveScreenshot(avatarGroup.overflowPopover, "avatargroup-layout-stack-overflowindicator-icon-overflowpopover.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })


        await avatarGroup.setLayout(AvatarEnums.Layout.pie)
        await avatarGroup.clickOutside()


        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatargroup-layout-pie-overflowindicator-icon.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })


        await avatarGroup.clickOverflowIndicator();

        await avatarGroup.ToHaveScreenshot(avatarGroup.overflowPopover, "avatargroup-layout-pie-overflowindicator-icon-overflowpopover.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

    })

    test("TC1431875_AvatarGroup_overflowAfter-count-less_than_number_of_users_PBI1431572", async ({ }, testInfo) => {
        const avatarGroup = new AvatarGroup(sharedPage)

        await avatarGroup.setLayout(AvatarEnums.Layout.spread)
        await avatarGroup.setOverflowAfter("4")
        await avatarGroup.clickOutside()

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatarGroup-overflowAfter-4-layout-spread.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.setLayout(AvatarEnums.Layout.stack)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatarGroup-overflowAfter-4-layout-stack.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.setLayout(AvatarEnums.Layout.pie)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatarGroup-overflowAfter-4-layout-pie.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })
    })

    test("TC1431876_AvatarGroup_overflowAfter-count-more_than_number_of_users_PBI1431572", async ({ }, testInfo) => {
        const avatarGroup = new AvatarGroup(sharedPage)

        await avatarGroup.setLayout(AvatarEnums.Layout.spread)
        await avatarGroup.setOverflowAfter("20")
        await avatarGroup.clickOutside()

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatarGroup-overflowAfter-20-layout-spread.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })


        await avatarGroup.setLayout(AvatarEnums.Layout.stack)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatarGroup-overflowAfter-20-layout-stack.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })


        await avatarGroup.setLayout(AvatarEnums.Layout.pie)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatarGroup-overflowAfter-20-layout-pie.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })
    })

    test("TC1431877_AvatarGroup_layout-default_PBI1431572", async ({ }, testInfo) => {
        const avatarGroup = new AvatarGroup(sharedPage)

        await avatarGroup.setLayout(AvatarEnums.Layout.spread)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatarGroup-layout-default-spread.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.setLayout(AvatarEnums.Layout.stack)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatarGroup-layout-default-stack.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.setLayout(AvatarEnums.Layout.pie)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatarGroup-layout-default-pie.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

    })

    test("TC1431878_AvatarGroup_all-sizes-spread_layout_PBI1431572", async ({ }, testInfo) => {

        const avatarGroup = new AvatarGroup(sharedPage)

        await avatarGroup.selectAvatarSize(16)
        await avatarGroup.validateAvatarSizes("avatar16.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-spread-variant-undefined-16px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(20)
        await avatarGroup.validateAvatarSizes("avatar20.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-spread-variant-undefined-20px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(24)
        await avatarGroup.validateAvatarSizes("avatar24.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-spread-variant-undefined-24px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(28)
        await avatarGroup.validateAvatarSizes("avatar28.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-spread-variant-undefined-28px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(32)
        await avatarGroup.validateAvatarSizes("avatar32.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-spread-variant-undefined-32px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })


        await avatarGroup.selectAvatarSize(36)
        await avatarGroup.validateAvatarSizes("avatar36.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-spread-variant-undefined-36px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(40)
        await avatarGroup.validateAvatarSizes("avatar40.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-spread-variant-undefined-40px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(48)
        await avatarGroup.validateAvatarSizes("avatar48.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-spread-variant-undefined-48px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(56)
        await avatarGroup.validateAvatarSizes("avatar56.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-spread-variant-undefined-56px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(64)
        await avatarGroup.validateAvatarSizes("avatar64.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-spread-variant-undefined-64px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(72)
        await avatarGroup.validateAvatarSizes("avatar72.json", testInfo)
        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-spread-variant-undefined-72px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(96)
        await avatarGroup.validateAvatarSizes("avatar96.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-spread-variant-undefined-96px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(120)
        await avatarGroup.validateAvatarSizes("avatar120.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-spread-variant-undefined-120px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(128)
        await avatarGroup.validateAvatarSizes("avatar128.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-spread-variant-undefined-128px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.setVariant(AvatarEnums.Variant.activity)
        await avatarGroup.clickOutside()
        await avatarGroup.selectAvatarSize(16)
        await avatarGroup.validateAvatarSizes("avatar16.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-spread-variant-activity-16px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(20)
        await avatarGroup.validateAvatarSizes("avatar20.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-spread-variant-activity-20px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(24)
        await avatarGroup.validateAvatarSizes("avatar24.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-spread-variant-activity-24px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(28)
        await avatarGroup.validateAvatarSizes("avatar28.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-spread-variant-activity-28px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(32)
        await avatarGroup.validateAvatarSizes("avatar32.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-spread-variant-activity-32px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })


        await avatarGroup.selectAvatarSize(36)
        await avatarGroup.validateAvatarSizes("avatar36.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-spread-variant-activity-36px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(40)
        await avatarGroup.validateAvatarSizes("avatar40.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-spread-variant-activity-40px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(48)
        await avatarGroup.validateAvatarSizes("avatar48.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-spread-variant-activity-48px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(56)
        await avatarGroup.validateAvatarSizes("avatar56.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-spread-variant-activity-56px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(64)
        await avatarGroup.validateAvatarSizes("avatar64.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-spread-variant-activity-64px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(72)
        await avatarGroup.validateAvatarSizes("avatar72.json", testInfo)
        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-spread-variant-activity-72px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(96)
        await avatarGroup.validateAvatarSizes("avatar96.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-spread-variant-activity-96px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(120)
        await avatarGroup.validateAvatarSizes("avatar120.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-spread-variant-activity-120px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(128)
        await avatarGroup.validateAvatarSizes("avatar128.json", testInfo)


        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-spread-variant-activity-128px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })
    })

    test("TC1431879_AvatarGroup_all-sizes-stack_layout_PBI1431572", async ({ }, testInfo) => {

        const avatarGroup = new AvatarGroup(sharedPage)

        await avatarGroup.setLayout(AvatarEnums.Layout.stack)
        await avatarGroup.clickOutside()

        await avatarGroup.selectAvatarSize(16)
        await avatarGroup.validateAvatarSizes("avatar16.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-stack-variant-undefined-16px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })


        await avatarGroup.selectAvatarSize(20)
        await avatarGroup.validateAvatarSizes("avatar20.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-stack-variant-undefined-20px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(24)
        await avatarGroup.validateAvatarSizes("avatar24.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-stack-variant-undefined-24px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(28)
        await avatarGroup.validateAvatarSizes("avatar28.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-stack-variant-undefined-28px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(32)
        await avatarGroup.validateAvatarSizes("avatar32.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-stack-variant-undefined-32px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(36)
        await avatarGroup.validateAvatarSizes("avatar36.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-stack-variant-undefined-36px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })
        await avatarGroup.selectAvatarSize(40)
        await avatarGroup.validateAvatarSizes("avatar40.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-stack-variant-undefined-40px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })
        await avatarGroup.selectAvatarSize(56)
        await avatarGroup.validateAvatarSizes("avatar56.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-stack-variant-undefined-56px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })
        await avatarGroup.selectAvatarSize(64)
        await avatarGroup.validateAvatarSizes("avatar64.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-stack-variant-undefined-64px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(72)
        await avatarGroup.validateAvatarSizes("avatar72.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-stack-variant-undefined-72px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(96)
        await avatarGroup.validateAvatarSizes("avatar96.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-stack-variant-undefined-96px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(120)
        await avatarGroup.validateAvatarSizes("avatar120.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-stack-variant-undefined-120px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(128)
        await avatarGroup.validateAvatarSizes("avatar128.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-stack-variant-undefined-128x.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.setVariant(AvatarEnums.Variant.activity)
        await avatarGroup.clickOutside()

        await avatarGroup.selectAvatarSize(16)
        await avatarGroup.validateAvatarSizes("avatar16.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-stack-variant-activity-16px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(20)
        await avatarGroup.validateAvatarSizes("avatar20.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-stack-variant-activity-20px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(24)
        await avatarGroup.validateAvatarSizes("avatar24.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-stack-variant-activity-24px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(28)
        await avatarGroup.validateAvatarSizes("avatar28.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-stack-variant-activity-28px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(32)
        await avatarGroup.validateAvatarSizes("avatar32.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-stack-variant-activity-32px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(36)
        await avatarGroup.validateAvatarSizes("avatar36.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-stack-variant-activity-36px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(40)
        await avatarGroup.validateAvatarSizes("avatar40.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-stack-variant-activity-40px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(56)
        await avatarGroup.validateAvatarSizes("avatar56.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-stack-variant-activity-56px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(64)
        await avatarGroup.validateAvatarSizes("avatar64.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-stack-variant-activity-64px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(72)
        await avatarGroup.validateAvatarSizes("avatar72.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-stack-variant-activity-72px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(96)
        await avatarGroup.validateAvatarSizes("avatar96.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-stack-variant-activity-96px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(120)
        await avatarGroup.validateAvatarSizes("avatar120.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-stack-variant-activity-120px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(128)
        await avatarGroup.validateAvatarSizes("avatar128.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-stack-variant-activity-128px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

    })

    test("TC1431880_AvatarGroup_all-sizes-pie_layout_PBI1431572", async ({ }, testInfo) => {
        const avatarGroup = new AvatarGroup(sharedPage)

        await avatarGroup.setLayout(AvatarEnums.Layout.pie)
        await avatarGroup.clickOutside()

        await avatarGroup.selectAvatarSize(16)
        await avatarGroup.validateAvatarSizePieLayout("avatar16.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-pie-variant-undefined-16px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })


        await avatarGroup.selectAvatarSize(20)
        await avatarGroup.validateAvatarSizePieLayout("avatar20.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-pie-variant-undefined-20px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })


        await avatarGroup.selectAvatarSize(24)
        await avatarGroup.validateAvatarSizePieLayout("avatar24.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-pie-variant-undefined-24px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })


        await avatarGroup.selectAvatarSize(28)
        await avatarGroup.validateAvatarSizePieLayout("avatar28.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-pie-variant-undefined-28px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })


        await avatarGroup.selectAvatarSize(32)
        await avatarGroup.validateAvatarSizePieLayout("avatar32.json", testInfo)
        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-pie-variant-undefined-32px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })


        await avatarGroup.selectAvatarSize(36)
        await avatarGroup.validateAvatarSizePieLayout("avatar36.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-pie-variant-undefined-36px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(40)
        await avatarGroup.validateAvatarSizePieLayout("avatar40.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-pie-variant-undefined-40px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })


        await avatarGroup.selectAvatarSize(56)
        await avatarGroup.validateAvatarSizePieLayout("avatar56.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-pie-variant-undefined-56px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })


        await avatarGroup.selectAvatarSize(64)
        await avatarGroup.validateAvatarSizePieLayout("avatar64.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-pie-variant-undefined-64px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })


        await avatarGroup.selectAvatarSize(72)
        await avatarGroup.validateAvatarSizePieLayout("avatar72.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-pie-variant-undefined-72px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })


        await avatarGroup.selectAvatarSize(96)
        await avatarGroup.validateAvatarSizePieLayout("avatar96.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-pie-variant-undefined-96px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })


        await avatarGroup.selectAvatarSize(120)
        await avatarGroup.validateAvatarSizePieLayout("avatar120.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-pie-variant-undefined-120px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })


        await avatarGroup.selectAvatarSize(128)
        await avatarGroup.validateAvatarSizePieLayout("avatar128.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-pie-variant-undefined-128px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })


        await avatarGroup.setVariant(AvatarEnums.Variant.activity)
        await avatarGroup.clickOutside()

        await avatarGroup.selectAvatarSize(16)
        await avatarGroup.validateAvatarSizePieLayout("avatar16.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-pie-variant-activity-16px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })


        await avatarGroup.selectAvatarSize(20)
        await avatarGroup.validateAvatarSizePieLayout("avatar20.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-pie-variant-activity-20px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })


        await avatarGroup.selectAvatarSize(24)
        await avatarGroup.validateAvatarSizePieLayout("avatar24.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-pie-variant-activity-24px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })


        await avatarGroup.selectAvatarSize(28)
        await avatarGroup.validateAvatarSizePieLayout("avatar28.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-pie-variant-activity-28px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })


        await avatarGroup.selectAvatarSize(32)
        await avatarGroup.validateAvatarSizePieLayout("avatar32.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-pie-variant-activity-32px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })


        await avatarGroup.selectAvatarSize(36)
        await avatarGroup.validateAvatarSizePieLayout("avatar36.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-pie-variant-activity-36px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

        await avatarGroup.selectAvatarSize(40)
        await avatarGroup.validateAvatarSizePieLayout("avatar40.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-pie-variant-activity-40px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })


        await avatarGroup.selectAvatarSize(56)
        await avatarGroup.validateAvatarSizePieLayout("avatar56.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-pie-variant-activity-56px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })


        await avatarGroup.selectAvatarSize(64)
        await avatarGroup.validateAvatarSizePieLayout("avatar64.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-pie-variant-activity-64px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })


        await avatarGroup.selectAvatarSize(72)
        await avatarGroup.validateAvatarSizePieLayout("avatar72.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-pie-variant-activity-72px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })


        await avatarGroup.selectAvatarSize(96)
        await avatarGroup.validateAvatarSizePieLayout("avatar96.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-pie-variant-activity-96px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })


        await avatarGroup.selectAvatarSize(120)
        await avatarGroup.validateAvatarSizePieLayout("avatar120.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-pie-variant-activity-120px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })


        await avatarGroup.selectAvatarSize(128)
        await avatarGroup.validateAvatarSizePieLayout("avatar128.json", testInfo)

        await avatarGroup.ToHaveScreenshot(avatarGroup.primaryAvatarGroup, "avatar-group-layout-pie-variant-activity-128px.png", testInfo, { frameName: Reusable.RetrieveCommonTestData("storyBookFrameLocator") })

    })

    test("TC1431881_AvatarGroup_hideProfileCard-false_all-layouts_PBI1431572", async ({ }, testInfo) => {
        const avatarGroup = new AvatarGroup(sharedPage)

        await avatarGroup.clickSetHideprofilecardButton()
        await avatarGroup.setLayout(AvatarEnums.Layout.spread)

        await avatarGroup.validateProfilecardsVisibleUsers(AvatarEnums.Layout.spread, testInfo)
        await avatarGroup.validateProfilecardsOverflownUsers(AvatarEnums.Layout.spread, testInfo)

        await avatarGroup.setLayout(AvatarEnums.Layout.stack)

        await avatarGroup.validateProfilecardsVisibleUsers(AvatarEnums.Layout.stack, testInfo)
        await avatarGroup.validateProfilecardsOverflownUsers(AvatarEnums.Layout.stack, testInfo)

        await avatarGroup.setLayout(AvatarEnums.Layout.pie)

        await avatarGroup.validateProfilecardsOverflownUsers(AvatarEnums.Layout.pie, testInfo)
    })

})