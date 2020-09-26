import Gestures from './gestures';
import { Contexts } from './contexts';

const DEFAULT_TIMEOUT: number = 35000;

export default class Input {
    /**
     * @description Set given value to selected element:
     * 1. Click onto the element to get focused.
     * 2. Wait for 2 seconds to MAKE SURE the scroll animation is finished before further steps.
     * 3. Clear the existing value (if necessary).
     * 4. Set the new value to selected element input.
     * @param {WebdriverIO.Element} element need to fulfill with data.
     * @param {string} value is a value string will be set to selected element input.
     * @param {boolean} shouldClearValue is `true` if the input element should be cleared before fulfilling a new value.
     * @param {boolean} shouldHideKeyboard is `true` if the keyboard should be closed after sending a  new value to the input element.
     * This will also trigger form submission on iPhone as well.
     */
    public static setInputValue(
        element: WebdriverIO.Element,
        value: string,
        shouldClearValue: boolean = false,
        shouldHideKeyboard: boolean = false
    ): void {
        Gestures.scrollIntoView(element);
        element.click();
        if (this.isKeyboardShownOnInput()) {
            this.waitForElementDisplayWhenKeyboardAppeared(element);
        }
        if (shouldClearValue) {
            const currentValue = element.getValue();
            if (currentValue && currentValue.length > 0) {
                for (let i = 0; i < currentValue.length; i++) {
                    browser.sendKeys(['\uE003']);
                }
            }
        }

        element.addValue(value);

        if (shouldHideKeyboard) {
            Input.hideKeyboard();
        }
    }

    /**
     * @description Should hide the keyboard to serve specific purposes if it was previously opened.
     */
    public static hideKeyboard(): void {
        if (browser.isKeyboardShown()) {
            browser.$('body').click();
        }
    }

    public static isKeyboardShownOnInput(): boolean {
        return !!browser.isKeyboardShown();
    }

    private static waitForElementDisplayWhenKeyboardAppeared(element: WebdriverIO.Element) {
        browser.waitUntil(
            () => {
                return element.isDisplayed();
            },
            DEFAULT_TIMEOUT,
            `ERROR: element ${element} does not display in view after ${DEFAULT_TIMEOUT / 1000}s`,
            2000
        );
    }

    public static inputToSpecialInputField(elementSelector: WebdriverIO.Element, whatToInput: string): void {
        Contexts.doTasksInNativeContext(() => {
            Gestures.scrollIntoView(elementSelector);
            elementSelector.click();
            if (this.isKeyboardShownOnInput()) {
                this.waitForElementDisplayWhenKeyboardAppeared(elementSelector);
            }
            if (elementSelector.getText() == '') {
                elementSelector.addValue(whatToInput);
            } else {
                elementSelector.clearValue();
                elementSelector.setValue(whatToInput);
            }
        });
    }
}
