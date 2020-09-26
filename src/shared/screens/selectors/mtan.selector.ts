export class MtanSelector {
    private readonly selectors = {
        mtanCodeScreenIdentity: 'p*=Please confirm the four-digit code we have sent to your mobile.',
        mtanCodeRequestButton: '#btn-request-mtan',
        mtanCodeInput: 'input.native-input'
    };

    public get mtanCodeScreenIdentity(): WebdriverIO.Element {
        return $(this.selectors.mtanCodeScreenIdentity);
    }

    public get mtanCodeInput(): WebdriverIO.Element {
        return $(this.selectors.mtanCodeInput);
    }

    public get mtanCodeRequestButton(): WebdriverIO.Element {
        return $(this.selectors.mtanCodeRequestButton);
    }
}
