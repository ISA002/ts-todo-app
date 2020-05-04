import React from "react";
import { List, Checkbox, Card, Button } from "antd";
import { observer, inject } from "mobx-react";
import { RouteComponentProps } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { toJS } from "mobx";

interface TodoListProps extends RouteComponentProps {
  todosStore: any;
}

const TodoList = (props: TodoListProps) => {
  const todosContainer = React.useMemo(() => {
    if (
      props.todosStore.getIdSelectGroup != null &&
      Object.keys(props.todosStore.groups).length > 0
    ) {
      return props.todosStore.groups[props.todosStore.getIdSelectGroup]
        .todos;
    }
    return [{ content: "Empty" }];
  }, [props.todosStore.groups, props.todosStore.getIdSelectGroup]);

  let deleteTodo = (id: number) => {
    props.todosStore.deleteTodo(id, props.todosStore.getIdSelectGroup);
  };

  const _renderTittle = React.useMemo(
    () =>
      todosContainer.map((todo: any) => (
        <List.Item key={todo.id}>
          <Checkbox checked={todo.completed} />
          {todo.content} {" "}
          {todo.position} {" "}
          {todo.remind_at}
          <Button danger onClick={() => deleteTodo(todo.id)}>
            <DeleteOutlined />
          </Button>
          <Button>
            <EditOutlined />
          </Button>
          <List.Item.Meta description={todo.created_at} />
        </List.Item>
      )),
    [todosContainer]
  );

  return (
    <Card>
      <List size="large" className="TodoList__List" itemLayout="horizontal">
        {_renderTittle}
      </List>
    </Card>
  );
};

export default observer(TodoList);
