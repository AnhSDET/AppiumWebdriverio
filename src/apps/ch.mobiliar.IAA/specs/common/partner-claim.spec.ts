import { Contexts } from '../../../../shared/helpers';
import { Preconditions } from '../../../../shared/helpers/preconditions';
import { partnerClaimsListScreen } from '../../screens/objects/partner-claims-list.screen.actions';
import { expectedPaymentErrorInfo, partnerClaimDetailsScreen } from '../../screens/objects/partner-claim-details.screen.actions';

describe('Claims test cases', () => {
    beforeAll(() => {
        browser.setImplicitTimeout(5000);
    });
    beforeEach(() => {
        Contexts.switchToWebview();
        Preconditions.displayPartnerClaimsIAA('P-1175-2272');
        partnerClaimsListScreen.waitForDisplay();
    });
    afterEach(() => {
        browser.reloadSession();
    });

    it('should display the claim details screen and display payment information of the claim number: ', () => {
        partnerClaimsListScreen.tapClaim(0);

        const actualPaymentInformation: Array<string>[] = partnerClaimDetailsScreen.getPaymentInformation();
        const expectedPaymentInformation: Array<string>[] = [['Compensation', 'CHF', '0.00'], ['Net costs', 'CHF', '0.00']];

        expect(actualPaymentInformation).toEqual(expectedPaymentInformation);
    });

    it('should display the claim details screen and display payment information', () => {
        partnerClaimsListScreen.tapClaim(2);

        const actualPaymentInformation: Array<string>[] = partnerClaimDetailsScreen.getPaymentInformation();
        const expectedPaymentInformation: Array<string>[] = [['Compensation', 'CHF', '0.00'], ['Net costs', 'CHF', '3’000.00']];
        expect(actualPaymentInformation).toEqual(expectedPaymentInformation);

        const actualResponsibleEmployee: Array<string> = partnerClaimDetailsScreen.getResponsibleEmployeeForPartialClaim();
        const expectedResponsibleEmployee: Array<string> = ['TEST XC-Ausland Teamleiter (6350)', 'U903275\nAuslandschaden (BFBADA)'];
        expect(actualResponsibleEmployee).toEqual(expectedResponsibleEmployee);

        const actualClaimDetails: Array<string>[] = partnerClaimDetailsScreen.getClaimDetails();
        const expectedClaimDetails: Array<string>[] = [
            ['Claim Number', '8400.1015.1394'],
            ['Damage date', '25.05.2020, 00:00'],
            ['Place', 'Altenbergstrasse 12, 3013 Bern'],
            ['Course of events', 'UAT RIO'],
            ['Partial claim number', '8400.1015.1406'],
            ['Status', 'Aktiv\n, gegeben']
        ];

        expect(actualClaimDetails).toEqual(expectedClaimDetails);
    });
});
