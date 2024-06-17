import * as PageOperations from "../ReusableFunctions/PageOperations";
import Wrapper from "../ReusableFunctions/Wrapper";
import { Locator, Page, TestInfo } from "@playwright/test";

export default class LoginPage extends Wrapper {
  constructor(public page: Page) {
    super(page);
  }
  public textArea = "//textarea";
  public checkBtn1 = "//input[@value='primary']";
  public checkBtn2 = "//input[@value='medium']";
  public Btn1 = "//button[text()='Text']";
  public FrName = "#storybook-preview-iframe";
  public async enterUserName(username: string) {
    this.findLocator("");
  }
  public async OpenPage(url: string) {
    await this.GoTo(url);
  }
}
