export class AttachmentSelectors {
    private readonly selectors = {
        claimAttachmentsScreenIdentity: '',
        backButton: '',
        addButton: '',
        registerButton: '',
        documentItems: '',
        iPhoneUploadingDialog: '',
        iPadUploadingDialog: '',
        cameraButton: '~Camera',
        picturesButton: '~Pictures',
        videoButton: '~Video',
        audioButton: '~Audio',
        fileButton: '~File',
        photoCaptureButton: '~PhotoCapture',
        usePhotoButton: '~Use Photo',
        retakePhotoButton: '~Retake',
        cameraRollButton: '~Camera Roll',
        selectPhotoDoneButton: '~Done',
        photoItemButton: `//XCUIElementTypeApplication[@name="Claim"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView/XCUIElementTypeCell`,
        videoCaptureButton: '~VideoCapture',
        useVideoButton: '~Use Video',
        retakeVideoButton: '~Retake',
        toggleAudioRecordingButton: '~toggle audio recording',
        doneAudioButton: '~Done',
        fileBrowseButton: '~Browse',
        browseOnDropboxButton: '~Dropbox — Personal',
        samplePdfButton: '~sample, pdf',
        samplePdf2Button: '~sample2, pdf'
    };

    public get claimAttachmentsScreenIdentity(): WebdriverIO.Element {
        return $(this.selectors.claimAttachmentsScreenIdentity);
    }

    public get backButton(): WebdriverIO.Element {
        return $(this.selectors.backButton);
    }

    public get addButton(): WebdriverIO.Element {
        return $(this.selectors.addButton);
    }

    public get registerButton(): WebdriverIO.Element {
        return $(this.selectors.registerButton);
    }

    public get iPhoneUploadingDialog(): WebdriverIO.Element {
        return $(this.selectors.iPhoneUploadingDialog);
    }

    public get iPadUploadingDialog(): WebdriverIO.Element {
        return $(this.selectors.iPadUploadingDialog);
    }

    public get documentItems(): WebdriverIO.Element[] {
        return $$(this.selectors.documentItems);
    }

    public get cameraButton(): WebdriverIO.Element {
        return $(this.selectors.cameraButton);
    }

    public get picturesButton(): WebdriverIO.Element {
        return $(this.selectors.picturesButton);
    }

    public get videoButton(): WebdriverIO.Element {
        return $(this.selectors.videoButton);
    }

    public get audioButton(): WebdriverIO.Element {
        return $(this.selectors.audioButton);
    }

    public get fileButton(): WebdriverIO.Element {
        return $(this.selectors.fileButton);
    }

    public get photoCaptureButton(): WebdriverIO.Element {
        return $(this.selectors.photoCaptureButton);
    }

    public get usePhotoButton(): WebdriverIO.Element {
        return $(this.selectors.usePhotoButton);
    }

    public get retakePhotoButton(): WebdriverIO.Element {
        return $(this.selectors.retakePhotoButton);
    }

    public get cameraRollButton(): WebdriverIO.Element {
        return $(this.selectors.cameraRollButton);
    }

    public get selectPhotoDoneButton(): WebdriverIO.Element {
        return $(this.selectors.selectPhotoDoneButton);
    }

    public getPhotoItemButtonAtIndex(index: number): WebdriverIO.Element {
        return $(`${this.selectors.photoItemButton}[${index}]`);
    }

    public get videoCaptureButton(): WebdriverIO.Element {
        return $(this.selectors.videoCaptureButton);
    }

    public get useVideoButton(): WebdriverIO.Element {
        return $(this.selectors.useVideoButton);
    }

    public get retakeVideoButton(): WebdriverIO.Element {
        return $(this.selectors.retakeVideoButton);
    }

    public get toggleAudioRecordingButton(): WebdriverIO.Element {
        return $(this.selectors.toggleAudioRecordingButton);
    }

    public get doneAudioButton(): WebdriverIO.Element {
        return $(this.selectors.doneAudioButton);
    }

    public get fileBrowseButton(): WebdriverIO.Element {
        return $(this.selectors.fileBrowseButton);
    }

    public get browseOnDropboxButton(): WebdriverIO.Element {
        return $(this.selectors.browseOnDropboxButton);
    }

    public get samplePdfButton(): WebdriverIO.Element {
        return $(this.selectors.samplePdfButton);
    }

    public get samplePdf2Button(): WebdriverIO.Element {
        return $(this.selectors.samplePdf2Button);
    }
}
