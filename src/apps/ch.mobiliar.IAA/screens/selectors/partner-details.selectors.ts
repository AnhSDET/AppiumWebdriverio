export class PartnerDetailsSelectorsIAA {
    private readonly selectors = {
        mobiItemText: 'mobi-item-text',
        mobiItemCardTitle: 'mobi-item-card:nth-of-type(index) div span.title',
        mobiItemCardContent: 'mobi-item-card:nth-of-type(index) div.content div',
        ellipsisIcons: 'mobi-item-card div.icons mobi-icon ion-icon',
        mbaCommunicationLabel: '~MBA <<Basel>> Actions',
        mbaCommunicationPhone: '~Call:061 266 62 70',
        mbaCommunicationEmail: '~Email:anonym3@mobi.ch',
        phoneWhenClick: '(//XCUIElementTypeStaticText[@name="Call ‭+41 61 266 62 70‬"])[2]' //(//XCUIElementTypeStaticText[@name=\"Call ‭+41 61 266 62 70‬\"])[2]
    };

    public get mobiItemTextLabelAndContent(): Array<WebdriverIO.Element> {
        let labels: Array<WebdriverIO.Element> = $$(this.selectors.mobiItemText.concat(' ion-label'));
        let contents: Array<WebdriverIO.Element> = $$(this.selectors.mobiItemText.concat(' div.item-content'));
        let labelsAndContents: Array<WebdriverIO.Element>;
        labelsAndContents = labels.concat(contents);
        return labelsAndContents;
    }

    public getMobiItemCardTitleAndContent(index: number): Array<WebdriverIO.Element> {
        let titleSelector: WebdriverIO.Element = $(this.selectors.mobiItemCardTitle.replace('index', index.toString()));
        let contentSelector: WebdriverIO.Element = $(this.selectors.mobiItemCardContent.replace('index', index.toString()));
        let titleAndContent: Array<WebdriverIO.Element> = [];
        titleAndContent.push(titleSelector, contentSelector);
        return titleAndContent;
    }

    public getMobiItemCardContent(index: number): WebdriverIO.Element {
        return $(this.selectors.mobiItemCardContent.replace('index', index.toString()));
    }

    public get ellipsisIcons(): Array<WebdriverIO.Element> {
        return $$(this.selectors.ellipsisIcons);
    }

    public get mbaCommunicationLabel(): WebdriverIO.Element {
        return $(this.selectors.mbaCommunicationLabel);
    }

    public get mbaCommunicationPhone(): WebdriverIO.Element {
        return $(this.selectors.mbaCommunicationPhone);
    }

    public get mbaCommunicationEmail(): WebdriverIO.Element {
        return $(this.selectors.mbaCommunicationEmail);
    }

    public get phoneWhenClick(): WebdriverIO.Element {
        return $(this.selectors.phoneWhenClick);
    }
}
