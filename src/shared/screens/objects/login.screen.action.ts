// Screen objects
import Input from '../../helpers/input';
import { Screen } from '../screen';
import { LoginSelector } from '../selectors/login.selector';
import { mtanScreen } from './mtan.screen.action';

class LoginScreenAction extends Screen {
    private selector = new LoginSelector();

    public waitForDisplay(): void {
        super.waitForElementDisplay(this.selector.loginScreenTitle);
    }

    public waitUntilElementNotExist(): void {
        super.waitUntilElementNotExist(this.selector.usernameInput);
    }

    public isLoginScreenDisplayed(): boolean {
        return this.selector.loginScreenTitle.isDisplayed();
    }

    public tapCloseLoginButtonAndWaitForOverView(): void {
        this.selector.closeLoginButton.click();
        super.waitUntilElementNotExist(this.selector.loginScreenTitle);
    }

    public enterUsername(value: string): void {
        Input.setInputValue(this.selector.usernameInput, value);
    }

    public enterPassword(value: string): void {
        Input.setInputValue(this.selector.passwordInput, value);
    }

    public getUsernameValue(): string {
        return this.selector.usernameInput.getValue();
    }

    public getPasswordValue(): string {
        return this.selector.passwordInput.getValue();
    }

    public tapLoginButton(): void {
        this.selector.loginButton.click();
    }

    public waitUntilScreenNotExist(): void {
        let loginElements: Array<WebdriverIO.Element> = [];
        loginElements.push(this.selector.usernameInput, this.selector.passwordInput, this.selector.loginButton);
        super.waitUntilElementsNotExist(loginElements);
    }

    public tapLoginButtonAndWaitForMtan(): void {
        this.selector.loginButton.click();
        this.waitUntilScreenNotExist();
        mtanScreen.waitForDisplay();
    }

    public loginWithInValidCredentials(username: string, password: string) {
        this.enterUsername(username);
        this.enterPassword(password);
        this.tapLoginButton();
    }

    public loginWithValidCredentials(username: string, password: string) {
        this.enterUsername(username);
        this.enterPassword(password);
        this.tapLoginButtonAndWaitForMtan();
    }
}

export const loginScreen = new LoginScreenAction();
