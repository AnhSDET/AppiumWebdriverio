import { Contexts, DeviceType } from '../../../../shared/helpers';
import { Screen } from '../../../../shared/screens';
import { AttachmentSelectors } from '../selectors/attachment.selectors';

const deviceType = browser.capabilities['deviceType'];

class AttachmentScreen extends Screen {
    private selector = new AttachmentSelectors();

    private defineScreenElements(): Array<WebdriverIO.Element> {
        const attchmentElements: Array<WebdriverIO.Element> = [];
        attchmentElements.push(this.selector.claimAttachmentsScreenIdentity);
        return attchmentElements;
    }

    public waitForDisplay() {
        super.waitForElementsDisplay(this.defineScreenElements());
    }

    public isAttachmentsScreenDisplayed(): boolean {
        return this.selector.claimAttachmentsScreenIdentity.isDisplayed();
    }

    public tapAddButton() {
        this.selector.addButton.click();
    }

    public addImageByCamera() {
        this.tapAddButton();
        Contexts.doTasksInNativeContext(() => {
            this.selector.cameraButton.click();
            Contexts.acceptPermission();
            this.selector.photoCaptureButton.click();
            this.selector.usePhotoButton.click();
            Contexts.acceptPermission();
            Contexts.acceptPermission();
        });
    }

    public addImagesByPhotoAlbum() {
        this.tapAddButton();
        Contexts.doTasksInNativeContext(() => {
            this.selector.picturesButton.click();
            Contexts.acceptPermission();
            this.selector.cameraRollButton.click();
            this.selector.getPhotoItemButtonAtIndex(1).click();
            this.selector.getPhotoItemButtonAtIndex(2).click();
            this.selector.getPhotoItemButtonAtIndex(3).click();
            this.selector.getPhotoItemButtonAtIndex(4).click();
            this.selector.selectPhotoDoneButton.click();
        });
    }

    public addVideo() {
        this.tapAddButton();
        Contexts.doTasksInNativeContext(() => {
            this.selector.videoButton.click();
            Contexts.acceptPermission();
            Contexts.acceptPermission();
            this.selector.videoCaptureButton.click();
            this.selector.videoCaptureButton.click();
            this.selector.useVideoButton.click();
        });
    }

    public addAudio() {
        this.tapAddButton();
        Contexts.doTasksInNativeContext(() => {
            this.selector.audioButton.click();
            Contexts.acceptPermission();
            this.selector.toggleAudioRecordingButton.click();
            this.selector.toggleAudioRecordingButton.click();
            this.selector.doneAudioButton.click();
        });
    }

    public addFileFromDropbox() {
        this.tapAddButton();
        Contexts.doTasksInNativeContext(() => {
            this.selector.fileButton.click();

            this.selector.fileBrowseButton.click();

            this.selector.browseOnDropboxButton.click();

            this.selector.samplePdf2Button.click();
        });
    }

    public addAllKindsOfAttachments() {
        this.addImageByCamera();
        this.addImagesByPhotoAlbum();
        this.addVideo();
        this.addAudio();
        this.addFileFromDropbox();
    }

    public tapRegisterButton() {
        this.selector.registerButton.click();
        browser.waitUntil(
            () => {
                let dialog = deviceType === DeviceType.iPad ? this.selector.iPadUploadingDialog : this.selector.iPhoneUploadingDialog;
                return !dialog.isDisplayed() || !dialog.isExisting();
            },
            120000,
            'Uploading time is too long',
            2000
        );
    }
}

export const attachmentScreen = new AttachmentScreen();
