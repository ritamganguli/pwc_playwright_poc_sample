import * as PageOperations from '../ReusableFunctions/PageOperations';
import Wrapper from '../ReusableFunctions/Wrapper';
import { Locator, Page, TestInfo } from "@playwright/test"

export default class ReactComponents extends Wrapper {

    constructor(public page: Page) {
        super(page);
    }
    public emptyChatListDrawer: string = "(//div[contains(@id,'story--communications-chat-components')])[1]";
    public ChatComponentsubNavOption: string = "(//button[contains(@id,'communications-chat-components-internal-components')])[1]";
    public frameName: string = "#storybook-preview-iframe";
    public baseMessageThread: string = "(//div[contains(@id,'story--communications-chat-components')])[1]/div/div/div";
    //Ignore below elements via visual testing
    public lastChatMessageHeaderInfo = async (): Promise<Locator> => {
        return await this.findLocator("(//ul[contains(@class,'ms-FocusZone')])[1]/li[6]//div[@data-testid='messageInfoContainer']",
            { frame: this.frameName })
    };
    public lastDaySeparator = async (): Promise<Locator> => {
        return await this.findLocator("(//ul[contains(@class,'ms-FocusZone')])[1]/li[6]//div[@role='separator']",
            { frame: this.frameName })
    }

    public NavigateToChatComponents = async () => {

        await this.page.getByRole("button", { name: "Chat Components" }).first().click();

        await this.page.getByRole("button", { name: "Internal" }).first().click();

        await this.page.locator(this.ChatComponentsubNavOption).first().click();
    }

    public NavigateToChatSubNavOption = async (navOption: string) => {

        await this.page.getByRole("button", { name: navOption, expanded: false }).first().click();
    }
}