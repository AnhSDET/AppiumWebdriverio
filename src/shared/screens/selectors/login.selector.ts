export class LoginSelector {
    private readonly selectors = {
        closeLoginButton: 'page-login ion-button mobi-icon',
        loginScreenTitle: 'ion-title.login-title',
        loginButton: 'ion-button.ion-color',
        usernameInput: '#username input',
        passwordInput: '#password input'
    };

    public get closeLoginButton(): WebdriverIO.Element {
        return $(this.selectors.closeLoginButton);
    }

    public get loginScreenTitle(): WebdriverIO.Element {
        return $(this.selectors.loginScreenTitle);
    }

    public get loginButton(): WebdriverIO.Element {
        return $(this.selectors.loginButton);
    }

    public get usernameInput(): WebdriverIO.Element {
        return $(this.selectors.usernameInput);
    }

    public get passwordInput(): WebdriverIO.Element {
        return $(this.selectors.passwordInput);
    }
}
