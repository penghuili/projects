import { PickerOption } from './picker';

export interface Todo {
  id?: number;
  title: string;
  createdAt: number;
  updatedAt: number;
  finishedAt: number;
  projectId: number;
  note?: string;
  happenDate: number;
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

// data
export const todoStatusOptions: PickerOption[] = [
  {
    value: TodoStatus.Doing,
    text: 'doing'
  },
  {
    value: TodoStatus.Done,
    text: 'done',
    color: 'green'
  }
];

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
