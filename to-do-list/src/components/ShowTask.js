import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiFillCheckSquare, AiFillCloseSquare, AiOutlineCalendar } from "react-icons/ai";

class ShowTask extends React.Component {
  render() {
    const { title, description, isConcluded, category, deadline } = this.props.data;
    const { index } = this.props;
    return (
      <div>
        <p className="task-title">{ index + 1 }. { title }</p>
        <hr />
        <p className="task-description">{ description }</p>
        <p className={ category }>{ category }</p>
        <p className="task-deadline"><AiOutlineCalendar /> { deadline }</p>
        { isConcluded ? <AiFillCheckSquare /> : <AiFillCloseSquare /> }
      </div>
    );
  }
}

export default ShowTask;
