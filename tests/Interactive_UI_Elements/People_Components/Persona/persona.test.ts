import Persona from "../../../../src/PageObjectModel/PersonaPage";
import Report from "../../../../src/ReusableFunctions/Report";
import { BrowserContext, Page, chromium, expect, firefox, test } from "@playwright/test";
import ReusableFunctions from "../../../../src/ReusableFunctions/ReusableFunctions";
import config from "../../../../config/testConfig.json";
import dotenv from 'dotenv';
import path from "path";


dotenv.config();

const testName = process.env.TEST_NAME || 'Playwright Test';


test.describe('Persona_Tests', {
    tag: '@Persona'
}, async () => {

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
        const url = Reusable.RetrieveEnvTestData(config.env, 'personaUrl');
        const persona = new Persona(sharedBrowserContext.pages()[0]);
        await persona.GoTo(url);
    });

    test.afterEach(async ({ }, testInfo) => {
        console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);
        await new Report().endReport(testInfo, null);
    });

    test.afterAll(async () => {
        await Reusable.CloseAllPagesBrowserContext(sharedBrowserContext)
        if (isLambdaTest) {
            await sharedBrowserContext.browser().close();
        }
    })

    //persona functional testing
    test("Check hideprofileCard for persona", async ({ }, testInfo) => {
        const persona = new Persona(sharedPage);

        console.log(testInfo.title);
        await persona.SetHideProfileCardValue("false");
        await persona.ClickOutsideAfterChange();
        await persona.HoverOnPersonaAvatar();

    })

    //persona css validation
    test("Check_persona_complete_css", async ({ }, testInfo) => {
        const persona = new Persona(sharedPage);

        await persona.WaitForPersonaRoot(15);
        const rootPersona = sharedPage.frameLocator('iframe[title="storybook-preview-iframe"]').locator(persona.personaRoot);

        await persona.CompleteStyeSheetValidation(rootPersona, "personacss.json", testInfo);
    })

    test("Check_persona_css_values", async ({ }, testInfo) => {
        const persona = new Persona(sharedPage);

        await persona.WaitForPersonaRoot(15);
        const rootPersona = sharedPage.frameLocator('iframe[title="storybook-preview-iframe"]').locator(persona.personaRoot);

        await persona.CSSValuesValidation("personacss.json", rootPersona, testInfo);
    })

    //persona image validation

    test("Persona_root_image_validation_First", async ({ }, testInfo) => {
        const persona = new Persona(sharedPage);

        await persona.WaitForPersonaRoot(15);

        await persona.ToHaveScreenshot(persona.personaRoot, "PersonaRoot.png", testInfo, {
            frameName: 'iframe[title="storybook-preview-iframe"]'
        });
    })

    test("Persona_root_image_validation_Second", async ({ }, testInfo) => {
        const persona = new Persona(sharedPage);
        const Reusable = new ReusableFunctions();

        await persona.WaitForPersonaRoot(15);

        console.log(Reusable.GetProjectFolderPath());
        console.log(path.relative(Reusable.GetProjectFolderPath(), __dirname));
        console.log(path.relative(Reusable.GetProjectFolderPath() + "tests/", __dirname));


        await persona.ToHaveScreenshot(persona.personaRoot, "PersonaRoot.png", testInfo, {
            frameName: 'iframe[title="storybook-preview-iframe"]'
        });
    })

})
