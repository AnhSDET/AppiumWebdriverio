import { Contexts, DeviceType } from '../../../../shared/helpers';
import { Preconditions } from '../../../../shared/helpers/preconditions';
import { BaseDetailsScreen } from '../../../../shared/screens/objects/base-details.screen';
import { BaseHeaderToolbarScreen } from '../../../../shared/screens/objects/base.header-toolbar.screen.actions';
import { PartnerOffersScreen } from '../../screens/objects/partner-offers.screen.action';
import { expectedNumberOfOffers, expectedOfferClickableStates, expectedOffersInfo } from '../../screens/objects/partner-offers.screen.action';

const deviceType = browser.capabilities['deviceType'];
const baseDetailsScreen = new BaseDetailsScreen();
const baseHeaderToolbar = new BaseHeaderToolbarScreen();
const partnerOffersScreen = new PartnerOffersScreen();
describe('Partner Offers Test Suite', () => {
    beforeEach(() => {
        Contexts.switchToWebview();
        Preconditions.displayPartnerOffersIAA('P-1007-9196');
    });
    afterEach(() => {
        browser.reloadSession();
    });

    it('Should display the proper Partner Offer screen', () => {
        if (deviceType == DeviceType.iPad) {
            const iPadOffersScreenTitle = baseDetailsScreen.getiPadDetailsScreenTitle();
            expect(iPadOffersScreenTitle).toEqual('Offers');
        } else {
            const iPhoneOffersHeaderTitle = baseHeaderToolbar.getiPhonePageDetailsHeaderTitle();
            expect(iPhoneOffersHeaderTitle).toEqual('Offers');
        }
        const numberOfOffers: number = partnerOffersScreen.getNumberOfOffers();

        expect(numberOfOffers).toEqual(expectedNumberOfOffers);

        const offersClickableStates: Array<boolean> = partnerOffersScreen.getOffersClickableStates();

        expect(offersClickableStates).toEqual(expectedOfferClickableStates);

        const actualOffersInfo: Array<string> = partnerOffersScreen.getOffersInfo();
        expect(actualOffersInfo.sort()).toEqual(expectedOffersInfo);
    });
});
