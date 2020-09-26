export class StartSelectorsIAA {
    private readonly selectors = {
        header: 'ion-toolbar ion-buttons',
        searchPartnerButton: 'div.search-area',
        favoritesSegment: 'ion-segment-button.segment-button span.segment-text=Favorites',
        recentSegment: 'ion-segment-button.segment-button span.segment-text=Recent',
        markedPartnerLabel: '',
        refreshButton: 'mobi-icon.icon',
        bookmarkedPartners: '',
        starIcons: ''
    };

    public get callBackTaskIcon(): WebdriverIO.Element {
        return $$(this.selectors.header)[1];
    }

    public get header(): WebdriverIO.Element[] {
        return $$(this.selectors.header);
    }

    public get settingButton(): WebdriverIO.Element {
        return $$(this.selectors.header)[0];
    }

    public get searchPartnerButton(): WebdriverIO.Element {
        return $(this.selectors.searchPartnerButton);
    }

    public get favoritesSegment(): WebdriverIO.Element {
        return $(this.selectors.favoritesSegment);
    }

    public get recentSegment(): WebdriverIO.Element {
        return $(this.selectors.recentSegment);
    }

    public get markedPartnerLabel(): WebdriverIO.Element {
        return $(this.selectors.markedPartnerLabel);
    }

    public get refreshButton(): WebdriverIO.Element {
        return $(this.selectors.refreshButton);
    }

    public get bookmarkedPartners(): WebdriverIO.Element[] {
        return $$(this.selectors.bookmarkedPartners);
    }

    public get starIcons(): WebdriverIO.Element[] {
        return $$(this.selectors.starIcons);
    }
}
