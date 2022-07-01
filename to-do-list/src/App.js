import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddTask from './components/AddTask';
import ShowTask from './components/ShowTask';
import { Button, Form } from 'react-bootstrap';
// import { useEffect, useState } from 'react';
// import { api } from './services/api';

// export function Tasks() {
//   const [tasks, setPosts] = useState([]);
//   useEffect(() => {
//     api.get('/tasks').then((response) => {
//       setPosts(response.data)
//     })
//   }, [])
//   return (<ul>
//     {tasks.map((task) => {
//       return <ShowTask title={task.title} description={task.description} />
//     })}
//   </ul>)
// }

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      isConcluded: false,
      category: 'Easy',
      deadline: new Date(this),
      order: '',
      myTasks: [],
    }
  }

  componentDidMount = () => {
    window.addEventListener('load', this.handleLoad);
  }

  componentWillUnmount = () => { 
    window.removeEventListener('load', this.handleLoad)  
  }

  handleLoad = () => {
    const myTasks = JSON.parse(localStorage.getItem("myTasks"));
    this.setState({ myTasks: myTasks });
  }

  handleChange = ({ target }) => {
    const { name, type } = target;
    const value = (type === 'checkbox') ? target.checked : target.value;
    this.setState({ [name]: value });
  }

  AddTask = () => {
    const { title, description, isConcluded, category, deadline } = this.state;
    const newTask = { title, description, isConcluded, category, deadline };
    this.setState((previouState) => ({
      title: '',
      description: '',
      isConcluded: false,
      category: 'Easy',
      deadline: new Date(this),
      myTasks: [newTask, ...previouState.myTasks],
    }));
  }

  orderCards = ({ target }) => {
    const { value } = target;
    if (value === 'title') {
      this.setState(({ myTasks }) => ({
        order: value,
        myTasks: myTasks.sort((a, b) => {
          let fa = a[value].toLowerCase();
          let fb = b[value].toLowerCase();
          return (fa < fb) ? -1 : 1;
        })
      }));
    } else if (value === 'category') {
      this.setState(({ myTasks }) => ({
        order: value,
        myTasks: [
          ...myTasks.filter((task) => task[value] === 'Priority'),
          ...myTasks.filter((task) => task[value] === 'Urgent'),
          ...myTasks.filter((task) => task[value] === 'Hard'),
          ...myTasks.filter((task) => task[value] === 'Easy')],
      }));
    } else if (value === 'deadline') {
      this.setState(({ myTasks }) => ({
        order: value,
        myTasks: myTasks.sort((a, b) => {
          const dateA = a[value].split('-');
          const dateB = b[value].split('-');
          if (Number(dateA[0]) !== Number(dateB[0])) return Number(dateA[0]) - Number(dateB[0]);
          if (Number(dateA[1]) !== Number(dateB[1])) return Number(dateA[1]) - Number(dateB[1]);
          return Number(dateA[2]) - Number(dateB[2]);
        })
      }));
    }
  }

  filterCards = ({ target }) => {
    const { value } = target;
    if (value === 'Concluded') {
      this.setState(({ myTasks }) => ({
        myTasks: myTasks.filter((task) => task.isConcluded === true),
      }));
    } else {
      this.setState(({ myTasks }) => ({
        myTasks: myTasks.filter((task) => task.isConcluded === false),
      }));
    }
  }

  editTask = (task) => {
    const { title, description, isConcluded, category, deadline } = task;
    this.setState(() => ({
      title: title,
      description: description,
      isConcluded: isConcluded,
      category: category,
      deadline: deadline,
    }), () => this.deleteTask(title));
  }

  deleteTask = (title) => {
    this.setState(({ myTasks }) => ({
      myTasks: myTasks.filter((task) => task.title !== title),
    }));
  }

  clearTasks = () => {
    this.setState({ myTasks: []});
  }

  saveTasks = () => {
    const { myTasks } = this.state;
    localStorage.setItem('myTasks', JSON.stringify(myTasks));
  }

  render() {
    const { title, description, isConcluded, category, deadline, order, myTasks } = this.state;
    return (
      <div className="body">
        <header>My ToDo List</header>
        <section className="input-task">
          Add you task here!
          <AddTask
            title={ title }
            description={ description }
            isConcluded={ isConcluded }
            category={ category }
            deadline={ deadline }
            handleChange={ this.handleChange }
          />
          <Button variant="primary" className="button" type="button" onClick={ this.AddTask }>Add</Button>
        </section>
        <section className="tasks-display">
          <header>List of tasks</header>
          <Form.Label htmlFor="order-input">
            Order by
            <select
              id="order-input"
              name="cardRare"
              type="select"
              value={ order }
              onChange={ this.orderCards }
            >
              <option> </option>
              <option>title</option>
              <option>category</option>
              <option>deadline</option>
          </select>
          </Form.Label>
          <br />
          <Form.Label>
            Filter by conclusion
            <select
              id="order-input"
              name="cardRare"
              type="select"
              onChange={ this.filterCards }
            >
            <option></option>
            <option>Concluded</option>
            <option>Not concluded</option>
            </select>
          </Form.Label>
          <br />
          <p className="notes">*click on the task to edit</p>
          <br />
          <ul className="tasks-list">
            { myTasks.map((task, index) => {
              return <li
                key={ task.title }
                onClick={ () => this.editTask(task) }
              >
              <div className="task">
                <ShowTask data={ task } index={ index }/>
                <Button
                  onClick={ () => this.deleteTask(task.title) }
                >
                  Delete
                </Button>
              </div>
            </li>
            }) }
          </ul>
          <Button
            onClick={ this.clearTasks }
            style={{ margin: '5px' }}
          >
            Clear
          </Button>
          <Button
            onClick={ this.saveTasks }
            style={{ margin: '5px' }}
          >
            Save
          </Button>
        </section>
        <footer>by @Larissa Menezes, 2022</footer>
      </div>
    );
  }
}

export default App;

// Requisito funcional:
// 	Criação de um Todo-List com as seguintes funções:
// 	-Adicionar uma tarefa
// 		-Título, Descrição
// 	-Marcar tarefa como concluída
// 	-Categorizar tarefas
// 		-Fácil, Difícil, Urgente, Prioritária
// 	-Definir data de conclusão
// 	-Ordenar tarefas
 
// Requisito não funcional:
// 	-Usar API Fake
// 	-Para o front desejável usar React ou Angular
// 	-Usar recursos RXJS
// 	-Usar Bootstrap, Material UI, ou AntDesign
