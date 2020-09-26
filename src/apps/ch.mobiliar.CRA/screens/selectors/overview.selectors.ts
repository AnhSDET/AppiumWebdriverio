import { DeviceType } from '../../../../shared/helpers';

const deviceType: string = browser.capabilities['deviceType'];

export class OverviewSelectorsCRA {
    private readonly selectors = {
        settingsButton: 'ion-buttons:nth-of-type(1) mobi-icon',
        overviewTitle: '',
        topRightNewClaimCaseButton: 'ion-buttons:nth-of-type(2) mobi-icon',
        createNewClaimCaseButton: ''
    };

    public get settingsButton(): WebdriverIO.Element {
        return $(this.selectors.settingsButton);
    }

    public get topRightNewClaimCaseButton(): WebdriverIO.Element {
        return $(this.selectors.createNewClaimCaseButton);
    }

    public get createNewClaimCaseButton(): WebdriverIO.Element {
        return $(this.selectors.createNewClaimCaseButton);
    }

    public get overviewTitle(): WebdriverIO.Element {
        if (deviceType === DeviceType.iPhone) {
            this.selectors.overviewTitle = 'ion-header ion-toolbar ion-title';
        } else {
            this.selectors.overviewTitle = 'ion-content span';
        }

        return $(this.selectors.overviewTitle);
    }
}
