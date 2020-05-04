import React from "react";
import { Layout, Button, Affix } from "antd";
import authStore from "../../../store/stores/authStore";
import "./Navbar.scss";
import { withRouter } from "react-router-dom";
const { Header } = Layout;

const Navbar = (props: any) => {
  let logout = () => {
    authStore.logout().then(() => props.history.replace("/"));
  };

  return (
    // <Affix offsetTop={0}>
      <Header className="Navbar__header">
        <b>MUC-TodoList-App</b>
        <Button
          type="primary"
          onClick={logout}
          className="Navbar__header_button"
        >
          Logout
        </Button>
      </Header>
    // </Affix>
  );
};

export default withRouter(Navbar);
