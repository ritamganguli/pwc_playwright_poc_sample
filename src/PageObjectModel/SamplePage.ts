import Wrapper from "../ReusableFunctions/Wrapper";
import { Locator, Page, TestInfo } from "@playwright/test";
//import { pwpage } from "../tests/utils/Hooks";

const AmazonUrl = "https://www.amazon.com";
export default class SamplePage extends Wrapper {
  constructor(public page: Page) {
    super(page);
  }

  public async enterUserName(username: string) {
    await this.GoTo(username);
  }
}
