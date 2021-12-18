import { Tooltip as RBTooltip } from "react-bootstrap";

const Tooltip = (props) => {
  return (
    <RBTooltip
      id={props.id}
      className={props.className}
      positionLeft={props.positionLeft}
      style={props.style}
      placement={props.placement}
    >
      {props.children}
    </RBTooltip>
  );
};

export default Tooltip;
