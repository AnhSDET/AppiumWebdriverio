import { DeviceType } from '../../helpers';

const deviceType = browser.capabilities['deviceType'];

export class BaseSearchPartnerSelectors {
    private readonly headerModalSelectors = {
        closeModalButton: 'ion-modal ion-toolbar ion-buttons',
        searchPartnerScreenIdentity: 'ion-modal ion-header ion-title',
        searchPartnerScreenIdentityiPad: 'ion-modal ion-header ion-toolbar span'
    };

    private readonly searchFormSelectors = {
        segmentButtons: 'div.search-form ion-segment ion-segment-button',
        rowAttribute: 'mobi-item-input ion-input',
        searchInputs: 'mobi-item-input ion-input input.native-input',
        phone: '(//XCUIElementTypeOther[@name="main"])[2]/XCUIElementTypeTextField[4]',
        zipInput: 'mobi-auto-complete ion-input input.native-input',
        zipSelectBox: 'ul li',
        contractNumberInput: '',
        inputErrorIcon: 'div.invalid-icon mobi-icon.icon-error',
        inputErrorContent: 'div.input-tooltip__content span',
        searchCriteriaLabel: '',
        numberTypeLabel: 'ion-item ion-label',
        zipPlaceLabel: 'mobi-auto-complete ion-label',
        basicLabels: 'mobi-item-input ion-label', //number,last,first,street
        searchPartnerButton: 'form div.search-btn ion-button'
    };

    private readonly searchResultSelectors = {
        searchCriteriaLabelOnSearchResult: 'div.search-info div.header',
        penEditIcon: 'div.edit-icon ion-icon',
        searchCriteriaBy: 'div.criteria',
        searchPartnerResult: 'div.search-result',
        foundPartnerFullName: 'div.search-item-title',
        foundPartnerDOBAndAddress: 'div.search-item-detail div'
    };

    constructor(appName?: string) {
        if (appName === 'IAA') {
            this.searchFormSelectors.searchPartnerButton = 'form div.search-btn ion-button';
        }
    }

    public get searchInputs(): WebdriverIO.Element[] {
        return $$(this.searchFormSelectors.searchInputs);
    }

    public get searchCriteriaBy(): WebdriverIO.Element {
        return $(this.searchResultSelectors.searchCriteriaBy);
    }

    public get penEditIcon(): WebdriverIO.Element {
        return $(this.searchResultSelectors.penEditIcon);
    }

    public get searchCriteriaLabelOnSearchResult(): WebdriverIO.Element {
        return $(this.searchResultSelectors.searchCriteriaLabelOnSearchResult);
    }

    public get foundPartnerFullName(): WebdriverIO.Element {
        return $(this.searchResultSelectors.foundPartnerFullName);
    }

    public get foundPartnerDOBAndAddress(): WebdriverIO.Element[] {
        return $$(this.searchResultSelectors.foundPartnerDOBAndAddress);
    }

    public get closeModalButton(): WebdriverIO.Element {
        return $(this.headerModalSelectors.closeModalButton);
    }

    public get rowAttribute(): WebdriverIO.Element[] {
        return $$(this.searchFormSelectors.rowAttribute);
    }

    public get searchPartnerButton(): WebdriverIO.Element {
        return $(this.searchFormSelectors.searchPartnerButton);
    }

    public get searchPartnerScreenIdentity(): WebdriverIO.Element {
        if (deviceType == DeviceType.iPhone) {
            return $(this.headerModalSelectors.searchPartnerScreenIdentity);
        } else {
            return $(this.headerModalSelectors.searchPartnerScreenIdentityiPad);
        }
    }

    public get partnerNumberSegment(): WebdriverIO.Element {
        return $$(this.searchFormSelectors.segmentButtons)[0];
    }

    public get contractNumberSegment(): WebdriverIO.Element {
        return $$(this.searchFormSelectors.segmentButtons)[1];
    }

    public get numberInput(): WebdriverIO.Element {
        return $$(this.searchFormSelectors.searchInputs)[0];
    }

    public get lastNameOrCompanyInput(): WebdriverIO.Element {
        return $$(this.searchFormSelectors.searchInputs)[1];
    }

    public get firstNameOrCompanyInput(): WebdriverIO.Element {
        return $$(this.searchFormSelectors.searchInputs)[2];
    }

    public get zipInput(): WebdriverIO.Element {
        return $(this.searchFormSelectors.zipInput);
    }

    public get inputtedZip(): WebdriverIO.Element {
        return $(this.searchFormSelectors.zipInput).shadow$('div');
    }

    public get zipSelectBox(): WebdriverIO.Element {
        return $(this.searchFormSelectors.zipSelectBox);
    }

    public get streetInput(): WebdriverIO.Element {
        return $$(this.searchFormSelectors.searchInputs)[3];
    }

    public get phoneNativeInput(): WebdriverIO.Element {
        if (this.basicLabels[0].getText() == 'Number') {
            return $(this.searchFormSelectors.phone.replace('[4]', '[5]'));
        } else return $(this.searchFormSelectors.phone);
    }

    public get contractNumberInput(): WebdriverIO.Element {
        return $(this.searchFormSelectors.searchInputs);
    }

    public get inputErrorIcon(): Array<WebdriverIO.Element> {
        return $$(this.searchFormSelectors.inputErrorIcon);
    }

    public get inputErrorContent(): Array<WebdriverIO.Element> {
        let errorTitle: string = this.searchFormSelectors.inputErrorContent.concat('.input-tooltip__title');
        let errorContent: string = this.searchFormSelectors.inputErrorContent.concat('.input-tooltip__message');

        let errorTitleAndContent: Array<WebdriverIO.Element> = [];
        errorTitleAndContent.push($(errorTitle), $(errorContent));
        return errorTitleAndContent;
    }

    public get numberTypeLabel(): WebdriverIO.Element {
        return $(this.searchFormSelectors.numberTypeLabel);
    }

    public get numberLabel(): WebdriverIO.Element {
        return $$(this.searchFormSelectors.basicLabels)[0];
    }

    public get lastNameLabel(): WebdriverIO.Element {
        return $$(this.searchFormSelectors.basicLabels)[1];
    }

    public get firstNameLabel(): WebdriverIO.Element {
        return $$(this.searchFormSelectors.basicLabels)[2];
    }

    public get zipPlaceLabel(): WebdriverIO.Element {
        return $(this.searchFormSelectors.zipPlaceLabel);
    }

    public get streetLabel(): WebdriverIO.Element {
        return $$(this.searchFormSelectors.basicLabels)[3];
    }

    public get searchCriteriaLabel(): WebdriverIO.Element {
        return $(this.searchFormSelectors.searchCriteriaLabel);
    }

    public get searchFoundPartner(): WebdriverIO.Element {
        return $(this.searchResultSelectors.searchPartnerResult.concat(' div.search-item'));
    }

    public get searchFoundPartners(): WebdriverIO.Element[] {
        return $$(this.searchResultSelectors.searchPartnerResult.concat(' div.search-item'));
    }

    public get emptyPartnerOnSearchResult(): WebdriverIO.Element {
        return $(this.searchResultSelectors.searchPartnerResult.concat(' div.empty-result span'));
    }

    public get partnerAttributesAndNumber(): WebdriverIO.Element[] {
        let partnerAttributes: Array<WebdriverIO.Element> = [];
        let basicLabels: Array<WebdriverIO.Element> = $$(this.searchFormSelectors.basicLabels);
        for (let i = 1; i < basicLabels.length; i++) {
            partnerAttributes.push(basicLabels[i]);
        }
        return partnerAttributes;
    }

    public get basicLabels(): WebdriverIO.Element[] {
        return $$(this.searchFormSelectors.basicLabels);
    }
}
