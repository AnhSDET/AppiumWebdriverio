export class PartnerClaimsListSelectors {
    private readonly ClaimsListSelectors = {
        claimsTile: 'app-claim ion-title',
        registerClaimButton: 'mobi-button div.content',
        missingClaimInfo: 'app-claim mobi-hint',
        segments: 'ion-segment',
        claimCards: 'div.child-page-content mobi-card',
        parentClaimsWithPartialClaims: 'app-expander div.expander'
    };

    public get claimsTile(): WebdriverIO.Element {
        return $(this.ClaimsListSelectors.claimsTile);
    }

    public get registerClaimButton(): WebdriverIO.Element {
        return $(this.ClaimsListSelectors.registerClaimButton);
    }

    public get missingClaimInfo(): WebdriverIO.Element {
        return $(this.ClaimsListSelectors.missingClaimInfo);
    }

    public get segments(): WebdriverIO.Element[] {
        return $$(this.ClaimsListSelectors.segments);
    }

    public get parentClaimsWithPartialClaims(): WebdriverIO.Element[] {
        return $$(this.ClaimsListSelectors.parentClaimsWithPartialClaims);
    }

    public get claimCardInsideParentClaim(): WebdriverIO.Element[] {
        return $$(this.ClaimsListSelectors.parentClaimsWithPartialClaims.concat(' mobi-card'));
    }

    public get claimCardsOnly(): WebdriverIO.Element[] {
        return $$(this.ClaimsListSelectors.claimCards);
    }
}
