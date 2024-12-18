
import React from 'react';
import styles from './input.module.css';
import Add from "./Add.svg?react";

interface TaskInputProps {
  input: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addTask: () => void;
}

class TaskInput extends React.Component<TaskInputProps> {
  handleAddTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const {addTask} = this.props;
    if (e.key === 'Enter') {
      addTask();
    }
  }

  render() {
    const { input, handleChange, addTask } = this.props;
    return (
      <div className={styles.input_button}>
        <input
          className={styles.input_main}
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Добавить новую задачу..."
          onKeyDown={this.handleAddTask}
        />
        <button className={styles.add_task_btn} onClick={addTask}>
          <div>Добавить<Add /></div>
        </button>
      </div>
    );
  }
}

export {TaskInput};
