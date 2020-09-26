import { Contexts } from '../../../../shared/helpers';
import { Preconditions } from '../../../../shared/helpers/preconditions';
import { BaseDetailsScreen } from '../../../../shared/screens/objects/base-details.screen';
import { BaseHeaderToolbarScreen } from '../../../../shared/screens/objects/base.header-toolbar.screen.actions';
import {
    expectedContactInfo,
    expectedMobiAccount,
    expectedNoMobiAccount,
    expectedMBA,
    expectedBankAccount,
    PartnerDetailsScreenIAA
} from '../../screens/objects/partner-details.screen.actions';

import { DeviceType } from '../../../../shared/helpers';

const deviceType = browser.capabilities['deviceType'];
const partnerDetailsScreen = new PartnerDetailsScreenIAA();
const baseDetailsScreen = new BaseDetailsScreen();
const baseHeaderToolbar = new BaseHeaderToolbarScreen();

describe('Basic partner data test suite: ', () => {
    beforeEach(() => {
        Contexts.switchToWebview();
    });
    afterEach(() => {
        browser.reloadSession();
    });
    it('should display the proper partner details with the Customer Portal Bank account, MBA', () => {
        Preconditions.displayPartnerDetailsIAA('P-1007-9196');
        if (deviceType == DeviceType.iPad) {
            const iPadBasicDataScreenTitle = baseDetailsScreen.getiPadDetailsScreenTitle();
            expect(iPadBasicDataScreenTitle).toEqual('Basic Data');
        } else {
            const iPhoneHeaderTitle = baseHeaderToolbar.getiPhonePageDetailsHeaderTitle();
            expect(iPhoneHeaderTitle).toEqual('Basic Data');
        }
        let customerNoMobiAccount: Array<string> = partnerDetailsScreen.getTextOfMobiAccount();
        expect(customerNoMobiAccount).toEqual(expectedNoMobiAccount);
        let bankAccount: Array<string> = partnerDetailsScreen.getTextBankAccount();
        expect(bankAccount).toEqual(expectedBankAccount);
        let customerMBA: Array<string> = partnerDetailsScreen.getTextResponsibleAgent();
        expect(customerMBA).toEqual(expectedMBA);
    });

    it('should display the proper partner details with the Customer Portal Bank account, MBA', () => {
        Preconditions.displayPartnerDetailsIAA('P-1022-4709');
        if (deviceType == DeviceType.iPad) {
            const iPadBasicDataScreenTitle = baseDetailsScreen.getiPadDetailsScreenTitle();
            expect(iPadBasicDataScreenTitle).toEqual('Basic Data');
        } else {
            const iPhoneHeaderTitle = baseHeaderToolbar.getiPhonePageDetailsHeaderTitle();
            expect(iPhoneHeaderTitle).toEqual('Basic Data');
        }

        let contactInfo: Array<string> = partnerDetailsScreen.getContactInfo();
        expect(contactInfo).toEqual(expectedContactInfo);

        let customerNoMobiAccount: Array<string> = partnerDetailsScreen.getTextOfMobiAccount();
        expect(customerNoMobiAccount).toEqual(expectedNoMobiAccount);
        let bankAccount: Array<string> = partnerDetailsScreen.getTextBankAccount();
        expect(bankAccount).toEqual(['UBS Switzerland AG', 'Aeschenplatz 6, 4002 Basel\nCH8900233233282905000']);
        let customerMBA: Array<string> = partnerDetailsScreen.getTextResponsibleAgent();
        expect(customerMBA).toEqual(['Basel', 'Basel (125)']);

        partnerDetailsScreen.displayResponsibleAgentCommunication();
        const actualMBAcommunicationStates: Array<boolean> = partnerDetailsScreen.getMBAcommunicationDisplayingStates();
        expect(actualMBAcommunicationStates).toEqual([true, true, true, false]);
    });
});

describe('Partner details: Customer portal login - DONE', () => {
    beforeEach(() => {
        Contexts.switchToWebview();
        Preconditions.displayPartnerDetailsIAA('P-1471-0550');
    });
    afterEach(() => {
        browser.reloadSession();
    });

    it('should display the proper partner details which has customer portal login', () => {
        let customerMobiAccount: Array<string> = partnerDetailsScreen.getTextOfMobiAccount();
        expect(customerMobiAccount).toEqual(expectedMobiAccount);
    });
});
