import React from "react";
import { Layout, Menu, Divider, Button, Affix, Badge } from "antd";
import {
  UserOutlined,
  BellOutlined,
  CalendarOutlined,
  PlusOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { observer } from "mobx-react";
import _ from "lodash";
import { toJS } from "mobx";
import TodosStore from "../../../store/stores/todosStore";

const { Sider } = Layout;

interface SidebarProps {
  todosStore: TodosStore;
}

const Sidebar = (props: SidebarProps) => {
  // const todosContainer = React.useMemo(() => {
  //   if (Object.keys(props.todosStore.getGroups).length > 0) {
  //     return props.todosStore.getGroups;
  //   }
  //   return [{ content: "Empty" }];
  // }, [props.todosStore.getGroups]);

  // console.log(toJS(todosContainer))

  const _renderTittle = props.todosStore.getGroups.map((todo: any, index) => (
    <Menu.Item key={`${todo.id}${index}`}>
      {/* <span>
            <CalendarOutlined />
            {todo.title}
          </span> */}
      <Button
        style={{
          borderRadius: "20px",
          border: "none",
          float: "right",
          background: "none",
        }}
        icon={<CloseOutlined />}
      />
    </Menu.Item>
  ));

  return (
    // <Affix offsetTop={55}>
    <Sider
      className="Sider__main"
      width={300}
      style={{ height: "100vh", background: "#fff", maxHeight: "100vh" }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ height: "100vh", borderRight: 0 }}
      >
        <Divider>User settings</Divider>
        <Menu.Item key="13">
          <UserOutlined />
          Profile
        </Menu.Item>
        <Menu.Item key="14">
          <Badge dot={true}>
            <BellOutlined />
            Notifications
          </Badge>
        </Menu.Item>

        <Divider>Groups </Divider>
        <Button
          className="Sider__menu_addButton"
          style={{ marginLeft: "5.5rem" }}
        >
          <PlusOutlined />
          Add group
        </Button>
        {_renderTittle}
      </Menu>
    </Sider>
    // </Affix>
  );
};

export default observer(Sidebar);
