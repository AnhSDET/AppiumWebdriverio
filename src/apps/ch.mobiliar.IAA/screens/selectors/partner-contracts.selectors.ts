import Gestures from '../../../../shared/helpers/gestures';

export class PartnerContractsSelectors {
    private readonly contractSelectors = {
        spinner: 'div.spinner-container',
        contractSubHeaders: 'div.sub-header',
        contracts: 'div.child-page-content mobi-card',
        contractTitle: 'div.child-page-content mobi-card span.title',
        contractContents: 'div.child-page-content mobi-card div.content div',
        scanForeignContractButton: 'ion-content div mobi-area mobi-icon',
        unableToLoadForeignContract: 'mobi-hint.warning-box',
        nativeScanButton:
            '//XCUIElementTypeApplication[@name="Distribution"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[3]/XCUIElementTypeOther/XCUIElementTypeButton[1]',
        scannedPage: '//XCUIElementTypeStaticText[@name="1 Page(s)"]',
        cancelScanButton: '//XCUIElementTypeButton[@name="Cancel"]',
        multiPageButton: '//XCUIElementTypeButton[@name="Multi-Page"]',
        flashButton: '//XCUIElementTypeButton[@name="Flash"]',
        autoButton: '//XCUIElementTypeButton[@name="Auto"]'
    };

    private readonly previewForeignContractSelectors = {
        doneButton: 'preview-foreign-contract-modal ion-header ion-button'
    };

    private readonly addForeignContractModalSelectors = {
        scanDocumentCard: 'mobi-item-card mobi-card',
        insuranceTypeSelectIcon: 'ion-item div.insurance-type-select-container mobi-icon',
        insuranceTypeSelectedValue: 'div.insurance-type-select-container div.content',
        actionSheetDoneButton: '~Done',
        actionSheetCancelButton: '~Cancel',
        insuranceProvider: 'mobi-auto-complete div.input__content input.native-input',
        saleInfo: 'div.hint-icon mobi-icon', // ion-icon
        tooltipContent: 'mobi-input-tooltip div.input-tooltip__content',
        datePickerIcon: 'div.input__content ion-datetime',
        expandCollapseButton: 'div #aspect-content div.aspect-tab label',
        additionalAttributeLabel: 'div #aspect-content div.aspect-tab div span.aspect-name',
        annualPremiumAndPolicyNumberLabels: 'mobi-item-input div ion-label',
        annualPremiumAndPolicyNumberInputs: 'mobi-item-input input.native-input',
        annualPremiumNativeInput: '(//XCUIElementTypeOther[@name="main"])[3]/XCUIElementTypeTextField[1]',
        remark: 'div textarea',
        addButton: 'div.button-content button',
        errorToolTipAboveButton: 'div.invalid-tooltip__content mobi-hint div.container',
        errorIconOfInsuranceType: 'div.insurance-type-select-container mobi-icon.icon-error',
        errorIconOfInsuranceProvider: 'mobi-auto-complete div.input__content.input__content--invalid div.icon__container',
        errorToolTipOfInsuranceProvider: 'mobi-input-tooltip div.input-tooltip__content'
    };

    public get spinnerLoadingContracts(): WebdriverIO.Element {
        return $(this.contractSelectors.spinner);
    }

    public get contractSubHeaders(): Array<WebdriverIO.Element> {
        return $$(this.contractSelectors.contractSubHeaders);
    }

    public get contractsList(): Array<WebdriverIO.Element> {
        return $$(this.contractSelectors.contracts);
    }

    public get contractTitle(): Array<WebdriverIO.Element> {
        return $$(this.contractSelectors.contractTitle);
    }

    public get contractContents(): Array<WebdriverIO.Element> {
        return $$(this.contractSelectors.contractContents);
    }

    public get contractsTitlesAndContents(): Array<WebdriverIO.Element>[] {
        let allContracts: Array<WebdriverIO.Element>[] = [];
        for (let i = 0; i < this.contractsList.length; i++) {
            let title: WebdriverIO.Element = this.contractTitle[i];
            Gestures.scrollIntoView(title);

            let content: WebdriverIO.Element = this.contractContents[i];
            Gestures.scrollIntoView(content);
            allContracts.push();
        }
        return allContracts;
    }

    public get inActiveContracts(): Array<WebdriverIO.Element> {
        return $$(this.contractSelectors.contracts.concat('.view-only'));
    }

    public get scanForeignContractButton(): Array<WebdriverIO.Element> {
        return $$(this.contractSelectors.scanForeignContractButton);
    }

    public get unableToLoadForeignContract(): WebdriverIO.Element {
        return $(this.contractSelectors.unableToLoadForeignContract);
    }

    public get scannedPage(): WebdriverIO.Element {
        return $(this.contractSelectors.scannedPage);
    }

    public get nativeScanButton(): WebdriverIO.Element {
        return $(this.contractSelectors.nativeScanButton);
    }

    public get cancelScanButton(): WebdriverIO.Element {
        return $(this.contractSelectors.cancelScanButton);
    }

    public get multiPageButton(): WebdriverIO.Element {
        return $(this.contractSelectors.cancelScanButton);
    }

    public get flashButton(): WebdriverIO.Element {
        return $(this.contractSelectors.cancelScanButton);
    }

    public get autoButton(): WebdriverIO.Element {
        return $(this.contractSelectors.autoButton);
    }

    public get doneButton(): WebdriverIO.Element {
        return $(this.previewForeignContractSelectors.doneButton);
    }

    public get scanDocumentCard(): WebdriverIO.Element {
        return $(this.addForeignContractModalSelectors.scanDocumentCard);
    }

    public get scanDocumentIcon(): WebdriverIO.Element {
        return $(this.addForeignContractModalSelectors.scanDocumentCard.concat(' mobi-icon ion-icon'));
    }

    public get scanDocumentTitleAndContent(): WebdriverIO.Element {
        return $(this.addForeignContractModalSelectors.scanDocumentCard.concat(' div.container'));
    }

    public get insuranceTypeSelectIcon(): WebdriverIO.Element {
        return $(this.addForeignContractModalSelectors.insuranceTypeSelectIcon);
    }

    public get actionSheetDoneButton(): WebdriverIO.Element {
        return $(this.addForeignContractModalSelectors.actionSheetDoneButton);
    }

    public get actionSheetCancelButton(): WebdriverIO.Element {
        return $(this.addForeignContractModalSelectors.actionSheetCancelButton);
    }

    public get insuranceProviderInput(): WebdriverIO.Element {
        return $(this.addForeignContractModalSelectors.insuranceProvider);
    }

    public get insuranceProviderInputSelectingValue(): WebdriverIO.Element {
        return $(this.addForeignContractModalSelectors.insuranceProvider); //.shadow$('div div div');
    }

    public get saleInfoIcon(): WebdriverIO.Element {
        return $(this.addForeignContractModalSelectors.saleInfo);
    }

    public get salesTooltipContent(): WebdriverIO.Element {
        return $(this.addForeignContractModalSelectors.tooltipContent);
    }

    public get expirationDatePickerIcon(): WebdriverIO.Element {
        return $(this.addForeignContractModalSelectors.datePickerIcon);
    }

    public get expandCollapseButton(): WebdriverIO.Element {
        return $(this.addForeignContractModalSelectors.expandCollapseButton);
    }

    public get additionalAttributeLabel(): WebdriverIO.Element {
        return $(this.addForeignContractModalSelectors.additionalAttributeLabel);
    }

    public get annualPremiumAndPolicyNumberInputs(): Array<WebdriverIO.Element> {
        return $$(this.addForeignContractModalSelectors.annualPremiumAndPolicyNumberInputs);
    }

    public get annualPremiumNativeInput(): WebdriverIO.Element {
        return $(this.addForeignContractModalSelectors.annualPremiumNativeInput);
    }

    public get annualPremiumAndPolicyNumberLabels(): Array<WebdriverIO.Element> {
        return $$(this.addForeignContractModalSelectors.annualPremiumAndPolicyNumberLabels);
    }

    public get remarks(): WebdriverIO.Element {
        return $(this.addForeignContractModalSelectors.remark);
    }

    public get addButton(): WebdriverIO.Element {
        return $(this.addForeignContractModalSelectors.addButton);
    }

    public get errorToolTipAboveButton(): WebdriverIO.Element {
        return $(this.addForeignContractModalSelectors.errorToolTipAboveButton);
    }

    public get errorIconOfInsuranceType(): WebdriverIO.Element {
        return $(this.addForeignContractModalSelectors.errorIconOfInsuranceType);
    }

    public get errorIconOfInsuranceProvider(): WebdriverIO.Element {
        return $(this.addForeignContractModalSelectors.errorIconOfInsuranceProvider);
    }

    public get errorToolTipOfInsuranceProvider(): WebdriverIO.Element {
        return $(this.addForeignContractModalSelectors.errorToolTipOfInsuranceProvider);
    }

    public get insuranceTypeSelectedValue(): WebdriverIO.Element {
        return $(this.addForeignContractModalSelectors.insuranceTypeSelectedValue);
    }
}
