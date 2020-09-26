export class SettingSelector {
    private readonly selectors = {
        backButtonSetting: '#btn-back',
        configurationHeader: 'ion-content div.configuration span.page__title'
    };

    public get backButtonSetting(): WebdriverIO.Element {
        return $(this.selectors.backButtonSetting);
    }

    public get configurationHeader(): WebdriverIO.Element {
        return $(this.selectors.configurationHeader);
    }
}
