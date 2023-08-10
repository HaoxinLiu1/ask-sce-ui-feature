/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import {
  ApplicationInsights,
  SeverityLevel,
} from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';

let reactPlugin: ReactPlugin;
let appInsights: ApplicationInsights;

/**
 * Create the App Insights Telemetry Service
 * @return {{reactPlugin: ReactPlugin, appInsights: Object, initialize: Function}} - Object
 */
const createTelemetryService = (): {
  reactPlugin: ReactPlugin;
  appInsights: object;
  initialize: Function;
} => {
  /**
   * Initialize the Application Insights class
   * @param {string} aiConnectionString - Application Insights Connection String
   * @param {Object} browserHistory - client's browser history, supplied by the withRouter HOC
   * @return {void}
   */
  const initialize = async (browserHistory: any) => {
    if (!browserHistory) {
      throw new Error('Could not initialize Telemetry Service');
    }

    const confRes = await fetch('/config/appInsightsConnStr');
    const conf = await confRes.json();
    const aiConnectionString = conf.appInsightsConnStr;
    reactPlugin = new ReactPlugin();

    appInsights = new ApplicationInsights({
      config: {
        connectionString: aiConnectionString,
        maxBatchInterval: 0,
        disableFetchTracking: false,
        extensions: [reactPlugin],
        extensionConfig: {
          [reactPlugin.identifier]: {
            history: browserHistory,
          },
        },
      },
    });

    appInsights.loadAppInsights();
  };

  return { reactPlugin, appInsights, initialize };
};

export function trackException(errorMsg: string) {
  appInsights.trackException({
    error: new Error(errorMsg),
    severityLevel: SeverityLevel.Error,
  });
}

export function trackTrace(traceMsg: string) {
  appInsights.trackTrace({
    message: traceMsg,
    severityLevel: SeverityLevel.Information,
  });
}

export function trackEvent(eventName: string) {
  appInsights.trackEvent({ name: eventName });
}

export function initializeUser(userid: string) {
  appInsights.setAuthenticatedUserContext(userid.replace(/[,;=| ]+/g, '_'));
  appInsights.trackPageView();
}

export const ai = createTelemetryService();
export const getAppInsights = () => appInsights;
