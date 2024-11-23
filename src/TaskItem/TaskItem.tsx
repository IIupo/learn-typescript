import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import styles from'./TaskItem.module.css';
import Edit  from './Edit.svg?react';
import Trash  from './Trash.svg?react';
import { Task } from 'context and types/types';
import cn from 'classnames'


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
    const { setHoveredTaskId, task } = this.props;
    setHoveredTaskId(task.id);
  };

  handleMouseLeave = () => {
    const { setHoveredTaskId } = this.props;
    setHoveredTaskId(null);
  };

  handleEditTask = () => {
    const { editTask, task } = this.props;
    editTask(task.id);
  };

  handleDeleteTask = () => {
    const { deleteTask, task } = this.props;
    deleteTask(task.id);
  };

  handleToggleCompletion = () => {
    const { toggleCompletion, task } = this.props;
    toggleCompletion(task.id);
  };

  handleUpdateTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { updateTask, task } = this.props;
    if (e.key === 'Enter') {
      updateTask(task.id);
    }
  };

  handleBlurEvent = () => {
    const { updateTask, task } = this.props;
    updateTask(task.id);
  };

  handleOnChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { editTask, task } = this.props;
    editTask(task.id, e.target.value);
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
                className={cn({
                  [styles.line_through]: task.completed == true,
                }  
                )}
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
            <button className={cn({
              [styles.edit_btnOn]:editingId === task.id,
              [styles.edit_btnOff]:editingId !== task.id,
            })} onClick={this.handleEditTask}>
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
