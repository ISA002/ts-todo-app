import { observable, action, computed, get, toJS } from "mobx";
import {
  getRequest,
  postRequest,
  patchRequest,
  deleteRequest,
} from "../../agent/index";
import _ from "lodash";

import { GroupId, Todos, Todo } from "../types";

class TodosStore {
  @observable isLoading: boolean = false;
  @observable selectedGroup: GroupId = null;
  @observable groups: Todos = {};

  @action setSelectedGroup(num: number) {
    this.selectedGroup = num;
  }

  clear() {
    this.groups = {};
  }

  @computed get getGroups() {
    return Object.values(this.groups);
  }

  @action loadGroups() {
    this.isLoading = true;
    getRequest(`https://muctodo.a6raywa1cher.com/todo_groups/`).then(
      action((json: any) => {
        this.groups = _.keyBy(json, "id");
        this.selectedGroup = 1;
      })
    );
  }

  @action createTodo(todo: Todo) {
    this.isLoading = true;
    postRequest(`https://muctodo.a6raywa1cher.com/todo_groups/`, todo).then(
      action((json: any) => {
        this.groups = {
          ...this.groups,
          [todo.group]: {
            ...this.groups[todo.group],
            todos: [...this.groups[todo.group].todos, todo],
          },
        };
      })
    );
  }

  @action deleteTodo(id: number, groupId: number) {
    this.isLoading = true;
    deleteRequest(`https://muctodo.a6raywa1cher.com/todos/${id}/`, {
      id,
      groupId,
    }).then(
      action(() => {
        this.groups = {
          ...this.groups,
          [groupId]: {
            ...this.groups[groupId],
            todos: this.groups[groupId].todos.filter(
              (todo: any) => todo.id !== id
            ),
          },
        };
      })
    );
  }

  @action editTodo() {}
}

export default TodosStore;
