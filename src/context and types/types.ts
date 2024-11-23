export interface Task {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
  completedAt: string | null;
}

export const FILTERS = {
  ALL: "All",
  COMPLETED: "Completed",
  ACTIVE: "Active"
} as const;
  
export type Filter = typeof FILTERS[keyof typeof FILTERS];