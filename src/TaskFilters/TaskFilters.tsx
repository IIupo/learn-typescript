import React from 'react';
import styles from './buttons.module.css';
import { TaskContext } from '../context and types/context';
import { ContextProps } from '../context and types/context';
import { Filter, FILTERS } from '../context and types/types';
import cn from 'classnames';
interface Button {
  filter: Filter;
  name: string;
}

const buttons: Button[] = [
  { filter: FILTERS.ALL, name: 'Все задачи' },
  { filter: FILTERS.ACTIVE, name: 'В процессе' },
  { filter: FILTERS.COMPLETED, name: 'Выполненные' },
];

class TaskFilters extends React.Component {
  static contextType = TaskContext;
  // context!: React.ContextType<typeof TaskContext>


handleSetFilter = (filter: Filter) => () => {
  const context = this.context as ContextProps;
  context.setFilter(filter);
};

handleDeleteAllCompletedTasks = () => {
  const context = this.context as ContextProps;
  context.deleteAllCompletedTasks();
};

  render() {
    const { filter } = this.context as ContextProps;

    return (
      <div className={styles.btn_group}>
        <div className={styles.btn_group_left}>
          {buttons.map((button) => (
            <button
              key={button.filter}
              className={cn(
                {
                  [styles.filter_btn]:filter === button.filter,
                  [styles.filter_btn_off]:filter !== button.filter
                }
              )}
              onClick={this.handleSetFilter(button.filter)}
            >
              <div>{button.name}</div>
            </button>
          ))}
        </div>
        <div>
          {FILTERS.COMPLETED === filter ? (
            <button className={styles.filter_btn} onClick={this.handleDeleteAllCompletedTasks}>
              <div>Очистить</div>
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}


export {TaskFilters};

