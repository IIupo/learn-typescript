import { createContext } from 'react';
import { ContextProps } from './TaskFilters';

export const TaskContext = createContext<ContextProps>({
    filter: 'all',
    setFilter: () => {},
    deleteAllCompletedTasks: () => {},
  });