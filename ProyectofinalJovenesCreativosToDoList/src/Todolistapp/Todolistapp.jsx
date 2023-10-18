import React, { useState, useEffect } from 'react';
import './Todolistapp.css'
import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';

export const Todolistapp = () => {

    const clearLocalStorage = () => {
        localStorage.removeItem('account'); // Borra 'account' del Local Storage
        localStorage.removeItem('islog'); // Borra 'islog' del Local Storage
        // Agrega aquí más llamadas a localStorage.removeItem para otros elementos que quieras eliminar.
        window.location.href = '/Loginandregister';
      };
      const [allTodos, setAllTodos] = useState ([]);
  const [newTodoTitle, setNewTodoTitle] = useState ('');
  const [newDescription, setNewDescription] = useState ('');
  const [completedTodos, setCompletedTodos] = useState ([]);
  const [isCompletedScreen, setIsCompletedScreen] = useState (false);

const handleAddNewToDo = () => {
  let newToDoObj = {
    title: newTodoTitle,
    description: newDescription,
  };

  let updatedTodoArr = [...allTodos];
  updatedTodoArr.push(newToDoObj);
  setAllTodos(updatedTodoArr);
  localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
  setNewDescription('');
  setNewTodoTitle('');
};

  
  

  useEffect (() => {
    let savedTodos = JSON.parse (localStorage.getItem ('todolist'));
    let savedCompletedToDos = JSON.parse (
      localStorage.getItem ('completedTodos')
    );
    if (savedTodos) {
      setAllTodos (savedTodos);
    }

    if (savedCompletedToDos) {
      setCompletedTodos (savedCompletedToDos);
    }
  }, []);

  const handleToDoDelete = index => {
    let reducedTodos = [...allTodos];
    reducedTodos.splice (index,1);
    // console.log (index);

    // console.log (reducedTodos);
    localStorage.setItem ('todolist', JSON.stringify (reducedTodos));
    setAllTodos (reducedTodos);
  };

  const handleCompletedTodoDelete = (index) => {
    const updatedCompletedTodos = completedTodos.filter((_, i) => i !== index);
  
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedTodos));
    setCompletedTodos(updatedCompletedTodos);
  };
  

  const handleComplete = index => {
    const date = new Date ();
    var dd = date.getDate ();
    var mm = date.getMonth () + 1;
    var yyyy = date.getFullYear ();
    var hh = date.getHours ();
    var minutes = date.getMinutes ();
    var ss = date.getSeconds ();
    var finalDate =
      dd + '-' + mm + '-' + yyyy + ' at ' + hh + ':' + minutes + ':' + ss;

    let filteredTodo = {
      ...allTodos[index], //crea una copia superficial del objeto y le agrega la fecha en la que se realizó
      completedOn: finalDate,
    };

    // console.log (filteredTodo);

    let updatedCompletedList = [...completedTodos, filteredTodo];
    console.log (updatedCompletedList);
    setCompletedTodos (updatedCompletedList);
    localStorage.setItem (
      'completedTodos',
      JSON.stringify (updatedCompletedList)
    );
    // console.log (index);

    handleToDoDelete (index);
  };

  return (
    <div className="App">
        <div className='cerrarsesion'>
        <button onClick={clearLocalStorage} className='cerrarsesion-btn'>Cerrar Sesión</button>
        </div>
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
            <label className='New-to-do-liststyle'>Descripción:</label>
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
              Add
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompletedScreen === false && 'active'}`}
            onClick={() => setIsCompletedScreen (false)}
          >
            To Do
          </button>
          <button
            className={`secondaryBtn ${isCompletedScreen === true && 'active'}`}
            onClick={() => setIsCompletedScreen (true)}
          >
            Completed
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
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p> <i>Completed at: {item.completedOn}</i></p>
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
    </div>
  );
}
