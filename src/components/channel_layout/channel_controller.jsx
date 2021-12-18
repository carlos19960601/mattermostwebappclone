import AnnouncementBarController from "../announcement_bar/announcement_bar_controller";
import FaviconTitleHandler from "../favicon_title_handler";
import ProductNoticesModal from "../product_notices_modal";
import SystemNotice from "../system_notice";

const ChannelController = (props) => {
  return (
    <div id="channel_view" className="channel-view">
      <AnnouncementBarController />
      <SystemNotice />
      <FaviconTitleHandler />
      <ProductNoticesModal />
      <div className="container-fluid">
        <SidebarRight />
      </div>
    </div>
  );
};

export default ChannelController;
