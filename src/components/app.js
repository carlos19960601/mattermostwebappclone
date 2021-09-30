import IntlProvider from "@/components/intl_provider";
import SignupController from "@/components/signup/signup_controller";
import SignupEmail from "@/components/signup/signup_email";
import { HFTRoute } from "@/utils/router";
import { useEffect } from "react";
import { Switch } from "react-router-dom";

export default function App(props) {
  useEffect(() => {
    console.log(props);
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
