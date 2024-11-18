import React from 'react';
import styles from './buttons.module.css';
import { createContext } from 'react';


interface Button {
  filter: string;
  name: string;
}


interface ContextProps {
  filter: string;
  setFilter: (filter: string) => void;
  deleteAllCompletedTasks: () => void;
}

const buttons: Button[] = [
  { filter: 'all', name: 'Все задачи' },
  { filter: 'active', name: 'В процессе' },
  { filter: 'completed', name: 'Выполненные' },
];

export const TaskContext = createContext<ContextProps>({
  filter: 'all',
  setFilter: () => {},
  deleteAllCompletedTasks: () => {},
});
class TaskFilters extends React.Component {
  static contextType = TaskContext;
  // context!: React.ContextType<typeof TaskContext>


  handleSetFilter = (filter: string) => () => {
    const context = this.context as ContextProps;
    if (context) {
        context.setFilter(filter);
    }
};

handleDeleteAllCompletedTasks = () => {
    const context = this.context as ContextProps;
    if (context) {
        context.deleteAllCompletedTasks();
    }
};

  render() {
    const { filter } = this.context as ContextProps;

    return (
      <div className={styles.btn_group}>
        <div className={styles.btn_group_left}>
          {buttons.map((button) => (
            <button
              key={button.filter}
              className={filter === button.filter ? styles.filter_btn : styles.filter_btn_off}
              onClick={this.handleSetFilter(button.filter)}
            >
              <div>{button.name}</div>
            </button>
          ))}
        </div>
        <div>
          {filter === 'completed' && (
            <button className={styles.filter_btn} onClick={this.handleDeleteAllCompletedTasks}>
              <div>Очистить</div>
            </button>
          )}
        </div>
      </div>
    );
  }
}


export {TaskFilters};

