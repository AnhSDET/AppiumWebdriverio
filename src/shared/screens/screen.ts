const DEFAULT_TIMEOUT: number = 35000;

/* ms */

export class Screen {
    public waitForElementDisplay(element: WebdriverIO.Element) {
        if (element.isDisplayed()) {
            return;
        }

        browser.waitUntil(
            () => {
                return element.isDisplayed();
            },
            DEFAULT_TIMEOUT,
            `ERROR: element ${element} does not display in view after ${DEFAULT_TIMEOUT / 1000}s`,
            2000
        );
    }

    public waitForElementsDisplay(elements: WebdriverIO.Element[]) {
        for (let index in elements) {
            if (elements[index].isDisplayed()) {
                continue;
            }

            browser.waitUntil(
                () => {
                    return elements[index].isDisplayed();
                },
                DEFAULT_TIMEOUT,
                `ERROR: element ${elements[index]} does not display in view after ${DEFAULT_TIMEOUT / 1000}s`,
                2000
            );
        }
    }

    private waitForElementsHaveText(elements: WebdriverIO.Element[]) {
        for (let index in elements) {
            if (elements[index].getText().trim().length !== 0) {
                console.log(elements[index].getText());
            } else {
                browser.waitUntil(
                    () => {
                        return elements[index].getText().length != 0;
                    },
                    DEFAULT_TIMEOUT,
                    `ERROR: element ${elements[index]} does not display in view after ${DEFAULT_TIMEOUT / 1000}s`,
                    2000
                );
            }
        }
    }

    private waitForElementHaveText(element: WebdriverIO.Element) {
        if (element.getText().trim().length == 0) {
            browser.waitUntil(
                () => {
                    return element.getText().length != 0;
                },
                DEFAULT_TIMEOUT,
                `ERROR: element ${element} does not display in view after ${DEFAULT_TIMEOUT / 1000}s`,
                2000
            );
        }
    }

    public waitForElementsHasValue(elements: Array<WebdriverIO.Element>) {
        this.waitForElementsDisplay(elements);
        this.waitForElementsHaveText(elements);
    }

    public waitForElementHasValue(element) {
        this.waitForElementDisplay(element);
        this.waitForElementHaveText(element);
    }

    public waitForElementExist(element: WebdriverIO.Element) {
        let state: boolean;
        try {
            state = element.isExisting();
        } catch (e) {
            console.log('Need to wait');
            element.waitForExist(5000);
            console.log('now state is: ' + state);
        }
    }

    public waitForElementsExist(elements: WebdriverIO.Element[]) {
        for (let index in elements) {
            let state: boolean = elements[index].isExisting();
            if (!state) {
                console.log('Element existing state is: ' + state);
                browser.waitUntil(
                    () => {
                        return elements[index].isExisting();
                    },
                    DEFAULT_TIMEOUT,
                    `ERROR: element ${elements[index]} still exists in DOM after waiting for ${DEFAULT_TIMEOUT / 1000}s`,
                    2000
                );
                console.log('Now - Element existing state is: ' + state);
            } else {
                return;
            }
        }
    }

    public waitUntilElementNotExist(element: WebdriverIO.Element) {
        if (element.isExisting()) {
            browser.waitUntil(
                () => {
                    return !element.isExisting();
                },
                DEFAULT_TIMEOUT,
                `ERROR: element ${element} still exists in DOM after waiting for ${DEFAULT_TIMEOUT / 1000}s`,
                5000
            );
        } else {
            return;
        }
    }

    public waitUntilElementsNotExist(elements: WebdriverIO.Element[]) {
        for (let index in elements) {
            if (elements[index].isExisting()) {
                browser.waitUntil(
                    () => {
                        return !elements[index].isExisting();
                    },
                    DEFAULT_TIMEOUT,
                    `ERROR: element ${elements[index]} still exists in DOM after waiting for ${DEFAULT_TIMEOUT / 1000}s`,
                    2000
                );
            } else {
                return;
            }
        }
    }

    public waitUntilElementNotDisplay(element: WebdriverIO.Element) {
        if (element.isDisplayed()) {
            browser.waitUntil(
                () => {
                    return !element.isDisplayed();
                },
                DEFAULT_TIMEOUT,
                `ERROR:element ${element} still display after waiting for ${DEFAULT_TIMEOUT / 1000}s`
            );
        }
        return;
    }

    public waitUntilElementsNotDisplay(elements: WebdriverIO.Element[]) {
        for (let index in elements) {
            if (elements[index].isDisplayed()) {
                browser.waitUntil(
                    () => {
                        return !elements[index].isDisplayed();
                    },
                    DEFAULT_TIMEOUT,
                    `ERROR: element ${elements[index]} still not display after ${DEFAULT_TIMEOUT / 1000}s`,
                    2000
                );
            } else {
                return;
            }
        }
    }

    public waitUntilElementNotExistingStateReturn(element: WebdriverIO.Element): boolean {
        browser.waitUntil(
            () => {
                return !element.isExisting();
            },
            DEFAULT_TIMEOUT,
            `ERROR: ${element}'s existing state is still true after waiting for ${DEFAULT_TIMEOUT / 1000}s. It should be false`,
            5000
        );
        return element.isExisting();
    }

    public tapAndWaitForNotDisplay(element: WebdriverIO.Element) {
        this.waitForElementDisplay(element);
        element.click();
        this.waitUntilElementNotDisplay(element);
    }
}
