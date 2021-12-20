import classNames from "classnames";
import { useRef, useState } from "react";
import Search from "../search";

const SidebarRight = () => {
  const isSidebarRightExpanded = true;
  const isOpen = true;
  const [isOpened, setIsOpened] = useState(true);

  const sidebarRight = useRef(null);
  var focusSearchBar = null;

  const rhsChannel = null;

  const onShrink = () => {};

  const getSearchBarFocus = (bar) => {
    focusSearchBar = bar;
  };

  let content = null;
  return (
    <div
      className={classNames("sidebar--right", {
        "sidebar--right--expanded": isSidebarRightExpanded,
        "move--left": isOpen,
        hidden: !isOpen,
      })}
      id="sidebar-right"
      role="complementary"
      ref={sidebarRight}
    >
      <div onClick={onShrink} className="sidebar--right__bg" />
      <div className="sidebar-right-container">
        <Search
          isFocus={true}
          isSideBarRight={true}
          isSideBarRightOpen={isOpened}
          getFocus={getSearchBarFocus}
          channelDisplayName={rhsChannel ? rhsChannel.display_name : ""}
        >
          {isOpen && content}
        </Search>
      </div>
    </div>
  );
};

export default SidebarRight;
