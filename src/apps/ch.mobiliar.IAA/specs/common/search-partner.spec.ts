import { Contexts } from '../../../../shared/helpers';
import { Preconditions } from '../../../../shared/helpers/preconditions';
import { searchPartnerScreenIAA } from '../../screens/objects/search-partner.screen.actions';
import { alertDialog } from '../../../../shared/screens';
import { expectedFatalErrorAlertDialog } from '../../../../shared/screens';
import {
    expectedFoundPartnerNameBruno,
    expectedFoundPartnerNameClaudio,
    expectedSearchByPartnerNumberInfo,
    expectedSearchInfoEllipsis
} from '../../../../shared/screens/objects/base-search-partner.screen.actions';
import { BaseSearchPartnerScreenActions } from '../../../../shared/screens/objects/base-search-partner.screen.actions';
import { AutoCompleteScreen } from '../../../../shared/screens/objects/auto-complete.screen';

const baseSearchPartnerScreen = new BaseSearchPartnerScreenActions('IAA');
const autoCompletionScreen = new AutoCompleteScreen();

describe('Quick search test suites: ', () => {
    beforeAll(() => {
        Contexts.switchToWebview();
    });
    beforeEach(() => {
        Preconditions.displayQuickSearchPartnerScreen();
    });
    afterEach(() => {
        browser.reloadSession();
    });

    it('HAN-962: should display the proper search partner result after search by quick search', () => {
        searchPartnerScreenIAA.inputQuickPartnerData('10079196');
        searchPartnerScreenIAA.tapQuickSearchButtonAndWait();

        let actualSearchByPartnerNumberInfo: Array<string> = searchPartnerScreenIAA.getTextOfSearchInfoOnSearchResult();

        expect(actualSearchByPartnerNumberInfo).toEqual(['Search Criteria', '10079196']);

        let actualFoundPartner: Array<string> = searchPartnerScreenIAA.getFoundPartnerAfterSearched();

        expect(actualFoundPartner).toEqual(expectedFoundPartnerNameBruno);

        let actualFoundNumberOfPartners: number = baseSearchPartnerScreen.getNumberOfFoundPartnersAfterSearched();
        expect(actualFoundNumberOfPartners).toBe(1);

        baseSearchPartnerScreen.tapPenIcon();
        let actualInputtedQuickSearch: string = searchPartnerScreenIAA.getTextOfInputtedQuickSearch();
        expect(actualInputtedQuickSearch).toEqual('10079196');

        searchPartnerScreenIAA.tapClearIconOnQuicksearch();

        actualInputtedQuickSearch = searchPartnerScreenIAA.getTextOfInputtedQuickSearch();
        expect(actualInputtedQuickSearch).toEqual('');

        searchPartnerScreenIAA.inputQuickPartnerData('11752272');
        searchPartnerScreenIAA.tapQuickSearchButtonAndWait();

        actualSearchByPartnerNumberInfo = searchPartnerScreenIAA.getTextOfSearchInfoOnSearchResult();
        expect(actualSearchByPartnerNumberInfo).toEqual(['Search Criteria', '11752272']);

        actualFoundPartner = searchPartnerScreenIAA.getFoundPartnerAfterSearched();
        expect(actualFoundPartner).toEqual(expectedFoundPartnerNameClaudio);

        actualFoundNumberOfPartners = baseSearchPartnerScreen.getNumberOfFoundPartnersAfterSearched();
        expect(actualFoundNumberOfPartners).toBe(1);

        baseSearchPartnerScreen.tapPenIcon();
        searchPartnerScreenIAA.tapClearIconOnQuicksearch();
    });

    it('should display the Fatal Alert Error message when searching by 4 digits', () => {
        searchPartnerScreenIAA.tapQuickSearchInput();
        expect(searchPartnerScreenIAA.getInputFocusBorderColor()).toBe('#4b09ff');
        searchPartnerScreenIAA.inputQuickPartnerData('1111');
        searchPartnerScreenIAA.tapQuickSearchButton();
        alertDialog.waitForAlertDialog();
        expect(alertDialog.getAlertDialog()).toEqual(expectedFatalErrorAlertDialog);
    });
});

describe('Partner search test suites: Partner number and Contract number', () => {
    beforeAll(() => {
        Contexts.switchToWebview();
    });
    beforeEach(() => {
        Preconditions.displayQuickSearchPartnerScreen();
        searchPartnerScreenIAA.navigateToPartnerSearchSegment();
    });
    afterEach(() => {
        browser.reloadSession();
    });

    it('should be able to search by partner number and display proper result with only 1 partner found ', () => {
        searchPartnerScreenIAA.enterNumberInput('10079196');
        baseSearchPartnerScreen.tapSearchPartnerButtonAndWait();

        const actualSearchByPartnerNumberInfo: Array<string> = searchPartnerScreenIAA.getTextOfSearchInfoOnSearchResult();

        expect(actualSearchByPartnerNumberInfo).toEqual(expectedSearchByPartnerNumberInfo);

        const actualFoundPartner: Array<string> = searchPartnerScreenIAA.getFoundPartnerAfterSearched();

        expect(actualFoundPartner).toEqual(expectedFoundPartnerNameBruno);

        const actualFoundNumberOfPartners: number = baseSearchPartnerScreen.getNumberOfFoundPartnersAfterSearched();
        expect(actualFoundNumberOfPartners).toBe(1);
    });

    xit('should be able to search by partner attributes, and edit the search criteria and display proper result ', () => {
        searchPartnerScreenIAA.inputPartnerAttributes('claudio', 'schuerch', '1552 Trey', 'street test', '');
        baseSearchPartnerScreen.tapSearchPartnerButtonAndWait(); //todo: logged bug on the app - will need to retest after bug fixed

        const actualSearchResult: string = baseSearchPartnerScreen.getEmptySearchResultText();
        expect(actualSearchResult).toEqual('No Partners match your search');

        const actualSearchByInfo: Array<string> = searchPartnerScreenIAA.getTextOfSearchInfoOnSearchResult();
        const expectedSearchByInfo: Array<string> = ['Search Criteria', 'claudio, schuerch, 1552 Trey, street test'];
        expect(actualSearchByInfo).toEqual(expectedSearchByInfo);
        baseSearchPartnerScreen.tapPenIcon();
        baseSearchPartnerScreen.clearInputtedStreetAndInputNewStreet('');

        baseSearchPartnerScreen.tapSearchPartnerButtonAndWait();

        let actualSearchByPartnerAttributesInfo: Array<string> = searchPartnerScreenIAA.getTextOfSearchInfoOnSearchResult();
        const expectedSearchByValidPartnerAttributesInfo: Array<string> = ['Search Criteria', 'claudio, schuerch, 1552 Trey'];

        expect(actualSearchByPartnerAttributesInfo).toEqual(expectedSearchByValidPartnerAttributesInfo);

        let actualFoundPartner: Array<string> = searchPartnerScreenIAA.getFoundPartnerAfterSearched();
        expect(actualFoundPartner).toEqual(expectedFoundPartnerNameClaudio);

        baseSearchPartnerScreen.tapPenIcon();
        baseSearchPartnerScreen.clearInputtedStreetAndInputNewStreet('impasse de la Golette');

        baseSearchPartnerScreen.tapSearchPartnerButtonAndWait();

        const actualEllipsisSearchInfo = baseSearchPartnerScreen.getSearchInfoEllipsisIPhone();
        expect(actualEllipsisSearchInfo).toEqual(expectedSearchInfoEllipsis);

        actualFoundPartner = searchPartnerScreenIAA.getFoundPartnerAfterSearched();
        expect(actualFoundPartner).toEqual(expectedFoundPartnerNameClaudio);
    });

    it('should display the search result if search by partner attributes and phone number', () => {
        searchPartnerScreenIAA.inputPartnerAttributes('Schuerch', 'Claudio', '1552 Trey', 'impasse de la Golette', '41278106550');
        baseSearchPartnerScreen.tapSearchPartnerButtonAndWait();

        let actualSearchByPartnerAttributesInfo: Array<string> = searchPartnerScreenIAA.getTextOfSearchInfoOnSearchResult();
        const expectedSearchByValidPartnerAttributesInfo: Array<string> = [
            'Search Criteria',
            'Schuerch, Claudio, 1552 Trey, impasse de la Golette, 41278106550'
        ];

        expect(actualSearchByPartnerAttributesInfo).toEqual(expectedSearchByValidPartnerAttributesInfo);

        const actualFoundPartner = searchPartnerScreenIAA.getFoundPartnerAfterSearched();
        expect(actualFoundPartner).toEqual(expectedFoundPartnerNameClaudio);
    });

    it('should display the search result if search by phone number', () => {
        baseSearchPartnerScreen.inputPhoneNumber('41278106550');
        baseSearchPartnerScreen.tapSearchPartnerButtonAndWait();

        let actualSearchInfo: Array<string> = searchPartnerScreenIAA.getTextOfSearchInfoOnSearchResult();
        const expectedSearchByValidPartnerPhoneInfo: Array<string> = ['Search Criteria', '41278106550'];

        expect(actualSearchInfo).toEqual(expectedSearchByValidPartnerPhoneInfo);

        const actualFoundPartner = searchPartnerScreenIAA.getFoundPartnerAfterSearched();
        expect(actualFoundPartner).toEqual(expectedFoundPartnerNameClaudio);

        baseSearchPartnerScreen.tapPenIcon();
        baseSearchPartnerScreen.inputPhoneNumber('41752788380');
        baseSearchPartnerScreen.tapSearchPartnerButtonAndWait();

        actualSearchInfo = searchPartnerScreenIAA.getTextOfSearchInfoOnSearchResult();
        const expectedSearchByInValidPartnerPhoneInfo: Array<string> = ['Search Criteria', '41752788380'];
        expect(actualSearchInfo).toEqual(expectedSearchByInValidPartnerPhoneInfo);

        const actualNumberOfFoundPartners: number = baseSearchPartnerScreen.getNumberOfFoundPartnersAfterSearched();
        expect(actualNumberOfFoundPartners).toBe(5);
    });

    it('should display the partners when user searches by Vehicle Registration Number', () => {
        searchPartnerScreenIAA.inputVehicleRegistrationNumber('BL40680');
        baseSearchPartnerScreen.tapSearchPartnerButtonAndWait();

        let actualSearchInfo: Array<string> = baseSearchPartnerScreen.getTextOfSearchInfoOnSearchResult();
        const expectedSearchByValidPartnerVehicleRegistrationNumberInfo: Array<string> = ['Search Criteria', 'BL40680'];
        expect(actualSearchInfo).toEqual(expectedSearchByValidPartnerVehicleRegistrationNumberInfo);

        let actualNumberOfFoundPartners: number = baseSearchPartnerScreen.getNumberOfFoundPartnersAfterSearched();
        expect(actualNumberOfFoundPartners).toBe(1);

        const actualFoundPartner = searchPartnerScreenIAA.getFoundPartnerAfterSearched();
        expect(actualFoundPartner).toEqual(expectedFoundPartnerNameBruno);

        baseSearchPartnerScreen.tapPenIcon();
        searchPartnerScreenIAA.inputVehicleRegistrationNumber('VD315609');
        baseSearchPartnerScreen.tapSearchPartnerButtonAndWait();

        actualSearchInfo = baseSearchPartnerScreen.getTextOfSearchInfoOnSearchResult();
        const expectedSearchByPartnerVehicleRegistrationNumberInfo: Array<string> = ['Search Criteria', 'VD315609'];
        expect(actualSearchInfo).toEqual(expectedSearchByPartnerVehicleRegistrationNumberInfo);

        actualNumberOfFoundPartners = baseSearchPartnerScreen.getNumberOfFoundPartnersAfterSearched();
        expect(actualNumberOfFoundPartners).toBe(3);
    });

    xit('should be able to search by contract number', () => {
        searchPartnerScreenIAA.tapContractNumberTab();
        searchPartnerScreenIAA.searchPartnerByContractNumber('g-1234-5678');
        //todo
    });
});

xdescribe('Partner search - Validation - switching segments', () => {
    beforeAll(() => {
        Contexts.switchToWebview();
    });
    beforeEach(() => {
        Preconditions.displayQuickSearchPartnerScreen();
        searchPartnerScreenIAA.navigateToPartnerSearchSegment();
    });
    afterEach(() => {
        browser.reloadSession();
    });
    it('HAN-1111: should remains proper inputted data when switching between contract and partner tabs ', () => {
        searchPartnerScreenIAA.inputLastNameOrCompanyInput('bruno');
        searchPartnerScreenIAA.inputFirstNameOrCompanyInput('zebert');

        searchPartnerScreenIAA.enterZipInput('4133');

        const actualNumberOfAutoCompleteBoxes: number = autoCompletionScreen.getNumberOfAutoCompleteBoxes();
        expect(actualNumberOfAutoCompleteBoxes).toEqual(6);

        autoCompletionScreen.selectValueInAutoComplete(0);

        searchPartnerScreenIAA.tapContractNumberTab();
        searchPartnerScreenIAA.tapPartnerNumberTab();

        const actualInputtedLastName: string = searchPartnerScreenIAA.getInputtedLastName();
        expect(actualInputtedLastName).toEqual('bruno');

        const actualInputtedFirstName: string = searchPartnerScreenIAA.getInputtedFirstName();
        expect(actualInputtedFirstName).toEqual('zebert');

        const actualAutoCompleteGroupdDisplayingState: boolean = autoCompletionScreen.isAutoCompleteGroupDisplayed();
        expect(actualAutoCompleteGroupdDisplayingState).toBeFalsy();

        const actualInputtedZip: string = searchPartnerScreenIAA.getInputtedZip();
        expect(actualInputtedZip).toEqual('4133 Pratteln');
    });

    xit('should be able to close the search modal', () => {
        searchPartnerScreenIAA.tapCloseSearchPartnerScreenButton(); //todo
    });

    it('should display the error validation of contract', () => {
        searchPartnerScreenIAA.tapContractNumberTab();
        searchPartnerScreenIAA.tapSearchButton();

        const actualErrorDisplayingStates: Array<boolean> = searchPartnerScreenIAA.isInputErrorIconDisplayed();
        expect(actualErrorDisplayingStates).toEqual([true]);

        const actualErrorContentOfContractField: Array<string> = searchPartnerScreenIAA.tapErrorInputAndGetInputErrorContent(0);
        expect(actualErrorContentOfContractField).toEqual(['Invalid Text', 'Enter a Contract Number to search for']);
    });
});
