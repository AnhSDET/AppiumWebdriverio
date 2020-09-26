import { Screen } from '../../../../shared/screens/';
import { Contexts } from '../../../../shared/helpers/';
import Gestures from '../../../../shared/helpers/gestures';
import { ExpertiseDetailsSelector } from '../selectors/expertise-details.selector';
import { ExpertiseDetailsValidator } from '../validators/expertise-details.validator';
import { Coordinate } from '../../../../shared/helpers/coordinate';
import { AlertDialogSelector } from '../../../../shared/screens/selectors/alert-dialog.selector';
import { alertDialog, expectedRemoveImageAlertDialog } from '../../../../shared/screens';
import { overviewScreenXCA } from './overview.screen.action';

const coordinate = new Coordinate();

export class ExpertiseDetailsScreen extends Screen {
    private expertiseDetailsSelector = new ExpertiseDetailsSelector();
    private selectorAlert = new AlertDialogSelector();

    public waitForDisplay(): void {
        super.waitForElementDisplay(this.expertiseDetailsSelector.dispatchNumber);
        const dispatchLabels = this.expertiseDetailsSelector.dispatchLabels;
        for (let index in dispatchLabels) {
            super.waitForElementDisplay(dispatchLabels[index]);
        }
    }

    public waitUntilElementNotExist(): void {
        super.waitUntilElementNotExist(this.expertiseDetailsSelector.backButton);
    }

    public validate() {
        return new ExpertiseDetailsValidator(this);
    }

    public tapBackButton() {
        super.tapAndWaitForNotDisplay(this.expertiseDetailsSelector.backButton);
        return this;
    }

    public displayExpertiseDetailsAndBackToOverviewScreenContinuously(reportPosition: number): void {
        for (let i = 0; i < 100; i++) {
            overviewScreenXCA.displayExpertiseReport(reportPosition);
            this.validate().isDispatchDetailsEqual(expectedScannedDispatchDetails);
            this.tapBackButton();
            console.log(i);
        }
    }

    public tapPenEdit(): void {
        this.expertiseDetailsSelector.penEdit.click();
    }

    public getDispatchNumber(): Array<string> {
        let scanDispatchNumber: Array<string> = [];
        scanDispatchNumber.push(this.expertiseDetailsSelector.dispatchNumber.getText());
        return scanDispatchNumber;
    }

    public getDispatchLabels(): Array<string> {
        let defaultDispatchLabels: Array<string> = [];
        const dispatchLabels = this.expertiseDetailsSelector.dispatchLabels;

        for (let index in dispatchLabels) {
            defaultDispatchLabels.push(dispatchLabels[index].getText());
        }
        return defaultDispatchLabels;
    }

    public getExpertiseTypeLabel(): string {
        return this.expertiseDetailsSelector.expertiseTypeLabel.getText();
    }

    public getScanCarDetails(): Array<string> {
        let scanCarDetails: Array<string> = [];

        let carDetailsElements = this.expertiseDetailsSelector.carDetails;
        for (let index in carDetailsElements) {
            scanCarDetails.push(carDetailsElements[index].getText());
        }

        return scanCarDetails;
    }

    public getDispatchDetails(): Array<string> {
        let fullScannedDispatchDetails: Array<string>;
        fullScannedDispatchDetails = this.getDispatchNumber()
            .concat(this.getDispatchLabels())
            .concat(this.getScanCarDetails());

        return fullScannedDispatchDetails;
    }

    public isExpertiseTypesInComboBoxDisplayed(): Array<boolean> {
        let expertiseTypesStateComboBox: Array<boolean> = [];
        let optionsComboBox = this.expertiseDetailsSelector.optionsComboBox;
        for (let index in optionsComboBox) {
            expertiseTypesStateComboBox.push(optionsComboBox[index].isDisplayed());
        }

        return expertiseTypesStateComboBox;
    }

    public isPopoverDisplayed(): boolean {
        return this.expertiseDetailsSelector.popover.isDisplayed();
    }

    public isExpertiseTypesPopoverListDisplayed(): Array<boolean> {
        let itemsStateInPopover: Array<boolean> = [];
        let expertiseTypesList = this.expertiseDetailsSelector.expertiseTypesPopoverList;
        for (let index in expertiseTypesList) {
            itemsStateInPopover.push(expertiseTypesList[index].isDisplayed());
        }

        return itemsStateInPopover;
    }

    public tapIconSelect() {
        if (this.expertiseDetailsSelector.iconSelect.isDisplayed()) {
            this.expertiseDetailsSelector.iconSelect.click();
        }
        this.waitForPopOverDisplay();
        return this;
    }

    public validateExpertiseTypeSelectionAndList(expertiseTypeInPopoverList: string, expectedExpertiseCategoryList: string[]) {
        this.tapIconSelect()
            .selectExpertiseTypeInPopover(expertiseTypeInPopoverList)
            .validate()
            .returnListEqual(expectedExpertiseCategoryList);
        this.scrollTop();
        return this;
    }

    public waitForPopOverDisplay() {
        super.waitForElementDisplay(this.expertiseDetailsSelector.popover);
        return this;
    }

    public getExpertiseTypesPopoverList(): Array<string> {
        let expertiseTypesPopoverList: Array<string> = [];
        const expertiseTypes = this.expertiseDetailsSelector.expertiseTypesPopoverList;
        for (let index in expertiseTypes) {
            expertiseTypesPopoverList.push(expertiseTypes[index].getText());
        }

        return expertiseTypesPopoverList;
    }

    public getRbGroupAttributes(): Array<string> {
        let rbGroupAttributes: Array<string> = [];

        const radioButtons = this.expertiseDetailsSelector.radioButtons;

        for (let index in radioButtons) {
            rbGroupAttributes.push(this.expertiseDetailsSelector.radioButtons[index].getAttribute('aria-checked'));
        }

        return rbGroupAttributes;
    }

    public selectExpertiseTypeInPopover(expertiseTypeLabel: string) {
        this.tapIconSelect();
        const positionOfExpertise = expectedExpertiseTypesPopoverList.indexOf(expertiseTypeLabel);
        this.expertiseDetailsSelector.radioButtons[positionOfExpertise].click();
        super.waitUntilElementNotExist(this.expertiseDetailsSelector.popover);
        return this;
    }

    public getExpertiseTypeInPopoverSelectedState(expertiseTypeLabel: string): string {
        const positionOfExpertiseType = expectedExpertiseTypesPopoverList.indexOf(expertiseTypeLabel);

        return this.expertiseDetailsSelector.radioButtons[positionOfExpertiseType].getAttribute('aria-checked');
    }

    public isExpertiseItemsGridDisplayed(): boolean {
        return this.expertiseDetailsSelector.expertiseItemsGrid.isDisplayed();
    }

    public isUploadButtonDisplayed(): boolean {
        return this.expertiseDetailsSelector.uploadButton.isDisplayed();
    }

    public tapUploadButton(): void {
        this.expertiseDetailsSelector.uploadButton.click();
    }

    public getUploadedStatus(): string {
        return this.expertiseDetailsSelector.uploadedStatus.getText();
    }

    public isGreenTickedIconDisplayed(): boolean {
        return this.expertiseDetailsSelector.greenTickedIconOnTopRight.isDisplayed();
    }

    public getImageUploadedStates(): Array<boolean> {
        const imageUploadedStateSelectors: Array<WebdriverIO.Element> = this.expertiseDetailsSelector.uploadedStateIcons;
        let uploadedStateIcons: Array<boolean> = [];
        for (let index in imageUploadedStateSelectors) {
            let uploadedIconSelector = imageUploadedStateSelectors[index];
            let uploadedIconState: boolean = imageUploadedStateSelectors[index].isDisplayed();
            if (!uploadedIconState) {
                Gestures.scrollIntoView(uploadedIconSelector);
                uploadedStateIcons.push(uploadedIconState);
            } else {
                uploadedStateIcons.push(uploadedIconState);
            }
        }
        return uploadedStateIcons;
    }

    public getImageUploadedErrorStates(): Array<boolean> {
        const imageUploadedErrorStateSelectors: Array<WebdriverIO.Element> = this.expertiseDetailsSelector.uploadedErrorStateIcons;
        let uploadedErrorIconsStates: Array<boolean> = [];
        if (imageUploadedErrorStateSelectors.length != 0) {
            for (let index in imageUploadedErrorStateSelectors) {
                let uploadedErrorIconSelector = imageUploadedErrorStateSelectors[index];
                let uploadedErrorIconState: boolean = imageUploadedErrorStateSelectors[index].isDisplayed();
                if (!uploadedErrorIconState) {
                    Gestures.scrollIntoView(uploadedErrorIconSelector);
                    uploadedErrorIconsStates.push(uploadedErrorIconState);
                } else {
                    uploadedErrorIconsStates.push(uploadedErrorIconState);
                }
            }
        }

        return uploadedErrorIconsStates;
    }

    /*public getNumberOfAddedImagesToCategories(): number {
        const selectableState: boolean = this.expertiseDetailsSelector.selectExpertiseTypeIcon.isDisplayed();
        const actualDisplayingReadOnlyExpertiseTypeEle: WebdriverIO.Element = this.expertiseDetailsSelector.readOnlySelectingExpertiseType;
        const normalCategoryElements: Array<WebdriverIO.Element> = this.expertiseDetailsSelector.allCategories;
        const vehicleCategoryElements: Array<WebdriverIO.Element> = this.expertiseDetailsSelector.defaultVehicleCategories;
        const claimCategoryElements: Array<WebdriverIO.Element> = this.expertiseDetailsSelector.claimCategories;
        const normalCategoryIconElements: Array<WebdriverIO.Element> = this.expertiseDetailsSelector.documentOrImageIcons;

        if (selectableState == false) {
            if (actualDisplayingReadOnlyExpertiseTypeEle.getText() == expectedExpertiseTypesPopoverList[7]) {
                const addedImages: number = vehicleCategoryElements.length - normalCategoryIconElements.length;
                return addedImages;
            } else {
                let allCategories: Array<WebdriverIO.Element> = normalCategoryElements.concat(claimCategoryElements);
                const addedImages: number = allCategories.length - normalCategoryIconElements.length;
                return addedImages;
            }
        } else {
            const addedImages: number = normalCategoryElements.length - normalCategoryIconElements.length;
            return addedImages;
        }
    }*/

    public getNumberOfAddedImagesToCategories(): number {
        const addedImageElements: Array<WebdriverIO.Element> = this.expertiseDetailsSelector.addedImages;
        return addedImageElements.length;
    }

    public waitForUploading() {
        const numberOfUploadingImages: number = this.getNumberOfAddedImagesToCategories();
        console.log(numberOfUploadingImages);

        const DEFAULT_TIMEOUT: number = numberOfUploadingImages * 60 * 1000;
        let uploadingMessageElement: WebdriverIO.Element = this.expertiseDetailsSelector.uploadingMessage;
        if (uploadingMessageElement.isDisplayed()) {
            browser.waitUntil(
                () => {
                    return !uploadingMessageElement.isDisplayed();
                },
                DEFAULT_TIMEOUT,
                `ERROR:element ${uploadingMessageElement} still display after waiting for ${numberOfUploadingImages} images to be uploaded in ${DEFAULT_TIMEOUT /
                    60000} min`,
                1000
            );
        }
        return this;
    }

    public triggerUpload() {
        this.tapUploadButton();
        super.waitForElementDisplay(this.expertiseDetailsSelector.uploadingMessage);
        return this;
    }

    public isUploadingSpinnerDisplayed(): boolean {
        return this.expertiseDetailsSelector.uploadingSpinner.isDisplayed();
    }

    public getUploadingSpinnerAttribute(): string {
        return this.expertiseDetailsSelector.uploadingSpinner.getAttribute('src');
    }

    public tapUploadImagesAgainButton(): void {
        this.expertiseDetailsSelector.uploadAllImagesAgain.click();
        super.waitForElementDisplay(this.expertiseDetailsSelector.uploadingMessage);
        super.waitUntilElementNotDisplay(this.expertiseDetailsSelector.uploadingMessage);
    }

    public getUploadAllIamgesAgainButtonText(): string {
        return this.expertiseDetailsSelector.uploadAllImagesAgain.getText();
    }

    /*public getUploadingContent(): Array<string> {
        return this.expertiseDetailsSelector.uploadingContent.getText();

    }*/

    public getTotalCategoryIcons(): number {
        return this.expertiseDetailsSelector.documentOrImageIcons.length;
    }

    public tapImagedCategoryAndCompareActionSheet(): void {
        let imagedCategoriesList = this.expertiseDetailsSelector.imagedCategoriesList;

        for (let index in imagedCategoriesList) {
            this.tapImagedCategory(index);
            this.compareImagedCategoryActionSheet();
        }
    }

    private tapImagedCategory(index: string): void {
        let imagedCategoriesList = this.expertiseDetailsSelector.imagedCategoriesList;

        if (imagedCategoriesList[Number(index)].isDisplayed()) {
            imagedCategoriesList[Number(index)].click();
        } else {
            Gestures.swipeContentUp();
            if (imagedCategoriesList[Number(index)].isDisplayed()) {
                imagedCategoriesList[Number(index)].click();
            } else {
                throw new Error(`Element ${imagedCategoriesList[index]} is not displayed. Cannot process! see the log`);
            }
        }
    }

    public tapRandomImagedCategory(): void {
        let imagedCategoriesList = this.expertiseDetailsSelector.imagedCategoriesList;

        let oneRandomImageCategories = imagedCategoriesList[Math.floor(Math.random() * imagedCategoriesList.length)];

        if (!oneRandomImageCategories.isDisplayed()) {
            Gestures.scrollIntoView(oneRandomImageCategories);
            if (oneRandomImageCategories.isDisplayed()) {
                oneRandomImageCategories.click();
            } else {
                throw Error(`Element ${oneRandomImageCategories} is not displayed after scrolled !`);
            }
        } else {
            oneRandomImageCategories.click();
        }
    }

    public tapRandomImagedCategoryAndAction(action: string) {
        switch (action) {
            case expectedImagedActionSheet[0]:
                this.tapRandomImagedCategory();
                this.viewImagedCategoryFullScreen();
                this.scrollTop();
                break;
            case expectedImagedActionSheet[1]:
                this.tapRandomImagedCategory();
                this.exportToGallery();
                break;
            case expectedImagedActionSheet[2]:
                this.tapRandomImagedCategory();
                this.removeImage();
                break;
            default:
                break;
        }
    }

    public exportToGallery(): void {
        Contexts.doTasksInNativeContext(() => {
            super.waitForElementDisplay(this.expertiseDetailsSelector.optExportToGallery);
            this.expertiseDetailsSelector.optExportToGallery.click();
            super.waitUntilElementNotExist(this.expertiseDetailsSelector.optExportToGallery);

            Contexts.acceptPermission();
        });
    }

    public removeImage(): void {
        Contexts.doTasksInNativeContext(() => {
            super.waitForElementDisplay(this.expertiseDetailsSelector.optRemoveImage);
            this.expertiseDetailsSelector.optRemoveImage.click();
            super.waitUntilElementNotExist(this.expertiseDetailsSelector.optRemoveImage);
        });
        super.waitForElementDisplay(this.selectorAlert.alertDialog);
        alertDialog.tapAlertDialogButtonAndWaitForAlertNotDisplay(expectedRemoveImageAlertDialog[3]);
    }

    public viewImagedCategoryFullScreen(): void {
        Contexts.doTasksInNativeContext(() => {
            super.waitForElementDisplay(this.expertiseDetailsSelector.optViewFullScreen);
            this.expertiseDetailsSelector.optViewFullScreen.click();
            super.waitUntilElementNotExist(this.expertiseDetailsSelector.optViewFullScreen);

            super.waitForElementDisplay(this.expertiseDetailsSelector.closePhotoButton);
            this.expertiseDetailsSelector.closePhotoButton.click();
            super.waitUntilElementNotExist(this.expertiseDetailsSelector.closePhotoButton);
        });
    }

    private compareImagedCategoryActionSheet(): void {
        Contexts.doTasksInNativeContext(() => {
            super.waitForElementDisplay(this.expertiseDetailsSelector.optViewFullScreen);
            let actualImageActionSheetOptions: Array<string> = this.getImageActionSheetOptions();
            expect(actualImageActionSheetOptions).toEqual(expectedImagedActionSheet);
            coordinate.tapOptCancel(this.expertiseDetailsSelector.optViewFullScreen);
        });
    }

    public displayExpertiseTypeWithRelevantCategories(selectExpertiseType: string) {
        this.tapIconSelect();
        this.selectExpertiseTypeInPopover(selectExpertiseType);
    }

    public createExpertiseType(selectExpertiseType: string) {
        this.displayExpertiseTypeWithRelevantCategories(selectExpertiseType);
        this.tapEachCategoryIconAndTakeImage();
        /*if (selectExpertiseType == expectedExpertiseTypesPopoverList[7]) {
            this.addImagesToTheDefaultVehicle();
        } else if (
            selectExpertiseType == expectedExpertiseTypesPopoverList[8] ||
            selectExpertiseType == expectedExpertiseTypesPopoverList[9] ||
            selectExpertiseType == expectedExpertiseTypesPopoverList[10]
        ) {
            this.tapEachCategoryIconAndTakeImage();


        } else {
            this.tapEachCategoryIconAndTakeImage();
        }*/
        this.triggerUpload()
            .waitForUploading()
            .validate()
            .isUploadButtonDisplayed(false)
            .getUploadedState('Uploaded')
            .isGreenTickedIconNextToUploadedStateDisplayed(true);
    }

    public getSelectingExpertiseType(): string {
        return this.expertiseDetailsSelector.selectingExpertiseType.getText();
    }

    public getReadOnlySelectingExpertiseType(): string {
        let state: boolean = this.expertiseDetailsSelector.readOnlySelectingExpertiseType.isExisting();
        console.log('read only state:' + state);
        if (state === true) {
            return this.expertiseDetailsSelector.readOnlySelectingExpertiseType.getText();
        } else {
            return;
        }
    }

    public tapAddVehicleButton(): void {
        this.expertiseDetailsSelector.addVehicleButtonOfCommercialHail.click();
    }

    public addImagesToTheDefaultVehicle(): void {
        let defaultVehicleIconSelectors: Array<WebdriverIO.Element> = this.expertiseDetailsSelector.defaultVehicleIcons;
        for (let index in defaultVehicleIconSelectors) {
            if (defaultVehicleIconSelectors[index].isDisplayed() == true) {
                defaultVehicleIconSelectors[index].click();
                this.captureImageAndUse();
            } else {
                Gestures.swipeContentUp();
                if (defaultVehicleIconSelectors[index].isDisplayed() == true) {
                    defaultVehicleIconSelectors[index].click();
                    this.captureImageAndUse();
                } else {
                    throw Error('Scrolled to much, so the icon is not display. Should scroll a bit only');
                }
            }
        }
    }

    public addVehicleAndImagesToTheAddedVehicle(vehicleNumber: number): void {
        this.tapAddVehicleButton();
        this.addImagesToVehicle(vehicleNumber);
    }

    private addImagesToVehicle(vehicleNumber: number) {
        const vehicleIcons: Array<WebdriverIO.Element> = this.expertiseDetailsSelector.getVehicleIcons(vehicleNumber);
        for (let index in vehicleIcons) {
            if (vehicleIcons[index].isDisplayed() == false) {
                Gestures.scrollIntoView(vehicleIcons[index]);
                vehicleIcons[index].click();
                this.captureImageAndUse();
            } else {
                vehicleIcons[index].click();
                this.captureImageAndUse();
            }
        }
    }

    public test(): void {
        let categories: Array<WebdriverIO.Element> = this.expertiseDetailsSelector.allCategories;
        let categoryIcons: Array<WebdriverIO.Element> = this.expertiseDetailsSelector.documentOrImageIcons;
        for (let index in categoryIcons) {
            if (categoryIcons[index].isDisplayed() == false) {
                Gestures.scrollIntoView(categoryIcons[index]);
                if (categories[index].getText() != '') {
                    categoryIcons[index].click();
                    this.captureImageAndUse();
                }
            } else {
                if (categories[index].getText() != '') {
                    categoryIcons[index].click();
                    this.captureImageAndUse();
                } else {
                    return;
                }
            }
        }
    }

    public tapEachCategoryIconAndTakeImage(): void {
        const actualSelectingExpertiseType: string = this.getSelectingExpertiseType();
        const readOnlySelectedExpertiseType: string = this.getReadOnlySelectingExpertiseType();

        const documentOrImageIconSelectors: Array<WebdriverIO.Element> = this.expertiseDetailsSelector.documentOrImageIcons;

        for (let index in documentOrImageIconSelectors) {
            if (documentOrImageIconSelectors[index].isDisplayed() == true) {
                documentOrImageIconSelectors[index].click();
                this.captureImageAndUse();
            } else {
                Gestures.swipeContentUp();
                if (documentOrImageIconSelectors[index].isDisplayed() == true) {
                    documentOrImageIconSelectors[index].click();
                    this.captureImageAndUse();
                } else {
                    throw Error('Scrolled to much, so the icon is not display. Should scroll a bit only');
                }
            }
        }
    }

    private getTheUpdateCategories(): Array<WebdriverIO.Element> {
        return this.expertiseDetailsSelector.allCategories;
    }

    private getTheUpdateCategoryIcons(): Array<WebdriverIO.Element> {
        return this.expertiseDetailsSelector.documentOrImageIcons;
    }

    /*private tapAddVehicleButtonAndGetUpdateExpertiseCategories(): void {
        this.tapAddVehicleButton();
        this.getTheUpdateCategories();
    }*/

    public tapExpertiseCategoryNameAndTakeImage(): void {
        let categories: Array<WebdriverIO.Element> = this.expertiseDetailsSelector.allCategories;
        let categoryIcons: Array<WebdriverIO.Element> = this.expertiseDetailsSelector.documentOrImageIcons;
        for (let index in categoryIcons) {
            if (categoryIcons[index].isDisplayed() == false) {
                Gestures.scrollIntoView(categoryIcons[index]);
                if (categories[index].getText() != '') {
                    categoryIcons[index].click();
                    this.captureImageAndUse();
                }
            } else {
                if (categories[index].getText() != '') {
                    categoryIcons[index].click();
                    this.captureImageAndUse();
                } else {
                    return;
                }
            }
        }
    }

    public tapOptionalExpertiseCategoryAndTakeImage(): void {}

    public getImageActionSheetOptions(): Array<string> {
        let actionSheetOptions: Array<string> = [];
        actionSheetOptions.push(
            this.expertiseDetailsSelector.optViewFullScreen.getText(),
            this.expertiseDetailsSelector.optExportToGallery.getText(),
            this.expertiseDetailsSelector.optRemoveImage.getText()
        );

        return actionSheetOptions;
    }

    public captureImageAndUse(): void {
        Contexts.doTasksInNativeContext(() => {
            this.expertiseDetailsSelector.photoCaptureButton.click();
            this.expertiseDetailsSelector.usePhotoButton.click();
            super.waitUntilElementNotDisplay(this.expertiseDetailsSelector.usePhotoButton);
        });
    }

    public getDefaultCategoryNames(): Array<string> {
        let categories = this.expertiseDetailsSelector.allCategories;
        let categoryIcons = this.expertiseDetailsSelector.documentOrImageIcons;
        let categoriesNames: Array<string> = [];
        let countCategories = categories.length;
        for (let i = 0; i < countCategories; i++) {
            if (categoryIcons[i].isDisplayed() == true) {
                if (categories[i].getText() != '') {
                    categoriesNames.push(categories[i].getText());
                } else {
                    categoriesNames.push(categories[i].getText());
                    categoriesNames.push(categories[i + 1].getText());
                    break;
                }
            } else {
                Gestures.swipeContentUp();
                if (categoryIcons[i].isDisplayed() == true) {
                    if (categories[i].getText() != '') {
                        categoriesNames.push(categories[i].getText());
                    } else {
                        categoriesNames.push(categories[i].getText());
                        categoriesNames.push(categories[i + 1].getText());
                        break;
                    }
                } else {
                    throw Error('After scrolled, the icon is still not displayed, check the app');
                }
            }
        }
        return categoriesNames;
    }

    public getImagedCategoryNames(): Array<string> {
        let categories = this.expertiseDetailsSelector.allCategories;
        let categoriesNames: Array<string> = [];
        let categoryIcons = this.expertiseDetailsSelector.documentOrImageIcons;

        let countCategories = categories.length;

        for (let i = 0; i < countCategories; i++) {
            if (i < countCategories - 4) {
                if (categories[i].getText() != '') {
                    categoriesNames.push(categories[i].getText());
                } else {
                    Gestures.swipeContentUp();
                    if (categories[i].getText() != '') {
                        categoriesNames.push(categories[i].getText());
                    } else {
                        throw Error('After scrolled, the category name is not displayed. Check the app!!');
                    }
                }
            } else {
                if (categories[i].getText() == '' && categoryIcons[1].isDisplayed() == false) {
                    Gestures.swipeContentUp();
                    categoriesNames.push(
                        categories[i].getText(),
                        categories[i + 1].getText(),
                        categories[i + 2].getText(),
                        categories[i + 3].getText()
                    );
                    break;
                } else {
                    categoriesNames.push(
                        categories[i].getText(),
                        categories[i + 1].getText(),
                        categories[i + 2].getText(),
                        categories[i + 3].getText()
                    );
                    break;
                }
            }
        }
        return categoriesNames;
    }

    public scrollTop() {
        for (let i = 0; i < this.expertiseDetailsSelector.dispatchLabels.length; i++) {
            if (this.expertiseDetailsSelector.dispatchLabels[0].getText() == 'Date') {
                break;
            }
            Gestures.swipeContentDown();
        }
        return this;
    }
}

const expectedDefaultExpertiseDetails: Array<string> = ['...', 'Date', 'Car brand', 'License plate', '', '', '', 'Expertise type'];
const expectedExpertiseTypesPopoverList: Array<string> = [
    'Partial damage',
    'Write-off',
    'HWS',
    'Ascending vehicle',
    'Risk assessment caravan/camper',
    'Estimation classic old-timer/spec. vehicle',
    'XpertCheck',
    'Commercial hail',
    'Return Studen',
    'Return Extern',
    'Autoscout24',
    'Hail Drive-In'
];
const expectedDefaultRbGroupAttributes: Array<string> = ['false', 'false', 'false', 'false', 'false', 'false', 'false'];
const expectedExpertiseListPopoverDisplaying: Array<boolean> = [true, true, true, true, true, true, true];
const expectedExpertiseListComboBoxNotDisplay: Array<boolean> = [false, false, false, false, false, false, false, false, false, false, false, false];

const expectedPartialDamageList: Array<string> = [
    'Registration papers',
    'VIN/identification plate',
    'Overview',
    'Damage big',
    'Damage detail',
    'Damage detail',
    'Damage detail',
    'Damage detail',
    'Damage detail',
    'Previous damage',
    'Previous damage',
    'Meter count',
    'Bank account',
    'Ranger rapport',
    'Bill',
    'Investments',
    'Miscellaneous',
    '',
    ''
];
const expectedWriteOffList: Array<string> = [
    'Registration papers',
    'Right registration papers page without licence plate',
    'VIN/identification plate',
    'Overview diagonal front right',
    'Front',
    'Overview diagonal front left',
    'Overview diagonal back left',
    'Rear',
    'Overview diagonal back right',
    'Boot',
    'Roof',
    'Damage detail',
    'Damage detail',
    'Damage detail',
    'Damage detail',
    '1 Wheel',
    'Engine bay',
    'Whole dashboard',
    'Seats front',
    'Seats rear',
    'Belts/tensioner',
    'Dashboard with KM and running engine',
    'Service book & car key',
    'Bill/receipt',
    'Leasing contract',
    'Investments',
    'Bill',
    'Bill',
    'Bill',
    '',
    ''
];
const expectedHWSList: Array<string> = [
    'Registration papers',
    'VIN/identification plate',
    'Overview',
    'Damage detail',
    'Damage detail',
    'Rear',
    'Rear left side',
    'Rear right side',
    '90° angle from above',
    'Rear height with folding rule',
    'Belts/tensioner',
    'Driving seat with angle and folding rule',
    "Co-driver's seat with angle and folding rule",
    'Meter count',
    '',
    ''
];
const expectedPGSMList: Array<string> = [
    'Registration papers',
    'VIN/identification plate',
    'Overview',
    'Damage detail',
    'Damage detail',
    'Front',
    '90° angle from above',
    'Clearance left doors',
    'Clearance right doors',
    'Front height with folding rule',
    'Whole dashboard',
    'Meter count',
    '',
    ''
];
const expectedRiskAssessmentList: Array<string> = [
    'Registration papers',
    'VIN/identification plate',
    'Overview diagonal front left',
    'Overview diagonal back right',
    'Damage detail',
    'Damage detail',
    'Roof',
    'Roof',
    'Interior',
    'Interior',
    'Meter count',
    '',
    ''
];
const expectedEstimationList: Array<string> = [
    'Registration papers',
    'Overview diagonal front left',
    'Overview diagonal back right',
    'Interior',
    'Engine bay',
    'Boot',
    'VIN/identification plate',
    'Meter count',
    'Special photo',
    'Special photo',
    'Damage (corrosion) of body',
    'Damage (dents/scratches) of body',
    'Damage/flaws of painting',
    'Damage of interior',
    'Service book & car key',
    'Bill/receipt',
    '',
    ''
];
const expectedXpertCheckList: Array<string> = [
    'Registration papers',
    'Maintenance booklet indicating last service',
    'VIN/identification plate',
    'Entire front end, eye-level',
    'Entire front end, hip-level',
    'Diagonal front left - entire vehicle',
    'Tyre & rim, front left',
    'Entire left side',
    'Tyre & rim, back left',
    'Diagonal back left - entire vehicle',
    'Entire back end',
    'Boot open',
    'Diagonal back right - entire vehicle',
    'Tyre & rim, back right',
    'Entire right side',
    'Tyre & rim, front right',
    'Diagonal front right - entire vehicle',
    'Interior, passenger side',
    'Interior, back seat',
    'Interior, driver side',
    'Dashboard showing mileage, engine running',
    'Interior, driver’s perspective (from behind)',
    'Additional photo 1',
    'Additional photo 2',
    'Additional photo 3',
    '',
    ''
];

const expectedCommercialHailList: Array<string> = ['Registration papers', 'Chassis number/Nameplate', 'Overview', '', ''];
const expectedScannedDispatchDetails: Array<string> = [
    '14130205',
    'Date',
    'Car brand',
    'License plate',
    '04.10.2018',
    'Maserati Granturismo',
    'ZH123456'
];

const expectedImagedActionSheet: Array<string> = ['View full screen', 'Export to gallery', 'Remove image'];
export {
    expectedDefaultExpertiseDetails,
    expectedExpertiseTypesPopoverList,
    expectedDefaultRbGroupAttributes,
    expectedPartialDamageList,
    expectedWriteOffList,
    expectedHWSList,
    expectedPGSMList,
    expectedRiskAssessmentList,
    expectedEstimationList,
    expectedXpertCheckList,
    expectedCommercialHailList,
    expectedScannedDispatchDetails,
    expectedExpertiseListPopoverDisplaying,
    expectedExpertiseListComboBoxNotDisplay,
    expectedImagedActionSheet
};
