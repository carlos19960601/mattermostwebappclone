import { useEffect } from "react";
import { Switch } from "react-router-dom";
import CreateTeam from "./create_team";
import { HFTRoute, LoggedInHFTRoute } from "./header_footer_template_route";
import IntlProvider from "./intl_provider";
import LoginController from "./login/login_controller";
import SelectTeam from "./select_team";
import SignupController from "./signup/signup_controller";
import SignupEmail from "./signup/signup_email";

export default function App(props) {
  useEffect(() => {
    if (props.location.pathname === "/") {
      props.history.push("/signup_user_complete");
    }
  });

  return (
    <IntlProvider>
      <Switch>
        <HFTRoute path="/signup_email" component={SignupEmail} />
        <HFTRoute path={"/signup_user_complete"} component={SignupController} />
        <HFTRoute path={"/login"} component={LoginController} />
        <LoggedInHFTRoute path={"/select_team"} component={SelectTeam} />
        <LoggedInHFTRoute path={"/create_team"} component={CreateTeam} />
      </Switch>
    </IntlProvider>
  );
}
