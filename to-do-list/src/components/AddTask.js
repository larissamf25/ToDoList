import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

class AddTask extends React.Component {
  render() {
    const { title, description, isConcluded, category, deadline, handleChange } = this.props;
    return (
      <form>
        <label htmlFor="task-name">Name of the task:</label>
        <input
          id="task-name"
          name="title"
          type="text"
          value={ title }
          onChange={ handleChange }
          placeholder="title"
        />
        <br />
        <label htmlFor="task-description">Description of the task:</label>
        <textarea
          id="task-description"
          name="description"
          type="text"
          value={ description }
          onChange={ handleChange }
          placeholder="description"
        />
        <br />
        <label htmlFor="task-concluded">
          Is the task concluded?
          <input
            id="task-concluded"
            name="isConcluded"
            type="checkbox"
            value={ isConcluded }
            onChange={ handleChange }
          />
        </label>
        <br />
        <label htmlFor="task-category">Category of the task:</label>
        <select
          id="task-category"
          name="category"
          type="select"
          value={ category }
          onChange={ handleChange }
        >
          <option>Easy</option>
          <option>Hard</option>
          <option>Urgent</option>
          <option>Priority</option>
        </select>
        <br />
        <label htmlFor="task-deadline">
          Task deadline:
          <input
            id="task-deadline"
            name="deadline"
            type="date"
            value={ deadline }
            onChange={ handleChange }
          />
        </label>
      </form>
    );
  }
}

AddTask.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isConcluded: PropTypes.bool.isRequired,
  category: PropTypes.string.isRequired,
  deadline: PropTypes.instanceOf(Date),
  handleChange: PropTypes.func.isRequired,
}

export default AddTask;