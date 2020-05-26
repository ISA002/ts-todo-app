import React from "react";

import {
  Layout,
  Input,
  Row,
  Col,
  Button,
  PageHeader,
  message,
  DatePicker,
} from "antd";
import "./Main.scss";

import TodoList from "../../components/TodoList/TodoList";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./SideBar/Sidebar";
import commonStore from "../../store/stores/commonStore";

import { RouteComponentProps } from "react-router";
import { observer, inject } from "mobx-react";
import TodosStore from "../../store/stores/todosStore";
import AuthStore from "../../store/stores/authStore";
import moment from "moment";
import { toJS } from "mobx";

const { Content, Footer } = Layout;

interface MainSceneProps extends RouteComponentProps {
  todosStore: TodosStore;
  authStore: AuthStore;
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

const MainPageContent = observer((props: { todosStore: TodosStore }) => {
  const [content, setContent] = React.useState("");
  const [remind, setRemind] = React.useState(moment);

  const groupTitle = React.useMemo(() => {
    if (
      props.todosStore.selectedGroup !== null &&
      !!props.todosStore.getGroups.length
    ) {
      return props.todosStore.groups[props.todosStore.selectedGroup].title;
    } else return "Loading...";
  }, [props.todosStore.selectedGroup, props.todosStore.groups]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const createTodo = () => {
    let nowDate = new Date();
    props.todosStore.createTodo({
      content: content,
      created_at: nowDate.toISOString(),
      remind_at: remind.toDate().toISOString(),
      group: props.todosStore.selectedGroup as number,
    });
    setContent("");
  };

  const onDateChange = (date: any) => {
    setRemind(date);
    console.log(date.toDate().toISOString());
  };

  return (
    <Content className="Main__todos_content">
      <div className="Main__todos_content__inner">
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
              <Col span={19}>
                <Input value={content} onChange={onInputChange} />
              </Col>
              <Col span={2.5}>
                <DatePicker value={remind} onChange={onDateChange} />
              </Col>
              <Col span={2.5}>
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
      </div>
    </Content>
  );
});

const Main = (props: MainSceneProps) => {
  React.useEffect(() => {
    if (!commonStore.token) {
      props.history.replace("/auth");
    }
  }, [commonStore.token, props.authStore.getlogIn]);

  React.useEffect(() => {
    props.todosStore.loadGroups();
  }, []);

  const todosToday = React.useMemo(() => {
    if (
      props.todosStore.selectedGroup != null &&
      !!props.todosStore.getGroups.length
    ) {
      let data = new Date();
      return Object.values(
        props.todosStore.groups[props.todosStore.selectedGroup as number].todos
      ).filter((todo) => {
        let dataRem = new Date(todo.remind_at as string);
        return (
          dataRem.getDate() === data.getDate() &&
          dataRem.getMonth() === data.getMonth() &&
          dataRem.getFullYear() === data.getFullYear()
        );
      }).length;
    }
    return 0;
  }, [props.todosStore.groups, props.todosStore.selectedGroup]);

  return (
    <>
      <Layout>
        <Navbar authStore={props.authStore} todosStore={props.todosStore} />

        <Sidebar todosToday={todosToday} todosStore={props.todosStore} />

        <Content
          className="Main__content site-layout"
          style={{ marginTop: 50 }}
        >
          <Layout>
            <MainPageContent todosStore={props.todosStore} />
            <Footer style={{ textAlign: "center" }}>
              TodoApp ©2020 Created by MUCoders
            </Footer>
          </Layout>
        </Content>
      </Layout>
    </>
  );
};

export default inject("todosStore", "authStore")(observer(Main));
