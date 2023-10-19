import React, { useState, useEffect } from 'react';
import './Todolistapp.css';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';

export const Todolistapp = () => {
  const clearLocalStorage = () => {
    localStorage.removeItem('account');
    localStorage.removeItem('islog');
    window.location.href = '/Loginandregister';
  };

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [allTodos, setAllTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [completedTodos, setCompletedTodos] = useState([]);
  const [isCompletedScreen, setIsCompletedScreen] = useState(false);

  const handleAddNewToDo = () => {
    let newToDoObj = {
      title: newTodoTitle,
      description: newDescription,
    };

    let updatedTodoArr = [...allTodos, newToDoObj];
    setAllTodos(updatedTodoArr);
    saveTodos(updatedTodoArr);
    setNewDescription('');
    setNewTodoTitle('');
  };

  const saveTodos = (updatedTodos) => {
    if (loggedInUser) {
      const userKey = loggedInUser.EmailR;
      const userSpecificData = JSON.parse(localStorage.getItem(userKey));

      if (userSpecificData) {
        userSpecificData.todos = updatedTodos;
        localStorage.setItem(userKey, JSON.stringify(userSpecificData));
      }
    }
  };

  const saveCompletedTodos = (updatedCompletedList) => {
    if (loggedInUser) {
      const userKey = loggedInUser.EmailR;
      const userSpecificData = JSON.parse(localStorage.getItem(userKey));

      if (userSpecificData) {
        userSpecificData.completedTodos = updatedCompletedList;
        localStorage.setItem(userKey, JSON.stringify(userSpecificData));
      }
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('account'));
    setLoggedInUser(user);

    if (user) {
      const userKey = user.EmailR;
      const userSpecificData = JSON.parse(localStorage.getItem(userKey));

      if (!userSpecificData) {
        localStorage.setItem(userKey, JSON.stringify({ todos: [], completedTodos: [] }));
      } else {
        setAllTodos(userSpecificData.todos);
        setCompletedTodos(userSpecificData.completedTodos);
      }
    }
  }, []);

  const handleToDoDelete = (index) => {
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.splice(index, 1);
    setAllTodos(updatedTodoArr);
    saveTodos(updatedTodoArr);
  };

  const handleCompletedTodoDelete = (index) => {
    let updatedCompletedList = [...completedTodos];
    updatedCompletedList.splice(index, 1);
    setCompletedTodos(updatedCompletedList);
    saveCompletedTodos(updatedCompletedList);
  };

  const handleComplete = (index) => {
    if (loggedInUser) {
      const date = new Date();
      var dd = date.getDate();
      var mm = date.getMonth() + 1;
      var yyyy = date.getFullYear();
      var hh = date.getHours();
      var minutes = date.getMinutes();
      var ss = date.getSeconds();
      var finalDate = dd + '-' + mm + '-' + yyyy + ' a las ' + hh + ':' + minutes + ':' + ss;

      let filteredTodo = {
        ...allTodos[index],
        completedOn: finalDate,
      };

      let updatedCompletedList = [...completedTodos, filteredTodo];
      let updatedTodoArr = allTodos.filter((_, i) => i !== index);

      setCompletedTodos(updatedCompletedList);
      setAllTodos(updatedTodoArr);

      saveCompletedTodos(updatedCompletedList);
      saveTodos(updatedTodoArr);
    }
  };


  return (
    <div className="container-ALL">
      <h1 className='Todolisttitle'>Tu lista maestra</h1>

      <div className="todo-wrapper">

        <div className="todo-input">
          <div className="todo-input-item">
            <label className='New-to-do-listtitle'>Titulo:</label>
            <input
              type="text"
              value={newTodoTitle}
              onChange={e => setNewTodoTitle (e.target.value)}
              placeholder="TITULO"
            />
          </div>
          <div className="todo-input-item">
            <label className='New-to-do-liststyle-description'>Descripción:</label>
            <input
              type="text"
              value={newDescription}
              onChange={e => setNewDescription (e.target.value)}
              placeholder="DESCRIPCION"
            />
          </div>
          <div className="todo-input-item">
            <button
              className="primary-btn"
              type="button"
              onClick={handleAddNewToDo}
            >
              Añadir
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompletedScreen === false && 'active'}`}
            onClick={() => setIsCompletedScreen (false)}
          >
            Pendientes
          </button>
          <button
            className={`secondaryBtn ${isCompletedScreen === true && 'active'}`}
            onClick={() => setIsCompletedScreen (true)}
          >
            Finalizadas
          </button>
        </div>
        <div className="todo-list">

          {isCompletedScreen === false &&
            allTodos.map ((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>

                </div>
                <div>
                  <AiOutlineDelete
                    title="Delete?"
                    className="icon"
                    onClick={() => handleToDoDelete (index)}
                  />
                  <BsCheckLg
                    title="Completed?"
                    className=" check-icon"
                    onClick={() => handleComplete (index)}
                  />
                </div>
              </div>
            ))}

          {isCompletedScreen === true &&
            completedTodos.map ((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3 className='completed-task'>{item.title}</h3>
                  <p>{item.description}</p>
                  <p> <i>Completado el: {item.completedOn}</i></p>
                </div>
                <div>
                  <AiOutlineDelete
                    className="icon"
                    onClick={() => handleCompletedTodoDelete (index)}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className='cerrarsesion'>
        <button onClick={clearLocalStorage} className='cerrarsesion-btn'>Cerrar Sesión</button>
        </div>
    </div>
  );
}
