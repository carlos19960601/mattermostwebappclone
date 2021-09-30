import Root from "@/components/app";
import "@/sass/styles.scss";
import store from "@/store";
import { browserHistory } from "@/utils/browser_history";

import { Provider } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";

function App(props) {
  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={Root} />
       
      </Router>
    </Provider>
  );
}

export default App;
