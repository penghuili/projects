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
  expectedTime: number;
  // in seconds
  usedTime: number;
  status: TodoStatus;
}
export enum TodoStatus {
  Doing = 'Doing',
  Done = 'Done'
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
