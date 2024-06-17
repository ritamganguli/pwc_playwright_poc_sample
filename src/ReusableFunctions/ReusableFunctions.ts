import { BrowserContext, chromium, expect, Locator, Page, TestInfo } from "@playwright/test";
import ENV from "../Utils/env";
import * as fs from "fs";
import { readFileSync } from "fs";
import * as jsonDiff from "json-diff";
import Wrapper from "./Wrapper";
import API from "./API";
import config from "../../config/testConfig.json";
import Report from "./Report";
import { join } from "path";
import { report } from "process";
import {
  BlobClient,
  BlobDownloadResponseParsed,
  ContainerClient,
} from "@azure/storage-blob";
import { assert } from "console";
const path = require('path');
const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");

export default class ReusableFunctions {
  public async createFile(
    data: CSSStyleDeclaration,
    fileName: string
  ): Promise<number> {
    const jsonString = JSON.stringify(data);
    const report = new Report();
    var r = 1;
    try {
      if (!fs.existsSync("cssDataJsonBaseLine/" + fileName)) {
        fs.writeFileSync("cssDataJsonBaseLine/" + fileName, jsonString);
        console.log("File write complete", "cssDataJsonBaseLine/" + fileName);
      } else {
        fs.writeFileSync("cssDataJson/" + fileName, jsonString);
        console.log("File write complete", "cssDataJson/" + fileName);
      }
    } catch (error) {
      console.error("Error Writting to file :", error);
      await report.LogReport("Error Writting to file :" + error, "fail", "");
      r = 0;
    }
    return r;
  }
  public async compareJson(baseline: string, runtime: string): Promise<string> {
    const report = new Report();
    try {
      const a = fs.readFileSync(baseline, { encoding: "utf8" });
      const b = fs.readFileSync(runtime, { encoding: "utf8" });
      //var diff = "";

      const diff = jsonDiff.diffString(JSON.parse(a), JSON.parse(b));
      return JSON.stringify(diff);
    } catch (err) {
      await report.LogReport(
        "Error Writting to file :" + err.message,
        "fail",
        ""
      );
      return "";
    }
  }
  /**
   *This method will update the test case status in test plan in ADO
   * @param planId
   * @param suiteId
   * @param testId
   * @param status
   */
  public async updateTestPlan(
    planId: string,
    suiteId: string,
    testId: string,
    status: string | undefined
  ) {
    //get test point
    //     var testPointId;
    //     var webserviceName = `_apis/test/Plans/${planId}/Suites/${suiteId}/points?api-version=6.1-preview.2`;
    //     const api = new API();
    //     var resp = await api.GerRe(
    //       config.TestPlanUpdate_Project_Url + webserviceName
    //     );
    //     var jsonvalue = resp.data.value;
    //     for (var i = 0; i < jsonvalue.length; i++) {
    //       console.log("test case id:" + jsonvalue[i].testCase.id);
    //       console.log("test  id:" + testId);
    //       if (jsonvalue[i].testCase.id == testId) {
    //         testPointId = jsonvalue[i].id;
    //         console.log("test point id:" + jsonvalue[i].id);
    //       }
    //     }
    //     console.log("json response:" + JSON.stringify(jsonvalue));
    // 
    //     var testStatus;
    //     // test case status update
    //     if (status?.toLowerCase().includes("pass")) {
    //       testStatus = 2;
    //     } else if (status?.toLocaleLowerCase().includes("fail")) {
    //       testStatus = 3;
    //     } else if (status?.toLocaleLowerCase().includes("timeout")) {
    //       testStatus = 5;
    //     } else {
    //       testStatus = 4;
    //     }
    //     // var body = "[{\"id\":{testpoint},\"results\":{\"outcome\":{status}}}]";
    //     var data = [
    //       {
    //         id: testPointId,
    //         results: {
    //           outcome: testStatus,
    //         },
    //       },
    //     ];
    //     var webserviceName = `_apis/testplan/Plans/${planId}/Suites/${suiteId}/TestPoint?includePointDetails=true&returnIdentityRef=true&api-version=7.0`;
    //     //body = body.replace("{testpoint}", testPointId.ToString());
    //     //body = body.replace("{status}", status);
    //     await api.PlwPatchRequest(
    //       config.TestPlanUpdate_Project_Url + webserviceName,
    //       data
    //     );
  }
  /**
   * This method will validate css property of a web element and retrun the differences as asring
   * @param locator playwright Locator.
   * @param cssFilename file name for the property json.
   */

  /**
   * This method will generate the html report.
   */
  public async generateHtml(timestamp: Number) {
    var html = `<html>

        <head>
                <style>
                       *{
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
}
body{
    font-family: Helvetica;
    -webkit-font-smoothing: antialiased;
    background: rgba( 255, 255, 255, 1);
}
h2{
    text-align: center;
    font-size: 18px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: Black;
    padding: 30px 0;
}

/* Table Styles */

.table-wrapper{
    margin: 10px 70px 70px;
    box-shadow: 0px 35px 50px rgba( 0, 0, 0, 0.2 );
}

.fl-table {
    border-radius: 5px;
    font-size: 12px;
    font-weight: normal;
    border: none;
    border-collapse: collapse;
    width: 100%;
    max-width: 100%;
    white-space: wrap;
    background-color: white;
}

.fl-table td, .fl-table th {
    text-align: center;
    padding: 8px;
    white-space: wrap
}

.fl-table td {
    border-right: 1px solid #f8f8f8;
    font-size: 12px;
}

.fl-table thead th {
    color: #ffffff;
    background: #de8110;
}


.fl-table thead th:nth-child(odd) {
    color: #ffffff;
    background: #324960;
}

.fl-table tr:nth-child(even) {
    background: #F8F8F8;
}


.logo{
    margin-left:70px
}


/* Responsive */

@media (max-width: 767px) {
    .fl-table {
        display: block;
        width: 100%;
    }
    .table-wrapper:before{
        content: "Scroll horizontally >";
        display: block;
        text-align: right;
        font-size: 11px;
        color: white;
        padding: 0 0 10px;
    }
    .fl-table thead, .fl-table tbody, .fl-table thead th {
        display: block;
    }
    .fl-table thead th:last-child{
        border-bottom: none;
    }
    .fl-table thead {
        float: left;
    }
    .fl-table tbody {
        width: auto;
        position: relative;
        overflow-x: auto;
    }
    .fl-table td, .fl-table th {
        padding: 20px .625em .625em .625em;
        height: 60px;
        vertical-align: middle;
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: auto;
        width: 120px;
        font-size: 13px;
        text-overflow: ellipsis;
        
    }
    .fl-table thead th {
        text-align: left;
        border-bottom: 1px solid #f7f7f9;
    }
    .fl-table tbody tr {
        display: table-cell;
    }
    .fl-table tbody tr:nth-child(odd) {
        background: none;
    }
    .fl-table tr:nth-child(even) {
        background: transparent;
    }
    .fl-table tr td:nth-child(odd) {
        background: #F8F8F8;
        border-right: 1px solid #E6E4E4;
    }
    .fl-table tr td:nth-child(even) {
        border-right: 1px solid #E6E4E4;
    }
    .fl-table tbody td {
        display: block;
        text-align: center;
    }
}
                </style>
                <script>

                function openTab(name)
                {
        let data = 'data:image/png;base64,iVBORw0KGgoAAAANS';
    let w = window.open('about:blank');
    let image = new Image();
    image.src = name;
    setTimeout(function(){
      w.document.write(image.outerHTML);
    }, 0);
        }
    </script>
    
</script>
                </head>
        
        <body>
          
          
          <div>
          <img class="logo" src="data:image/png;base64,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" width=50 height=45/>
          </div>
          <div class="table-wrapper">
              <table class="fl-table">
                  <thead>
                  <tr>
                      <th>Test Case Name</th>
                      <th>Test Run Status</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                  </tr>
                  </thead>
                  <tbody>
                  testdetails
                  <tbody>
              </table>
          </div>
          <div class="table-wrapper">
              <table class="fl-table">
                  <thead>
                  <tr>
                      <th>SL No</th>
                      <th>Description</th>
                      <th>Image</th>
                      <th>Status</th>
                      <th>Time</th>
                      
                  </tr>
                  </thead>
                  <tbody>
                  abc
                 
                  <tbody>
              </table>
          </div>
                      
                   
        </body>
        
        </html>`;
    var DynRow = "";
    var imagevariable;
    var imageW = 0;
    var imageH = 0;
    var statusColor;
    var arraySteps = Report.reportString.steps;
    for (var i = 0; i < arraySteps.length; i++) {
      if (arraySteps[i].imagebase64.length > 2) {
        imagevariable = arraySteps[i].imagebase64;
        imageW = 50;
        imageH = 50;
      } else {
        imagevariable = "";
        imageW = 0;
        imageH = 0;
      }
      if (arraySteps[i].status.includes("FAIL")) {
        statusColor = "Red";
      } else if (arraySteps[i].status.includes("PASS")) {
        statusColor = "Green";
      } else if (arraySteps[i].status.includes("INFO")) {
        statusColor = "Blue";
      }
      DynRow += `<tr>
            <td>${i + 1}</td>
            <td>${arraySteps[i].description}</td>
            <td> 
            <a href="data:image/png;base64, ${imagevariable}">
                <img class="baseImage" src="data:image/png;base64, ${imagevariable}" width=${imageW} height=${imageH} onclick="openTab('data:image/png;base64, ${imagevariable}')"/>
            </a>
            
            </td>
            <td style="color:${statusColor}">${arraySteps[i].status}</td>
            <td>${arraySteps[i].time}</td>
            
        </tr>`;
    }

    var testdetailsrow = `<tr>
        <td>${Report.reportString.testcasename}</td>
        <td>${Report.reportString.status}</td>
        <td>${Report.reportString.starttime}</td>
        <td>${Report.reportString.endtime}</td>
        
        </tr>`;
    html = html.replace("abc", DynRow);
    html = html.replace("testdetails", testdetailsrow);
    fs.writeFileSync(
      `custom-html-report/${Report.reportString.testcasename}-${timestamp}.html`,
      html
    );
    return `custom-html-report/${Report.reportString.testcasename}-${timestamp}.html`;
  }
  /**
   * This method will compare 2 josn file and 2 tags
   * @param {string} file1 path of the  baseline css json
   * @param {string} file2 path of newly created css json
   * @param {string} tag1 tag name from baseline json
   * @param {string} tag2 tag name from newly created json
   */
  public async GetJsonCompare(
    file1: string,
    file2: string,
    tag1: string,
    tag2: string
  ) {
    const report = new Report();
    try {
      // if (fs.existsSync("mappingCss/" + file1)) {
      let f1 = JSON.parse(readFileSync(file1, "utf-8"));
      let f2 = JSON.parse(readFileSync(file2, "utf-8"));

      if (f1[tag1] == f2[tag2]) {
        await report.LogReport(
          `${tag1} is matched. Expected = ${f1[tag1]} and Actual= ${f2[tag2]}`,
          "pass",
          ""
        );
      } else {
        await report.LogReport(
          `${tag1} is NOT matched. Expected = ${f1[tag1]} and Actual= ${f2[tag2]}`,
          "fail",
          ""
        );
      }
      console.log("File read complete", "mappingCss/" + file1);
    } catch (error) {
      console.error("Error Reading to file :", error);
      await report.LogReport(error.message, "fail", "");
    }
  }

  public async downloadBlobToFile(
    containerClient: ContainerClient,
    blobName,
    fileNameWithPath
  ) {
    const blobClient = containerClient.getBlobClient(blobName);

    const downloadResult = await blobClient.downloadToFile(fileNameWithPath);
    if (!downloadResult.errorCode) {
      console.log(
        `download of ${blobName} success ${downloadResult.blobCommittedBlockCount}`
      );
    }
  }

  public RetrieveEnvTestData(env: string, key: string) {
    const testData = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../../TestData/${env}/envTestData.json`), {
      encoding: 'utf8'
    }));

    return testData[key];
  }

  public RetrieveCommonTestData(key: string) {
    const testData = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../../TestData/commonTestData.json`), {
      encoding: 'utf8'
    }));

    return testData[key];
  }

  public RetrieveTestData(fileName: string, key: string) {
    const testData = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../../TestData/${fileName}.json`), {
      encoding: 'utf8'
    }));

    return testData[key];
  }

  public async UploadFileToAzureBlobStorage(filePath: string, blobStorageFolderPath: string, blobName: string) {
    const account = process.env.BLOB_ACCOUNT_NAME;
    const accountKey = process.env.AZURE_BASE64_TOKEN;

    const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net/design-system`,
      sharedKeyCredential
    );
    const containerClient = blobServiceClient.getContainerClient(blobStorageFolderPath);

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.uploadFile(filePath);

    console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
  }

  public async DeleteImageBlob(blobName: string, blobStorageFolderPath: string) {
    const account = process.env.BLOB_ACCOUNT_NAME;
    const accountKey = process.env.AZURE_BASE64_TOKEN;

    const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net/design-system`,
      sharedKeyCredential
    );
    const containerClient = blobServiceClient.getContainerClient(blobStorageFolderPath);

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const deleteBlobResponse = await blockBlobClient.delete();

    console.log(`Deleted block blob ${blobName} successfully`, deleteBlobResponse.requestId);

  }

  public async IfBlobPresent(blobName: string, blobStorageFolderPath: string) {

    const account = process.env.BLOB_ACCOUNT_NAME;
    const accountKey = process.env.AZURE_BASE64_TOKEN;

    const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net/design-system`,
      sharedKeyCredential
    );
    const containerClient = blobServiceClient.getContainerClient(blobStorageFolderPath);

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const res = await blockBlobClient.exists();
    return res;

  }

  public async RenameBlob(blobStorageFolderPath: string, oldBlobName: string, newBlobName: string) {
    const account = process.env.BLOB_ACCOUNT_NAME;
    const accountKey = process.env.AZURE_BASE64_TOKEN;

    const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net/design-system`,
      sharedKeyCredential
    );
    const containerClient = blobServiceClient.getContainerClient(blobStorageFolderPath);

    const blobClient = containerClient.getBlobClient(oldBlobName);
    const date = new Date();
    const downloadedFileName = `temp-${date.getTime()}`;
    const downloadResult = await blobClient.downloadToFile(path.join(__dirname, `../../DownloadedBlobFiles/${downloadedFileName}.png`));

    await this.DeleteImageBlob(oldBlobName, blobStorageFolderPath);
    await this.UploadFileToAzureBlobStorage(path.join(__dirname, `../../DownloadedBlobFiles/temp-${date.getTime()}.png`), blobStorageFolderPath, newBlobName);
  }

  public async DownloadBlobfile(blobStorageFolderPath: string, blobName: string, downloadPath: string, downloadFileName: string) {
    const account = process.env.BLOB_ACCOUNT_NAME;
    const accountKey = process.env.AZURE_BASE64_TOKEN;

    const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net/design-system`,
      sharedKeyCredential
    );
    const containerClient = blobServiceClient.getContainerClient(blobStorageFolderPath);

    const blobClient = containerClient.getBlobClient(blobName);

    const downloadResult = await blobClient.downloadToFile(downloadPath + "/" + downloadFileName);
  }

  public GetProjectFolderPath = () => path.join(__dirname, '../../')

  
  public LaunchBrowserInstance=async(width:number,height:number,dpi:number,ifHeadless=false)=>{
    const browser=await chromium.launch({headless:false})
    const browserContext=await browser.newContext({viewport:{width:1280,height:720},deviceScaleFactor:1.5})
    const page=await browserContext.newPage()

    return {browser,browserContext,page}
  }

  public CloseAllPagesBrowserContext=async(browserContext:BrowserContext)=>{
    browserContext.pages().forEach(async (page) => {
      await page.close()
  })
  }
}
