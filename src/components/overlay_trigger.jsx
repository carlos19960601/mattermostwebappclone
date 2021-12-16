import React, { forwardRef } from "react";
import { OverlayTrigger as OriginalOverlayTrigger } from "react-bootstrap";
import { IntlContext } from "react-intl";
import { Provider } from "react-redux";
import store from "../store";

const OverlayTrigger = (props, ref) => {
  const { overlay, disabled, ...otherProps } = props;

  const OverlayWrapper = ({ intl, ...overlayProps }) => (
    <Provider store={store}>
      <IntlContext.Provider value={intl}>
        {React.cloneElement(overlay, overlayProps)}
      </IntlContext.Provider>
    </Provider>
  );

  return (
    <IntlContext.Consumer>
      {(intl) => {
        const overlayProps = { ...overlay.props };
        return (
          <OriginalOverlayTrigger
            ref={ref}
            overlay={<OverlayWrapper {...overlayProps} intl={intl} />}
          ></OriginalOverlayTrigger>
        );
      }}
    </IntlContext.Consumer>
  );
};

export default forwardRef(OverlayTrigger);
