import { createContext } from 'react';
import { Filter, FILTERS } from './types';


export const TaskContext = createContext<ContextProps>({
    filter: FILTERS.ALL,
    setFilter: () => {},
    deleteAllCompletedTasks: () => {},
  });

  export interface ContextProps {
    filter: Filter;
    setFilter: (filter: Filter) => void;
    deleteAllCompletedTasks: () => void;
  }