import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';

class AddTask extends React.Component {
  render() {
    const { title, description, isConcluded, category, deadline, handleChange } = this.props;
    return (
      <Form className="input-task">
        <Form.Group>
          <Form.Label htmlFor="task-name">Name of the task:</Form.Label>
          <Form.Control
            id="task-name"
            name="title"
            type="text"
            value={ title }
            onChange={ handleChange }
            placeholder="title"
          />
          <br />
          <Form.Label htmlFor="task-description">Description of the task:</Form.Label>
          <Form.Control
            id="task-description"
            name="description"
            type="text"
            value={ description }
            onChange={ handleChange }
            placeholder="description"
          />
          <br />
          <Form.Label htmlFor="task-concluded">
            Is the task concluded?
            <input
              id="task-concluded"
              name="isConcluded"
              type="checkbox"
              value={ isConcluded }
              onChange={ handleChange }
            />
          </Form.Label>
          <br />
          <Form.Label htmlFor="task-category">Category of the task:</Form.Label>
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
          <Form.Label htmlFor="task-deadline">
            Task deadline:
            <Form.Control
              id="task-deadline"
              name="deadline"
              type="date"
              placeholder="mm/dd/year"
              value={ deadline }
              onChange={ handleChange }
            />
          </Form.Label>
        </Form.Group>
      </Form>
    );
  }
}

AddTask.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isConcluded: PropTypes.bool.isRequired,
  category: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
}

export default AddTask;