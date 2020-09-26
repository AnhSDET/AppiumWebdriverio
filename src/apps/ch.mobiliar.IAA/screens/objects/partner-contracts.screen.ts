import { Screen } from '../../../../shared/screens';
import { PartnerContractsSelectors } from '../selectors/partner-contracts.selectors';
import Gestures from '../../../../shared/helpers/gestures';
import { Contexts } from '../../../../shared/helpers';
import { DeviceType } from '../../../../shared/helpers';
import Input from '../../../../shared/helpers/input';
import { AutoCompleteScreen } from '../../../../shared/screens/objects/auto-complete.screen';
import { BaseDateTimeScreenActions } from '../../../../shared/screens/objects/base-date-time.screen.actions';

const deviceType = browser.capabilities['deviceType'];
const autoCompletionScreen = new AutoCompleteScreen();
const baseDate = new BaseDateTimeScreenActions();

export class PartnerContracts extends Screen {
    private contractSelector = new PartnerContractsSelectors();
    private scanbotSelector = new PartnerContractsSelectors();
    private foreignContractModalSelector = new PartnerContractsSelectors();

    public waitForScanbotSDKReady(): void {
        let readyScanbotSDKSelectors: Array<WebdriverIO.Element> = this.defineInitialScanbotSDKElements();
        Contexts.doTasksInNativeContext(() => {
            super.waitForElementsDisplay(readyScanbotSDKSelectors);
        });
    }

    private defineInitialScanbotSDKElements(): Array<WebdriverIO.Element> {
        let scanbotSDKElements: Array<WebdriverIO.Element> = [];
        scanbotSDKElements.push(
            this.scanbotSelector.cancelScanButton,
            this.scanbotSelector.multiPageButton,
            this.scanbotSelector.flashButton,
            this.scanbotSelector.autoButton
        );

        return scanbotSDKElements;
    }

    public getContractSubHeaders(): Array<string> {
        let subHeaderSelectors: Array<WebdriverIO.Element> = this.contractSelector.contractSubHeaders;
        let contractSubheaders: Array<string> = [];
        for (let index in subHeaderSelectors) {
            Gestures.scrollIntoView(subHeaderSelectors[index]);
            contractSubheaders.push(subHeaderSelectors[index].getText());
        }
        return contractSubheaders;
    }

    public getNumberOfContracts(): number {
        return this.contractSelector.contractsList.length;
    }

    public getNumberOfInActiveContracts(): number {
        return this.contractSelector.inActiveContracts.length;
    }

    public getInActiveContractsEnableStates(): Array<boolean> {
        const inActiveContractSelectors: Array<WebdriverIO.Element> = this.contractSelector.inActiveContracts;
        let inActiveContractStates: Array<boolean> = [];
        for (let index in inActiveContractSelectors) {
            Gestures.scrollIntoView(inActiveContractSelectors[index]);
            inActiveContractStates.push(inActiveContractSelectors[index].isEnabled());
        }
        return inActiveContractStates;
    }

    public getInActiveContractProperties(): Array<string> {
        const inActiveContractSelectors: Array<WebdriverIO.Element> = this.contractSelector.inActiveContracts;
        let inactiveContractPropertise: Array<string> = [];
        for (let i = 0; i < inActiveContractSelectors.length; i++) {
            Gestures.scrollIntoView(inActiveContractSelectors[i]);
            inactiveContractPropertise.push(
                inActiveContractSelectors[i].getCSSProperty('border').value,
                inActiveContractSelectors[i].getCSSProperty('background').parsed.hex
            );
            if ((i = 1)) {
                break;
            }
        }
        return inactiveContractPropertise;
    }

    public clickToInActiveContracts(): void {
        const inActiveContractSelectors: Array<WebdriverIO.Element> = this.contractSelector.inActiveContracts;
        for (let index in inActiveContractSelectors) {
            Gestures.scrollIntoView(inActiveContractSelectors[index]);
            inActiveContractSelectors[index].click();
        }
    }

    public getActiveContractsEnableStates(): Array<boolean> {
        const contractList: Array<WebdriverIO.Element> = this.contractSelector.contractsList;
        let activeContractSelectors: Array<WebdriverIO.Element> = [];
        activeContractSelectors.push(contractList[0], contractList[1]);

        let activeContractStates: Array<boolean> = [];
        for (let index in activeContractSelectors) {
            Gestures.scrollIntoView(activeContractSelectors[index]);
            activeContractStates.push(activeContractSelectors[index].isEnabled());
        }
        return activeContractStates;
    }

    public clickScanForeignContractButton(): void {
        Gestures.scrollIntoView(this.contractSelector.scanForeignContractButton[1]);
        this.contractSelector.scanForeignContractButton[1].click();
    }

    public scanForeignContract(): void {
        Contexts.doTasksInNativeContext(() => {
            this.tapNativeScanButton();
            this.tapScannedPage();
        });
        this.tapDoneButtonOnPreviewModal();
    }

    public tapNativeScanButton(): void {
        super.waitForElementDisplay(this.scanbotSelector.nativeScanButton);
        this.scanbotSelector.nativeScanButton.click();
    }

    public tapScannedPage(): void {
        /*super.waitForElementDisplay(this.scanbotSelector.scannedPage);
        this.scanbotSelector.scannedPage.clickAndWaitForNotDisplay();
        super.waitUntilElementNotDisplay(this.scanbotSelector.scannedPage);*/
        super.tapAndWaitForNotDisplay(this.scanbotSelector.scannedPage);
    }

    public tapDoneButtonOnPreviewModal(): void {
        super.waitForElementDisplay(this.scanbotSelector.doneButton);
        this.scanbotSelector.doneButton.click();
        super.waitForElementDisplay(this.foreignContractModalSelector.insuranceTypeSelectIcon);
    }

    public selectDefaultInsuranceType(): void {
        this.tapInsuranceTypeSelectIcon();
        Contexts.doTasksInNativeContext(() => {
            this.tapDoneButtonActionSheet();
        });
    }

    public getSelectedInsuranceType(): string {
        return this.foreignContractModalSelector.insuranceTypeSelectedValue.getText();
    }

    public inputInsuranceProviderAndSelectValue(whatInsuranceProvider: string, autoCompletePosition: number): void {
        Input.setInputValue(this.foreignContractModalSelector.insuranceProviderInput, whatInsuranceProvider, false, false);
        autoCompletionScreen.selectValueInAutoComplete(autoCompletePosition);
    }

    public inputInsuranceProvider(whatInsuranceProvider: string): void {
        Input.setInputValue(this.foreignContractModalSelector.insuranceProviderInput, whatInsuranceProvider, false, false);
    }

    public selectInsuranceProvider(autoCompletePosition: number): void {
        autoCompletionScreen.selectValueInAutoComplete(autoCompletePosition);
    }

    public getSelectingInsuranceProviderValue(): string {
        return this.foreignContractModalSelector.insuranceProviderInputSelectingValue.getValue();
    }

    public selectDefaultExpirationDate(): void {
        baseDate.selectDefaultDate();
    }

    public getSaleInfoToolTipContent(): string {
        let salesToolTipContentSelector: WebdriverIO.Element = this.foreignContractModalSelector.salesTooltipContent;
        let salesTooltipContent: string = salesToolTipContentSelector.getText();
        if (salesToolTipContentSelector.isDisplayed()) {
            return salesTooltipContent;
        } else {
            this.turnOnSalesInfoContent();
            return salesTooltipContent;
        }
    }

    public tapInsuranceTypeSelectIcon(): void {
        this.foreignContractModalSelector.insuranceTypeSelectIcon.click();
        Contexts.switchToNative();
    }

    public turnOnSalesInfoContent(): void {
        this.foreignContractModalSelector.saleInfoIcon.click();
        const tooltipContentSelector: WebdriverIO.Element = this.foreignContractModalSelector.salesTooltipContent;
        super.waitForElementDisplay(tooltipContentSelector);
    }

    public turnOffSaleInfoContent(): void {
        const salesToolTipContentDisplayingState: boolean = this.foreignContractModalSelector.salesTooltipContent.isDisplayed();
        if (salesToolTipContentDisplayingState) {
            const salesToolTipContentSelector: WebdriverIO.Element = this.foreignContractModalSelector.salesTooltipContent;
            this.foreignContractModalSelector.saleInfoIcon.click();
            super.waitUntilElementNotExistingStateReturn(salesToolTipContentSelector);
        } else throw Error('Review test case - now the salesToolTipContent Is Not Display to turn off');
    }

    public isSalesInfoToolTipContentDisplayed(): boolean {
        if (this.foreignContractModalSelector.salesTooltipContent.isExisting()) {
            return this.foreignContractModalSelector.salesTooltipContent.isDisplayed();
        } else {
            return false;
        }
    }

    public tapDoneButtonActionSheet(): void {
        super.tapAndWaitForNotDisplay(this.foreignContractModalSelector.actionSheetDoneButton);
    }

    public tapExpandCollapseButton(): void {
        this.foreignContractModalSelector.expandCollapseButton.click();
    }

    private waitForExpanedContentsDisplay(): void {
        super.waitForElementsDisplay(this.foreignContractModalSelector.annualPremiumAndPolicyNumberInputs);
        super.waitForElementsDisplay(this.foreignContractModalSelector.annualPremiumAndPolicyNumberLabels);
    }

    public isAdditionalAttributesGroupDisplayed(): Array<boolean> {
        let annualPremiumAndPolicyNumberLabelStates: Array<boolean> = [];
        const annualPremiumAndPolicyNumberLabelSelector: Array<WebdriverIO.Element> = this.foreignContractModalSelector
            .annualPremiumAndPolicyNumberLabels;
        for (let index in annualPremiumAndPolicyNumberLabelSelector) {
            annualPremiumAndPolicyNumberLabelStates.push(annualPremiumAndPolicyNumberLabelSelector[index].isDisplayed());
        }
        return annualPremiumAndPolicyNumberLabelStates;
    }

    public inputAdditionalAttributes(howMuchPremium: string, whatIsPolicyNumber: string, inputYourRemarks: string): void {
        this.waitForExpanedContentsDisplay();
        this.inputAnnualPremium(howMuchPremium);
        this.inputPolicyNumber(whatIsPolicyNumber);
        this.inputRemarks(inputYourRemarks);
        Input.hideKeyboard();
    }

    public inputAnnualPremium(howMuchPremium: string): void {
        const premiumInputSelector = this.foreignContractModalSelector.annualPremiumNativeInput;
        Input.inputToSpecialInputField(premiumInputSelector, howMuchPremium);
    }

    public getInputtedPremiumAndPolicyNumber(): Array<string> {
        const premiumAndPolicyEle: Array<WebdriverIO.Element> = this.foreignContractModalSelector.annualPremiumAndPolicyNumberInputs;
        let inputtedPremiumAndPolicyNumberValues: Array<string> = [];
        for (let index in premiumAndPolicyEle) {
            Gestures.scrollIntoView(premiumAndPolicyEle[index]);
            inputtedPremiumAndPolicyNumberValues.push(premiumAndPolicyEle[index].getValue());
        }
        return inputtedPremiumAndPolicyNumberValues;
    }

    public inputPolicyNumber(whatIsPolicyNumber: string): void {
        const policyNumberInputSelector = this.foreignContractModalSelector.annualPremiumAndPolicyNumberInputs[1];
        Input.setInputValue(policyNumberInputSelector, whatIsPolicyNumber, false, false);
    }

    public inputRemarks(inputYourRemarks: string): void {
        const remarkInputSelector: WebdriverIO.Element = this.foreignContractModalSelector.remarks;
        Input.setInputValue(remarkInputSelector, inputYourRemarks, false, false);
    }

    public tapAddButton(): void {
        const addButtonSelector: WebdriverIO.Element = this.foreignContractModalSelector.addButton;
        Gestures.clickAndWaitForNotDisplay(addButtonSelector);
    }

    public isErrorToolTipAboveButtonDisplayed(): boolean {
        return this.foreignContractModalSelector.errorToolTipAboveButton.isDisplayed();
    }

    public getErrorToolTipAboveButtonContent(): string {
        let errorContent: string = this.foreignContractModalSelector.errorToolTipAboveButton.getText();
        return errorContent;
    }

    private tapNativeScanButtonByCoordinate(): void {
        Contexts.doTasksInNativeContext(() => {
            browser.touchPerform([
                {
                    action: 'tap',
                    options: {
                        x: 188,
                        y: 706
                    }
                }
            ]);
        });
    }
}

const expectedSubHeaders: Array<string> = ['Active', 'Inactive', 'Foreign Contracts'];
const expectedContracts: number = 5;
const expectedInActiveContracts: number = 3;
const expectedInActiveContractsClickableStates: Array<boolean> = [true, true, true];
const expectedActiveContractsClickableStates: Array<boolean> = [true, true];

export {
    expectedSubHeaders,
    expectedContracts,
    expectedInActiveContracts,
    expectedInActiveContractsClickableStates,
    expectedActiveContractsClickableStates
};
