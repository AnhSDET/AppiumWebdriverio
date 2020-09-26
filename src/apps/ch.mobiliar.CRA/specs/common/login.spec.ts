import { Contexts, nativeKeyboard } from '../../../../shared/helpers';
import { expectedMtanScreenContent, loginScreen } from '../../../../shared/screens';
import { mtanScreen } from '../../../../shared/screens';
import { credentials } from '../../../../shared/helpers/testdata';
import { expectedOverviewScreenTitle, overviewScreenCRA } from '../../screens/objects/overview.screen.actions';
import { Preconditions } from '../../../../shared/helpers/preconditions';
import { alertDialog, expectedAlertMtanDialog, expectedLoginErrorAlertDialog } from '../../../../shared/screens';
import { overviewScreenXCA } from '../../../ch.mobiliar.XCA/screens/objects/overview.screen.action';

xdescribe('Login Screen', () => {
    beforeEach(() => {
        browser.switchContext(Contexts.WebView);
        loginScreen.waitForDisplay();
    });

    afterEach(() => {
        browser.reloadSession();
    });

    it('HAN-663: should allow user to dismiss login modal and see overview screen', () => {
        loginScreen.tapCloseLoginButtonAndWaitForOverView();

        expect(overviewScreenCRA.getOverviewScreenTitle()).toEqual(expectedOverviewScreenTitle);
    });

    it('HAN-626: should display the mtan screen if user provides valid credentials and tap login button', () => {
        Preconditions.authenticateWithValidCredentialsMtanCRA();

        expect(mtanScreen.isMtanScreenDisplayed()).toBe(true);
        expect(mtanScreen.getMtanScreenContentTexts()).toEqual(expectedMtanScreenContent);
    });

    it('HAN-627: should display the mtan screen if user provides valid credentials and tap the Done button on native plugin keyboard', () => {
        loginScreen.enterUsername(credentials.valid.usernameCRA);
        loginScreen.enterPassword(credentials.valid.password);
        nativeKeyboard.tapDoneKeyboardButton();
        loginScreen.tapLoginButtonAndWaitForMtan();

        expect(mtanScreen.isMtanScreenDisplayed()).toBe(true);
        expect(mtanScreen.getMtanScreenContentTexts()).toEqual(expectedMtanScreenContent);
    });

    it('HAN-634: should display ERROR if user provide either invalid username or password or both invalid', () => {
        loginScreen.loginWithInValidCredentials(credentials.invalid.username, credentials.invalid.password);

        alertDialog.waitForAlertDialog();

        expect(alertDialog.getAlertDialog()).toEqual(expectedLoginErrorAlertDialog);

        alertDialog.tapAlertDialogButtonAndWaitForAlertNotDisplay(expectedLoginErrorAlertDialog[2]);
        expect(alertDialog.isAlertDialogDisplayed()).toBe(false);
        expect(loginScreen.getUsernameValue()).toEqual(credentials.invalid.username);
        expect(loginScreen.getPasswordValue()).toEqual(credentials.invalid.password);

        expect(nativeKeyboard.isNativeKeyboardButtonsShown()).toBe(true);
    });

    it('HAN-635: should display ERROR continuously if user provide invalid credential and attempt to login several times', () => {
        loginScreen.loginWithInValidCredentials(credentials.invalid.username, credentials.invalid.password);
        alertDialog.waitForAlertDialog();

        expect(alertDialog.isAlertDialogDisplayed()).toBe(true);
        expect(alertDialog.getAlertDialog()).toEqual(expectedLoginErrorAlertDialog);
        alertDialog.tapAlertDialogButtonAndWaitForAlertNotDisplay(expectedLoginErrorAlertDialog[2]);
        expect(loginScreen.getUsernameValue()).toEqual(credentials.invalid.username);
        expect(loginScreen.getPasswordValue()).toEqual(credentials.invalid.password);
        expect(nativeKeyboard.isNativeKeyboardButtonsShown()).toBe(true);

        for (let x = 0; x < 10; x++) {
            loginScreen.tapLoginButton();
            alertDialog.waitForAlertDialog();
            expect(alertDialog.isAlertDialogDisplayed()).toBe(true);
            expect(alertDialog.getAlertDialog()).toEqual(expectedLoginErrorAlertDialog);
            alertDialog.tapAlertDialogButtonAndWaitForAlertNotDisplay(expectedLoginErrorAlertDialog[2]);
            expect(loginScreen.getUsernameValue()).toEqual(credentials.invalid.username);
            expect(loginScreen.getPasswordValue()).toEqual(credentials.invalid.password);
            expect(nativeKeyboard.isNativeKeyboardButtonsShown()).toBe(true);
        }
    });
});

describe('Screen: Mtan', () => {
    beforeEach(() => {
        browser.switchContext(Contexts.WebView);
        Preconditions.authenticateWithValidCredentialsCRA();
    });

    afterEach(() => {
        browser.reloadSession();
    });
    xit('HAN-664: should allow user to dismiss login modal of Mtan screen and see overview screen', () => {
        loginScreen.tapCloseLoginButtonAndWaitForOverView();

        expect(overviewScreenXCA.isOverviewScreenDisplay()).toBe(true);
    });
    it('HAN-727: should display ERROR if user provide invalid mtancode and allow proceeding if re-enter correct mtan', () => {
        mtanScreen.enterInvalidMtanCode();
        alertDialog.waitForAlertDialog();

        expect(alertDialog.getAlertDialog()).toEqual(expectedAlertMtanDialog);

        alertDialog.tapAlertDialogButtonAndWaitForAlertNotDisplay(expectedLoginErrorAlertDialog[2]);
        expect(mtanScreen.getMtanCodeValue()).toEqual('');
        mtanScreen.enterValidMtanCodeAndWaitForNotExist();
        expect(overviewScreenXCA.isOverviewScreenDisplay()).toBe(true);
        expect(overviewScreenXCA.getOverviewScreenTitle()).toEqual(expectedOverviewScreenTitle);
    });
});
