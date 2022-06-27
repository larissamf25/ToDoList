import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddTask from './components/AddTask';
import ShowTask from './components/ShowTask';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      isConcluded: false,
      category: '',
      deadline: new Date(this),
      order: '',
      myTasks: [],
    }
  }

  handleChange = ({ target }) => {
    const { name, type } = target;
    const value = (type === 'checkbox') ? target.checked : target.value;
    this.setState({ [name]: value });
  }

  AddTask = (event) => {
    event.preventDefault();
    const { title, description, isConcluded, category, deadline } = this.state;
    const newTask = { title, description, isConcluded, category, deadline };
    this.setState((previouState) => ({
      title: '',
      description: '',
      isConcluded: false,
      category: '',
      deadline: new Date(this),
      myTasks: [newTask, ...previouState.myTasks],
    }))
  }

  orderCards = ({ target }) => {
    const { value } = target;
    this.setState((previouState) => ({
      order: value,
      myTasks: previouState.myTasks.sort((a, b) => a[value] - b[value]),
    }));
  }

  render() {
    const { title, description, isConcluded, category, deadline, order, myTasks } = this.state;
    return (
      <div className="body">
        <header>My ToDo List</header>
        <section className="input-task">
          <AddTask
            title={ title }
            description={ description }
            isConcluded={ isConcluded }
            category={ category }
            deadline={ deadline }
            handleChange={ this.handleChange }
          />
          <button className="button" type="button" onClick={ this.AddTask }>Add</button>
        </section>
        <hr />
        <section className="tasks-display">
          <label htmlFor="order-input">
            Order by
            <select
              id="order-input"
              name="cardRare"
              type="select"
              value={ order }
              onChange={ this.orderCards }
            >
              <option> </option>
              <option>Title</option>
              <option>Category</option>
              <option>Deadline</option>
          </select>
          </label>
          <br />
          <ul className="tasks-list">
            { myTasks.map((task) => <li key={ task.title }><ShowTask data={ task }/></li>) }
          </ul>
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
