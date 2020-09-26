export class NextStepsSelectors {
    private readonly selectors = {
        claimActionsScreenIdentity: '',
        backButton: '',
        nextButton: '',
        sendConfirmationToggle: '',
        commentInput: '',
        responsibleGA: ''
    };

    public get responsibleGA(): WebdriverIO.Element {
        return $(this.selectors.responsibleGA);
    }

    public get claimActionsScreenIdentity(): WebdriverIO.Element {
        return $(this.selectors.claimActionsScreenIdentity);
    }

    public get backButton(): WebdriverIO.Element {
        return $(this.selectors.backButton);
    }

    public get nextButton(): WebdriverIO.Element {
        return $(this.selectors.nextButton);
    }

    public get sendConfirmationToggle(): WebdriverIO.Element {
        return $(this.selectors.sendConfirmationToggle);
    }

    public get commentInput(): WebdriverIO.Element {
        return $(this.selectors.commentInput);
    }
}
