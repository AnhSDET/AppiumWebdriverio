import Input from '../../../../shared/helpers/input';
import { Screen } from '../../../../shared/screens';
import { WhatHappenedSelectors } from '../selectors/what-happened.selectors';

class WhatHappenedScreen extends Screen {
    private selector = new WhatHappenedSelectors();

    private defineScreenElements(): Array<WebdriverIO.Element> {
        let whatHappenedScreenElements: Array<WebdriverIO.Element> = [];
        whatHappenedScreenElements.push(this.selector.headerTitle, this.selector.searchClaimCategoryInput);
        const mainClaimEventCategoriesElements = this.selector.mainClaimEventCategories;
        whatHappenedScreenElements = [...whatHappenedScreenElements, ...mainClaimEventCategoriesElements];
        return whatHappenedScreenElements;
    }

    public waitForDisplay() {
        super.waitForElementsDisplay(this.defineScreenElements());
    }

    public isClaimEventScreenDisplayed(): boolean {
        return this.selector.headerTitle.isDisplayed();
        //todo: should return all elements list
    }

    public getMainClaimEventCategories(): Array<string> {
        const mainClaimEventCategories: Array<string> = [];

        const mainClaimEventCategoriesElements = this.selector.mainClaimEventCategories;
        for (let index in mainClaimEventCategoriesElements) {
            mainClaimEventCategories.push(mainClaimEventCategoriesElements[index].getText());
        }
        return mainClaimEventCategories;
    }

    public tapBackButton(): void {
        let currentBackButton: WebdriverIO.Element = browser.$('');
        if (this.selector.fourClaimEventCategories[0].isDisplayed()) {
            currentBackButton = this.selector.fourClaimEventCategories[0];
            currentBackButton.click();
        } else if (this.selector.thirdClaimEventCategories[0].isDisplayed()) {
            currentBackButton = this.selector.thirdClaimEventCategories[0];
            currentBackButton.click();
        } else if (this.selector.secondClaimEventCategories[0].isDisplayed()) {
            currentBackButton = this.selector.secondClaimEventCategories[0];
            currentBackButton.click();
        } else {
            return;
        }
    }

    public enterSearchInput(enterWhatClaimEventToSearchFor: string) {
        Input.setInputValue(this.selector.searchClaimCategoryInput, enterWhatClaimEventToSearchFor);
    }

    public tapOnCategoryEvent(eventName: string) {
        const claimCategoryButton = browser.$$(`ion-label*=${eventName}`)[0]; //todo: redefine this
        claimCategoryButton.click();
    }

    public tapSelectButton(): void {
        this.selector.selectButton.click();
    }

    public selectCategory(categories: string[]) {
        for (let category of categories) {
            this.tapOnCategoryEvent(category);
        }

        this.tapSelectButton();
    }

    public enterDescriptionValue(description: string) {
        Input.setInputValue(this.selector.descriptionInput, description);
    }

    public tapNextButton(): void {
        this.selector.nextButton.click();
    }
}

const expectedClaimEventFirstCategories: Array<string> = ['People', 'My property', 'Foreign property', 'Further'];
export { expectedClaimEventFirstCategories };

export const whatHappenedScreen = new WhatHappenedScreen();
