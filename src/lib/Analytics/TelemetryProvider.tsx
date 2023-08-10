/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Component, Fragment } from 'react';
import { withAITracking } from '@microsoft/applicationinsights-react-js';
import withRouter from './RouterConfig';
import { ai } from './TelemetryService';

interface TelemetryProviderProps {
  history: any;
  children?: React.ReactNode;
}

/**
 * This Component provides telemetry with Azure App Insights
 *
 * NOTE: the package '@microsoft/applicationinsights-react-js' has a HOC withAITracking that requires this to be a Class Component rather than a Functional Component
 */
class TelemetryProvider extends Component<TelemetryProviderProps> {
  state = {
    initialized: false,
  };

  async componentDidMount() {
    const { history } = this.props;
    const { initialized } = this.state;
    if (!initialized && Boolean(history)) {
      await ai.initialize(history);
      this.setState({ initialized: true });
    }
  }

  render() {
    const { children } = this.props;
    return <Fragment>{children}</Fragment>;
  }
}

export default withRouter(withAITracking(ai.reactPlugin, TelemetryProvider));
