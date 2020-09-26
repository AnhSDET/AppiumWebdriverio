export class BaseHeaderToolbarSelectors {
    private readonly selectors = {
        homeScreenNavigationButton: 'app-menu ion-buttons ion-button',
        partnerNameTitle: 'app-menu ion-header ion-toolbar span',
        detailsPageTitle: 'ion-header ion-toolbar ion-title',
        backButton: 'mobi-back-button ion-button ',
        sendButton: 'app-menu ion-buttons:nth-of-type(2) ion-button',
        actionMenuIcon: 'app-menu ion-buttons:nth-child(3)',
        actionSheetUnmark: '~Unmark as favorite',
        actionSheetSynchronize: '~Synchronize partner data',
        actionSheetDownload: '~Download all documents',
        actionSheetCreate: '~Create new task',
        actionsOnMenu: 'popover-partner-actions ion-list ion-item'
    };

    constructor(appName?: string) {
        if (appName === 'IAA') {
            this.selectors.partnerNameTitle = 'app-menu ion-header ion-toolbar ion-title';
        }
    }

    public get homeScreenNavigationButton(): WebdriverIO.Element {
        return $(this.selectors.homeScreenNavigationButton);
    }

    public get partnerNameTitle(): WebdriverIO.Element {
        return $(this.selectors.partnerNameTitle);
    }

    public get backButton(): WebdriverIO.Element {
        return $(this.selectors.backButton);
    }

    public get detailsPageHeaderTitle(): WebdriverIO.Element {
        return $$(this.selectors.detailsPageTitle)[1];
    }

    public get sendButton(): WebdriverIO.Element {
        return $(this.selectors.sendButton);
    }

    public get actionMenuIcon(): WebdriverIO.Element {
        return $(this.selectors.actionMenuIcon);
    }

    public get actionSheetUnmark(): WebdriverIO.Element {
        return $(this.selectors.actionSheetUnmark);
    }

    public get actionSheetSynchronize(): WebdriverIO.Element {
        return $(this.selectors.actionSheetSynchronize);
    }

    public get actionSheetDownload(): WebdriverIO.Element {
        return $(this.selectors.actionSheetDownload);
    }

    public get actionSheetCreate(): WebdriverIO.Element {
        return $(this.selectors.actionSheetCreate);
    }

    public get actionsOnMenu(): WebdriverIO.Element[] {
        return $$(this.selectors.actionsOnMenu);
    }
}
