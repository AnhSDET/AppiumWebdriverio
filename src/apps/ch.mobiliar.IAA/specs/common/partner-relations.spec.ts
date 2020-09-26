import { Contexts, DeviceType } from '../../../../shared/helpers';
import { Preconditions } from '../../../../shared/helpers/preconditions';
import { PartnerRelationsScreen } from '../../screens/objects/partner-relations.screen.actions';
import {
    expectedNumberOfPartnersInRelation,
    expectedStates,
    expectedPartnerRelationsInfo
} from '../../screens/objects/partner-relations.screen.actions';
import { BaseDetailsScreen } from '../../../../shared/screens/objects/base-details.screen';
import { BaseHeaderToolbarScreen } from '../../../../shared/screens/objects/base.header-toolbar.screen.actions';

const deviceType = browser.capabilities['deviceType'];
const partnerRelation = new PartnerRelationsScreen();
const baseDetailsScreen = new BaseDetailsScreen();
const baseHeaderToolbar = new BaseHeaderToolbarScreen();

describe('Partner Offers Test Suite', () => {
    beforeEach(() => {
        Contexts.switchToWebview();
        Preconditions.displayPartnerRelationIAA('P-1022-4709');
    });
    afterEach(() => {
        browser.reloadSession();
    });

    it("Should display the  partner relations screen with proper partner'relations and states", () => {
        if (deviceType == DeviceType.iPad) {
            const iPadRelationsScreenTitle = baseDetailsScreen.getiPadDetailsScreenTitle();
            expect(iPadRelationsScreenTitle).toEqual('Partner Relations');
        } else {
            const iPhoneRelationsHeaderTitle = baseHeaderToolbar.getiPhonePageDetailsHeaderTitle();
            expect(iPhoneRelationsHeaderTitle).toEqual('Partner Relations');
        }

        const actualPartnersInRelation: number = partnerRelation.getNumberOfPartnersInRelation();
        expect(actualPartnersInRelation).toEqual(expectedNumberOfPartnersInRelation);
        const actualRelationStates: Array<string> = partnerRelation.getPartnerRelationStates();
        expect(actualRelationStates).toEqual(expectedStates);

        const actualActivePartners: number = partnerRelation.getNumberOfPartnersInStates(expectedStates[0]);
        const actualTerminatedPartners: number = partnerRelation.getNumberOfPartnersInStates(expectedStates[1]);
        expect(actualActivePartners).toEqual(3);
        expect(actualTerminatedPartners).toEqual(3);
        console.log(partnerRelation.getPartnerRelationsInfo().sort());
        expect(partnerRelation.getPartnerRelationsInfo().sort()).toEqual(expectedPartnerRelationsInfo);
    });
});
