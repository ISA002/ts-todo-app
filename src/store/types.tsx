export type PrimaryKey = number;

export type GroupId = number | null;

export interface Action {
  type: string;
}

export interface UserState {
  token: string | null;
}

export interface TodoState {
  id: number;
  content: string;
  created_at: string;
  remind_at: string;
  position: number;
  group: PrimaryKey;
}

export interface StoreRootState {
  user: UserState;
  todo: TodoState;
}

export interface Todo {
  id: PrimaryKey;
  content: string;
  created_at: string;
  remind_at: string | null;
  position: number;
  group: PrimaryKey;
  completed: boolean;
}
export interface TodoFetch {
  content: string;
  remind_at: string | null;
  group: PrimaryKey;
  position: number;
}
export interface TodoGroup {
  id: PrimaryKey;
  title: string;
  todos: Todo[];
  user: number;
}

export type Todos = Record<PrimaryKey, TodoGroup>;
