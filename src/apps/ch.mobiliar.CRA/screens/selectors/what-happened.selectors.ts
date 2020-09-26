export class WhatHappenedSelectors {
    private readonly selectors = {
        title: 'ion-header ion-title',
        backButton: '',
        nextButton: '',
        selectButton: '',
        descriptionInput: '',
        searchClaimCategoryInput: '',
        mainClaimEventCategories: 'app-claim-event ion-list ion-item',
        secondClaimEventCategories: 'ion-list app-tree-view app-tree-view ion-item',
        thirdClaimEventCategories: 'ion-list app-tree-view app-tree-view app-tree-view ion-item',
        fourClaimEventCategories: 'ion-list app-tree-view app-tree-view app-tree-view app-tree-view ion-item'
    };

    public get secondClaimEventCategories(): WebdriverIO.Element[] {
        return $$(this.selectors.secondClaimEventCategories);
    }

    public get thirdClaimEventCategories(): WebdriverIO.Element[] {
        return $$(this.selectors.thirdClaimEventCategories);
    }

    public get fourClaimEventCategories(): WebdriverIO.Element[] {
        return $$(this.selectors.fourClaimEventCategories);
    }

    public get mainClaimEventCategories(): WebdriverIO.Element[] {
        return $$(this.selectors.mainClaimEventCategories);
    }

    public get headerTitle(): WebdriverIO.Element {
        return $(this.selectors.title);
    }

    public get backButton(): WebdriverIO.Element {
        return $(this.selectors.backButton);
    }

    public get nextButton(): WebdriverIO.Element {
        return $(this.selectors.nextButton);
    }

    public get selectButton(): WebdriverIO.Element {
        return $(this.selectors.selectButton);
    }

    public get descriptionInput(): WebdriverIO.Element {
        return $(this.selectors.descriptionInput);
    }

    public get searchClaimCategoryInput(): WebdriverIO.Element {
        return $(this.selectors.searchClaimCategoryInput);
    }
}
