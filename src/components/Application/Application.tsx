import React from "react";

import { Provider } from "mobx-react";
import { Switch, Route, Router } from "react-router-dom";
import { history } from "../../store/history";
import "./Application.scss";
import "antd/dist/antd.css";

import AuthScene from "../../scenes/AuthScene/AuthScene";
import Main from "../../scenes/Main/Main";

import authStore from "../../store/stores/authStore";

import TodosStore from "../../store/stores/todosStore";
import AuthStore from "../../store/stores/authStore";

const store = {
  authStore: new AuthStore(),
  todosStore: new TodosStore(),
};

const Application: React.FC = () => {
  const applicationRoutes = (
    <Switch>
      <Route path="/" component={AuthScene} exact={true} />
      <Route path="/auth" component={AuthScene} />
      <Route path="/cabinet" component={Main} />
    </Switch>
  );

  return (
    <Provider {...store}>
      <Router history={history}>{applicationRoutes}</Router>
    </Provider>
  );
};

export default Application;
