('use strict');

const path = require('path');
const { pick, toLower } = require('lodash');
const chalk = require('chalk');
const { log, LogLevel } = require(path.resolve(__dirname, 'helper'));
const deviceProperties = require(path.join(process.cwd(), process.argv[4]));

const isDebugging = deviceProperties.debug;
const HOST = '127.0.0.1';

// Generate random ports for Appium, WebDriverAgent & WebkitDebugProxy
// since we need to run test in parallel
const { appiumPort, wdaLocalPort } = require(path.resolve(__dirname, 'random-ports.js'))();
const capability = require(path.resolve(__dirname, 'capability.conf.js'))(wdaLocalPort, deviceProperties);
const waitForTimeoutAmount = isDebugging ? 10 * 30 * 600000 : 30 * 60000;
/* ms */
const defaultTimeoutIntervalAmount = isDebugging ? 30 * 60000 : 90000;
/* ms */
const commandTimeoutAmount = 30 * 60000;
/* ms */

exports.config = {
    runner: 'local',
    host: HOST,
    port: appiumPort,
    specs: [
        path.resolve(__dirname, `../dist/apps/${deviceProperties.bundleId}/specs/common/**/*.spec.js`),
        path.resolve(__dirname, `../dist/apps/${deviceProperties.bundleId}/specs/${toLower(deviceProperties.deviceType)}/**/*.spec.js`)
    ],
    suites: deviceProperties.suites,
    maxInstances: 1,
    capabilities: [capability],
    logLevels: {
        webdriver: 'debug',
        webdriverio: 'debug'
    },
    outputDir: path.join(process.cwd(), 'logs', deviceProperties.bundleId, deviceProperties.deviceName),
    coloredLogs: true,
    bail: 0,
    waitforTimeout: waitForTimeoutAmount,
    deprecationWarnings: true,
    services: ['appium'],
    appium: {
        waitStartTime: 6000,
        waitforTimeout: waitForTimeoutAmount,
        command: 'appium',
        args: {
            address: HOST,
            port: appiumPort,
            commandTimeout: commandTimeoutAmount,
            sessionOverride: true,
            debugLogSpacing: true,
            platformName: 'iOS',
            relaxedSecurity: true
        },
        logLevel: 'debug'
    },
    framework: 'jasmine',
    reporters: [
        'dot',
        'spec',
        [
            'allure',
            {
                outputDir: 'allure-results',
                disableWebdriverStepsReporting: true,
                disableWebdriverScreenshotsReporting: true
            }
        ]
    ],
    jasmineNodeOpts: {
        defaultTimeoutInterval: defaultTimeoutIntervalAmount,
        expectationResultHandler: (passed, assertion) => {
            // only take screenshot if assertion failed
            if (passed) {
            } else {
                let context = browser.getContexts();
                console.log(context);

                // wait up to 5 seconds for commands to work
                browser.setImplicitTimeout(5000);

                // switch to the native context for the screenshot to work
                //
                browser.switchContext(context[0]);
                let now = new Date();
                let filename = now + '.png';
                browser.saveScreenshot('screenshots/' + filename);
                browser.switchContext(context[1]);
            }
        }
    },

    onPrepare: (config, capabilities) => {
        log(LogLevel.Log, '<<< NATIVE APP TESTS STARTED >>>');
        log(LogLevel.Log, `Appium Port: ${appiumPort}`);
        log(
            LogLevel.Log,
            JSON.stringify(pick(capabilities[0], ['deviceName', 'deviceType', 'udid', 'wdaLocalPort', 'webkitDebugProxyPort', 'appiumPort']), null, 2)
        );
    },
    before: (capabilities, specs) => {
        require('ts-node').register({ files: true, require: ['tsconfig-paths/register'] });
    },
    beforeTest: test => {
        log(LogLevel.Log, `${chalk.green('running')} ${test.title}`);
    },
    afterTest: test => {
        if (test.passed) {
            log(LogLevel.Log, `${chalk.green('passed')} ${test.fullName} (${test.duration})`);
        } else {
            log(LogLevel.Log, `${chalk.bgRed.black('failed')} ${test.fullName} (${test.duration})`);
        }
    }
};
