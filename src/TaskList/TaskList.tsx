import React from 'react';
import { TaskItem } from '../TaskItem/TaskItem';
import './TaskList.module.css';
import { Task } from 'context and types/types';
interface TaskListProps {
  tasks: Task[];
  editingId: number | null;
  editingText: string;
  hoveredTaskId: number | null;
  deleteTask: (id: number) => void;
  editTask: (id: number, text?: string) => void;
  updateTask: (id: number) => void;
  toggleCompletion: (id: number) => void;
  setHoveredTaskId: (id: number | null) => void;
}

class TaskList extends React.Component<TaskListProps> {
  render() {
    const {
      tasks,
      editingId,
      editingText,
      hoveredTaskId,
      deleteTask,
      editTask,
      updateTask,
      toggleCompletion,
      setHoveredTaskId,
    } = this.props;

    return (
      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            editingId={editingId}
            editingText={editingText}
            hoveredTaskId={hoveredTaskId}
            deleteTask={deleteTask}
            editTask={editTask}
            updateTask={updateTask}
            toggleCompletion={toggleCompletion}
            setHoveredTaskId={setHoveredTaskId}
          />
        ))}
      </ul>
    );
  }
}

export {TaskList};
