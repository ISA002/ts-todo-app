import React from "react";
import { Todo, PartialTodo } from "../../../store/types";
import { Checkbox, Button, List, Progress } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import TodosStore from "../../../store/stores/todosStore";
import { observer } from "mobx-react";

interface TodoItemProps {
  todo: PartialTodo;
  todosStore: TodosStore;
}

const TodoItem = (props: TodoItemProps) => {
  const [check, setCheck] = React.useState<boolean>(
    props.todo.completed as boolean
  );

  React.useEffect(() => {
    setEditTodo({
      id: props.todo.id,
      content: props.todo.content,
      completed: !check,
      group: props.todo.group,
      created_at: props.todo.created_at,
      remind_at: props.todo.remind_at,
    });
  }, [check]);

  const [editTodo, setEditTodo] = React.useState({
    id: props.todo.id,
    content: props.todo.content,
    completed: props.todo.completed,
    group: props.todo.group,
    created_at: props.todo.created_at,
    remind_at: props.todo.remind_at,
  });

  let deleteTodo = (id: number) => {
    props.todosStore.deleteTodo(id, props.todosStore.selectedGroup as number);
  };

  let onCheckChange = () => {
    setCheck(!check);
    props.todosStore.editTodo(editTodo);
  };

  let BarRemind = (cDate: string, rDate: string) => {
    const nowDate = Date.now();
    const createdData = Date.parse(cDate);
    const remindDate = Date.parse(rDate);
    if (nowDate > remindDate) return 100;
    return Math.trunc(
      ((nowDate - createdData) / (remindDate - createdData)) * 100
    );
  };

  return (
    <List.Item key={props.todo.id} style={check ? { opacity: "0.2" } : {}}>
      <Progress
        width={50}
        type="circle"
        size="small"
        percent={BarRemind(
          props.todo.created_at as string,
          props.todo.remind_at as string
        )}
        format={(percent) => {
          if (percent == 100) {
            return "Time over";
          } else {
            return percent + "%";
          }
        }}
      />
      <Checkbox
        style={{ marginLeft: "1rem" }}
        onChange={() => onCheckChange()}
        checked={check}
      />

      {!check ? props.todo.content : "completed"}

      <Button danger onClick={() => deleteTodo(props.todo.id as number)}>
        <DeleteOutlined />
      </Button>
      <Button>
        <EditOutlined />
      </Button>
      <List.Item.Meta
        description={
          "created at: " +
          new Date(props.todo.created_at as string).toLocaleDateString(
            "ru-RU"
          ) +
          "   remind at: " +
          new Date(props.todo.remind_at as string).toLocaleDateString("ru-RU")
        }
      />
    </List.Item>
  );
};

export default observer(TodoItem);
