import { t } from "../../../utils/i18n";
import LocalizedIcon from "../../localized_icon";

export default function NextIcon(props) {
  const className =
    "fa fa-1x fa-angle-right" +
    (props.additionalClassName ? " " + props.additionalClassName : "");
  return (
    <LocalizedIcon
      className={className}
      title={{ id: t("generic_icons.next"), defaultMessage: "Next Icon" }}
    />
  );
}
