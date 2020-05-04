import React from "react";

import { Layout, Input, Row, Col, Button, PageHeader, message } from "antd";
import "./Main.scss";

import TodoList from "../../components/TodoList/TodoList";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./SideBar/Sidebar";
import commonStore from "../../store/stores/commonStore";

import { RouteComponentProps } from "react-router";
import { observer, inject } from "mobx-react";
import TodosStore from "../../store/stores/todosStore";

const { Content, Footer } = Layout;

interface MainSceneProps extends RouteComponentProps {
  todosStore: TodosStore;
  authStore: any;
}

const routes = [
  {
    path: "index",
    breadcrumbName: "TodoApp",
  },
  {
    path: "first",
    breadcrumbName: "Profile",
  },
];

const MainPageContent = (props: { todosStore: TodosStore }) => {
  let onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setContent(event.target.value);
  };

  const groupTitle = React.useMemo(() => {
    if (props.todosStore.selectedGroup) {
      return props.todosStore.getGroups[props.todosStore.selectedGroup].title;
    } else return "Loading...";
  }, [props.todosStore.selectedGroup, props.todosStore.getGroups]);

  let createTodo = () => {
    // let nowDate = new Date();
    // props.todosStore.createTodo({
    //   content: content,
    //   remind_at: nowDate.toISOString(),
    //   group: props.todosStore.selectedGroup as numbe,
    // });
  };

  const [content, setContent] = React.useState("");

  return (
    <Content className="Main__todos_content">
      <Row gutter={[0, 20]}>
        <Col span={24}>
          <Row>
            <PageHeader
              className="Main__site-page-header"
              title={groupTitle}
              breadcrumb={{ routes }}
            />
          </Row>
          <Row gutter={[15, 0]}>
            <Col span={22}>
              <Input value={content} onChange={onInputChange} />
            </Col>
            <Col span={2}>
              <Button onClick={createTodo} type="primary">
                Add Todo
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={[0, 0]}>
        <Col className="Main__content_input" span={24}>
          <div className="Main__content_input">
            <TodoList todosStore={props.todosStore} />
          </div>
        </Col>
      </Row>
    </Content>
  );
};

const Main = (props: MainSceneProps) => {
  React.useEffect(() => {
    if (!commonStore.token) {
      props.history.replace("/auth");
      message.error("Encorrect data during login");
    } else {
      if (!props.authStore.getlogIn) {
        message.success("You have successfully logged in");
        props.authStore.setlLogIn(true);
      }
    }
  }, [commonStore.token, props.authStore.getlogIn]);

  React.useEffect(() => {
    props.todosStore.loadGroups();
  }, []);

  return (
    <>
      <Layout>
        <Navbar />
        <Content className="Main__content">
          <Layout>
            <Sidebar todosStore={props.todosStore} />
            <MainPageContent todosStore={props.todosStore} />
          </Layout>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          TodoApp ©2020 Created by MUCoders
        </Footer>
      </Layout>
    </>
  );
};

export default inject("todosStore", "authStore")(observer(Main));
