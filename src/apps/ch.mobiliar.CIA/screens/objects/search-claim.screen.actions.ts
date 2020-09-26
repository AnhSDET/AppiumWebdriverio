import { BaseSearchPartnerScreenActions } from '../../../../shared/screens/objects/base-search-partner.screen.actions';
import { SearchClaimSeletorsCIA } from '../selectors/search-claim.seletors';
import { DeviceType } from '../../../../shared/helpers';

const deviceType = browser.capabilities['deviceType'];

class SearchClaimScreenActionsCIA extends BaseSearchPartnerScreenActions {
    private searchPartnerSelectorsCIA = new SearchClaimSeletorsCIA();

    public tapFoundClaimBySearchClaimNumberOnSearchResult(): void {
        this.searchPartnerSelectorsCIA.searchClaimResults[0].click();
        super.waitForNotDisplay();
    }

    public tapNumberType(whichType: string): void {
        if (deviceType == DeviceType.iPad && whichType == expectedNumberTypes[2]) {
            super.tapPartnerNumberTab();
        } else if (deviceType == DeviceType.iPad && whichType == expectedNumberTypes[1]) {
            super.tapContractNumberTab();
        }
    }

    public selectNumberType(): void {}
}

const expectedNumberTypes: Array<string> = ['Claim Number', 'Contract number', 'Partner number'];

export const searchClaimScreenCIA = new SearchClaimScreenActionsCIA();
export { expectedNumberTypes };
