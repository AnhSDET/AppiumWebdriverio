import { BaseDetailsSelectors } from '../selectors/base-details.selectors';
import { Screen } from '../screen';

export class BaseDetailsScreen extends Screen {
    private baseDetailsSelector = new BaseDetailsSelectors();

    public waitForDisplay(): void {
        super.waitForElementDisplay(this.baseDetailsSelector.baseiPadDetailsScreenTitle);
    }

    public getiPadDetailsScreenTitle(): string {
        return this.baseDetailsSelector.baseiPadDetailsScreenTitle.getText();
    }

    public waitForEmptyPartnerScreenDisplay() {
        super.waitForElementDisplay(this.baseDetailsSelector.searchButtonToSearchModalScreen);
        return this;
    }

    public waitForPartnerDetailsScreenDisplay(): void {
        super.waitForElementDisplay(this.baseDetailsSelector.partnerInfoSection);
    }

    public tapSearchButton(): void {
        this.baseDetailsSelector.searchButtonToSearchModalScreen.click();
    }

    public waitForPartnerInfoNotDisplay(): void {
        super.waitUntilElementNotDisplay(this.baseDetailsSelector.partnerInfoSection);
    }

    public waitForLoadingCompleted(): void {
        super.waitUntilElementsNotDisplay(this.baseDetailsSelector.spinnerLoadingContents);
    }
}
