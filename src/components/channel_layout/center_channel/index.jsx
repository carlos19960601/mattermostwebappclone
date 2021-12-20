import classNames from "classnames";
import ChannelHeaderMobile from "../../channel_header_mobile";

const CenterChannel = (props) => {
  return (
    <div
      key="inner-wrap"
      className={classNames("inner-wrap", "channel__wrap", {
        "move--right": props.lhsOpen,
        "move--left": props.rhsOpen,
        "move--left-small": props.rhsMenuOpen,
      })}
    >
      <div className="row header">
        <div id="navbar_wrapper">
          <ChannelHeaderMobile />
        </div>
      </div>
    </div>
  );
};

export default CenterChannel;
