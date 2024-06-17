# Introduction 
This project aims to test the functionality and appearance of various components in storybook through functional testing, image validation and css validation  

# Getting Started
After cloning the repository from Git, the first thing to do would be "npm install" (or "npm i"). This command installs all necessary packages listed in package.json/package-lock.json.
If you intend your code to successfully connect to the blob storage for image/css validation, you need to have the account key and password in the .env file at the root of the project. The pipeline does not need the .env file in repo as it is already present in the pipeline's secure files. 

# Testing Pre-conditions
Following are the conditions that need to be followed for successful execution through the pipeline:

- Each testcase should belong to a test suite defined by test.describe
- The title of each testcase/test suite should be unique and should NOT contain any whitespace(s)
- The folder names of any folders under "tests/" should NOT contain any whitespace(s)
- Each image or css name should be unique in the repo

The above conditions ensure that the testcase is picked up by the batch file while executing testcases by title in pipeline.

Following is the flow for image validation:

- Tester creates a test under a test suite defined by test.describe
- Tester identifies the element whose image needs to be compared
- If the baseline image needs to be set, the flag "setBaseline" in testConfig.json needs to   be set to true. Else the flag should be set to false
- Tester calls the ToHaveScreenshot to compare the image/set baseline image depending on the flag set in the previous step

Following is the flow for css validation:


- Tester creates a test under a test suite defined by test.describe
- Tester identifies the element whose css stylesheet needs to be validated
- If the baseline stylesheet needs to be set, the flag "setBaseline" in testConfig.json needs to   be set to true. Else the flag should be set to false
- If the tester wishes to check all the css attribute values of the element, "CompleteStyeSheetValidation" method needs to be used
- If the tester wishes to check selected attributes, a json file should be created under "mappingCss/". The method to use for validating selected attributes is CSSValuesValidation. This method will fetch the complete stylesheet of the element from the application and check the values of the attributes mentioned in the json file under "mappingCss/"

# Running the tests:

Tests can be run by either the title or the tag of the testcase/test suite in the command: 
npx playwright test -g '<Title|Tag>'

# Reports:

Subsequent to each run, a html report is generated in "custom-html-report/".
For pipeline run, the json,xml and html reports are attached with the testcase under "Tests" section. Additionally, the "custom-html-report/" folder containing the html reports is published in the pipeline.

# Security:

.env file contains sensitive blob storage credentials and should never be pushed to the repo. Testers who need to connect to the blob storage for local execution need to have a copy of the .env file in the root of the project. ".env" has been added to ".gitignore". Testers are requested not to modify the .gitignore file. 

# Package management best practice:

package.json contains all the necessary package dependencies for running this project along with their versions. package-lock.json contains all the necessary package dependencies for the packages mentioned in package.json along with their versions. Caution should be exercised in modifying the package dependencies in those files to prevent version mismatch of packages in different machines running this framework.

# Contribute:

"Wrapper.ts" in "src/ReusableFunctions" is expected to contain all reusable functions involving playwright testing. Testers are welcome to add custom reusable functions involving playwright testing in this file. 

"ReusableFunctions.ts" in "src/ReusableFunctions" is expected to contain all other reusable functions not directly involving playwright testing. Testers are welcome to add custom reusable functions not involving playwright testing in this file.






































































































































































































































































