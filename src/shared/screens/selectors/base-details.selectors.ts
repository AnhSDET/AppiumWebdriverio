export class BaseDetailsSelectors {
    private readonly selectors = {
        iPadScreenTitle: 'ion-header ion-toolbar ion-title',
        searchButtonToSearchModalScreen: 'div.general ion-button',
        partnerInfoSection: 'div.info-container div.general',
        spinnerLoadingContent: 'div.spinner-container'
    };

    public get baseiPadDetailsScreenTitle(): WebdriverIO.Element {
        return $(this.selectors.iPadScreenTitle);
    }

    public get searchButtonToSearchModalScreen(): WebdriverIO.Element {
        return $(this.selectors.searchButtonToSearchModalScreen);
    }

    public get partnerInfoSection(): WebdriverIO.Element {
        return $(this.selectors.partnerInfoSection);
    }

    public get spinnerLoadingContents(): WebdriverIO.Element[] {
        return $$(this.selectors.spinnerLoadingContent);
    }
}
