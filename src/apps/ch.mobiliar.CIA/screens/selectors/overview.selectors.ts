export class OverviewSelectorsCIA {
    private readonly selectors = {
        emptyTitle: 'div.empty-title',
        emptyReportInformation: 'ion-grid ion-row ion-col p',
        emptyReportIcons: 'ion-grid ion-row ion-col mobi-icon',
        incompleteInspectionReports: 'mobi-item-sliding ion-item-sliding ion-item mobi-card span',
        deleteInspectionIcon: 'ion-item-option ion-icon#trash-btn'
    };

    public get emptyTitle(): WebdriverIO.Element {
        return $(this.selectors.emptyTitle);
    }

    public get emptyReportInformation(): WebdriverIO.Element[] {
        return $$(this.selectors.emptyReportInformation);
    }

    public get emptyReportIcons(): WebdriverIO.Element[] {
        return $$(this.selectors.emptyReportIcons);
    }

    public get incompleteInspectionReports(): WebdriverIO.Element[] {
        return $$(this.selectors.incompleteInspectionReports);
    }

    public get incompleteInspectionReport(): WebdriverIO.Element {
        return $(this.selectors.incompleteInspectionReports);
    }

    public get deleteInspectionIcon(): WebdriverIO.Element {
        return $(this.selectors.deleteInspectionIcon);
    }
}
