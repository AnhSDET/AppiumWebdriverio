import { expectedScannedDispatchDetails } from '../objects/expertise-details.screen.action';

export class ExpertiseDetailsValidator {
    constructor(private screen: any) {}

    public returnListEqual(expectedList: Array<string>) {
        const returnList: Array<string> = this.screen.getDefaultCategoryNames();
        expect(returnList).toEqual(expectedList);
        return this;
    }

    public isExpertiseTypeInPopoverSelected(selectingExpertiseType: string) {
        const value = this.screen.getExpertiseTypeInPopoverSelectedState(selectingExpertiseType);
        expect(value).toEqual('true');
        return this;
    }

    public isDispatchDetailsEqual(expectedList: Array<string>) {
        const actualScannedDispatch: Array<string> = this.screen.getDispatchDetails();
        expect(actualScannedDispatch).toEqual(expectedList);
        return this;
    }

    public isUploadButtonDisplayed(expectedButtonState: boolean) {
        const actualUploadButtonState: boolean = this.screen.isUploadButtonDisplayed();
        expect(actualUploadButtonState).toBe(expectedButtonState);
        return this;
    }

    public getUploadedState(expectedUploadedState: string) {
        const actualUploadedState: string = this.screen.getUploadedStatus();
        expect(actualUploadedState).toEqual(expectedUploadedState);
        return this;
    }

    public isGreenTickedIconNextToUploadedStateDisplayed(expectedTickedButton: boolean) {
        const actualTickedButtonState: boolean = this.screen.isGreenTickedIconDisplayed();
        expect(actualTickedButtonState).toBe(expectedTickedButton);
        return this;
    }

    public isGreenTickIconOfUploadedImageDisplayed() {
        //todo:
        //after uploaded images, the green icon is displayed or failed icon is displayed, and this icon is different with default icon
    }
}
