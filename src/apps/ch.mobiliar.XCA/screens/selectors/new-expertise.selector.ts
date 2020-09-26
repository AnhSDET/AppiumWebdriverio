export class NewExpertiseSelector {
    private readonly selectors = {
        newExpertiseScreenTitle: 'page-new-expertise ion-toolbar ion-title',
        closeNewExpertiseScreenButton: '#btn-dismiss-qr-scanner-modal',
        optScanQRCodeLater: '~Scan QR code later',
        optAbortCreationExpertise: '~Abort creation of expertise',
        optCancel: ''
    };

    public get newExpertiseScreenTitle(): WebdriverIO.Element {
        return $(this.selectors.newExpertiseScreenTitle);
    }

    public get closeNewExpertiseScreenButton(): WebdriverIO.Element {
        return $(this.selectors.closeNewExpertiseScreenButton);
    }

    public get optScanQRCodeLater(): WebdriverIO.Element {
        return $(this.selectors.optScanQRCodeLater);
    }

    public get optAbortCreationExpertise(): WebdriverIO.Element {
        return $(this.selectors.optAbortCreationExpertise);
    }
}
