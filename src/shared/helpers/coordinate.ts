import { Screen } from '../screens';
import { Contexts } from './contexts';

const deviceName: any = browser.capabilities['deviceName'];

export class Coordinate extends Screen {
    //private static deviceName: any = browser.capabilities['deviceName'];

    public tapBackButton(): void {
        Contexts.switchToNative();
        const isIPhoneX = deviceName.indexOf('iPhone X') >= 0;
        const isIPhone7 = deviceName.indexOf('iPhone 7') >= 0;
        const isIPhone6Plus = deviceName.indexOf('iPhone 6S Plus') >= 0;
        let buttonCoordinates = {};
        switch (buttonCoordinates) {
            case isIPhoneX:
                buttonCoordinates = {
                    x: 6,
                    y: 50
                };
                break;
            case isIPhone7:
                buttonCoordinates = {
                    x: 6,
                    y: 26
                };
                break;
            case isIPhone6Plus:
                buttonCoordinates = {
                    x: 6,
                    y: 55
                };
                break;
            default:
                buttonCoordinates = {
                    x: 6,
                    y: 60
                };
                break;
        }
        browser.touchAction({
            action: 'tap',
            x: buttonCoordinates['x'],
            y: buttonCoordinates['y']
        });
        Contexts.switchToWebview();
    }

    public tapOptCancel(actionSheetElement: WebdriverIO.Element): void {
        Contexts.switchToNative();
        super.waitForElementDisplay(actionSheetElement);
        const isIPhoneX = deviceName.indexOf('iPhone X') >= 0;
        const buttonCoordinates = isIPhoneX
            ? {
                  x: 8,
                  y: 721
              }
            : {
                  x: 8,
                  y: 602
              };
        browser.touchAction({
            action: 'tap',
            x: buttonCoordinates['x'],
            y: buttonCoordinates['y']
        });
        Contexts.switchToWebview();
    }

    public static tapAllowPermission(): void {
        browser.switchContext(Contexts.NativeApp);
        browser.pause(3000);

        browser.touchPerform([
            {
                action: 'tap',
                options: {
                    x: 253,
                    y: 445
                }
            }
        ]);

        /*browser.touchAction({
            action: 'tap',
            x: 254,
            y: 448
        });*/
        //Contexts.switchToWebview();
        browser.switchContext(Contexts.WebView);
    }
}
