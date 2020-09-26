import { Screen } from '../screen';
import Gestures from '../../helpers/gestures';

export class AutoCompleteScreen extends Screen {
    private readonly autoCompleteSelectors = {
        autoCompleteGroup: 'ul'
    };

    public get autoCompleteBoxes(): Array<WebdriverIO.Element> {
        return $$(this.autoCompleteSelectors.autoCompleteGroup.concat(' li'));
    }

    public get autoCompleteBoldValueBoxes(): Array<WebdriverIO.Element> {
        return $$(this.autoCompleteSelectors.autoCompleteGroup.concat(' li span b'));
    }

    public get autoCompleteGroup(): WebdriverIO.Element {
        return $(this.autoCompleteSelectors.autoCompleteGroup);
    }

    public waitForAutoCompleteGroupDisplay() {
        super.waitForElementDisplay(this.autoCompleteGroup);
    }

    public selectValueInAutoComplete(whichAutoCompletePosition: number): void {
        this.waitForAutoCompleteGroupDisplay();
        Gestures.scrollIntoView(this.autoCompleteBoxes[whichAutoCompletePosition]);
        this.autoCompleteBoxes[whichAutoCompletePosition].click();
        super.waitUntilElementNotDisplay(this.autoCompleteGroup);
    }

    public getNumberOfAutoCompleteBoxes(): number {
        this.waitForAutoCompleteGroupDisplay();
        return this.autoCompleteBoxes.length;
    }

    public getValuesOfAutoCompleteBoxes(): Array<string> {
        this.waitForAutoCompleteGroupDisplay();
        let currentAutoCompleteSelectors: Array<WebdriverIO.Element> = this.autoCompleteBoxes;
        let autocompleteValues: Array<string> = [];
        for (let index in currentAutoCompleteSelectors) {
            if (currentAutoCompleteSelectors[index].isDisplayed()) {
                autocompleteValues.push(currentAutoCompleteSelectors[index].getText().trim());
            } else {
                Gestures.scrollIntoView(currentAutoCompleteSelectors[index]);
                autocompleteValues.push(currentAutoCompleteSelectors[index].getText().trim());
            }
        }
        return autocompleteValues;
    }

    public isAutoCompleteGroupDisplayed(): boolean {
        return this.autoCompleteGroup.isDisplayed();
    }
}
