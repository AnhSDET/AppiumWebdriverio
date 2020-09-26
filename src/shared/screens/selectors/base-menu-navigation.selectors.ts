export class BaseMenuNavigationSelectors {
    private readonly selectors = {
        menuNavigation: 'ion-list.menu-items ion-item',
        menuTitleH2: 'ion-list.menu-items ion-item div.menu-item-title h2',
        dataDetailsParent: 'ion-list.menu-items ion-item div.menu-item-detail',
        dataDetailsChild: 'ion-list.menu-items ion-item:nth-of-type(index) div.menu-item-detail div.info',
        baseMenuNavigationDetailContents: 'ion-list.menu-items ion-item div.menu-item-detail'
    };

    public get menuNavigation(): Array<WebdriverIO.Element> {
        return $$(this.selectors.menuNavigation);
    }

    public get dataDetailsParent(): WebdriverIO.Element[] {
        //return $(this.selectors.dataDetailsParent.replace('index', index.toString()));
        return $$(this.selectors.dataDetailsParent);
    }

    public getDataDetailsChild(index: number): Array<WebdriverIO.Element> {
        return $$(this.selectors.dataDetailsChild.replace('index', index.toString()));
    }

    public get menuTitleH2(): WebdriverIO.Element[] {
        return $$(this.selectors.menuTitleH2);
    }

    public get baseMenuNavigationDetailContents(): WebdriverIO.Element[] {
        return $$(this.selectors.baseMenuNavigationDetailContents);
    }
}
