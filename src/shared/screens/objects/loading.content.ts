export class LoadingContent {
    private static readonly loadingContentSelectors = {
        loadingContent: 'div.loading-content'
    };

    public static get loadingContent(): WebdriverIO.Element {
        return $(this.loadingContentSelectors.loadingContent);
    }

    public static waitForLoadingContentDismiss(): void {
        const loadingContent: WebdriverIO.Element = this.loadingContent;
        browser.waitUntil(
            () => {
                return !loadingContent.isExisting();
            },
            35000,
            `ERROR: ${loadingContent}'s existing state is still true after waiting for ${35000 / 1000}s. It should be false`,
            5000
        );
    }
}
