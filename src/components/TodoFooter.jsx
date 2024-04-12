import React, { useContext, useEffect, useState } from 'react'
import TodoButton from './TodoButton'
import { TodosContext } from '../context/TodosContext.jsx'

const TodoFooter = () => {

  const {todos,setTodos,remainingTodos ,updateTodosApi ,} = useContext(TodosContext);

  const [checkAll,setCheckAll] = useState(false);

  function toggleAll() {
    const newTodos = todos.map((todo)=> {
        if(checkAll){
          todo.isCompleted = false;
        }else {
          todo.isCompleted = true;
        }
        

      return todo;
    })
    setTodos(newTodos);
    setCheckAll(!checkAll);
  }

  // Update checkAll state when todos change
  useEffect(() => {
    const allCompleted = todos.every(todo => todo.isCompleted);
    setCheckAll(allCompleted);
  }, [todos]);


  return (
    <div className=' flex items-center justify-between my-4'>
        <TodoButton onClick={()=>toggleAll()} button_text={checkAll ? 'Uncheck All' : 'Check All'}></TodoButton>
        <p className=' text-sm'>{remainingTodos()} items remaining</p>
    </div>
  )
}

export default TodoFooter
