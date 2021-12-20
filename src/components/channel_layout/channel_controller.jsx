import { Route } from "react-router-dom";
import AnnouncementBarController from "../announcement_bar/announcement_bar_controller";
import FaviconTitleHandler from "../favicon_title_handler";
import ProductNoticesModal from "../product_notices_modal";
import SidebarRight from "../sidebar_right";
import SystemNotice from "../system_notice";
import CenterChannel from "./center_channel";

const ChannelController = (props) => {
  return (
    <div id="channel_view" className="channel-view">
      <AnnouncementBarController />
      <SystemNotice />
      <FaviconTitleHandler />
      <ProductNoticesModal />
      <div className="container-fluid">
        <SidebarRight />
        {!props.fetchingChannels && <Route component={CenterChannel} />}
      </div>
    </div>
  );
};

export default ChannelController;
