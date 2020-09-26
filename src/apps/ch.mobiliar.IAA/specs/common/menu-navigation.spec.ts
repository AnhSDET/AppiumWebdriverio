import { Contexts } from '../../../../shared/helpers';
import { Preconditions } from '../../../../shared/helpers/preconditions';
import { BaseMenuNavigationScreen } from '../../../../shared/screens/objects/base-menu-navigation.screen.action';

const baseMenuNavigationScreen = new BaseMenuNavigationScreen();

describe('Menu navigation test suite: ', () => {
    beforeEach(() => {
        Contexts.switchToWebview();
        Preconditions.quickSearchAndTapOnFoundPartnerAndWaitForNavigation('P-1022-4709');
    });
    afterEach(() => {
        browser.reloadSession();
    });

    it('should display the proper menu navigation for customer partner', () => {
        browser.pause(5000);
        const expectedMenuTitle: Array<string> = ['Basic Data', 'Partner Relations', 'Contracts', 'Offers', 'Claims', 'Documents'];
        const actualMenuTitle: Array<string> = baseMenuNavigationScreen.getMenuTitle();
        expect(actualMenuTitle).toEqual(expectedMenuTitle);

        const expectedBasicData: Array<string> = ['Basic Data', '17.08.1959 (61)\nSpitzwaldhof, 4123 Allschwil'];
        const actualBasicData: Array<string> = baseMenuNavigationScreen.getMenuTitleAndDetails(0);
        expect(actualBasicData).toEqual(expectedBasicData);
        const expectedPartnerRelation: Array<string> = ['Partner Relations', '3 active'];
        const actualPartnerRelation: Array<string> = baseMenuNavigationScreen.getMenuTitleAndDetails(1);
        expect(actualPartnerRelation).toEqual(expectedPartnerRelation);
    });
});

describe('Menu navigation test suite: ', () => {
    beforeEach(() => {
        Contexts.switchToWebview();
        Preconditions.quickSearchAndTapOnFoundPartnerAndWaitForNavigation('P-1049-9732');
    });
    afterEach(() => {
        browser.reloadSession();
    });
    it('should display the proper menu navigation for company partner', () => {
        browser.pause(5000);
        const actualMenuTitle: Array<string> = baseMenuNavigationScreen.getMenuTitle();
        const expectedMenuTitle: Array<string> = ['Basic Data', 'Partner Relations', 'Contracts', 'Offers', 'Claims', 'Documents'];
        expect(actualMenuTitle).toEqual(expectedMenuTitle);

        const expectedBasicData: Array<string> = ['Basic Data', 'chemin du Closy, 1692 Massonnens'];
        const actualBasicData: Array<string> = baseMenuNavigationScreen.getMenuTitleAndDetails(0);
        expect(actualBasicData).toEqual(expectedBasicData);

        const expectedPartnerRelation: Array<string> = ['Partner Relations', ''];
        const actualPartnerRelation: Array<string> = baseMenuNavigationScreen.getMenuTitleAndDetails(1);
        expect(actualPartnerRelation).toEqual(expectedPartnerRelation);

        const expectedContracts: Array<string> = ['Contracts', '2 active'];
        const actualContracts: Array<string> = baseMenuNavigationScreen.getMenuTitleAndDetails(2);
        expect(actualContracts).toEqual(expectedContracts);

        const expectedOffers: Array<string> = ['Offers', ''];
        const actualOffers: Array<string> = baseMenuNavigationScreen.getMenuTitleAndDetails(3);
        expect(actualOffers).toEqual(expectedOffers);

        const expectedClaims: Array<string> = ['Claims', ''];
        const actualClaims: Array<string> = baseMenuNavigationScreen.getMenuTitleAndDetails(4);
        expect(actualClaims).toEqual(expectedClaims);

        const expectedDocuments: Array<string> = ['Documents', '8 documents'];
        const actualDocs: Array<string> = baseMenuNavigationScreen.getMenuTitleAndDetails(5);
        expect(actualDocs).toEqual(expectedDocuments);
    });
});
