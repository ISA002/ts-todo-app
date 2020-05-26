import React from "react";
import { Layout, Menu, Divider, Button, Badge } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  PlusOutlined,
  CloseOutlined,
  BookOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { observer } from "mobx-react";
import _ from "lodash";
import { toJS } from "mobx";
import TodosStore from "../../../store/stores/todosStore";
import { TodoGroup } from "../../../store/types";
import SideBarNewGroupItem from "./SideBarNewGroupItem/SideBarNewGroupItem";
import "./Sidebar.scss";

const { Sider } = Layout;

interface SidebarProps {
  todosStore: TodosStore;
  todosToday: number;
}

const Sidebar = (props: SidebarProps) => {
  const [groupID, setGroupID] = React.useState<number>(0);
  const [newGroup, setNewGroup] = React.useState<Record<number, TodoGroup>>({});

  const renderedTitles = React.useMemo(
    () =>
      props.todosStore.getGroups.map((todo, index) => (
        <Menu.Item
          key={`${todo.id}${index}`}
          onClick={() => {
            props.todosStore.selectedGroup = todo.id;
          }}
        >
          <span>
            <BookOutlined />
            {todo.title}
          </span>
          <Button
            style={{
              float: "right",
              border: "none",
              backgroundColor: "#fff",
              marginTop: "4px",
            }}
            icon={<CloseOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              props.todosStore.deleteGroup(todo.id);
            }}
          />
        </Menu.Item>
      )),
    [props.todosStore.getGroups, props.todosStore.selectedGroup]
  );

  const onDeleteGroup = (id: number) => {
    setNewGroup(_.omit(newGroup, id.toString()));
  };

  const renderNewGroups = React.useMemo(() => {
    return Object.values(newGroup).map((todo, index) => (
      <Menu.Item>
        <SideBarNewGroupItem
          id={todo.id}
          deletefun={onDeleteGroup}
          todosStore={props.todosStore}
        />
      </Menu.Item>
    ));
  }, [newGroup]);

  const addGroup = () => {
    console.log(Object.values(newGroup));
    console.log(groupID);
    setNewGroup({
      ...newGroup,
      [groupID]: {
        id: groupID,
        title: "",
        todos: [],
        user: 1,
      },
    });
    setGroupID((groupID) => (groupID += 1));
  };

  return (
    <Sider
      className="Sider__main"
      width={300}
      style={{
        height: "100vh",
        background: "#fff",
        maxHeight: "100vh",
        position: "fixed",
        overflowX: "hidden",
      }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ height: "100vh", borderRight: 0 }}
      >
        <Divider>User settings</Divider>
        <Menu.Item key="130">
          <UserOutlined />
          Profile
        </Menu.Item>
        <Menu.Item key="150">
          <CalendarOutlined />
          Today
          <Badge
            style={{
              marginLeft: "10rem",
              color: "white",
              backgroundColor: "#1890ff",
            }}
            count={props.todosToday}
          />
        </Menu.Item>
        <Menu.Item key="140">
          <SettingOutlined />
          Settings
        </Menu.Item>

        <Divider>Groups </Divider>
        <Button
          className="Sider__menu_addButton"
          style={{ marginLeft: "5rem" }}
          onClick={() => addGroup()}
        >
          <PlusOutlined />
          Create group
        </Button>

        {renderNewGroups}
        {renderedTitles}
      </Menu>
    </Sider>
  );
};

export default observer(Sidebar);
