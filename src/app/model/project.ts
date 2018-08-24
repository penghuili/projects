export interface Project {
  id?: number;
  title: string;
  createdAt: number;
  updatedAt: number;
  finishedAt: number;
  startDate: number;
  endDate: number;
  goal: string;
  status: ProjectStatus;
  progress: number;
}
export enum ProjectStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  WontDo = 'WontDo',
  Done = 'Done'
}

export function createProject(data: any): Project {
  const timestamp = Date.now();
  return {
    title: data.title,
    startDate: data.startDate,
    endDate: data.endDate,
    goal: data.goal,
    status: data.status,
    createdAt: timestamp,
    updatedAt: timestamp,
    finishedAt: undefined,
    progress: 0
  };
}
export function mapProjectStatusToText(status: ProjectStatus): string {
  if (!status) {
    return '';
  }

  switch (status) {
    case ProjectStatus.Active:
      return 'active';
    case ProjectStatus.WontDo:
      return `won't do`;
    case ProjectStatus.Done:
      return 'done';
    default:
      return 'inactive';
  }
}