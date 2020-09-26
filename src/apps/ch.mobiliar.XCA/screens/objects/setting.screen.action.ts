import { Screen } from '../../../../shared/screens/';
import { SettingSelector } from '../selectors/setting.selector';

class SettingScreen extends Screen {
    private selector = new SettingSelector();

    public waitForDisplay(): void {
        super.waitForElementDisplay(this.selector.backButtonSetting);
        super.waitForElementDisplay(this.selector.configurationHeader);
    }

    public waitUntilElementNotExist(): void {
        super.waitUntilElementNotExist(this.selector.backButtonSetting);
    }
}

export const settingScreen = new SettingScreen();
