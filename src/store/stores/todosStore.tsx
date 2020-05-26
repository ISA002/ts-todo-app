import { observable, action, computed, get, toJS } from "mobx";
import {
  getRequest,
  postRequest,
  patchRequest,
  deleteRequest,
} from "../../agent/index";
import _ from "lodash";

import { GroupId, Todos, Todo, TodoGroup, PartialTodo } from "../types";

export const sortingBy = function <T extends { id: number }>(
  container: T[],
  sortingType: "asc" | "desc",
  ...properties: (keyof T)[]
) {
  const sortedArray = _.sortBy(container, properties).map(
    (element: T) => element.id
  );
  return sortingType === "asc" ? sortedArray : sortedArray.reverse();
};

class TodosStore {
  @observable isLoading: boolean = false;
  @observable selectedGroup: GroupId = null;
  @observable groups: Todos = {};
  @observable todayGroups: Todos = {};

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
    getRequest(`https://muctodo.a6raywa1cher.com/todo_groups/`)
      .then(
        action((json: any) => {
          this.groups = json.reduce(
            (
              accumulator: Record<number, Record<number, Partial<Todo>>>,
              js: Required<TodoGroup>
            ) => ({
              ...accumulator,
              [js["id"]]: { ...js, todos: _.keyBy(js.todos, "id") },
            }),
            {}
          );

          this.selectedGroup = 1;
        })
      )
      .catch(() => {
        this.groups = {};
        throw new Error("CloudFlare Powol Nahui");
      });
  }

  @action createTodo(todo: PartialTodo) {
    this.isLoading = true;
    postRequest(`https://muctodo.a6raywa1cher.com/todos/`, todo).then(
      (json: Required<Todo>) => {
        console.log(json);
        this.groups = {
          ...this.groups,
          [todo.group as number]: {
            ...this.groups[todo.group as number],
            todos: {
              ...this.groups[todo.group as number].todos,
              [json.id]: json,
            },
          },
        };
      }
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
            todos: _.omit(this.groups[groupId].todos, id.toString()),
          },
        };
      })
    );
  }

  @action editTodo(todo: PartialTodo) {
    this.isLoading = true;
    patchRequest(
      `https://muctodo.a6raywa1cher.com/todos/${todo.id}/`,
      todo
    ).then((json: Required<Todo>) => {
      this.groups = {
        ...this.groups,
        [todo.group as number]: {
          ...this.groups[todo.group as number],
          todos: {
            ...this.groups[todo.group as number].todos,
            [json.id]: json,
          },
        },
      };
    });
  }

  @action createGroup(title: string) {
    this.isLoading = true;
    console.log("createG ", title);
    postRequest(`https://muctodo.a6raywa1cher.com/todo_groups/`, {
      todo_group_data: { title: title },
      todo_group_items: {},
    }).then((json: TodoGroup) => {
      console.log("CreateGJ ", json);
      this.groups = {
        ...this.groups,
        [json.id]: { ...json, todos: _.keyBy(json.todos, "id") },
      };
      console.log("CreateGG ", toJS(this.groups));
    });
  }

  @action deleteGroup(groupId: number) {
    this.isLoading = true;
    deleteRequest(`https://muctodo.a6raywa1cher.com/todo_groups/${groupId}`, {
      groupId,
    }).then(() => {
      this.groups = _.omit(this.groups, groupId.toString());
    });
  }
}

export default TodosStore;
