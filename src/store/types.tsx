export type PrimaryKey = number;

export type GroupId = number | null;

export interface Action {
  type: string;
}

export interface UserState {
  token: string | null;
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

export type PartialTodo = Partial<Todo>

export interface TodoGroup {
  id: PrimaryKey;
  title: string;
  todos: Record<PrimaryKey, Todo>;
  user: number;
}

export type Todos = Record<PrimaryKey, TodoGroup>;
