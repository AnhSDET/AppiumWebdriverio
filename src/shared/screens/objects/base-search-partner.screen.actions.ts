import { Screen } from '../screen';
import { BaseSearchPartnerSelectors } from '../selectors/base-search-partner.selectors';
import Input from '../../helpers/input';
import { alertDialog } from './alert-dialog.screen.actions';
import { BaseHeaderToolbarSelectors } from '../selectors/base.header-toolbar.selectors';
import Gestures from '../../helpers/gestures';
import { Contexts } from '../../helpers';

export class BaseSearchPartnerScreenActions extends Screen {
    private baseSearchPartnerSelectors = new BaseSearchPartnerSelectors();

    constructor(appName?: string) {
        super();
        this.baseSearchPartnerSelectors = new BaseSearchPartnerSelectors(appName);
    }

    private defineScreenElements(): Array<WebdriverIO.Element> {
        const searchPartnerElements: Array<WebdriverIO.Element> = [];
        searchPartnerElements.push(
            this.baseSearchPartnerSelectors.contractNumberSegment,
            this.baseSearchPartnerSelectors.partnerNumberSegment,
            this.baseSearchPartnerSelectors.numberTypeLabel,
            this.baseSearchPartnerSelectors.numberLabel, //todo should use the basicLabels Selectors
            this.baseSearchPartnerSelectors.lastNameLabel, //todo
            this.baseSearchPartnerSelectors.firstNameLabel, //todo
            this.baseSearchPartnerSelectors.zipPlaceLabel,
            this.baseSearchPartnerSelectors.streetLabel,
            this.baseSearchPartnerSelectors.searchPartnerButton
        );
        return searchPartnerElements;
    }

    private definePartnerAttributes(): Array<WebdriverIO.Element> {
        const partnerAttributes: Array<WebdriverIO.Element> = [];
        partnerAttributes.push(
            this.baseSearchPartnerSelectors.lastNameLabel,
            this.baseSearchPartnerSelectors.lastNameOrCompanyInput,
            this.baseSearchPartnerSelectors.firstNameLabel,
            this.baseSearchPartnerSelectors.firstNameOrCompanyInput,
            this.baseSearchPartnerSelectors.zipPlaceLabel,
            this.baseSearchPartnerSelectors.zipInput,
            this.baseSearchPartnerSelectors.streetLabel,
            this.baseSearchPartnerSelectors.streetInput
        );
        return partnerAttributes;
    }

    private definePartnerSearchInputs(): Array<WebdriverIO.Element> {
        return this.baseSearchPartnerSelectors.searchInputs;
    }

    public clearInputtedStreetAndInputNewStreet(street: string): void {
        Input.setInputValue(this.definePartnerSearchInputs()[2], street, true, true);
    }

    public inputPartnerAttributes(lastName: string, firstName: string, zip: string, street: string, phone: string): void {
        const partnerSearchInputs: Array<WebdriverIO.Element> = this.definePartnerSearchInputs();

        Input.setInputValue(partnerSearchInputs[1], lastName, false, true);

        Input.setInputValue(partnerSearchInputs[2], firstName, false, true);
        Input.setInputValue(partnerSearchInputs[3], street, false, true);

        this.enterZipInput(zip);
        this.selectAutoCompleteZip();
        this.inputPhoneNumber(phone);
    }

    private definePhoneNumber(): WebdriverIO.Element {
        return this.baseSearchPartnerSelectors.phoneNativeInput;
    }

    public inputPhoneNumber(phone: string): void {
        const phoneNativeInput: WebdriverIO.Element = this.definePhoneNumber();
        Contexts.doTasksInNativeContext(() => {
            if (phoneNativeInput.getText() == '') {
                phoneNativeInput.addValue(phone);
            } else {
                phoneNativeInput.clearValue();
                phoneNativeInput.setValue(phone);
            }
        });
    }

    public waitForDisplay(): void {
        super.waitForElementDisplay(this.baseSearchPartnerSelectors.closeModalButton);
        super.waitForElementDisplay(this.baseSearchPartnerSelectors.searchPartnerScreenIdentity);
    }

    public waitForPartnerNumberAndAttributes(): void {
        super.waitForElementsDisplay(this.baseSearchPartnerSelectors.partnerAttributesAndNumber);
        super.waitForElementsDisplay(this.definePartnerSearchInputs());
    }

    public waitForNotDisplay(): void {
        super.waitUntilElementNotDisplay(this.baseSearchPartnerSelectors.closeModalButton);
        super.waitUntilElementNotDisplay(this.baseSearchPartnerSelectors.searchPartnerScreenIdentity);
    }

    public waitForSearchResultDisplay(): void {
        super.waitForElementDisplay(this.baseSearchPartnerSelectors.searchCriteriaLabelOnSearchResult);
    }

    public tapPenIcon(): void {
        this.baseSearchPartnerSelectors.penEditIcon.click();
        super.waitUntilElementNotDisplay(this.baseSearchPartnerSelectors.penEditIcon);
    }

    public tapCloseSearchPartnerScreenButton(): void {
        this.baseSearchPartnerSelectors.closeModalButton.click();
        super.waitUntilElementNotDisplay(this.baseSearchPartnerSelectors.closeModalButton);
    }

    public tapPartnerNumberTab(): void {
        this.baseSearchPartnerSelectors.partnerNumberSegment.click();
    }

    public enterNumberInput(value: string): void {
        Input.setInputValue(this.baseSearchPartnerSelectors.numberInput, value, false, true);
    }

    public inputLastNameOrCompanyInput(value: any): void {
        Input.setInputValue(this.baseSearchPartnerSelectors.lastNameOrCompanyInput, value, false, true);
    }

    public getInputtedLastName(): string {
        const partnerSearchInputs: Array<WebdriverIO.Element> = this.definePartnerSearchInputs();
        return partnerSearchInputs[0].getValue();
    }

    public inputFirstNameOrCompanyInput(value: any): void {
        const partnerSearchInputs: Array<WebdriverIO.Element> = this.definePartnerSearchInputs();
        Input.setInputValue(partnerSearchInputs[1], value, false, true);
    }

    public getInputtedFirstName(): string {
        const partnerSearchInputs: Array<WebdriverIO.Element> = this.definePartnerSearchInputs();
        return partnerSearchInputs[1].getValue();
    }

    public enterZipInput(value: any): void {
        Input.setInputValue(this.baseSearchPartnerSelectors.zipInput, value, false, true);
        super.waitForElementDisplay(this.baseSearchPartnerSelectors.zipSelectBox);
    }

    public getInputtedZip(): string {
        return this.baseSearchPartnerSelectors.zipInput.getValue();
    }

    public selectAutoCompleteZip(): void {
        this.baseSearchPartnerSelectors.zipSelectBox.click();
    }

    public enterStreetInput(value: any): void {
        Input.setInputValue(this.baseSearchPartnerSelectors.streetInput, value);
    }

    public enterPartnerAttributeInputs(lastName?: string, firstName?: string, zip?: string, street?: string) {
        lastName && this.inputLastNameOrCompanyInput(lastName);
        firstName && this.inputFirstNameOrCompanyInput(firstName);
        if (zip) {
            this.enterZipInput(zip);
            this.selectAutoCompleteZip();
        }
        street && this.enterStreetInput(street);
    }

    public isInputErrorIconDisplayed(): Array<boolean> {
        const errorIconSelectors: Array<WebdriverIO.Element> = this.baseSearchPartnerSelectors.inputErrorIcon;
        let errorIconStates: Array<boolean> = [];
        for (let index in errorIconSelectors) {
            errorIconStates.push(errorIconSelectors[index].isDisplayed());
        }
        return errorIconStates;
    }

    public tapErrorInputAndGetInputErrorContent(inputPosition: number): Array<string> {
        const partnerSearchInputs: Array<WebdriverIO.Element> = this.definePartnerSearchInputs();
        partnerSearchInputs[inputPosition].click();
        const errorContentSelector: Array<WebdriverIO.Element> = this.baseSearchPartnerSelectors.inputErrorContent;
        super.waitForElementsDisplay(errorContentSelector);
        let errorContent: Array<string> = [];
        for (let index in errorContentSelector) {
            errorContent.push(errorContentSelector[index].getText().trim());
        }
        return errorContent;
    }

    public getCSSPropertyOfErrors(): Array<boolean> {
        const errorIconSelectors: Array<WebdriverIO.Element> = this.baseSearchPartnerSelectors.inputErrorIcon;
        let errorIconCSSProperties: Array<any> = [];
        for (let index in errorIconSelectors) {
            errorIconCSSProperties.push(errorIconSelectors[index].getCSSProperty('--error-color'));
        }
        return errorIconCSSProperties;
    }

    public tapContractNumberTab(): void {
        this.baseSearchPartnerSelectors.contractNumberSegment.click();
        super.waitUntilElementNotDisplay(this.baseSearchPartnerSelectors.zipInput);
    }

    public tapSearchPartnerButtonAndAvoidFailedSearchApi(): void {
        Gestures.scrollIntoView(this.baseSearchPartnerSelectors.searchPartnerButton);
        this.baseSearchPartnerSelectors.searchPartnerButton.click();
        browser.pause(3000);
        let alertError: boolean;
        for (let i = 0; i < 2; i++) {
            alertError = alertDialog.isAlertDialogDisplayed();
            if (alertError) {
                alertDialog.tapAlertDialogButtonFirst();
                this.baseSearchPartnerSelectors.searchPartnerButton.click();
                browser.pause(3000);
            }
        }
    }

    public tapSearchButton(): void {
        Gestures.scrollIntoView(this.baseSearchPartnerSelectors.searchPartnerButton);
        this.baseSearchPartnerSelectors.searchPartnerButton.click();
    }

    public tapSearchPartnerButtonAndWait(): void {
        this.tapSearchPartnerButtonAndAvoidFailedSearchApi();
        super.waitUntilElementsNotDisplay(this.definePartnerSearchInputs());
        super.waitUntilElementNotDisplay(this.baseSearchPartnerSelectors.searchPartnerButton);
        this.waitForSearchResultDisplay();
    }

    public searchByNumber(whichNumber: string) {
        this.enterNumberInput(whichNumber);
        this.tapSearchPartnerButtonAndWait();
    }

    public getPartnerAttributes(): WebdriverIO.Element[] {
        return this.baseSearchPartnerSelectors.partnerAttributesAndNumber;
    }

    public getPartnerAttributeLabelsAfterInputNumber(): WebdriverIO.Element[] {
        return this.baseSearchPartnerSelectors.basicLabels;
    }

    public arePartnerAttributesDisplayed(): boolean {
        let partnerAttributesBeforeInputNumber: Array<WebdriverIO.Element> = this.getPartnerAttributes();
        let labelsAfterInputNumber: Array<WebdriverIO.Element> = this.getPartnerAttributeLabelsAfterInputNumber();
        let labelsAfterInputNumberText: Array<any> = [];
        let expectedLabelAfterInputNumberText: Array<any> = ['Number'];
        for (let index in labelsAfterInputNumber) {
            labelsAfterInputNumberText.push(labelsAfterInputNumber[index].getText());
        }
        if (partnerAttributesBeforeInputNumber === labelsAfterInputNumber) {
            throw Error('Partner Attributes might still display');
        }

        if (labelsAfterInputNumberText.length == 1 && labelsAfterInputNumberText == expectedLabelAfterInputNumberText) {
        } else return true;
    }

    public searchPartnerByPartnerAttributes(lastName?: string, firstName?: string, zip?: string, street?: string) {
        this.enterPartnerAttributeInputs(lastName, firstName, zip, street);
        this.tapSearchPartnerButtonAndWait();
    }

    public inputContractNumberInput(value: string): void {
        Input.setInputValue(this.baseSearchPartnerSelectors.contractNumberInput, value, false, false);
    }

    public searchPartnerByContractNumber(contractNumber: string) {
        this.inputContractNumberInput(contractNumber);
        this.tapSearchPartnerButtonAndWait();
    }

    public tapFoundPartnerOnSearchResultAndWait(whichPartnerIndex: number): void {
        this.baseSearchPartnerSelectors.searchFoundPartners[whichPartnerIndex].click();
        // this.baseSearchPartnerSelectors.searchFoundPartner.clickAndWaitForNotDisplay();
        this.waitForNotDisplay();
    }

    public getNumberOfFoundPartnersAfterSearched(): number {
        return this.baseSearchPartnerSelectors.searchFoundPartners.length;
    }

    public getEmptySearchResultText(): string {
        return this.baseSearchPartnerSelectors.emptyPartnerOnSearchResult.getText();
    }

    public getFoundPartnerAfterSearched(): Array<string> {
        let foundPartner: Array<string> = [];
        let partnerFullname: string = this.baseSearchPartnerSelectors.foundPartnerFullName.getText();
        let partnerDOB: string = this.baseSearchPartnerSelectors.foundPartnerDOBAndAddress[0].getText().trim();
        let partnerAddress: string = this.baseSearchPartnerSelectors.foundPartnerDOBAndAddress[1].getText();
        foundPartner.push(partnerFullname, partnerDOB, partnerAddress);
        return foundPartner;
    }

    public getTextOfSearchInfoOnSearchResult(): Array<string> {
        let criteriaByPartner: Array<string> = [];
        criteriaByPartner.push(
            this.baseSearchPartnerSelectors.searchCriteriaLabelOnSearchResult.getText(),
            this.baseSearchPartnerSelectors.searchCriteriaBy.getText()
        );
        return criteriaByPartner;
    }

    public getSearchInfoEllipsisIPhone(): any {
        let info: Array<string> = [];
        info.push(this.baseSearchPartnerSelectors.searchCriteriaBy.getCSSProperty('text-overflow').value);
        info.push(this.baseSearchPartnerSelectors.searchCriteriaBy.getCSSProperty('white-space').value);
        info.push(this.baseSearchPartnerSelectors.searchCriteriaBy.getCSSProperty('overflow').value);

        return info;
    }
}

const expectedSearchByPartnerNumberInfo: Array<string> = ['Search Criteria', 'Partner Number 10079196'];
const expectedFoundPartnerNameBruno: Array<string> = ['Bruno Zebert', '27.03.1972 (48)', 'Bollwerk 4, 3011 Bern'];
const expectedFoundPartnerNameClaudio: Array<string> = ['Claudio Schuerch', '31.10.1968 (51)', 'impasse de la Golette, 1552 Trey'];
const expectedSearchInfoEllipsis: Array<string> = ['ellipsis', 'nowrap', 'hidden'];
export { expectedFoundPartnerNameBruno, expectedFoundPartnerNameClaudio, expectedSearchByPartnerNumberInfo, expectedSearchInfoEllipsis };
