import React from "react";
import { List, Checkbox, Card, Button } from "antd";
import { observer, inject } from "mobx-react";
import { RouteComponentProps } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { toJS } from "mobx";
import TodosStore from "../../store/stores/todosStore";

interface TodoListProps {
  todosStore: TodosStore;
}

const TodoList = (props: TodoListProps) => {
  const todosContainer = React.useMemo(() => {
    if (
      props.todosStore.selectedGroup != null &&
      !!props.todosStore.getGroups.length
    ) {
      return props.todosStore.groups[props.todosStore.selectedGroup].todos;
    }
    return [];
  }, [props.todosStore.groups, props.todosStore.selectedGroup]);

  let deleteTodo = (id: number) => {
    props.todosStore.deleteTodo(id, props.todosStore.selectedGroup as number);
  };

  const _renderTittle = React.useMemo(
    () =>
      todosContainer.map((todo) => (
        <List.Item key={todo.id}>
          <Checkbox checked={todo.completed} />
          {todo.content} {todo.position} {todo.remind_at}
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
