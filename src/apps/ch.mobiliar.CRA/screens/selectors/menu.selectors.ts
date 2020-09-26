export class MenuSelectors {
    private readonly selectors = {
        homeButton: '',
        topRightRegisterButton: '',
        topRightDeleteClaimButton: '',
        topRightInspectionButton: '',
        topRightGetClaimNumberButton: '',
        bottomRegisterButton: '',
        bottomDeleteButton: '',
        bottomBeginInspectionButton: '',
        bottomGetClaimNumberButton: '',
        menuNavigation: 'ion-menu ion-list ion-item',
        menuNavigationContent: 'ion-menu ion-list ion-item h2',
        menuExpand: 'ion-split-pane#split-pane.split-pane-expanded'
    };

    public get homeButton(): WebdriverIO.Element {
        return $(this.selectors.homeButton);
    }

    public get topRightDeleteClaimButton(): WebdriverIO.Element {
        return $(this.selectors.topRightDeleteClaimButton);
    }

    public get topRightRegisterButton(): WebdriverIO.Element {
        return $(this.selectors.topRightRegisterButton);
    }

    public get topRightInspectionButton(): WebdriverIO.Element {
        return $(this.selectors.topRightInspectionButton);
    }

    public get topRightGetClaimNumberButton(): WebdriverIO.Element {
        return $(this.selectors.topRightGetClaimNumberButton);
    }

    public get bottomRegisterButton(): WebdriverIO.Element {
        return $(this.selectors.bottomRegisterButton);
    }

    public get bottomBeginInspectionButton(): WebdriverIO.Element {
        return $(this.selectors.bottomBeginInspectionButton);
    }

    public get bottomGetClaimNumberButton(): WebdriverIO.Element {
        return $(this.selectors.bottomGetClaimNumberButton);
    }

    public get bottomDeleteButton(): WebdriverIO.Element {
        return $(this.selectors.bottomDeleteButton);
    }

    public get menuNavigationContent(): WebdriverIO.Element[] {
        return $$(this.selectors.menuNavigationContent);
    }

    public get menuNavigation(): WebdriverIO.Element[] {
        return $$(this.selectors.menuNavigation);
    }

    public get menuExpand(): WebdriverIO.Element {
        return $(this.selectors.menuExpand);
    }
}
