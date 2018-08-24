export interface Todo {
  id?: number;
  title: string;
  createdAt: number;
  updatedAt: number;
  finishedAt: number;
  projectId: number;
  note?: string;
  happenDate: number;
  knowledge: number;
  // in seconds
  expectedTime?: number;
  // in seconds
  usedTime?: number;
  status: TodoStatus;
}
export enum TodoStatus {
  Doing = 'Doing',
  Done = 'Done'
}

export function createTodo(data: any): Todo {
  const timestamp = Date.now();
  return {
    title: data.title,
    projectId: data.projectId,
    note: data.note,
    happenDate: data.happenDate || timestamp,
    knowledge: 0,
    expectedTime: data.expectedTime || 0,
    usedTime: 0,
    status: data.status,
    createdAt: timestamp,
    updatedAt: timestamp,
    finishedAt: undefined
  };
}
export function mapTodoStatusToText(status: TodoStatus): string {
  if (!status) {
    return '';
  }

  switch (status) {
    case TodoStatus.Done:
      return 'done';
    default:
      return 'doing';
  }
}
