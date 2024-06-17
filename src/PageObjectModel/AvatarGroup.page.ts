import Wrapper from "../ReusableFunctions/Wrapper";
import { Locator, Page, TestInfo, expect } from "@playwright/test";
import ReusableFunctions from "../ReusableFunctions/ReusableFunctions";
import * as AvatarEnums from "../CustomUserTypes/AvatarGroup"

export default class AvatarGroup extends Wrapper {

    constructor(public page: Page) {
        super(page);

    }

    primaryAvatarGroup = '(//div[@id="anchor--interactive-ui-elements-people-components-components-avatargroup--default"])[1]'
    primaryAvatars = '(//div[@id="anchor--interactive-ui-elements-people-components-components-avatargroup--default"])[1]//span[@role="button"]'

    setOverFlowAfterButton = "button#set-overflowAfter"
    overflowAfterInput = '//input[@name="overflowAfter"]'
    titleText = '//h1[text()="AvatarGroup"]'
    overflowIndicator = '//div[@id="story--interactive-ui-elements-people-components-components-avatargroup--default--primary"]//button'
    overflowPopover = '//div[@role="group"][@aria-label="Overflow"]'
    overflowPopoverPersona='//div[@role="group"][@aria-label="Overflow"]//li'
    overflowPopoverEnd = '//div[@role="group"]//li[last()]'
    overflowIndicatorTooltip = '//div[@role="tooltip"]'
    setOverflowTooltipButton = 'button#set-overflowIndicatorTooltip'
    setOverflowTooltipInput = 'textarea#control-overflowIndicatorTooltip'
    selectSizeDropdown = 'select#control-size'
    setHideprofilecardButton='button#set-hideProfileCard'
    profileCardPopover='//div[@role="group"][@aria-label="Profile Card"]'


    variantXpath = (variant: AvatarEnums.Variant) => `//span[text()="variant"]//following::input[@value="${variant}"]`
    layoutXpath = (layout: AvatarEnums.Layout) => `//span[text()="layout"]//following::input[@value="${layout}"]`
    overflowIndicatorXpath = (overflowIndicator: AvatarEnums.OverflowIndicator) => `//span[text()="overflowIndicator"]//following::input[@value="${overflowIndicator}"]`
    hideProfilecardXpath=(hideProfilecard:AvatarEnums.HideProfileCard)=>`//label[@for="control-hideProfileCard"]/span[text()="${hideProfilecard}"]`

    Reusable = new ReusableFunctions()

    public waitForAvatarGroupPageLoad = async () => {
        await this.WaitForElementToBeVisible(this.primaryAvatarGroup, { frame: this.Reusable.RetrieveCommonTestData("storyBookFrameLocator") })
    }

    public setOverflowAfter = async (overflowAfterValue: string) => {
        await this.Click(this.setOverFlowAfterButton, { frameName: this.Reusable.RetrieveCommonTestData("storyBookFrameLocator") })
        await this.TypeText(this.overflowAfterInput, overflowAfterValue, { frameName: this.Reusable.RetrieveCommonTestData("storyBookFrameLocator") })
    }

    public clickOutside = async () => {
        await this.Click(this.titleText, { frameName: this.Reusable.RetrieveCommonTestData("storyBookFrameLocator") })
    }

    public setVariant = async (variant: AvatarEnums.Variant) => {
        await this.Click(this.variantXpath(variant), { frameName: this.Reusable.RetrieveCommonTestData("storyBookFrameLocator") })
    }

    public setLayout = async (layout: AvatarEnums.Layout) => {
        await this.Click(this.layoutXpath(layout), { frameName: this.Reusable.RetrieveCommonTestData("storyBookFrameLocator") })
    }

    public clickOverflowIndicator = async () => {
        await this.Click(this.overflowIndicator, { frameName: this.Reusable.RetrieveCommonTestData("storyBookFrameLocator") })
    }

    public waitForTooltipToBeVisible = async () => {
        await this.WaitForElementToBeVisible(this.overflowIndicatorTooltip, { frame: this.Reusable.RetrieveCommonTestData("storyBookFrameLocator") })
    }

    public setCustomTooltipText = async (customTooltipText: string) => {
        await this.Click(this.setOverflowTooltipButton, { frameName: this.Reusable.RetrieveCommonTestData("storyBookFrameLocator") })
        await this.TypeText(this.setOverflowTooltipInput, customTooltipText, { frameName: this.Reusable.RetrieveCommonTestData("storyBookFrameLocator") })
    }

    public setOverflowIndicatorType = async (overflowIndicatorType: AvatarEnums.OverflowIndicator) => {
        await this.Click(this.overflowIndicatorXpath(overflowIndicatorType), { frameName: this.Reusable.RetrieveCommonTestData("storyBookFrameLocator") })
    }

    public validateAvatarSizes = async (baseFilename: string, testInfo: TestInfo) => {

        const avatarLocators = await this.GetAllMatchingElementsInFrame(this.Reusable.RetrieveCommonTestData("storyBookFrameLocator"), this.primaryAvatars)

        for (const avatar of avatarLocators) {
            await this.CSSValuesValidation(baseFilename, avatar, testInfo)
        }
    }

    public validateAvatarSizePieLayout=async(baseFilename: string, testInfo: TestInfo)=>{
        await this.CSSValuesValidation(baseFilename,await this.GetMatchingElementInFrame(this.Reusable.RetrieveCommonTestData("storyBookFrameLocator"),this.overflowIndicator), testInfo)
    }

    public selectAvatarSize = async (size: number) => {
        this.SelectInDropdownInFrame(this.Reusable.RetrieveCommonTestData("storyBookFrameLocator"), this.selectSizeDropdown, size.toString())
    }

    public clickSetHideprofilecardButton=async()=>{
        await this.Click(this.setHideprofilecardButton,{frameName:this.Reusable.RetrieveCommonTestData("storyBookFrameLocator")})
    }

    public toggleHideprofilecard=async()=>{
        await this.Click('//label[@for="control-hideProfileCard"]/input',{frameName:this.Reusable.RetrieveCommonTestData("storyBookFrameLocator")})
    }

    public validateProfilecardsVisibleUsers=async(layout:AvatarEnums.Layout,testInfo:TestInfo)=>{
        const avatarLocators = await this.GetAllMatchingElementsInFrame(this.Reusable.RetrieveCommonTestData("storyBookFrameLocator"), this.primaryAvatars)

        let visibleUserCount=1;
        for (const avatar of avatarLocators) {
            await avatar.hover()
            await this.WaitForElementToBeVisible(this.profileCardPopover,{frame:this.Reusable.RetrieveCommonTestData("storyBookFrameLocator")})
            await this.ToHaveScreenshot(this.profileCardPopover,`avatargroup-profile-card-visible-user-layout-${layout}-${visibleUserCount}.png`,testInfo,{frameName:this.Reusable.RetrieveCommonTestData("storyBookFrameLocator")})
            visibleUserCount++;
        }
    }

    public validateProfilecardsOverflownUsers=async(layout:AvatarEnums.Layout,testInfo:TestInfo)=>{
        await this.Click(this.overflowIndicator,{frameName:this.Reusable.RetrieveCommonTestData("storyBookFrameLocator")})
        const overflownPersonas= await this.GetAllMatchingElementsInFrame(this.Reusable.RetrieveCommonTestData("storyBookFrameLocator"),this.overflowPopoverPersona)

        let overflowPersonaCount=1;
        for(const overflownPersona of overflownPersonas){
            await overflownPersona.hover();
            await this.ToHaveScreenshot(this.profileCardPopover,`avatargroup-profile-card-overflown-user-layout-${layout}-${overflowPersonaCount}.png`,testInfo,{frameName:this.Reusable.RetrieveCommonTestData("storyBookFrameLocator")})
            await overflownPersona.click();

            overflowPersonaCount++;
        }
    }
}