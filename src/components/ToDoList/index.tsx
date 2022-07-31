import './styles.css';
import Logo from '../../assets/Logo.svg';
import Clipboard from '../../assets/Clipboard.svg';
import { PlusCircle } from 'phosphor-react';
import { ToDoItem, Comment } from '../ToDoItem';
import { useState } from 'react';
import { Checkbox } from '@mui/material';
import { RadioButtonUnchecked, TaskAlt } from '@mui/icons-material';

export function ToDoList() {
  const [text, setText] = useState('');
  const [toDo, setToDo] = useState<Array<Comment>>([]);
  const [done, setDone] = useState(0);

  function handleCreateTodo() {
    setToDo(prev => {
      const todo = {
        id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 1,
        comment: text,
        isActive: false,
      };
      return [...prev, todo];
    });
    setText('');
  }

  function updateTodoActive(index: number) {
    setToDo(prev => {
      let toDoClone = [...prev];
      toDoClone[index].isActive = !toDoClone[index].isActive;
      return toDoClone;
    });
  }
  function handleRemoveToDo(id: number) {
    const toDoWithoutDeletedOne = toDo.filter(todo => todo.id !== id);
    setToDo(toDoWithoutDeletedOne);
  }

  return (
    <>
      <div className="header">
        <img src={Logo} alt="todo" className="logo" />
      </div>

      <div className="body">
        <div className="create-todo">
          <input type="text" name="todo" value={text} onChange={event => setText(event.target.value)} className="input-todo" placeholder="Adicione uma nova tarefa" />
          <button className="button-todo" onClick={handleCreateTodo}>
            <p className="text-todo">
              Criar <PlusCircle size={14} />
            </p>
          </button>
        </div>

        <div className="list-todo">
          <div className="count-todo">
            <span>
              Tarefas criadas <span className="count-task">{toDo.length}</span>
            </span>
          </div>
          <div className="count-todo">
            <span className="count-finished">
              Concluídas
              <span className="count-task">{toDo.filter(todo => todo.isActive).length}</span>
            </span>
          </div>
        </div>

        <div className="content-todo">
          {toDo.length > 0 ? (
            toDo.map((comment, index) => (
              <div key={comment.id} className="todo">
                <Checkbox checked={comment.isActive} onChange={() => updateTodoActive(index)} icon={<RadioButtonUnchecked htmlColor="#1E6F9F" />} checkedIcon={<TaskAlt />} />
                <ToDoItem comment={comment} handleRemoveToDo={handleRemoveToDo} />
              </div>
            ))
          ) : (
            <>
              <div className="clipboard">
                <img src={Clipboard} />
              </div>
              <div className="clipboard-text">
                <h4>Você ainda não tem tarefas cadastradas</h4>
                <p>Crie tarefas e organize seus itens a fazer</p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
