import React from "react";

import {
  Layout,
  Input,
  Row,
  Col,
  Button,
  PageHeader,
  message,
} from "antd";
import "./Main.scss";

import TodoList from "../../components/TodoList/TodoList";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./SideBar/Sidebar";
import commonStore from "../../store/stores/commonStore";

import { RouteComponentProps } from "react-router";
import { observer, inject } from "mobx-react";

const { Content, Footer } = Layout;

interface MainSceneProps extends RouteComponentProps {
  todosStore: any;
  authStore: any;
}

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

  React.useEffect(()=>{
    props.todosStore.loadGroups();
  }, [])

  const groupTitle = React.useMemo(() => {
    if (props.todosStore.getIdSelectGroup != null) {
      return props.todosStore.getGroups[props.todosStore.getIdSelectGroup]
        .title;
    } else return "Loading...";
  }, [props.todosStore.getIdSelectGroup]);

  let createTodo = () => {
    let nowDate = new Date()
    props.todosStore.createTodo({
      content: content,
      remind_at: nowDate,
      group: props.todosStore.getIdSelectGroup,
    });
  };

  let onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setContent(event.target.value);
  };

  const [content, setContent] = React.useState("");

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

  return (
    <>
      <Layout>
        <Navbar />
        <Content className="Main__content">
          <Layout>
            <Sidebar todosStore={props.todosStore} />
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
                    <TodoList {...props} />
                  </div>
                </Col>
              </Row>
            </Content>
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
