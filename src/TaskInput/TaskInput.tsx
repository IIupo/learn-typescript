
import React from 'react';
import './input.css';
import Add from "./Add.svg?react";

interface TaskInputProps {
  input: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addTask: () => void;
}

class TaskInput extends React.Component<TaskInputProps> {
  handleAddTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.props.addTask();
    }
  }

  render() {
    const { input, handleChange, addTask } = this.props;
    return (
      <div className='input_button'>
        <input
          className='input_main'
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Добавить новую задачу..."
          onKeyDown={this.handleAddTask}
        />
        <button className='add_task_btn' onClick={addTask}>
          <div>Добавить<Add /></div>
        </button>
      </div>
    );
  }
}

export {TaskInput};
