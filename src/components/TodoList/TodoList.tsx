import React from "react";
import { List, Card } from "antd";
import { observer } from "mobx-react";
import TodosStore, { sortingBy } from "../../store/stores/todosStore";
import TodoItem from "./TodoItem/TodoItem";
import { toJS } from "mobx";
import { Todo } from "../../store/types";

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

  const sortedTitles = React.useMemo(
    () => sortingBy<Todo>(Object.values(todosContainer), "desc", "id"),
    [todosContainer]
  );

  const _renderTittle = React.useMemo(
    () =>
      sortedTitles.map((key: number) => (
        <TodoItem
          key={key}
          todo={todosContainer[key]}
          todosStore={props.todosStore}
        />
      )),
    [todosContainer, sortedTitles]
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
