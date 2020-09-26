import { Contexts } from '../../../../shared/helpers';
import { Preconditions } from '../../../../shared/helpers/preconditions';
import { expectedInActiveContracts, PartnerContracts } from '../../screens/objects/partner-contracts.screen';
import {
    expectedSubHeaders,
    expectedContracts,
    expectedInActiveContractsClickableStates,
    expectedActiveContractsClickableStates
} from '../../screens/objects/partner-contracts.screen';
import { AutoCompleteScreen } from '../../../../shared/screens/objects/auto-complete.screen';

const partnerContract = new PartnerContracts();
const autoCompletionScreen = new AutoCompleteScreen();

describe('Partner Contracts test suite: Company partner --- ', () => {
    beforeEach(() => {
        Contexts.switchToWebview();
        Preconditions.displayPartnerContractsIAA('P-1049-9732');
    });
    afterEach(() => {
        browser.reloadSession();
    });

    it('should display the proper contractsList for a company partner ', () => {
        const actualContractHeaders: Array<string> = partnerContract.getContractSubHeaders();
        expect(actualContractHeaders).toEqual(expectedSubHeaders);

        const actualContracts: number = partnerContract.getNumberOfContracts();
        expect(actualContracts).toEqual(expectedContracts);

        const actualInActiveContracts = partnerContract.getNumberOfInActiveContracts();
        expect(actualInActiveContracts).toEqual(expectedInActiveContracts);

        const actualActiveContractClickableStates: Array<boolean> = partnerContract.getActiveContractsEnableStates();
        expect(actualActiveContractClickableStates).toEqual(expectedActiveContractsClickableStates);

        const actualInActiveContractClickableStates: Array<boolean> = partnerContract.getInActiveContractsEnableStates();
        expect(actualInActiveContractClickableStates).toEqual(expectedInActiveContractsClickableStates);

        const actualInActiveContractPropertise: Array<string> = partnerContract.getInActiveContractProperties();

        expect(actualInActiveContractPropertise).toEqual(['0px none rgb(0, 0, 0)', '#f8f8f6']);

        partnerContract.clickToInActiveContracts();
    });
});

xdescribe('Partner Contracts test suite: Foreign contracts --- ', () => {
    beforeEach(() => {
        Contexts.switchToWebview();
        Preconditions.displayPartnerContractsIAA('P-1007-9196');
    });
    afterEach(() => {
        browser.reloadSession();
    });

    it('HAN-xxx: should be able to upload the foreign contract with premium format .000', () => {
        partnerContract.clickScanForeignContractButton();
        Contexts.acceptPermission();
        partnerContract.scanForeignContract();
        partnerContract.selectDefaultInsuranceType();

        const actualSelectingInsuranceType: string = partnerContract.getSelectedInsuranceType();
        expect(actualSelectingInsuranceType).toEqual('Haushalt');

        partnerContract.inputInsuranceProvider('axa');

        const actualAutoCompleteBoxes: number = autoCompletionScreen.getNumberOfAutoCompleteBoxes();
        expect(actualAutoCompleteBoxes).toEqual(3);

        const actualAutoCompleteValues: Array<string> = autoCompletionScreen.getValuesOfAutoCompleteBoxes();
        const expectedAutoCompleteValues: Array<string> = ['AXA Corporate Solutions', 'AXA Leben AG', 'AXA Winterthur'];
        expect(actualAutoCompleteValues).toEqual(expectedAutoCompleteValues);

        partnerContract.selectInsuranceProvider(2);

        const actualSelectingInsuranceProvider: string = partnerContract.getSelectingInsuranceProviderValue();
        expect(actualSelectingInsuranceProvider).toEqual('AXA Winterthur');

        partnerContract.turnOnSalesInfoContent();
        const actualSalesInfoToolTipContent = partnerContract.getSaleInfoToolTipContent();
        expect(actualSalesInfoToolTipContent).toEqual(
            'Sales Opportunity\nSetting the expiration date will automatically trigger a sales opportunity within the Sales Portal (VP).'
        );
        partnerContract.selectDefaultExpirationDate();

        partnerContract.turnOffSaleInfoContent();

        const actualDefaultAdditionalAttributeDisplayingStates: Array<boolean> = partnerContract.isAdditionalAttributesGroupDisplayed();
        expect(actualDefaultAdditionalAttributeDisplayingStates).toEqual([false, false]);

        partnerContract.tapExpandCollapseButton();
        partnerContract.inputAdditionalAttributes('300.500', 'VF48200', 'automation test');

        const actualInputtedPremiumAndPolicyNumber: Array<string> = partnerContract.getInputtedPremiumAndPolicyNumber();
        expect(actualInputtedPremiumAndPolicyNumber).toEqual(['300.50', 'VF48200']);
        partnerContract.tapAddButton();

        //todo: expectation here
    });
    it('HAN-xxx: should be able to upload the foreign contract', () => {
        partnerContract.clickScanForeignContractButton();
        Contexts.acceptPermission();
        partnerContract.scanForeignContract();
        partnerContract.selectDefaultInsuranceType();

        const actualSelectingInsuranceType: string = partnerContract.getSelectedInsuranceType();
        expect(actualSelectingInsuranceType).toEqual('Haushalt');

        partnerContract.inputInsuranceProvider('axa');

        const actualAutoCompleteBoxes: number = autoCompletionScreen.getNumberOfAutoCompleteBoxes();
        expect(actualAutoCompleteBoxes).toEqual(3);

        const actualAutoCompleteValues: Array<string> = autoCompletionScreen.getValuesOfAutoCompleteBoxes();
        const expectedAutoCompleteValues: Array<string> = ['AXA Corporate Solutions', 'AXA Leben AG', 'AXA Winterthur'];
        expect(actualAutoCompleteValues).toEqual(expectedAutoCompleteValues);

        partnerContract.selectInsuranceProvider(2);

        const actualSelectingInsuranceProvider: string = partnerContract.getSelectingInsuranceProviderValue();
        expect(actualSelectingInsuranceProvider).toEqual('AXA Winterthur');

        partnerContract.turnOnSalesInfoContent();
        const actualSalesInfoToolTipContent = partnerContract.getSaleInfoToolTipContent();
        expect(actualSalesInfoToolTipContent).toEqual(
            'Sales Opportunity\nSetting the expiration date will automatically trigger a sales opportunity within the Sales Portal (VP).'
        );
        partnerContract.selectDefaultExpirationDate();

        partnerContract.turnOffSaleInfoContent();

        const actualDefaultAdditionalAttributeDisplayingStates: Array<boolean> = partnerContract.isAdditionalAttributesGroupDisplayed();
        expect(actualDefaultAdditionalAttributeDisplayingStates).toEqual([false, false]);

        partnerContract.tapExpandCollapseButton();
        partnerContract.inputAdditionalAttributes('300', 'FR123456', 'automation test');

        const actualInputtedPremiumAndPolicyNumber: Array<string> = partnerContract.getInputtedPremiumAndPolicyNumber();
        expect(actualInputtedPremiumAndPolicyNumber).toEqual(['300', 'VF48200']);
        partnerContract.tapAddButton();

        //todo: expectation here
    });
});
