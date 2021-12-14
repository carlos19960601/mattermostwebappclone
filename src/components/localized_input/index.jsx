import { forwardRef } from "react";
import { useIntl } from "react-intl";

const LocalizedInput = (props, ref) => {
  const { formatMessage } = useIntl();

  const {
    placeholder: { id, defaultMessage, values },
    ...otherProps
  } = props;
  return (
    <input
      {...otherProps}
      ref={ref}
      placeholder={formatMessage({ id, defaultMessage }, values)}
    />
  );
};

export default forwardRef(LocalizedInput);
