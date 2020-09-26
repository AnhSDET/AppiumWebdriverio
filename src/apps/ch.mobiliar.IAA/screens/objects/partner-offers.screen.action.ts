import { Screen } from '../../../../shared/screens';
import { PartnerOffersSelectors } from '../selectors/partner-offers.selectors';
import Gestures from '../../../../shared/helpers/gestures';

export class PartnerOffersScreen extends Screen {
    private partnerOfferSelector = new PartnerOffersSelectors();

    public getNumberOfOffers(): number {
        return this.partnerOfferSelector.offers.length;
    }

    public getOffersClickableStates(): Array<boolean> {
        let offerSelectors: Array<WebdriverIO.Element> = this.partnerOfferSelector.offers;
        let offerStates: Array<boolean> = [];
        for (let index in offerSelectors) {
            offerStates.push(offerSelectors[index].isClickable());
        }
        return offerStates;
    }

    public getOffersInfo(): Array<string> {
        let offerSelectors: Array<WebdriverIO.Element> = this.partnerOfferSelector.offerTitlesAndContents;
        let offerValues: Array<string> = [];
        for (let index in offerSelectors) {
            offerValues.push(offerSelectors[index].getText().trim());
        }
        return offerValues;
    }
}

const expectedNumberOfOffers: number = 2;
const expectedOfferClickableStates: Array<boolean> = [false, false];
const expectedOffersInfo: Array<string> = ['30.06.2020 -\nAktiv', '30.06.2020 - 31.12.2025\nAktiv', 'MobiTour', 'MobiTour'];
export { expectedNumberOfOffers, expectedOfferClickableStates, expectedOffersInfo };
