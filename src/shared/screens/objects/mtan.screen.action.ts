import Input from '../../helpers/input';
import { Screen } from '../screen';
import { MtanSelector } from '../selectors/mtan.selector';
import { loginScreen } from './login.screen.action';
import { LoginSelector } from '../selectors/login.selector';

class MtanScreenAction extends Screen {
    private selector = new MtanSelector();
    private selectorLoginModal = new LoginSelector();

    public waitForDisplay(): void {
        super.waitForElementDisplay(this.selector.mtanCodeScreenIdentity);
    }

    public isMtanScreenDisplayed(): boolean {
        return (
            this.selector.mtanCodeScreenIdentity.isDisplayed() &&
            this.selector.mtanCodeInput.isDisplayed() &&
            this.selector.mtanCodeRequestButton.isDisplayed()
        );
    }

    public getMtanScreenContentTexts(): Array<string> {
        const mtanScreenElementsText: Array<string> = [];
        mtanScreenElementsText.push(
            this.selectorLoginModal.loginScreenTitle.getText(),
            this.selector.mtanCodeScreenIdentity.getText(),
            this.selector.mtanCodeInput.getText(),
            this.selector.mtanCodeRequestButton.getText()
        );
        return mtanScreenElementsText;
    }

    public waitUntilScreenNotExist(): void {
        let screenElements: Array<WebdriverIO.Element> = [];
        screenElements.push(this.selector.mtanCodeInput, this.selector.mtanCodeScreenIdentity, this.selector.mtanCodeRequestButton);
        super.waitUntilElementsNotExist(screenElements);
    }

    public enterValidMtanCodeAndWaitForNotExist(): void {
        Input.setInputValue(this.selector.mtanCodeInput, 'aaaa');
        this.waitUntilScreenNotExist();
    }

    public enterInvalidMtanCode(): void {
        Input.setInputValue(this.selector.mtanCodeInput, 'abcf');
    }

    public getMtanCodeValue(): string {
        return this.selector.mtanCodeInput.getValue();
    }
}

const expectedMtanScreenContent: Array<string> = [
    'Login',
    'Please confirm the four-digit code we have sent to your mobile.',
    '',
    'Request new text message code'
];
export { expectedMtanScreenContent };
export const mtanScreen = new MtanScreenAction();
