import Wrapper from "../ReusableFunctions/Wrapper";
import { Locator, Page, TestInfo, expect } from "@playwright/test";

export default class Persona extends Wrapper {

    constructor(public page: Page) {
        super(page);

    }
    public hideProfileCardTextbox = "textarea#control-hideProfileCard";
    public personaAvatar = "xpath=(//h1[text()='Persona']//following::span[text()='AU'])[1]";
    public headerText = "xpath=//h1[text()='Persona']";
    public personaRoot = "(//div[@data-testid='persona-root'])[1]";

    public async SetHideProfileCardValue(text: string) {
        await this.TypeText(this.hideProfileCardTextbox, text, {
            frameName: 'iframe[title="storybook-preview-iframe"]'
        });
    }

    public async HoverOnPersonaAvatar() {
        await this.HoverOver(this.personaAvatar, {
            frameName: 'iframe[title="storybook-preview-iframe"]'
        });
    }

    public async ClickOutsideAfterChange() {
        await this.Click(this.headerText, {
            frameName: 'iframe[title="storybook-preview-iframe"]'
        })
    }

    public async WaitForPersonaRoot(retries: number) {
        await this.WaitForElementToBeVisiblePolling(this.personaRoot, retries, { frame: 'iframe[title="storybook-preview-iframe"]' });
    }
}