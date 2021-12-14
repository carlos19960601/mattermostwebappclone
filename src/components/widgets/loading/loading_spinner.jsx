import { t } from "../../../utils/i18n";
import LocalizedIcon from "../../localized_icon";

const LoadingSpinner = (props) => {
  return (
    <span
      id="loadingSpinner"
      className={"LoadingSpinner" + (props.text ? " with-text" : "")}
    >
      <LocalizedIcon
        className="fa fa-spinner fa-fw fa-pulse spinner"
        component="span"
        title={{
          id: t("generic_icons.loading"),
          defaultMessage: "Loading Icon",
        }}
      />
      {props.text}
    </span>
  );
};

export default LoadingSpinner;
