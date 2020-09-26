import { Screen } from '../../../../shared/screens';
import { OverviewSelectorsCRA } from '../selectors/overview.selectors';

class OverviewScreenCRA extends Screen {
    private selector = new OverviewSelectorsCRA();

    private defineScreenElements(): Array<WebdriverIO.Element> {
        const overviewElements: Array<WebdriverIO.Element> = [];
        overviewElements.push(
            this.selector.overviewTitle,
            this.selector.settingsButton,
            this.selector.topRightNewClaimCaseButton,
            this.selector.createNewClaimCaseButton
        );
        return overviewElements;
    }

    public waitForDisplay(): void {
        super.waitForElementsDisplay(this.defineScreenElements());
    }

    private waitUntilNotDisplay(): void {
        super.waitUntilElementsNotDisplay(this.defineScreenElements());
    }

    public tapCreateNewClaimCaseButton(): void {
        this.selector.createNewClaimCaseButton.click();
        this.waitUntilNotDisplay();
    }

    public tapTopRightNewClaimCaseButton() {
        this.selector.topRightNewClaimCaseButton.click();
        this.waitUntilNotDisplay();
    }

    public tapSettingsButton() {
        this.selector.settingsButton.click();
        this.waitUntilNotDisplay();
    }

    public getOverviewScreenTitle(): string {
        return this.selector.overviewTitle.getText();
    }
}

const expectedOverviewScreenTitle: string = 'Claims';
export { expectedOverviewScreenTitle };

export const overviewScreenCRA = new OverviewScreenCRA();
