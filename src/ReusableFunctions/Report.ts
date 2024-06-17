import { TestInfo, expect, Page } from "@playwright/test";
import { error } from "console";
import { promises } from "dns";
import * as fs from "fs";
import Wrapper from "./Wrapper";
import config from "../../config/testConfig.json";

import {
  BlockBlobClient,
  BlobServiceClient,
  ContainerClient,
} from "@azure/storage-blob";
import type {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
  TestCase,
  TestResult,
} from "@playwright/test/reporter";
import ReusableFunctions from "./ReusableFunctions";
import {
  ITestCaseHookParameter,
  TestCaseHookDefinition,
} from "@cucumber/cucumber";
import TestRunHookDefinition from "@cucumber/cucumber/lib/models/test_run_hook_definition";
type newData = {
  description: string;
  status: string;
  time: string;
  imagebase64: string;
};
type reportStringObj = {
  testcasename: string;
  starttime: string;
  endtime: string;
  status: string | undefined;
  steps: newData[];
};

export default class Report {
  path: string = "";
  name: string = "";
  image: string = "";
  htmlReportTime: number;

  public static PATHOUTDIR: string;
  public static reportString: reportStringObj;
  public static TESTPLANID: string;
  public static TESTSUITEID: string;
  public static TESTCASEID: string;
  public async startReport(
    testInfo: TestInfo,
    scenario: ITestCaseHookParameter
  ) {
    // Report.reportString = {
    //   testcasename: "",
    //   starttime: "",
    //   endtime: "",
    //   status: "",
    //   steps: [],
    // };
    interface ReportString {
      testcasename: string;
      starttime: string;
      endtime: string;
      status: string;
      steps: string[];
    }
    Report.reportString = {} as reportStringObj;

    // let reportString: ReportString = {
    //   testcasename: "",
    //   starttime: "",
    //   endtime: "",
    //   status: "",
    //   steps: [],
    // };
    Report.reportString.steps = [];
    //TestInfo for Playwright test
    //Screnario for cucumber test
    if (testInfo != null) {
      Report.reportString.testcasename = testInfo.title;
      Report.PATHOUTDIR = testInfo.outputDir;
      Report.reportString.starttime = new Date().toUTCString();
      console.log(`Started ${testInfo.title}`);
    } else {
      Report.reportString.testcasename = scenario.pickle.name;
      Report.reportString.starttime = new Date().toUTCString();
      console.log(`Started ${scenario.pickle.name}`);
    }
    //store out dir in static variable
    //Report.PATHOUTDIR = testInfo.outputDir;
    //Report.reportString.starttime = new Date().toUTCString();
    //console.log(`Started ${testInfo.title}`);

    var newData2 = JSON.stringify(Report.reportString);
    try {
      fs.writeFileSync("results/testreport.json", newData2);
    } catch (error) {
      console.error("Error in LogReport:", error);
    }

    // Create upload image to blob
    // try {
    //   // get the file name or names from a baseline image folder
    //   var files = fs.readdirSync(testInfo.snapshotDir);
    //   const blobServiceClient = BlobServiceClient.fromConnectionString(
    //     //connection string
    //   );
    //   const containerClient: ContainerClient =
    //     blobServiceClient.getContainerClient("img");
    //   const blockBlobClient: BlockBlobClient =
    //     containerClient.getBlockBlobClient(files[0]);
    //   // upload image only if the existing img is diffrent than blob image
    //   var uploadImgToBlock: string = testInfo.snapshotDir + "/" + files[0];
    //   const reusableFunction = new ReusableFunctions();
    //   await reusableFunction.downloadBlobToFile(
    //     containerClient,
    //     files[0],
    //     "C:\\Users\\amondal064\\Documents\\vscode\\backup\\playwright-ts" +
    //       "\\temp.png"
    //   );
    //   var a = await blockBlobClient.uploadFile(uploadImgToBlock);
    // } catch (e) {
    //   console.log(e);
    // }
  }
  public async endReport(testInfo: TestInfo, scenario: ITestCaseHookParameter) {
    const reusableFunction = new ReusableFunctions();
    var reportString = `{
            "testcasename": "",
            "starttime": "",
            "endtime": "",
            "status": "",
            "steps": [
                
            ]
        }`;

    Report.reportString.endtime = new Date().toUTCString();
    if (testInfo != null) {
      Report.reportString.status = testInfo.status?.toString();
      console.log(`End reopt ${testInfo.title}`);
    } else {
      Report.reportString.status = scenario.result.status.toString();
    }

    var newData2 = JSON.stringify(Report.reportString);
    try {
      await fs.writeFileSync("results/testreport.json", newData2);
      this.htmlReportTime = Number(Date.now());
      const reportPath = await reusableFunction.generateHtml(this.htmlReportTime);
      if (config.unittest == "false") {
        const testFolderLastIndex = testInfo.titlePath[0].lastIndexOf('\\');
        const testFolderPath = testInfo.titlePath[0].substring(0, testFolderLastIndex);
        await reusableFunction.UploadFileToAzureBlobStorage(reportPath, `${testFolderPath}/${testInfo.title}/Runs/${config.env}`, reportPath.split("/")[1]);
      }
      if (testInfo != null) {
        await testInfo.attach("testreport.json", {
          path: "results/testreport.json",
        });

        await testInfo.attach("html", {
          path: `custom-html-report/${testInfo.title}-${this.htmlReportTime}.html`,
        });
      } else {
      }
      if (config.unittest.includes("false")) {
        await reusableFunction.updateTestPlan(
          Report.TESTPLANID,
          Report.TESTSUITEID,
          Report.TESTCASEID,
          Report.reportString.status
        );
      }
    } catch (error) {
      console.error("Error in LogReport:", error);
    }
  }
  public async LogReport(
    stepDescription: string,
    status: string,
    imgBase64: string
  ) {
    var currentdate = new Date().toUTCString();

    //this.image=await this.getScreenCapture();
    // let newData = {
    //   description: stepDescription,
    //   status: status.toUpperCase(),
    //   time: currentdate,
    //   imagebase64: imgBase64,
    // };
    // let newData: {
    //   description: string;
    //   status: string;
    //   time: string;
    //   imagebase64: string;
    // } = {
    //   description: stepDescription,
    //   status: status.toUpperCase(),
    //   time: currentdate,
    //   imagebase64: imgBase64,
    // };
    interface StepData {
      description: string;
      status: string;
      time: string;
      imagebase64: string;
    }
    let newData = {} as StepData;
    newData.description = stepDescription;
    newData.status = status.toUpperCase();
    newData.time = currentdate;
    if (config.passscreencapture == "true" && newData.status.includes("PASS")) {
      newData.imagebase64 = imgBase64;
    } else if (newData.status.includes("FAIL")) {
      newData.imagebase64 = imgBase64;
    } else {
      newData.imagebase64 = "";
    }

    try {
      let arrayo = Report.reportString.steps;
      arrayo.push(newData);
      //var arrayo = Report.reportString.steps;
      //arrayo.push(newData);

      // Adding the new data to our object
      var newData2 = JSON.stringify(Report.reportString);
    } catch (error) {
      console.error("Error in LogReport:", error);
    }
    if (status.toLowerCase() == "pass") {
    } else if (status.toLowerCase() == "fail") {
      await expect.soft("1").toBeLessThan(2);
      console.log(newData.description);
    }
  }
  /**
   * This method set the test plan , suite,test case id for updateing the status in plan
   * @param planId
   * @param suiteId
   * @param testCaseId
   */
  public async SetTestPlanDetails(
    planId: string,
    suiteId: string,
    testCaseId: string
  ) {
    Report.TESTPLANID = planId;
    Report.TESTSUITEID = suiteId;
    Report.TESTCASEID = testCaseId;
  }
}
