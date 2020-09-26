export class SearchResultSelectors {
    private readonly selectors = {
        searchCriteriaInfo: '',
        emptyResult: '',
        searchResultItems: '',
        searchResultItemTitle: '',
        editButton: ''
    };

    public get searchCriteriaInfo(): WebdriverIO.Element {
        return $(this.selectors.searchCriteriaInfo);
    }

    public get emptyResult(): WebdriverIO.Element {
        return $(this.selectors.emptyResult);
    }

    public get searchResultItems(): WebdriverIO.Element[] {
        return $$(this.selectors.searchResultItems);
    }

    public get searchResultItemTitle(): WebdriverIO.Element[] {
        return $$(this.selectors.searchResultItemTitle);
    }

    public get editButton(): WebdriverIO.Element {
        return $(this.selectors.editButton);
    }
}
