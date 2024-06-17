import Wrapper from "../ReusableFunctions/Wrapper";
import { Locator, Page, TestInfo, expect } from "@playwright/test";

export default class LeftPane extends Wrapper {

    constructor(public page: Page) {
        super(page);

    }

    peopleComponents="button#interactive-ui-elements-people-components"
    peopleComponents_Components="button#interactive-ui-elements-people-components-components"
    avatarComponent="button#interactive-ui-elements-people-components-components-avatargroup"

    public GoToAvatarGroup=async () => {
        await this.WaitForElementToBeVisible(this.peopleComponents)
        await this.Click(this.peopleComponents)
        await this.WaitForElementToBeVisible(this.peopleComponents_Components)
        await this.Click(this.peopleComponents_Components)
        await this.WaitForElementToBeVisible(this.avatarComponent)
        await this.Click(this.avatarComponent)
    }
}