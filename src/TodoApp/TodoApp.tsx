import React from 'react';
import { TaskInput } from '../TaskInput';
import { TaskList } from '../TaskList';
import { TaskFilters } from '../TaskFilters';
import styles from './TodoApp.module.css';
import { TaskContext } from '../context and types/context'
import { Filter, FILTERS, Task } from '../context and types/types'


interface TodoAppState {
  tasks: Task[];
  input: string;
  filter: Filter;
  editingId: number | null;
  editingText: string;
  hoveredTaskId: number | null;
}

interface Props {}
class TodoApp extends React.Component<Props, TodoAppState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      tasks: this.getTasksFromLocalStorage(),
      input: '',
      filter: FILTERS.ALL,
      editingId: null,
      editingText: '',
      hoveredTaskId: null,
    };
  }

  getTasksFromLocalStorage(): Task[] {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  }

  saveTasksToLocalStorage(tasks: Task[]) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: event.target.value });
  };

  addTask = (): void => {
    if (this.state.input) {
      const newTask: Task = {
        id: Date.now(),
        text: this.state.input,
        completed: false,
        createdAt: new Date().toISOString(),
        completedAt: null,
      };

      this.setState((prevState) => {
        const updatedTasks = [...prevState.tasks, newTask];
        this.saveTasksToLocalStorage(updatedTasks);
        return { tasks: updatedTasks, input: '' };
      });
    }
  };

  deleteTask = (id: number) => {
    this.setState((prevState) => {
      const updatedTasks = prevState.tasks.filter((task) => task.id !== id);
      this.saveTasksToLocalStorage(updatedTasks);
      return { tasks: updatedTasks };
    });
  };

  deleteAllCompletedTasks = () => {
    this.setState((prevState) => {
      const updatedTasks = prevState.tasks.filter((task) => !task.completed);
      this.saveTasksToLocalStorage(updatedTasks);
      this.setFilter(FILTERS.ALL);
      return { tasks: updatedTasks };
    });
  };

  editTask = (id: number, text?: string): void => {
    this.setState({
      editingId: id,
      editingText: text || this.state.tasks.find(task => task.id === id)?.text || '',
    });
  };

  updateTask = (id: number) => {
    this.setState((prevState) => {
      const updatedTasks = prevState.tasks.map((task) =>
        task.id === id ? { ...task, text: this.state.editingText } : task
      );
      this.saveTasksToLocalStorage(updatedTasks);
      return { tasks: updatedTasks, editingId: null, editingText: '' };
    });
  };

  toggleCompletion = (id: number) => {
    this.setState((prevState) => {
      const updatedTasks = prevState.tasks.map((task) => {
        if (task.id === id) {
          const completed = !task.completed;
          return {
            ...task,
            completed,
            completedAt: completed ? new Date().toISOString() : null,
          };
        }
        return task;
      });
      this.saveTasksToLocalStorage(updatedTasks);
      return { tasks: updatedTasks };
    });
  };

  setFilter = (filter: Filter) => {
    this.setState({ filter });
  };

  render() {
    const { tasks, input, filter, editingId, editingText, hoveredTaskId } = this.state;

    const filteredTasks = tasks
      .filter((task) => {
        if (filter === FILTERS.COMPLETED) return task.completed;
        if (filter === FILTERS.ACTIVE) return !task.completed;
        return true; // 'all'
      })
      .sort((a, b) => {
        if (a.completed === b.completed) {
          if (a.completedAt && b.completedAt) {
            return new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime();
          }
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        return a.completed ? 1 : -1;
      });

    return (
      <div className={styles.main_div}>
      <TaskContext.Provider value={{ filter, setFilter: this.setFilter, deleteAllCompletedTasks: this.deleteAllCompletedTasks }}>
        <div className={styles.notsomain_main_div}>
          <h1>
            to<span>do</span>
          </h1>
          <TaskInput
            input={input}
            handleChange={this.handleChange}
            addTask={this.addTask}
          />
            
            <TaskFilters />
            
          <div className={styles.counter}>
            <strong>{'Всего задач: '}<div>{tasks.length}</div></strong>
            <strong>{'Завершено: '}<div>{tasks.filter(task => task.completed).length}{' из '}{tasks.length}</div></strong>
          </div>
          <TaskList
            tasks={filteredTasks}
            editingId={editingId}
            editingText={editingText}
            hoveredTaskId={hoveredTaskId}
            deleteTask={this.deleteTask}
            editTask={this.editTask}
            updateTask={this.updateTask}
            toggleCompletion={this.toggleCompletion}
            setHoveredTaskId={(id) => this.setState({ hoveredTaskId: id })}
          />
        </div>
        </TaskContext.Provider>
      </div>
    );
  }
}

export {TodoApp};
