import { useEffect } from "react";
import { Switch } from "react-router-dom";
import { HFTRoute } from "../utils/router";
import IntlProvider from "./intl_provider";
import SignupController from "./signup/signup_controller";
import SignupEmail from "./signup/signup_email";

export default function App(props) {
  useEffect(() => {
    if (props.location.pathname == "/") {
      props.history.push("/signup_user_complete");
    }
  });

  return (
    <IntlProvider>
      <Switch>
        <HFTRoute path="/signup_email" component={SignupEmail} />
        <HFTRoute path={"/signup_user_complete"} component={SignupController} />
      </Switch>
    </IntlProvider>
  );
}
