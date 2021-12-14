import { createBrowserHistory } from "history";

const b = createBrowserHistory({
  basename: window.basename,
});

export const browserHistory = {
  ...b,
  push: (path, ...args) => {
    b.push(path, ...args);
  },
};
