import { SearchPartnerSelectorsIAA } from '../selectors/search-partner.selectors';
import { BaseSearchPartnerScreenActions } from '../../../../shared/screens/objects/base-search-partner.screen.actions';
import Input from '../../../../shared/helpers/input';
import { Contexts } from '../../../../shared/helpers';
import { LoadingContent } from '../../../../shared/screens/objects/loading.content';
import Gestures from '../../../../shared/helpers/gestures';

class SearchPartnerScreenActionsIAA extends BaseSearchPartnerScreenActions {
    private quickSearchSelector = new SearchPartnerSelectorsIAA();
    private extendedSearchSelector = new SearchPartnerSelectorsIAA();

    private defineQuickSearchScreenElements(): Array<WebdriverIO.Element> {
        let quickSearchPartnerElements: Array<WebdriverIO.Element> = [];
        quickSearchPartnerElements.push(
            this.quickSearchSelector.quickSearchInput,
            this.quickSearchSelector.quickSearchButton,
            this.quickSearchSelector.searchSegments[0],
            this.quickSearchSelector.searchSegments[1]
        );
        return quickSearchPartnerElements;
    }

    public waitForDisplay(): void {
        super.waitForDisplay();
        super.waitForElementsDisplay(this.defineQuickSearchScreenElements());
    }

    public navigateSearchSegment(whichSegment: number): void {
        this.quickSearchSelector.searchSegments[whichSegment].click();
    }

    public navigateToPartnerSearchSegment(): void {
        this.quickSearchSelector.searchSegments[1].click();
    }

    public tapQuickSearchInput(): void {
        this.quickSearchSelector.quickSearchInput.click();
    }

    public getTextOfInputtedQuickSearch(): string {
        return this.quickSearchSelector.quickSearchInput.getValue();
    }

    public tapClearIconOnQuicksearch(): void {
        return this.quickSearchSelector.clearIconOnQuickSearch.click();
    }

    public inputQuickPartnerData(partnerData: string) {
        Input.setInputValue(this.quickSearchSelector.quickSearchInput, partnerData, false, true);
    }

    public getInputFocusBorderColor(): any {
        return this.quickSearchSelector.quickSearchInputFocusBorder.getCSSProperty('border-color').parsed.hex;
    }

    public tapQuickSearchButtonAndWait(): void {
        this.tapQuickSearchButton();
        this.waitForQuickSearchFormNotDisplay();
        super.waitForSearchResultDisplay();
    }

    public tapQuickSearchButton(): void {
        this.quickSearchSelector.quickSearchButton.click();
    }

    private waitForQuickSearchFormNotDisplay() {
        LoadingContent.waitForLoadingContentDismiss();
        super.waitUntilElementNotDisplay(this.quickSearchSelector.quickSearchInput);
    }

    public inputQuickPartnerAndSearchAndTapFoundPartner(partnerData: string): void {
        this.inputQuickPartnerData(partnerData);
        this.tapQuickSearchButtonAndWait();
        this.tapFoundPartnerOnSearchResultAndWait(0);
    }

    private defineNativeVehicleNumber(): WebdriverIO.Element {
        return this.extendedSearchSelector.vehicleRegistrationNumber;
    }

    public inputVehicleRegistrationNumber(vehicleRegistrationNumber: string): void {
        const nativeVehicleRegistrationNumberSelector = this.defineNativeVehicleNumber();
        Contexts.doTasksInNativeContext(() => {
            if (nativeVehicleRegistrationNumberSelector.getText() == '') {
                nativeVehicleRegistrationNumberSelector.addValue(vehicleRegistrationNumber);
            } else {
                nativeVehicleRegistrationNumberSelector.clearValue();
                nativeVehicleRegistrationNumberSelector.setValue(vehicleRegistrationNumber);
            }
        });
    }
}

export const searchPartnerScreenIAA = new SearchPartnerScreenActionsIAA();
