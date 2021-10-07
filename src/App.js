import { Provider } from "react-redux";
import { Route, Router } from "react-router-dom";
import Root from "./components/app";
import "./sass/styles.scss";
import store from "./store";
import { browserHistory } from "./utils/browser_history";

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
