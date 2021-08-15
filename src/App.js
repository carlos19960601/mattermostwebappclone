import { Provider } from "react-redux";
import { Router, Switch } from "react-router-dom";
import SignupEmail from "./container/signup/signup_email";
import store from "./store";
import { browserHistory } from "./utils/browser_history";
import { HFTRoute } from "./utils/router";

function App() {
  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Switch>
          <HFTRoute path="/signup_email" component={SignupEmail} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
