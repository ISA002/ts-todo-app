import React from "react";
import { Layout, Button, Affix, Menu, Dropdown } from "antd";
import "./Navbar.scss";
import { withRouter, RouteComponentProps } from "react-router-dom";
import AuthStore from "../../../store/stores/authStore";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import TodosStore from "../../../store/stores/todosStore";
const { Header } = Layout;

interface NavbarProps extends RouteComponentProps {
  authStore: AuthStore;
  todosStore: TodosStore;
  history: any;
}

const Navbar = (props: NavbarProps) => {
  let logout = () => {
    props.authStore.logout().then(() => {
      props.history.replace("/");
      props.todosStore.clear();
    });
  };

  const content = (
    <Menu>
      <Menu.Item key="0">
        <a href="#">Profile</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="#">Settings</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={logout}>
        LogOut
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      className="Navbar__header"
      style={{ position: "fixed", zIndex: 1, width: "100%" }}
    >
      <b>MUC-TodoList-App</b>
      <Dropdown overlay={content} trigger={["click"]}>
        <Button type="primary" className="Navbar__header_button">
          admin
          <UserOutlined style={{ fontSize: "20px" }} />
          <DownOutlined style={{ fontSize: "10px" }} />
        </Button>
      </Dropdown>
    </Header>
  );
};

export default withRouter(Navbar);
