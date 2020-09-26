import { BaseSearchPartnerSelectors } from '../../../../shared/screens/selectors/base-search-partner.selectors';

const baseSearchPartnerSelector = new BaseSearchPartnerSelectors();

export class SearchPartnerSelectorsIAA {
    private readonly selectors = {
        //searchPartnerCloseButton: 'ion-modal ion-header ion-buttons',
        //searchPartnerTitle: 'ion-header ion-title',
        searchSegments: 'div.search-header ion-segment ion-segment-button',
        partnerSearchSegment: 'span.segment-text.content--ellipsis=Partner search',
        quickSearchInput: 'ion-row.search-bar__container input',
        quickSearchInputFocusBorder: 'ion-row.search-bar__container--has-border-purple',
        quickSearchButton: 'div.search-btn ion-button',
        vehicleRegistrationNumber: '(//XCUIElementTypeOther[@name="main"])[2]/XCUIElementTypeTextField[6]',
        clearIconOnQuickSearch: 'div.search-bar__icon--has-none-background mobi-icon ion-icon'
    };

    public get quickSearchInputFocusBorder(): WebdriverIO.Element {
        return $(this.selectors.quickSearchInputFocusBorder);
    }

    public get searchSegments(): WebdriverIO.Element[] {
        return $$(this.selectors.searchSegments);
    }

    public get partnerSearchSegment(): WebdriverIO.Element {
        return $(this.selectors.partnerSearchSegment);
    }

    public get quickSearchInput(): WebdriverIO.Element {
        return $(this.selectors.quickSearchInput);
    }

    public get quickSearchButton(): WebdriverIO.Element {
        return $(this.selectors.quickSearchButton);
    }

    public get vehicleRegistrationNumber(): WebdriverIO.Element {
        if (baseSearchPartnerSelector.basicLabels[0].getText() == 'Number') {
            return $(this.selectors.vehicleRegistrationNumber);
        } else {
            return $(this.selectors.vehicleRegistrationNumber.replace('[6]', '[5]'));
        }
    }

    public get clearIconOnQuickSearch(): WebdriverIO.Element {
        return $(this.selectors.clearIconOnQuickSearch);
    }
}
