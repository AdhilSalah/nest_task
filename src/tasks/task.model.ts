export interface Task {
  id: string;
  title: string;
  description: string;
  status: Takstatus;
}

export enum Takstatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
