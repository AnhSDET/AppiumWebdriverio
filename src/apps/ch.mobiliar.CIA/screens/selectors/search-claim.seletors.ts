export class SearchClaimSeletorsCIA {
    private readonly selectors = {
        numberTypeLabel: 'mobi-item-select ion-item ion-label',
        numberTypeSelectOptions: 'ion-select mobi-select-option',
        searchClaimResults: 'div.search-result mobi-card'
    };

    public get numberTypeLabel(): WebdriverIO.Element {
        return $(this.selectors.numberTypeLabel);
    }

    public get numberType(): WebdriverIO.Element[] {
        return $$(this.selectors.numberTypeSelectOptions);
    }

    public get claimNumberOption(): WebdriverIO.Element {
        return $$(this.selectors.numberTypeSelectOptions)[0];
    }

    public get contractNumberOption(): WebdriverIO.Element {
        return $$(this.selectors.numberTypeSelectOptions)[1];
    }

    public get partnerNumberOption(): WebdriverIO.Element {
        return $$(this.selectors.numberTypeSelectOptions)[2];
    }

    public get searchClaimResults(): WebdriverIO.Element[] {
        return $$(this.selectors.searchClaimResults);
    }
}
