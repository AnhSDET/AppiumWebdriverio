import { toUpper } from 'lodash';
import { Contexts } from './contexts';
import { Screen } from '../screens';

class Keyboard extends Screen {
    private readonly selectors = {
        doneKeyboardButton: '~Done'
    };
    private get doneKeyboardButton(): WebdriverIO.Element {
        return browser.$(this.selectors.doneKeyboardButton);
    }
    public isNativeKeyboardButtonsShown(): boolean {
        browser.switchContext(Contexts.NativeApp);

        try {
            super.waitForElementDisplay(this.doneKeyboardButton);
        } catch (e) {
            throw e;
        } finally {
            browser.switchContext(Contexts.WebView);
        }
        return browser.isKeyboardShown();
    }
    public tapDoneKeyboardButton(): void {
        Contexts.doTasksInNativeContext(() => {
            this.doneKeyboardButton.click();
        });
    }
    public static type(character: string) {
        return browser.$(`//XCUIElementTypeKey[@name="${toUpper(character)}"]`).click();
    }

    /**
     * @description Return character `Done` on the device keyboard.
     */
    public static get tapDoneOnIPad() {
        return browser.$('//XCUIElementTypeButton[@name="Hide keyboard"]').click();
    }
    public static tapOnDoneiPhone() {
        return browser.$('//XCUIElementTypeButton[@name="Done"]').click();
    }
}

export const nativeKeyboard = new Keyboard();
