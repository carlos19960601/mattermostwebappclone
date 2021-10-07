import React from "react";
import { injectIntl } from "react-intl";

const LocalizedIcon = React.forwardRef((props, ref) => {
  const { component = "i", ariaLabel, title, ...otherProps } = props;
  if (component !== "i" && component !== "span") {
    return null;
  }

  // Use an uppercase name since JSX thinks anything lowercase is an HTML tag
  const Component = component;
  const { formatMessage } = useIntl();
  const iconProps = {
    ...otherProps,
  };

  if (ariaLabel) {
    iconProps["aria-label"] = formatMessage(
      { id: ariaLabel.id, defaultMessage: ariaLabel.defaultMessage },
      ariaLabel.values
    );
  }
  if (title) {
    iconProps.title = formatMessage(
      { id: title.id, defaultMessage: title.defaultMessage },
      title.values
    );
  }

  return <Component ref={ref} {...iconProps} />;
});

export default injectIntl(LocalizedIcon, { forwardRef: true });
