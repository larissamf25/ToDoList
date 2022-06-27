import React from 'react';
import '../App.css';

class ShowTask extends React.Component {
  render() {
    const { title, description, isConcluded, category, deadline } = this.props.data;
    return (
      <div className="task">
        <p>{ title }</p>
        <p>{ description }</p>
        { isConcluded ? <p>The task is concluded!</p> : <p>Task not concluded!</p> }
        <p>{ category }</p>
        <p>{ deadline }</p>
      </div>
    );
  }
}

export default ShowTask;