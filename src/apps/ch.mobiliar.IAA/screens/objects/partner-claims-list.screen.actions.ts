import { Screen } from '../../../../shared/screens';
import { PartnerClaimsListSelectors } from '../selectors/partner-claims-list.selectors';
import Gestures from '../../../../shared/helpers/gestures';

class PartnerClaimsListScreenActions extends Screen {
    private selector = new PartnerClaimsListSelectors();

    public waitForDisplay(): void {
        super.waitForElementDisplay(this.selector.claimsTile);
    }

    public tapClaim(whichClaimPosition: number): void {
        let claimCardSelector: WebdriverIO.Element = this.selector.claimCardsOnly[whichClaimPosition];
        Gestures.scrollIntoView(claimCardSelector);
        claimCardSelector.click();
        super.waitUntilElementNotDisplay(claimCardSelector);
    }
}

export const partnerClaimsListScreen = new PartnerClaimsListScreenActions();
