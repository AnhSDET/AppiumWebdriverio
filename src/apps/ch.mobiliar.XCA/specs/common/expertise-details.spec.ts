import { Contexts } from '../../../../shared/helpers';
import { Preconditions } from '../../../../shared/helpers/preconditions';
import {
    expectedPartialDamageList,
    expectedDefaultRbGroupAttributes,
    expectedEstimationList,
    expectedExpertiseListPopoverDisplaying,
    expectedExpertiseTypesPopoverList,
    expectedHWSList,
    expectedXpertCheckList,
    expectedCommercialHailList,
    expectedPGSMList,
    expectedRiskAssessmentList,
    expectedWriteOffList,
    expectedScannedDispatchDetails,
    expectedImagedActionSheet
} from '../../screens/objects/expertise-details.screen.action';
import { ExpertiseDetailsScreen } from '../../screens/objects/expertise-details.screen.action';
import { Coordinate } from '../../../../shared/helpers/coordinate';
import { expectedDraftExpertiseReportNoQRCodeNoPhoto, overviewScreenXCA } from '../../screens/objects/overview.screen.action';

const expertiseDetails = new ExpertiseDetailsScreen();
const coordinate = new Coordinate();
xdescribe('Screen: Expertise Details without QR code: ', () => {
    beforeEach(() => {
        browser.switchContext(Contexts.WebView);
        Preconditions.authenticateWithValidCredentialsMtanXCA();
        Preconditions.displayExpertiseDetailsScreenWithoutQRCode();
    });
    afterEach(() => {
        browser.reloadSession();
    });

    it('HAN-154: should display all the associate imageCategories of the type "Partial damage" ', () => {
        expertiseDetails.validateExpertiseTypeSelectionAndList(expectedExpertiseTypesPopoverList[0], expectedPartialDamageList);
        expect(expertiseDetails.isUploadButtonDisplayed()).toBe(false);
    });

    it('HAN-155: should display all the associate imageCategories of the type "Write-off" ', () => {
        expertiseDetails.validateExpertiseTypeSelectionAndList(expectedExpertiseTypesPopoverList[1], expectedWriteOffList);
        expect(expertiseDetails.isUploadButtonDisplayed()).toBe(false);
    });

    it('HAN-156: should display all the associate imageCategories of the type "HWS" ', () => {
        expertiseDetails.validateExpertiseTypeSelectionAndList(expectedExpertiseTypesPopoverList[2], expectedHWSList);
        expect(expertiseDetails.isUploadButtonDisplayed()).toBe(false);
    });

    it('HAN-157: should display all the associate imageCategories of the type "Ascending vehicle" ', () => {
        expertiseDetails.validateExpertiseTypeSelectionAndList(expectedExpertiseTypesPopoverList[3], expectedPGSMList);
        expect(expertiseDetails.isUploadButtonDisplayed()).toBe(false);
    });

    it('HAN-158: should display all the associate imageCategories of the type "Risk assessment caravan/camper" ', () => {
        expertiseDetails.validateExpertiseTypeSelectionAndList(expectedExpertiseTypesPopoverList[4], expectedRiskAssessmentList);
        expect(expertiseDetails.isUploadButtonDisplayed()).toBe(false);
    });

    it('HAN-159: should display all the associate imageCategories of the type "Estimation classic old-timer/spec. vehicle"', () => {
        expertiseDetails.validateExpertiseTypeSelectionAndList(expectedExpertiseTypesPopoverList[5], expectedEstimationList);
        expect(expertiseDetails.isUploadButtonDisplayed()).toBe(false);
    });

    it('HAN-614: should display all the associate imageCategories of the type XpertCheck properly', () => {
        expertiseDetails.validateExpertiseTypeSelectionAndList(expectedExpertiseTypesPopoverList[6], expectedXpertCheckList);
        expect(expertiseDetails.isUploadButtonDisplayed()).toBe(false);
    });
    //todo
    xit('HAN-906: should display all the associate imageCategories of the type Commercial hail properly', () => {
        expertiseDetails.validateExpertiseTypeSelectionAndList(expectedExpertiseTypesPopoverList[7], expectedCommercialHailList); //todo the list is different
        expect(expertiseDetails.isUploadButtonDisplayed()).toBe(false);
    });

    //todo
    it('HAN-905: should display all the associate imageCategories of the type Commercial hail properly', () => {
        expertiseDetails.validateExpertiseTypeSelectionAndList(expectedExpertiseTypesPopoverList[7], expectedCommercialHailList); //todo the list is different
        expect(expertiseDetails.isUploadButtonDisplayed()).toBe(false);
    });

    it('HAN-730: should display the proper popover list and state of selection radio button', () => {
        expertiseDetails.tapIconSelect();

        expect(expertiseDetails.isExpertiseTypesPopoverListDisplayed()).toEqual(expectedExpertiseListPopoverDisplaying);
        expect(expertiseDetails.getExpertiseTypesPopoverList()).toEqual(expectedExpertiseTypesPopoverList);
        expect(expertiseDetails.getRbGroupAttributes()).toEqual(expectedDefaultRbGroupAttributes);
        const expertiseItemsGridState = expertiseDetails.isExpertiseItemsGridDisplayed();

        expect(expertiseItemsGridState).toBe(false);
        expect(expertiseDetails.isUploadButtonDisplayed()).toBe(false);
    });

    it('HAN-150: should be able to back to overview to see the draft report', () => {
        coordinate.tapBackButton();
        expertiseDetails.waitUntilElementNotExist();
        expect(overviewScreenXCA.getAReportDetails()).toEqual(expectedDraftExpertiseReportNoQRCodeNoPhoto);
    });
});

xdescribe('Performance test', () => {
    beforeAll(() => {
        browser.switchContext(Contexts.WebView);
    });
    beforeEach(() => {});

    afterEach(() => {
        browser.reloadSession();
    });

    xit('HAN-1116: should be able to navigate between overview and expertise details which has a lot of images', () => {
        expertiseDetails.selectExpertiseTypeInPopover(expectedExpertiseTypesPopoverList[0]);
        expertiseDetails.tapEachCategoryIconAndTakeImage();
        expertiseDetails.scrollTop();
        expertiseDetails.displayExpertiseDetailsAndBackToOverviewScreenContinuously(0);
    });

    it('HAN-1116: should be able to navigate between overview and expertise details which has a lot of images', () => {
        expertiseDetails.displayExpertiseDetailsAndBackToOverviewScreenContinuously(0);
    });
});

describe('create expertise report for any expertise type', () => {
    beforeAll(() => {
        browser.switchContext(Contexts.WebView);
    });
    beforeEach(() => {
        Preconditions.displayExpertiseDetailsScreen();
        browser.setImplicitTimeout(5000);
    });

    afterEach(() => {
        browser.reloadSession();
    });
    xit('should be able to create expertise report for Partial Damage', () => {
        expertiseDetails.createExpertiseType(expectedExpertiseTypesPopoverList[1]);
    });

    it('should be able to create expertise report for Commercial Hail', () => {
        expertiseDetails.createExpertiseType(expectedExpertiseTypesPopoverList[8]);
        //expertiseDetails.addVehicleAndImagesToTheAddedVehicle(2);
    });
});

xdescribe('', () => {
    beforeAll(() => {
        browser.switchContext(Contexts.WebView);
    });
    beforeEach(() => {
        Preconditions.displayExpertiseDetailsScreen();
    });

    afterEach(() => {
        browser.reloadSession();
    });

    it('should not be able to change the expertise type after added iamges', () => {
        expertiseDetails.createExpertiseType(expectedExpertiseTypesPopoverList[7]);
        //todo - assertion the expertise type is read-only now
    });
});

xdescribe('Screen: Expertise Details with QR code', () => {
    beforeAll(() => {
        browser.switchContext(Contexts.WebView);
    });
    beforeEach(() => {
        Preconditions.displayExpertiseDetailsScreen();
    });

    afterEach(() => {
        browser.reloadSession();
    });

    xit('HAN-: should display the correct scanned dispatch number', () => {
        const actualScannedDispatch: Array<string> = expertiseDetails.getDispatchDetails();
        expect(actualScannedDispatch).toEqual(expectedScannedDispatchDetails);
    });

    it('HAN-801:  should be able to add image to category and show correct names and action sheet functions of Partial Damage', () => {
        expertiseDetails.selectExpertiseTypeInPopover(expectedExpertiseTypesPopoverList[0]);
        expertiseDetails.tapEachCategoryIconAndTakeImage();
        expertiseDetails.scrollTop();

        expectedPartialDamageList.push('', '');

        expect(expertiseDetails.getImagedCategoryNames()).toEqual(expectedPartialDamageList);
        expertiseDetails.scrollTop();
        expertiseDetails.tapImagedCategoryAndCompareActionSheet();
        expect(expertiseDetails.getTotalCategoryIcons()).toBe(2);
        expertiseDetails.scrollTop();
        expect(expertiseDetails.isUploadButtonDisplayed()).toBe(true);
    });
    it('HAN-802:  should be able to add image to category and show correct names and action sheet functions of Write-off', () => {
        const actualScannedDispatch: Array<string> = expertiseDetails.getDispatchDetails();
        expect(actualScannedDispatch).toEqual(expectedScannedDispatchDetails);

        expertiseDetails.selectExpertiseTypeInPopover(expectedExpertiseTypesPopoverList[1]);
        expertiseDetails.tapEachCategoryIconAndTakeImage();
        expertiseDetails.scrollTop();

        expectedWriteOffList.push('', '');

        expect(expertiseDetails.getImagedCategoryNames()).toEqual(expectedWriteOffList);
        expertiseDetails.scrollTop();
        expertiseDetails.tapImagedCategoryAndCompareActionSheet();
        expect(expertiseDetails.getTotalCategoryIcons()).toBe(2);
        expertiseDetails.scrollTop();
        expect(expertiseDetails.isUploadButtonDisplayed()).toBe(true);
    });

    it('HAN-803:  Add image to each category, scroll and compare action sheet of HWS', () => {
        expect(expertiseDetails.getDispatchDetails()).toEqual(expectedScannedDispatchDetails);

        expertiseDetails.selectExpertiseTypeInPopover(expectedExpertiseTypesPopoverList[2]);
        expertiseDetails.tapEachCategoryIconAndTakeImage();
        expertiseDetails.scrollTop();

        expectedHWSList.push('', '');

        expect(expertiseDetails.getImagedCategoryNames()).toEqual(expectedHWSList);
        expertiseDetails.scrollTop();
        expertiseDetails.tapImagedCategoryAndCompareActionSheet();
        expect(expertiseDetails.getTotalCategoryIcons()).toBe(2);
        expertiseDetails.scrollTop();
        expect(expertiseDetails.isUploadButtonDisplayed()).toBe(true);
    });

    it('HAN-804:  Add image to each category, scroll and compare action sheet of PGSM', () => {
        expect(expertiseDetails.getDispatchDetails()).toEqual(expectedScannedDispatchDetails);

        expertiseDetails.selectExpertiseTypeInPopover(expectedExpertiseTypesPopoverList[3]);
        expertiseDetails.tapEachCategoryIconAndTakeImage();
        expertiseDetails.scrollTop();

        expectedPGSMList.push('', '');

        expect(expertiseDetails.getImagedCategoryNames()).toEqual(expectedPGSMList);
        expertiseDetails.scrollTop();
        expertiseDetails.tapImagedCategoryAndCompareActionSheet();
        expect(expertiseDetails.getTotalCategoryIcons()).toBe(2);
        expertiseDetails.scrollTop();
        expect(expertiseDetails.isUploadButtonDisplayed()).toBe(true);
    });

    it('HAN-160:  should be able to add image to category and show correct names and action sheet functions of Risk Assessment', () => {
        expect(expertiseDetails.getDispatchDetails()).toEqual(expectedScannedDispatchDetails);

        expertiseDetails.selectExpertiseTypeInPopover(expectedExpertiseTypesPopoverList[4]);
        expertiseDetails.tapEachCategoryIconAndTakeImage();
        expertiseDetails.scrollTop();

        expectedRiskAssessmentList.push('', '');

        expect(expertiseDetails.getImagedCategoryNames()).toEqual(expectedRiskAssessmentList);
        expertiseDetails.scrollTop();
        expertiseDetails.tapImagedCategoryAndCompareActionSheet();
        expect(expertiseDetails.getTotalCategoryIcons()).toBe(2);
        expertiseDetails.scrollTop();
        expect(expertiseDetails.isUploadButtonDisplayed()).toBe(true);
    });

    it('HAN-160:  Add image to each category, scroll and compare action sheet of Estimation', () => {
        expect(expertiseDetails.getDispatchDetails()).toEqual(expectedScannedDispatchDetails);

        expertiseDetails.selectExpertiseTypeInPopover(expectedExpertiseTypesPopoverList[5]);
        expertiseDetails.tapEachCategoryIconAndTakeImage();
        expertiseDetails.scrollTop();

        expectedEstimationList.push('', '');

        expect(expertiseDetails.getImagedCategoryNames()).toEqual(expectedEstimationList);
        expertiseDetails.scrollTop();
        expertiseDetails.tapImagedCategoryAndCompareActionSheet();
        expect(expertiseDetails.getTotalCategoryIcons()).toBe(2);
        expertiseDetails.scrollTop();
        expect(expertiseDetails.isUploadButtonDisplayed()).toBe(true);
    });

    it('HAN-160:  Add image to each category, scroll and compare action sheet of Layne', () => {
        expect(expertiseDetails.getDispatchDetails()).toEqual(expectedScannedDispatchDetails);

        expertiseDetails.selectExpertiseTypeInPopover(expectedExpertiseTypesPopoverList[6]);
        expertiseDetails.tapEachCategoryIconAndTakeImage();
        expertiseDetails.scrollTop();

        expectedXpertCheckList.push('', '');

        expect(expertiseDetails.getImagedCategoryNames()).toEqual(expectedXpertCheckList);
        expertiseDetails.scrollTop();
        expertiseDetails.tapImagedCategoryAndCompareActionSheet();
        expect(expertiseDetails.getTotalCategoryIcons()).toBe(2);
        expertiseDetails.scrollTop();
        expect(expertiseDetails.isUploadButtonDisplayed()).toBe(true);
    });

    it('HAN-xxx: ', () => {
        expertiseDetails.selectExpertiseTypeInPopover(expectedExpertiseTypesPopoverList[0]);
        expertiseDetails.tapEachCategoryIconAndTakeImage();
        expertiseDetails.scrollTop();
        expertiseDetails.tapRandomImagedCategoryAndAction(expectedImagedActionSheet[2]);
    });
});
