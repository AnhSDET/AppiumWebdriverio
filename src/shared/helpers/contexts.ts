import { DeviceType } from './constants';

export class Contexts {
    /**
     * Return type of device that currently running the test
     */

    public static switchToWebview(): void {
        if (browser.getContext() === Contexts.NativeApp) {
            browser.switchContext(Contexts.WebView);
        } else return;
    }

    public static switchToNative(): void {
        if (browser.getContext() === Contexts.WebView) {
            browser.switchContext(Contexts.NativeApp);
        } else return;
    }

    public static get deviceType(): string {
        return browser.capabilities['deviceType'];
    }

    private static contexts(): Array<string> {
        return browser.getContexts();
    }

    /**
     * @description Return value string of Native App context
     */
    public static get NativeApp(): string {
        return Contexts.contexts()[0];
    }

    /**
     * @description Return value string of Webview context
     */
    public static get WebView(): string {
        return Contexts.contexts()[1];
    }

    /**
     * @description Define tasks should be done in Webview context before switching to Native App context
     * @param callback {function} callback task need to be done in Webview context
     */
    public static doTasksInWebviewContext(callback?: () => void): void {
        browser.switchContext(Contexts.WebView);

        try {
            callback();
        } catch (e) {
            throw e;
        } finally {
            browser.switchContext(Contexts.NativeApp);
            browser.pause(3000);
        }
    }

    /**
     * @description Define tasks should be done in Native App context before switching to Webview context
     * @param callback {function} callback task(s) need to be done in Native App context
     */
    public static doTasksInNativeContext(callback?: () => void): void {
        Contexts.switchToNative();
        try {
            callback();
        } catch (e) {
            throw e;
        } finally {
            browser.switchContext(Contexts.WebView);
        }
    }

    public static acceptPermission(): void {
        let alert: boolean;
        try {
            if (browser.getContext() === Contexts.WebView) {
                Contexts.doTasksInNativeContext(() => {
                    alert = browser.isAlertOpen();
                    if (alert) {
                        browser.acceptAlert();
                    }
                });
            } else {
                alert = browser.isAlertOpen();
                if (alert) {
                    browser.acceptAlert();
                }
            }
        } catch (e) {
            // Do nothing if Alert is not available/visible
        }
    }

    public static dismissPermission(): void {
        try {
            if (browser.getContext() === Contexts.NativeApp) {
                browser.dismissAlert();
            } else {
                Contexts.doTasksInNativeContext(() => {
                    browser.dismissAlert();
                });
            }
        } catch (e) {
            // Do nothing if Alert is not available/visible
        }
    }

    /**
     * @description Return `true` if the selected device is iPad
     */
    public static isIPad(): boolean {
        return Contexts.deviceType === DeviceType.iPad;
    }

    /**
     * @description Return `true` if the selected device is iPhone
     */
    public static isIPhone(): boolean {
        return Contexts.deviceType === DeviceType.iPhone;
    }
}
