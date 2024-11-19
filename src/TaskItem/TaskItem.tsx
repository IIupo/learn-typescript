import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import styles from'./TaskItem.module.css';
import Edit  from './Edit.svg?react';
import Trash  from './Trash.svg?react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
}

interface TaskItemProps {
  task: Task;
  editingId: number | null;
  editingText: string;
  hoveredTaskId: number | null;
  deleteTask: (id: number) => void;
  editTask: (id: number, text?: string) => void;
  updateTask: (id: number) => void;
  toggleCompletion: (id: number) => void;
  setHoveredTaskId: (id: number | null) => void;
}

class TaskItem extends React.Component<TaskItemProps> {
  handleMouseEnter = () => {
    this.props.setHoveredTaskId(this.props.task.id);
  };

  handleMouseLeave = () => {
    this.props.setHoveredTaskId(null);
  };

  handleEditTask = () => {
    this.props.editTask(this.props.task.id);
  };

  handleDeleteTask = () => {
    this.props.deleteTask(this.props.task.id);
  };

  handleToggleCompletion = () => {
    this.props.toggleCompletion(this.props.task.id);
  };

  handleUpdateTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.props.updateTask(this.props.task.id);
    }
  };

  handleBlurEvent = () => {
    this.props.updateTask(this.props.task.id);
  };

  handleOnChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.editTask(this.props.task.id, e.target.value);
  };

  render() {
    const { task, editingId, editingText, hoveredTaskId } = this.props;
    return (
      <li
        key={task.id}
        className={styles.wholebody_taskitem}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className={styles.input_text_group}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={this.handleToggleCompletion}
          />
          {editingId === task.id ? (
            <input
              className={styles.input_taskitem_body}
              type="text"
              value={editingText}
              onChange={this.handleOnChangeEvent}
              onBlur={this.handleBlurEvent}
              onKeyDown={this.handleUpdateTask}
              autoFocus
            />
          ) : (
            <div>
              <div
                className={!task.completed ? '' : styles.line_through}
                onClick={this.handleEditTask}
              >
                {task.text}
              </div>
              {hoveredTaskId === task.id && (
                <div className={styles.podskazka}>
                  {' '} Создана {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true, locale: ru, includeSeconds: true })}
                </div>
              )}
            </div>
          )}
        </div>
        <div className={styles.buttons_group}>
          {!task.completed && (
            <button className={editingId === task.id ? styles.edit_btnOn : styles.edit_btnOff} onClick={this.handleEditTask}>
              <Edit />
            </button>
          )}
          <button className={styles.delete_btn} onClick={this.handleDeleteTask}>
            <Trash />
          </button>
        </div>
      </li>
    );
  }
}

export {TaskItem};
