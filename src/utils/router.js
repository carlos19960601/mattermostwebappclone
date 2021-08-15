import { Route } from "react-router-dom";
import HeaderFooterTemplate from "../components/layout";

export const HFTRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      <HeaderFooterTemplate>
        <Component />
      </HeaderFooterTemplate>
    )}
  />
);
