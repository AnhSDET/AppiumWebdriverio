export class ExpertiseDetailsSelector {
    private readonly selectors = {
        header: 'page-expertise-detail ion-header ion-toolbar',
        uploadButton: '#btn-upload',
        backButton: '#btn-back-in-expertise-detail ion-button#btn-back',
        dispatchNumber: 'page-expertise-detail ion-header ion-toolbar ion-title span',
        penEdit: '#btn-edit-expertise',
        dispatchAndExpertiseSection: 'ion-grid ion-row',
        dispatchLabels: 'ion-row.ios ion-col.ios div.info-label',
        carDetails: 'ion-row.ios ion-col.ios div.info-detail',
        mobiItemSelect: 'mobi-item-select#expertise-type',
        iconSelect: 'ion-select.ng-valid',
        optionsComboBox: 'ion-select.ng-valid ion-select-option',
        popover: 'div.popover-content',
        expertiseTypesPopoverList: 'ion-radio-group.sc-ion-select-popover ion-item ion-label',
        radioButton: 'ion-radio-group.sc-ion-select-popover ion-item ion-radio',
        selectValue: 'ion-grid mobi-item-select ion-select',
        expertise_item_grid: 'ion-grid.expertise-images',
        expertiseCategories: 'page-expertise-detail div.expertise-images ion-row',
        categoryIcon: 'ion-row.ios ion-col.ion-margin-bottom:nth-of-type(index) ion-icon.ios',
        imagedCategory: 'ion-row.ios ion-col.ion-margin-bottom:nth-of-type(index) div.image-category',
        imagedCategoriesList: 'ion-row.ios ion-col.ion-margin-bottom div.image-category',
        addButton: 'page-expertise-detail ion-row ion-button',
        cancel: '~Cancel',
        photoCapture: '~PhotoCapture',
        usePhotoButton: `~Use Photo`,
        retakePhotoButton: `~Retake`,
        frontBackCameraChooser: '~FrontBackFacingCameraChooser',
        optViewFullScreen: '~View full screen',
        optExportToGallery: '~Export to gallery',
        optRemoveImage: '~Remove image',
        closePhotoButton: '~Close',
        uploadingMessage: 'div.loading-container div.loading-inner',
        uploadAllImagesAgain: 'ion-button.btn-upload-all-images'
    };

    public get uploadedStatus(): WebdriverIO.Element {
        const element: string = this.selectors.header.concat(' ion-buttons:nth-of-type(2) div span');
        const uploadedStatusSelector: WebdriverIO.Element = $(element);
        if (uploadedStatusSelector.isExisting()) {
            return uploadedStatusSelector;
        } else {
            return;
        }
    }

    public get greenTickedIconOnTopRight(): WebdriverIO.Element {
        return $(this.selectors.header.concat(' ion-buttons:nth-of-type(2) mobi-icon ion-icon')).shadow$(' svg');
    }

    public get uploadingMessage(): WebdriverIO.Element {
        return $(this.selectors.uploadingMessage);
    }

    public get uploadingSpinner(): WebdriverIO.Element {
        return $(this.selectors.uploadingMessage.concat('  div img'));
    }

    public get uploadingContent(): WebdriverIO.Element {
        return $(this.selectors.uploadingMessage.concat(' div.loading-content div:nth-child(2)'));
    }

    public get uploadingStatus(): WebdriverIO.Element {
        return $(this.selectors.uploadingMessage.concat(' '));
    }

    public get uploadAllImagesAgain(): WebdriverIO.Element {
        return $(this.selectors.uploadAllImagesAgain);
    }

    public get expertiseTypeLabel(): WebdriverIO.Element {
        return $(this.selectors.mobiItemSelect.concat(' div ion-label'));
    }

    public get selectExpertiseTypeIcon(): WebdriverIO.Element {
        return $(this.selectors.selectValue);
    }

    public get selectingExpertiseType(): WebdriverIO.Element {
        let state: boolean = this.selectExpertiseTypeIcon.isExisting();
        if (state === true) {
            return $(this.selectors.selectValue).shadow$('div.select-text');
        } else {
            return;
        }
    }

    public get addVehicleButtonOfCommercialHail(): WebdriverIO.Element {
        return $(this.selectors.addButton);
    }

    public get closePhotoButton(): WebdriverIO.Element {
        return $(this.selectors.closePhotoButton);
    }

    public get imagedCategoriesList(): WebdriverIO.Element[] {
        return $$(this.selectors.imagedCategoriesList);
    }

    public get optViewFullScreen(): WebdriverIO.Element {
        return $(this.selectors.optViewFullScreen);
    }

    public get optExportToGallery(): WebdriverIO.Element {
        return $(this.selectors.optExportToGallery);
    }

    public get optRemoveImage(): WebdriverIO.Element {
        return $(this.selectors.optRemoveImage);
    }

    public getImagedCategory(index: number): WebdriverIO.Element {
        return $(this.selectors.imagedCategory.replace('index', index.toString()));
    }

    public getCategoryIcon(index: number): WebdriverIO.Element {
        return $(this.selectors.categoryIcon.replace('index', index.toString()));
    }

    public get backButton(): WebdriverIO.Element {
        return $(this.selectors.backButton);
    }

    public get dispatchLabels(): WebdriverIO.Element[] {
        return $$(this.selectors.dispatchLabels);
    }

    public get carDetails(): WebdriverIO.Element[] {
        return $$(this.selectors.carDetails);
    }

    public get optionsComboBox(): WebdriverIO.Element[] {
        return $$(this.selectors.optionsComboBox);
    }

    public get expertiseTypesPopoverList(): WebdriverIO.Element[] {
        return $$(this.selectors.expertiseTypesPopoverList);
    }

    public get radioButtons(): WebdriverIO.Element[] {
        return $$(this.selectors.radioButton);
    }

    public getSelectingExpertiseType(): string {
        let state: boolean = this.selectExpertiseTypeIcon.isExisting();
        if (state === true) {
            return this.selectingExpertiseType.getText().trim();
        } else {
            return;
        }
    }

    public get allCategories(): WebdriverIO.Element[] {
        return $$(this.selectors.expertiseCategories.concat(' ion-col'));
    }

    public get noImages(): WebdriverIO.Element[] {
        return $$(this.selectors.expertiseCategories.concat(' ion-col div.add-container'));
    }

    public get documentOrImageIcons(): Array<WebdriverIO.Element> {
        return $$(this.selectors.expertiseCategories.concat(' ion-col div.add-inner mobi-icon ion-icon'));
    }

    public get uploadedStateIcons(): Array<WebdriverIO.Element> {
        return $$(this.selectors.expertiseCategories.concat(' ion-col div.image-container div.buttons-container div.button-status'));
    }

    public get uploadedErrorStateIcons(): Array<WebdriverIO.Element> {
        return $$(
            this.selectors.expertiseCategories.concat(
                ' ion-col div.image-container div.buttons-container div.button-status.button-status--upload-failed'
            )
        );
    }

    public get addedImages(): Array<WebdriverIO.Element> {
        return $$(this.selectors.expertiseCategories.concat(' ion-col div.image-inner'));
    }

    public get imageCategory(): Array<WebdriverIO.Element> {
        return $$(this.selectors.expertiseCategories.concat(' ion-col div.image-category'));
    }

    public getVehicleCategories(vehicleOrClaim: number): WebdriverIO.Element[] {
        let category: string = this.selectors.expertiseCategories.concat(':nth-of-type(2) ion-col');
        let newCategory: string = category.replace('index', vehicleOrClaim.toString());
        return $$(newCategory);
    }

    public get defaultVehicleCategories(): WebdriverIO.Element[] {
        let category: string = this.selectors.expertiseCategories.concat(':nth-of-type(2) ion-col');
        return $$(category);
    }

    public getVehicleIcons(vehicle: number): WebdriverIO.Element[] {
        let icon: string = this.selectors.expertiseCategories.concat(':nth-of-type(2) ion-col div.add-inner mobi-icon ion-icon');
        let newIcon: string = icon.replace('index', vehicle.toString());
        return $$(newIcon);
    }

    public get defaultVehicleIcons(): WebdriverIO.Element[] {
        let icon: string = this.selectors.expertiseCategories.concat(':nth-of-type(2) ion-col div.add-inner mobi-icon ion-icon');
        return $$(icon);
    }

    public getClaimCategories(claim: number): WebdriverIO.Element[] {
        let category: string = this.selectors.expertiseCategories.concat(' div:nth-of-type(index) ion-row:nth-of-type(3) ion-col');
        category.replace('index', claim.toString());
        return $$(category);
    }

    public get claimCategories(): WebdriverIO.Element[] {
        let category: string = this.selectors.expertiseCategories.concat(':nth-of-type(3) ion-col');
        return $$(category);
    }

    public getClaimIcons(claim: number): WebdriverIO.Element[] {
        let icon: string = this.selectors.expertiseCategories.concat(':nth-of-type(3) ion-col div.add-inner mobi-icon ion-icon');
        icon.replace('index', claim.toString());
        return $$(icon);
    }

    public get claimIcons(): WebdriverIO.Element[] {
        let icon: string = this.selectors.expertiseCategories.concat(
            ' div:nth-of-type(1) ion-row:nth-of-type(3) ion-col div.add-inner mobi-icon ion-icon'
        );
        return $$(icon);
    }

    /*public getCategoryIcons(vehicleOrClaim: number): WebdriverIO.Element[] {
        const actualSelectingExpertiseType: string = this.getSelectingExpertiseType();
        const readOnlySelectedExpertiseType: string = this.getReadOnlySelectingExpertiseType();
        let vehicle: string = this.selectors.expertiseCategories.concat('page-expertise-detail div.expertise-images div:nth-of-type(index) ion-row:nth-child(2) ion-col  mobi-icon ion-icon');
        vehicle.replace('index', vehicleOrClaim.toString());
        if (actualSelectingExpertiseType == 'Commercial hail' || readOnlySelectedExpertiseType == 'Commercial hail') {
            return $$(vehicle);
        } else {
            return $$(this.selectors.expertiseCategories.concat(' ion-row ion-col mobi-icon ion-icon'));
        }
    }*/

    public get readOnlySelectingExpertiseType(): WebdriverIO.Element {
        let test: string = this.selectors.dispatchAndExpertiseSection.concat(':nth-of-type(2) ion-col:nth-of-type(2) div.info-detail');
        return browser.$(test);
    }

    public get vehicleSections(): WebdriverIO.Element[] {
        return $$(this.selectors.expertiseCategories.concat(':nth-of-type(2)'));
    }

    /*public get iconsOfVehicle(vehicleNumber: number): Array<WebdriverIO.Element> {
        let test:string=this.selectors.expertiseCategories.concat(':nth-of-type(2)');
        let test1:Array<WebdriverIO.Element>= $$(test);

        //let selectors: Array<WebdriverIO.Element> = this.vehicleSections[vehicleNumber].con
    }*/

    public get uploadButton(): WebdriverIO.Element {
        return $(this.selectors.uploadButton);
    }

    public get usePhotoButton(): WebdriverIO.Element {
        return $(this.selectors.usePhotoButton);
    }

    public get expertiseItemsGrid(): WebdriverIO.Element {
        return $(this.selectors.expertise_item_grid);
    }

    public get photoCaptureButton(): WebdriverIO.Element {
        return $(this.selectors.photoCapture);
    }

    public get dispatchNumber(): WebdriverIO.Element {
        return $(this.selectors.dispatchNumber);
    }

    public get penEdit(): WebdriverIO.Element {
        return $(this.selectors.penEdit);
    }

    public get iconSelect(): WebdriverIO.Element {
        return $(this.selectors.iconSelect);
    }

    public get popover(): WebdriverIO.Element {
        return $(this.selectors.popover);
    }
}
