import { Contexts } from '../../../../shared/helpers';
import { loginScreen } from '../../../../shared/screens';
import { overviewScreenXCA } from '../../screens/objects/overview.screen.action';
import { Preconditions } from '../../../../shared/helpers/preconditions';
import { settingScreen } from '../../screens/objects/setting.screen.action';
import { Coordinate } from '../../../../shared/helpers/coordinate';

const coordinate = new Coordinate();

describe('Screen: Setting && OVerview', () => {
    beforeEach(() => {
        browser.switchContext(Contexts.WebView);
        loginScreen.waitForDisplay();
    });

    afterEach(() => {
        browser.reloadSession();
    });

    xit('should display the overview screen after user tap to back button multiple times', () => {
        Preconditions.authenticateWithValidCredentialsMtanXCA();

        for (let x = 0; x < 20; x++) {
            overviewScreenXCA.waitForDisplay();
            overviewScreenXCA.tapSettingButton();
            settingScreen.waitForDisplay();
            coordinate.tapBackButton();

            settingScreen.waitUntilElementNotExist();
        }

        expect(overviewScreenXCA.isOverviewScreenDisplay()).toBe(true);
    });
});
