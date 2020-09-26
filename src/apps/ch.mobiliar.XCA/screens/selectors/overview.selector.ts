export class OverviewSelectorXCA {
    private readonly selectors = {
        settingsButton: '#btn-go-to-settings',
        overviewTitle: 'ion-toolbar ion-title', //ion-title.toolbar-title ionic 5 changed
        plusButton: 'page-overview mobi-area#add-new-expertise-area',
        expertiseReports: 'ion-item-sliding.ios',
        expertiseNumber: 'ion-item-sliding.ios ion-col span strong',
        expertiseStatus: 'ion-item-sliding.ios expertise-status span',
        carName: 'ion-item-sliding.ios ion-row:nth-of-type(2) ion-col:nth-of-type(1) span:nth-of-type(1)',
        licensePlate: 'ion-item-sliding.ios ion-row:nth-of-type(2) ion-col:nth-of-type(1) span:nth-of-type(2)',
        numberOfPhoto: 'ion-item-sliding.ios ion-row:nth-of-type(2) ion-col:nth-of-type(2) span:nth-of-type(1)',
        date: 'ion-item-sliding.ios ion-row:nth-of-type(2) ion-col:nth-of-type(2) span:nth-of-type(2)'
    };

    public get settingsButton(): WebdriverIO.Element {
        return $(this.selectors.settingsButton);
    }

    public get overViewTitle(): WebdriverIO.Element {
        return $(this.selectors.overviewTitle);
    }

    public get plusButton(): WebdriverIO.Element {
        return $(this.selectors.plusButton);
    }

    public get expertiseReportsList(): WebdriverIO.Element[] {
        return $$(this.selectors.expertiseReports);
    }

    public get expertiseReportDetails(): WebdriverIO.Element[] {
        let report: Array<WebdriverIO.Element> = [];
        report.push(
            $(this.selectors.expertiseNumber),
            $(this.selectors.expertiseStatus),
            $(this.selectors.carName),
            $(this.selectors.licensePlate),
            $(this.selectors.numberOfPhoto),
            $(this.selectors.date)
        );
        return report;
    }
}
