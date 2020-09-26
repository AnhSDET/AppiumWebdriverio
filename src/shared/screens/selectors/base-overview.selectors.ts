export class BaseOverviewSelectors {
    private readonly baseSelectors = {
        baseSettingButton: 'ion-buttons ion-button mobi-icon.setting-icon',
        basePlusButton: 'ion-buttons ion-button mobi-icon.plus-icon',
        baseOverviewTitle: 'ion-toolbar ion-title'
    };

    public get baseSettingButton(): WebdriverIO.Element {
        return $(this.baseSelectors.baseSettingButton);
    }

    public get basePlusButton(): WebdriverIO.Element {
        return $(this.baseSelectors.basePlusButton);
    }

    public get baseOverviewTitle(): WebdriverIO.Element {
        return $(this.baseSelectors.baseOverviewTitle);
    }
}
