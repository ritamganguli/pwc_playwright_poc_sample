import { Locator, Page } from "playwright";
import { TestInfo, expect } from "@playwright/test";
import ENV from "../Utils/env";
import Report from "../../src/ReusableFunctions/Report";
import * as fs from "fs";
import { promises } from "dns";

import { ICustomWorld } from "../tests/support/custom-world";

import config from "../../config/testConfig.json";
import Reusable from "../../ReusableFunctions/Reusable";
import ReusableFunctions from "./ReusableFunctions";
import { json } from "stream/consumers";
export default class Wrapper {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  public report = new Report();
  public async findLocator(
    value: string,
    options?: {
      frame?: string;
      tabId?: number;
      timeOut?: number;
      has?: Locator;
      hasText?: string;
    }
  ): Promise<Locator> {
    if (options?.tabId) {
      this.page = this.page.context().pages()[options.tabId];
    }
    if (options?.frame) {
      return this.page.frameLocator(options.frame).locator(value);
    }
    return this.page.locator(value, {
      has: options?.has,
      hasText: options?.hasText,
    });
  }
  public async getUrl() {
    return this.page.url();
  }

  public async TypeText(
    value: string,
    fillValue: string,
    options?: {
      frameName?: string;
    }
  ) {
    //const report =new Report();
    if (options?.frameName) {
      try {
        await (
          await this.findLocator(value, { frame: options?.frameName })
        ).fill(fillValue, { timeout: parseInt(config.Element_Timeout) });
        await this.report.LogReport(
          `Text entered as ${fillValue} on ${value}`,
          "pass",
          (await this.page.screenshot({ timeout: 15000 })).toString("base64")
        );
      } catch (error) {
        await this.report.LogReport("Error in TypeTxt" + error, "fail", "");
      }
    } else {
      try {
        await (await this.findLocator(value)).fill(fillValue);
        await this.report.LogReport(
          `Text entered as ${fillValue}`,
          "pass",
          (await this.page.screenshot()).toString("base64")
        );
      } catch (error) {
        await this.report.LogReport("Error in TypeTxt" + error, "fail", "");
      }
    }
  }

  public async TypeTextLocator(locator: Locator, fillValue: string) {
    try {
      await locator.fill(fillValue, { timeout: 30000 });
      await this.report.LogReport(
        `Text entered as ${fillValue} on` + locator,
        "pass",
        (await this.page.screenshot({ timeout: 15000 })).toString("base64")
      );
    } catch (error) {
      await this.report.LogReport("Error in TypeTxt" + error, "fail", "");
    }
  }

  public async Click(
    value: string,
    options?: {
      frameName?: string;
    }
  ) {
    if (options?.frameName) {
      try {
        //this.page.frameLocator(options.frame).locator(value);
        await (
          await this.findLocator(value, { frame: options?.frameName })
        ).click({ timeout: 30000 });
        await this.report.LogReport(
          `Clicked on  ${value}`,
          "info",
          (await this.page.screenshot()).toString("base64")
        );
      } catch (error) {
        await this.report.LogReport("Error in click" + error, "fail", "");
      }
    } else {
      try {
        await (await this.findLocator(value)).click({ delay: 1000 });
        await this.report.LogReport(
          `Clicked on  ${value}`,
          "info",
          (await this.page.screenshot()).toString("base64")
        );
      } catch (error) {
        await this.report.LogReport("Error in click" + error, "fail", "");
      }
    }
  }

  public async ClickLocator(locator: Locator) {
    try {
      //await locator.waitFor();
      //console.log("click method start " + locator);
      await locator.click({ timeout: parseInt(config.Element_Timeout) });
      //console.log("click method end  " + locator);
      await this.report.LogReport(
        `Clicked on  ` + locator,
        "pass",
        (await this.page.screenshot()).toString("base64")
      );
    } catch (error) {
      await this.report.LogReport(
        "Error in click" + error,
        "fail",
        (await this.page.screenshot()).toString("base64")
      );
    }
  }

  public async CheckLocator(locator: Locator) {
    try {
      await locator.check({ timeout: parseInt(config.Element_Timeout) });
      await this.report.LogReport(`check on  ` + locator, "info", "");
      await new Promise((resolve) => setTimeout(resolve, 5000));
    } catch (error) {
      await this.report.LogReport("Error in check" + error, "fail", "");
    }
  }

  public async Clean(
    value: string,
    options?: {
      frameName?: string;
    }
  ) {
    if (options?.frameName) {
      try {
        //this.page.frameLocator(options.frame).locator(value);
        await (
          await this.findLocator(value, { frame: options?.frameName })
        ).clear({ timeout: 30000 });
        await this.report.LogReport(
          `clear on  ${value}`,
          "info",
          (await this.page.screenshot()).toString("base64")
        );
      } catch (error) {
        await this.report.LogReport("Error in clear" + error, "fail", "");
      }
    } else {
      try {
        await (await this.findLocator(value)).clear({ timeout: 1000 });
        await this.report.LogReport(
          `clear on  ${value}`,
          "info",
          (await this.page.screenshot()).toString("base64")
        );
      } catch (error) {
        await this.report.LogReport("Error in clear" + error, "fail", "");
      }
    }
  }
  private ToBase64(path: string): string {
    try {
      var result = fs.readFileSync(path, "base64");
      return result;
    } catch (error) {
      return "";
    }
  }
  // public async ToHaveScreenshot(
  //   value: string,
  //   imageName: string,
  //   options?: {
  //     frameName?: string;
  //   }
  // ) {
  //   if (options?.frameName) {
  //     try {
  //       //this.page.frameLocator(options.frame).locator(value);
  //       await expect(
  //         await this.findLocator(value, { frame: options?.frameName })
  //       ).toHaveScreenshot(imageName, {
  //         timeout: parseInt(config.Element_Timeout),
  //       });
  //       await this.report.LogReport(
  //         `Actual and Expected image matched`,
  //         "pass",
  //         (await this.page.screenshot()).toString("base64")
  //       );
  //       //img.src = 'test/';
  //     } catch (error) {
  //       await this.report.LogReport(
  //         "Actual and Expected image NOT matched - Actual IMAGE",
  //         "fail",
  //         (
  //           await this.ToBase64(
  //             Report.PATHOUTDIR + `/${imageName.replace(".png", "")}-actual.png`
  //           )
  //         ).toString()
  //       );
  //       await this.report.LogReport(
  //         "Actual and Expected image NOT matched - Exp IMAGE",
  //         "fail",
  //         (
  //           await this.ToBase64(
  //             Report.PATHOUTDIR +
  //               `/${imageName.replace(".png", "")}-expected.png`
  //           )
  //         ).toString()
  //       );
  //       await this.report.LogReport(
  //         "Actual and Expected image NOT matched - IMAGE Diff ",
  //         "fail",
  //         (
  //           await this.ToBase64(
  //             Report.PATHOUTDIR + `/${imageName.replace(".png", "")}-diff.png`
  //           )
  //         ).toString()
  //       );
  //     }
  //   } else {
  //     try {
  //       await expect(await this.findLocator(value)).toHaveScreenshot(
  //         imageName,
  //         { timeout: parseInt(config.Element_Timeout) }
  //       );
  //       await this.report.LogReport(
  //         `Actual and Expected image matched`,
  //         "pass",
  //         (await this.page.screenshot()).toString("base64")
  //       );
  //     } catch (error) {
  //       await this.report.LogReport(
  //         `Actual and Expected image Not matched`,
  //         "fail",
  //         (await this.page.screenshot()).toString("base64")
  //       );
  //     }
  //   }
  // }

  // public async ToHaveScreenshotLocator(locator: Locator, imageName: string) {
  //   try {
  //     await expect(locator).toHaveScreenshot(imageName, {
  //       timeout: parseInt(config.Element_Timeout),
  //     });
  //     await this.report.LogReport(
  //       `Actual and Expected image matched`,
  //       "pass",
  //       (await this.page.screenshot()).toString("base64")
  //     );
  //     //img.src = 'test/';
  //   } catch (error) {
  //     await this.report.LogReport(
  //       "Actual and Expected image NOT matched - Actual IMAGE",
  //       "fail",
  //       (
  //         await this.ToBase64(
  //           Report.PATHOUTDIR + `/${imageName.replace(".png", "")}-actual.png`
  //         )
  //       ).toString()
  //     );
  //     await this.report.LogReport(
  //       "Actual and Expected image NOT matched - Exp IMAGE",
  //       "fail",
  //       (
  //         await this.ToBase64(
  //           Report.PATHOUTDIR + `/${imageName.replace(".png", "")}-expected.png`
  //         )
  //       ).toString()
  //     );
  //     await this.report.LogReport(
  //       "Actual and Expected image NOT matched - IMAGE Diff ",
  //       "fail",
  //       (
  //         await this.ToBase64(
  //           Report.PATHOUTDIR + `/${imageName.replace(".png", "")}-diff.png`
  //         )
  //       ).toString()
  //     );
  //   }
  // }

  public async GoTo(url: string) {
    try {
      await this.page.goto(url);
      
      await this.page.waitForLoadState('load')
      await this.page.waitForLoadState('domcontentloaded')
      await this.page.waitForLoadState('networkidle')
      
      await this.report.LogReport(
        `Open Page  ${url}`,
        "Pass",
        (
          await this.page.screenshot({ animations: "disabled" })
        ).toString("base64")
      );
    } catch (error) {
      await this.report.LogReport(
        `Error on Opening Page  ${url}`,
        "fail",
        (
          await this.page.screenshot({ animations: "disabled" })
        ).toString("base64")
      );
    }
  }
  public async findFrame(frameName: string) {
    const myFrame = this.page.frame(frameName);
    return myFrame;
  }

  public async MaximizeWindow(screenWidth: number, screenHeight: number) {
    try {
      if (screenWidth == 0 && screenHeight == 0) {
        await this.page.viewportSize();
      } else {
        await this.page.setViewportSize({
          width: screenWidth,
          height: screenHeight,
        });
        await this.report.LogReport(
          `Window size ${screenWidth}X${screenHeight}`,
          "Pass",
          ""
        );
      }
    } catch (error) {
      await this.report.LogReport(`Error in MaximizeWindow`, "fail", "");
    }
  }

  public async getScreenCapture(): Promise<string> {
    let buffer = Buffer.alloc(10);
    try {
      buffer = await this.page.screenshot();
      console.log(buffer.toString("base64"));
    } catch (error) { }
    return buffer.toString("base64");
  }
  public async GetRoleBy(value: string) { }

  public async ToHaveScreenshot(
    value: string,
    imageName: string,
    testInfo: TestInfo,
    options?: {
      frameName?: string;
      maskElements?: Locator[];
    },
  ) {

    const testFolderLastIndex = testInfo.titlePath[0].lastIndexOf('\\');

    //testFolderPath represent the relative folder structure of the test from the tests/ folder
    const testFolderPath = testInfo.titlePath[0].substring(0, testFolderLastIndex);
    await this.page.waitForTimeout(3000);

    //Checking if setBaseline flag is true or false
    if (config.setBaseline == true) {

      //Setting the baseline image in blob storage if the setBaseline flag is true
      try{
        if (options?.frameName) {
          await this.SetBaselineImageInBlob(imageName, testInfo, testFolderPath, value, {
            frameName: options?.frameName
          });
        }
        else {
          await this.SetBaselineImageInBlob(imageName, testInfo, testFolderPath, value);
        }
      }
      catch(e){
        if(e.message.includes("Updated baseline image for")){
          if(config.throwErrorOnSettingBaseline){
            throw e
          }
          else{
            console.log(e.message);
            return
          }
        }
        else{
          throw e
        }
      }
    }

    const Reusable = new ReusableFunctions();
    const imageFolderNameLen = testInfo.titlePath[0].split("\\").length;
    const imageFolderName =
      testInfo.titlePath[0].split("\\")[imageFolderNameLen - 1];
    const baselineImageName = `${imageName.split(".")[0]}-Design-System-win32.png`;

    const expectedBaselineImgPath = `${testFolderPath}/${imageFolderName}-snapshots/${baselineImageName}`;

    //When setBaseline is false, checking if the baseline image with the name "LATEST-" + baselineImageName is present in blob storage
    if (!await Reusable.IfBlobPresent("LATEST-" + baselineImageName, `${testFolderPath}/${testInfo.title}/Baseline`)) {
      await this.report.LogReport(
        'No baseline image found in blob storage',
        "fail",
        (await this.page.screenshot()).toString("base64")
      );
      //Throwing error if no baseline image is found in blob storage
      throw new Error("No baseline image found in blob storage")
    }
    else {
      //Downloading the baseline image if baseline image is found in blob storage
      await this.DownloadBaselineImageToLocal(imageName, testInfo, testFolderPath);
    }

    //Comparison with downloaded baseline image 
    if (options?.frameName) {
      try {
        await expect(
          await this.findLocator(value, { frame: options?.frameName })
        ).toHaveScreenshot(imageName, {
          timeout: parseInt(config.Element_Timeout),
          mask: options?.maskElements
        });

        await this.report.LogReport(
          `Actual and Expected image matched. Baseline Image:`,
          "pass",
          (
            await this.ToBase64(testFolderPath + `/${imageFolderName}-snapshots/${baselineImageName}`)
          ).toString()
        );
      }
      catch (error) {
        await this.report.LogReport(
          "Actual and Expected image NOT matched - Actual IMAGE",
          "fail",
          (
            await this.ToBase64(
              Report.PATHOUTDIR + `/${imageName.replace(".png", "")}-actual.png`
            )
          ).toString()
        );
        await this.report.LogReport(
          "Actual and Expected image NOT matched - Exp IMAGE",
          "fail",
          (
            await this.ToBase64(
              Report.PATHOUTDIR +
              `/${imageName.replace(".png", "")}-expected.png`
            )
          ).toString()
        );
        await this.report.LogReport(
          "Actual and Expected image NOT matched - IMAGE Diff ",
          "fail",
          (
            await this.ToBase64(
              Report.PATHOUTDIR + `/${imageName.replace(".png", "")}-diff.png`
            )
          ).toString()
        );

      }

    } else {
      try {
        await expect(await this.findLocator(value)).toHaveScreenshot(
          imageName,
          { timeout: parseInt(config.Element_Timeout), mask: options?.maskElements }
        );

        await this.report.LogReport(
          `Actual and Expected image matched. Baseline Image:`,
          "pass",
          (
            await this.ToBase64(testFolderPath + `/${imageFolderName}-snapshots/${baselineImageName}`)
          ).toString()
        );
      }
      catch (error) {
        await this.report.LogReport(
          "Actual and Expected image NOT matched - Actual IMAGE",
          "fail",
          (
            await this.ToBase64(
              Report.PATHOUTDIR + `/${imageName.replace(".png", "")}-actual.png`
            )
          ).toString()
        );
        await this.report.LogReport(
          "Actual and Expected image NOT matched - Exp IMAGE",
          "fail",
          (
            await this.ToBase64(
              Report.PATHOUTDIR +
              `/${imageName.replace(".png", "")}-expected.png`
            )
          ).toString()
        );
        await this.report.LogReport(
          "Actual and Expected image NOT matched - IMAGE Diff ",
          "fail",
          (
            await this.ToBase64(
              Report.PATHOUTDIR + `/${imageName.replace(".png", "")}-diff.png`
            )
          ).toString()
        );
      }
    }

    //Deleting the snapshots folder generated in local for comparison
    if (fs.existsSync(`tests/${testFolderPath}/${imageFolderName}-snapshots`)) {
      fs.rmSync(`tests/${testFolderPath}/${imageFolderName}-snapshots`, { recursive: true, force: true });
    }
  }

  public async ToHaveScreenshotLocator(locator: Locator, imageName: string) {
    try {
      await expect(locator).toHaveScreenshot(imageName, {
        timeout: parseInt(config.Element_Timeout),
      });
      await this.report.LogReport(
        `Actual and Expected image matched`,
        "pass",
        (await this.page.screenshot()).toString("base64")
      );
      //img.src = 'test/';
    } catch (error) {
      await this.report.LogReport(
        "Actual and Expected image NOT matched - Actual IMAGE",
        "fail",
        (
          await this.ToBase64(
            Report.PATHOUTDIR + `/${imageName.replace(".png", "")}-actual.png`
          )
        ).toString()
      );
      await this.report.LogReport(
        "Actual and Expected image NOT matched - Exp IMAGE",
        "fail",
        (
          await this.ToBase64(
            Report.PATHOUTDIR + `/${imageName.replace(".png", "")}-expected.png`
          )
        ).toString()
      );
      await this.report.LogReport(
        "Actual and Expected image NOT matched - IMAGE Diff ",
        "fail",
        (
          await this.ToBase64(
            Report.PATHOUTDIR + `/${imageName.replace(".png", "")}-diff.png`
          )
        ).toString()
      );
    }
  }

  public async HoverOver(value: string,
    options?: {
      frameName?: string;
    }) {
    if (options?.frameName) {
      try {
        await (
          await this.findLocator(value, { frame: options?.frameName })
        ).hover({
          timeout: 5000
        });
        await this.report.LogReport(
          `Hovered on ${value}`,
          "pass",
          (await this.page.screenshot({ timeout: 15000 })).toString("base64")
        );
      } catch (error) {
        await this.report.LogReport("Error in Hover" + error, "fail", "");
      }
    } else {
      try {
        await (await this.findLocator(value)).hover({
          timeout: 5000
        });
        await this.report.LogReport(
          `Hovered on ${value}`,
          "pass",
          (await this.page.screenshot()).toString("base64")
        );
      } catch (error) {
        await this.report.LogReport("Error in Hover" + error, "fail", "");
      }
    }
  }

  /*
    * Basic scroll into view using Locator object 
    * Accepts only css or xpath based locators
    */
  public async ScrollIntoView(locator: string,
    options?: {
      frameName: string
    }) {
    if (options?.frameName) {
      try {
        await (
          await this.findLocator(locator, { frame: options?.frameName })
        ).scrollIntoViewIfNeeded({
          timeout: 5000
        });
        await this.report.LogReport(
          `Scrolled to ${locator}`,
          "pass",
          (await this.page.screenshot({ timeout: 15000 })).toString("base64")
        );
      } catch (error) {
        await this.report.LogReport("Error while scrolling" + error, "fail", "");
      }
    } else {
      try {
        await (await this.findLocator(locator)).scrollIntoViewIfNeeded({
          timeout: 5000
        });
        await this.report.LogReport(
          `Scrolled to ${locator}`,
          "pass",
          (await this.page.screenshot()).toString("base64")
        );
      } catch (error) {
        await this.report.LogReport("Error while scrolling" + error, "fail", "");
      }
    }
  }

  /*
   * Explicit Visibility  wait
   * Accepts only css or xpath based locators
   */
  public WaitForElementToBeVisible = async (value: string, options?: { frame: string }) => {
    if (options?.frame)
      await expect((await this.findLocator(value, { frame: options?.frame })
      ), { message: `Element ${value} is not visible` }).toBeVisible({ timeout: 30000 });
    else
      await expect((await this.findLocator(value)
      ), { message: `Element ${value} is not visible` }).toBeVisible({ timeout: 30000 });
  }

  public WaitForElementToBePresent = async (value: string, options?: { frame: string }) => {
    if (options?.frame)
      await this.page.frameLocator(options.frame).locator(value).waitFor({state:"attached",timeout:30000})
    else
    await this.page.locator(value).waitFor({state:"attached",timeout:30000})

  }

  /*
  * Make element invisible in DOM based on CSS locator with index support
  * If single node found , need to use 0 as index
  */
  public MakeElementInvisibleInDom = async (selector: string, index: number, options?: { frame: string }) => {
    if (options?.frame) {
      const frame = this.page.frame(options?.frame);
      await frame.evaluate(({ selector, index }) => {
        document.querySelectorAll(selector).item(index).setAttribute("style", "display:none !important");
      }, { selector, index });
    } else {
      await this.page.evaluate(({ selector, index }) => {
        document.querySelectorAll(selector).item(index).setAttribute("style", "display:none !important");
      }, { selector, index });
    }
  }

  public WaitForElementToBeVisiblePolling = async (value: string, retries: number, options?: { frame: string }) => {
    let ifElementFound = false;
    for (let i = 0; i <= retries - 1; i++) {
      try {
        const element = await this.findLocator(value, { frame: options?.frame });
        const elementCount = await element.count();
        if (elementCount > 0) {
          if (element.isVisible({ timeout: 1000 })) {
            ifElementFound = true;
            return
          }
          else {
            continue
          }
        }
        else {
          await this.page.waitForTimeout(1000);
          continue
        }
      }
      catch (e) {
        console.log(`Error ocurred:${e}`);
      }
    }

    if (!ifElementFound) {
      throw new Error(`Element not found`);
    }
  }

  public CreateLocalBaselineImage = async (imageName: string, value: string, options?: { frameName: string }) => {
    if (options?.frameName) {
      await expect(
        await this.findLocator(value, { frame: options?.frameName })
      ).toHaveScreenshot(imageName)
    }
    else {
      await expect(
        await this.findLocator(value)
      ).toHaveScreenshot(imageName)
    }
  }

  public UploadLocalBaselineImageToBlob = async (imageName: string, testInfo: TestInfo, testFolder: string) => {
    const Reusable = new ReusableFunctions();

    const imageFolderNameLen = testInfo.titlePath[0].split("\\").length;
    const imageFolderName =
      testInfo.titlePath[0].split("\\")[imageFolderNameLen - 1];
    const baselineImageName = `${imageName.split(".")[0]}-Design-System-win32.png`;

    if (await Reusable.IfBlobPresent(`LATEST-${baselineImageName}`, `${testFolder}/${testInfo.title}/Baseline`)) {
      const date = new Date();
      await Reusable.RenameBlob(`${testFolder}/${testInfo.title}/Baseline`, `LATEST-${baselineImageName}`, `${baselineImageName} changed on ${date.getDate()}-${date.getMonth()}-${date.getFullYear()} on ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
    }

    await Reusable.UploadFileToAzureBlobStorage("tests/" + testFolder + `/${imageFolderName}-snapshots/${baselineImageName}`, `${testFolder}/${testInfo.title}/Baseline`, `LATEST-${baselineImageName}`);
  }

  public DownloadBaselineImageToLocal = async (imageName: string, testInfo: TestInfo, testFolder: string) => {
    const Reusable = new ReusableFunctions();
    const imageFolderNameLen = testInfo.titlePath[0].split("\\").length;
    const imageFolderName =
      testInfo.titlePath[0].split("\\")[imageFolderNameLen - 1];
    const baselineImageName = `${imageName.split(".")[0]}-Design-System-win32.png`;

    if (!fs.existsSync("tests/" + testFolder + `/${imageFolderName}-snapshots`)) {
      fs.mkdirSync("tests/" + testFolder + `/${imageFolderName}-snapshots`);
    }
    await Reusable.DownloadBlobfile(`${testFolder}/${testInfo.title}/Baseline`, `LATEST-${baselineImageName}`, "tests/" + testFolder + `/${imageFolderName}-snapshots`, baselineImageName);
  }

  public SetBaselineImageInBlob = async (imageName: string, testInfo: TestInfo, testFolder: string, value: string, options?: { frameName: string }) => {
    if (options?.frameName) {
      await this.CreateLocalBaselineImage(imageName, value, { frameName: options.frameName })
    }
    else {
      await this.CreateLocalBaselineImage(imageName, value)
    }
    await this.UploadLocalBaselineImageToBlob(imageName, testInfo, testFolder);

    const imageFolderNameLen = testInfo.titlePath[0].split("\\").length;
    const imageFolderName =
      testInfo.titlePath[0].split("\\")[imageFolderNameLen - 1];
    const baselineImageName = `${imageName.split(".")[0]}-Design-System-win32.png`;

    await this.report.LogReport(
      `Updated baseline image for ${imageName}, failing image validation. Baseline Image:`,
      "fail",
      (
        await this.ToBase64(`tests/${testFolder}/${imageFolderName}-snapshots/${baselineImageName}`)
      ).toString());

    if (fs.existsSync(`tests/${testFolder}/${imageFolderName}-snapshots`)) {
      fs.rmSync(`tests/${testFolder}/${imageFolderName}-snapshots`, { recursive: true, force: true });
    }
    throw new Error(`Updated baseline image for ${imageName}, failing image validation`);
  }

  public async CompleteStyeSheetValidation(
    locator: Locator,
    cssFilename: string,
    testInfo: TestInfo
  ) {


    await this.page.waitForTimeout(3000);

    //Fetching the current stylesheet as present in application
    const cssValues = await locator.evaluate((el) => {
      return window.getComputedStyle(el);
    });

    const Reusable = new ReusableFunctions();
    const testFolderLastIndex = testInfo.titlePath[0].lastIndexOf('\\');

    //testFolderPath represent the folder structure of the testcase in tests/ folder
    const testFolderPath = testInfo.titlePath[0].substring(0, testFolderLastIndex);

    //When the setBaseline is set to true, the baseline is set/updated in blob storage
    if (config.setBaseline == true) {
      //creating the local baseline stylesheet in cssDataJsonBaseLine/ to be uploaded to the blob storage
      await this.CreateLocalBaselineStyleSheet(cssValues, cssFilename);

      //uploading the local baseline stylesheet from cssDataJsonBaseLine/ to the blob storage
      await this.UploadLocalBaselineCssToBlob(cssFilename, `${testFolderPath}/${testInfo.title}/Baseline`)

      //Deleting cssDataJson/ and cssDataJsonBaseLine/ from local
      if (fs.existsSync(`cssDataJson`)) {
        fs.rmSync(`cssDataJson`, { recursive: true, force: true });
      }
      if (fs.existsSync("cssDataJsonBaseLine")) {
        fs.rmSync(`cssDataJsonBaseLine`, { recursive: true, force: true });

      }
      await this.report.LogReport(
        'Setting baseline stylesheet in blob storage. Failing the test',
        "fail",
        (await this.page.screenshot()).toString("base64")
      );

      //Failing the test when the baseline is set
      throw new Error("Setting baseline stylesheet in blob storage. Failing the test")
    }


    //When comparing with baseline in blob, checking the presence of baseline with title ("LATEST-" + cssFilename in blob storage
    if (!await Reusable.IfBlobPresent("LATEST-" + cssFilename, `${testFolderPath}/${testInfo.title}/Baseline`)) {
      await this.report.LogReport(
        'No baseline stylesheet found in blob storage. Failing the test',
        "fail",
        (await this.page.screenshot()).toString("base64")
      );

      //Throwing error when no baseline stylesheet is found in blob storage
      throw new Error("No baseline stylesheet found in blob storage. Failing the test")
    }

    //Creating cssDataJsonBaseLine/ and cssDataJson/ for comparison in local
    if (!fs.existsSync("cssDataJsonBaseLine")) {
      fs.mkdirSync("cssDataJsonBaseLine")
    }
    if (!fs.existsSync("cssDataJson")) {
      fs.mkdirSync("cssDataJson")
    }

    //Downloading baseline stylesheet to cssDataJsonBaseLine/ for comparison
    await Reusable.DownloadBlobfile(`${testFolderPath}/${testInfo.title}/Baseline`, "LATEST-" + cssFilename, "cssDataJsonBaseLine", cssFilename);


    //Writing the current stylesheet from application to cssDataJson/${cssFilename} in local for comparison
    fs.writeFileSync(`cssDataJson/${cssFilename}`, JSON.stringify(cssValues));

    //complete css compare
    const diff = await Reusable.compareJson(
      "cssDataJsonBaseLine/" + cssFilename,
      "cssDataJson/" + cssFilename
    );

    //Deleting cssDataJson/ and cssDataJsonBaseLine/ from local after comparison
    if (fs.existsSync(`cssDataJson`)) {
      fs.rmSync(`cssDataJson`, { recursive: true, force: true });
    }
    if (fs.existsSync("cssDataJsonBaseLine")) {
      fs.rmSync(`cssDataJsonBaseLine`, { recursive: true, force: true });

    }

    //Reporting based on if any differences are found or not
    if (diff != '""') {
      this.report.LogReport(`Mismatch in css. Difference:${diff}`, "fail", "");
    }
    else {
      this.report.LogReport(`CSS matched`, "pass", "");
    }
  }

  public async CSSValuesValidation(
    fileName: string,
    locator?: Locator,
    testInfo?: TestInfo
  ) {

    //Fetching the current complete stylesheet of the element from the application.
    //This will be used for comparison of expected attributes
    const cssValues = await locator.evaluate((el) => {
      return window.getComputedStyle(el);
    });

    //Creating the baseline folder
    if (!fs.existsSync("cssDataJsonBaseLine")) {
      fs.mkdirSync("cssDataJsonBaseLine")
    }

    //Writing the current complete stylesheet of the element to the baseline file
    fs.writeFileSync(`cssDataJsonBaseLine/${fileName}`, JSON.stringify(cssValues));

    //Checking for presence of file containing the attributes to be checked and their expected values
    if (!fs.existsSync(`mappingCss/${fileName}`)) {
      await this.report.LogReport(
        'No expected testdata stylesheet found. Failing the test',
        "fail",
        (await this.page.screenshot()).toString("base64")
      );
      //Failing the test if no suck file is found under "mappingCss/"
      throw new Error("No expected testdata stylesheet found. Failing the test")
    }

    //Reading the key-value pairs from the testdata file and baseline file for comparison
    const cssTestdata = JSON.parse(fs.readFileSync(`mappingCss/${fileName}`, "utf-8"));
    const expectedCss = JSON.parse(fs.readFileSync(`cssDataJsonBaseLine/${fileName}`, "utf-8"))

    //Deleting the cssDataJsonBaseLine/ and cssDataJson/ folders after fetching the data
    if (fs.existsSync("cssDataJsonBaseLine")) {
      fs.rmSync(`cssDataJsonBaseLine`, { recursive: true, force: true });
    }
    if (fs.existsSync(`cssDataJson`)) {
      fs.rmSync(`cssDataJson`, { recursive: true, force: true });
    }
    let ifDifferent = false;

    //Iterating through the key value pairs of the testdata file and checking
    //the values with baseline file containing current stylesheet of the element
    for (let key in cssTestdata) {

      if (expectedCss[key] === cssTestdata[key]) {
        await this.report.LogReport(
          `Matched css value. Attribute: <b>${key}</b> Value: <b>${expectedCss[key]}</b>`,
          "pass",
          (await this.page.screenshot()).toString("base64")
        );
      }
      else {
        await this.report.LogReport(
          `Mismatch in css value. Attribute: <b>${key}</b> Expected value: <b>${expectedCss[key]}</b> Actual value: <b>${cssTestdata[key]}</b>`,
          "info",
          (await this.page.screenshot()).toString("base64")
        );
        ifDifferent = true;
      }
    }

    //Failing the test if there is any difference between expected and actual values of any attribute
    if (ifDifferent === true) {
      await this.report.LogReport(
        'Some css attribute values did not match. Failing the test',
        "fail",
        (await this.page.screenshot()).toString("base64")
      );
    }
  }

  public CreateLocalBaselineStyleSheet = async (cssValues: CSSStyleDeclaration, fileName: string) => {

    const Reusable = new ReusableFunctions();
    if (!fs.existsSync("cssDataJsonBaseLine")) {
      fs.mkdirSync("cssDataJsonBaseLine")
    }
    fs.writeFileSync(`cssDataJsonBaseLine/${fileName}`, JSON.stringify(cssValues));
  }

  public UploadLocalBaselineCssToBlob = async (filename: string, blobPath: string) => {
    const Reusable = new ReusableFunctions();
    if (await Reusable.IfBlobPresent("LATEST-" + filename, blobPath)) {
      const date = new Date();
      await Reusable.RenameBlob(blobPath, "LATEST-" + filename, filename + ` changed on ${date.getDate()}-${date.getMonth()}-${date.getFullYear()} on ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
    }
    await Reusable.UploadFileToAzureBlobStorage("cssDataJsonBaseLine/" + filename, blobPath, "LATEST-" + filename);
  }

  public GetAllMatchingElementsInFrame=async(frameLocator:string,locator:string)=>{
    return await this.page.frameLocator(frameLocator).locator(locator).all()
  }

  public GetMatchingElementInFrame=async(frameLocator:string,locator:string)=>{
    return this.page.frameLocator(frameLocator).locator(locator).first()
  }

  public SelectInDropdownInFrame=async(frameLocator:string,locator:string,text:string)=>{
    this.page.frameLocator(frameLocator).locator(locator).selectOption({value:text})
  }
}
