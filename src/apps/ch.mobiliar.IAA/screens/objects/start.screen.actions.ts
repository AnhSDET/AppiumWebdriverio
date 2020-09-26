import { StartSelectorsIAA } from '../selectors/start.selectors';
import { Screen } from '../../../../shared/screens';

class StartScreenIAA extends Screen {
    private startSelectorIAA = new StartSelectorsIAA();

    public waitForDisplay(): void {
        super.waitForElementDisplay(this.startSelectorIAA.searchPartnerButton);

        super.waitForElementsDisplay(this.defineStartScreenElements());
    }

    public waitForNotDisplay(): void {
        super.waitUntilElementNotDisplay(this.startSelectorIAA.searchPartnerButton);
    }

    public tapSearchButton(): void {
        this.startSelectorIAA.searchPartnerButton.click();
    }

    public tapSettingButton(): void {
        this.startSelectorIAA.settingButton.click();
    }

    public defineStartScreenElements(): Array<WebdriverIO.Element> {
        const startScreenElements: Array<WebdriverIO.Element> = [];
        startScreenElements.push(this.startSelectorIAA.searchPartnerButton);
        const headerButtonSelectors: Array<WebdriverIO.Element> = this.startSelectorIAA.header;

        for (let index in headerButtonSelectors) {
            startScreenElements.push(headerButtonSelectors[index]);
        }
        return startScreenElements;
    }

    public isStartScreenElementDisplayed(): boolean {
        return this.defineStartScreenElements()[1].isDisplayed();
    }
}

export const startScreen = new StartScreenIAA();
