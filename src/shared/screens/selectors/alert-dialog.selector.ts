export class AlertDialogSelector {
    private readonly selectors = {
        alertDialog: 'div.alert-wrapper',
        alertTitle: 'h2.alert-title',
        alertDialogContentMessage: 'div.alert-message',
        alertDialogButtons: 'div.alert-button-group button'
    };

    public get alertDialog(): WebdriverIO.Element {
        return $(this.selectors.alertDialog);
    }

    public get alertTitle(): WebdriverIO.Element {
        return $(this.selectors.alertTitle);
    }

    public get alertContentMessage(): WebdriverIO.Element {
        return browser.$(this.selectors.alertDialogContentMessage);
    }

    public get alertDialogButtons(): WebdriverIO.Element[] {
        return $$(this.selectors.alertDialogButtons);
    }
}
