import React, { useContext } from 'react'
import TodoButton from './TodoButton'
import { TodosContext } from '../context/TodosContext.jsx';


const TodoTabs = () => {

  const {todos,setTodos,filter,setFilter} = useContext(TodosContext);

  const clearCompleted = () => {
      const newTodos = todos.filter((todo) => todo.isCompleted === false);
      setTodos(newTodos);
  }

  return (
    <div className=' mb-2 md:flex items-center justify-between '>
      

    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400 mb-3 md:mb-0">
        <li className="me-1 cursor-pointer">
            <div onClick={()=>{
              setFilter('all');
            }
          } className={`${filter==='all'?'text-zinc-900 border':''} inline-block px-4 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white`} aria-current="page">All</div>
        </li>
        <li className="me-1 cursor-pointer">
            <div onClick={()=>{
              setFilter('active');
            }
          } className={`${filter==='active'?'text-zinc-900 border':''} inline-block px-4 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white`}>Active</div>
        </li>
        <li className="me-1 cursor-pointer">
            <div onClick={()=>{
              setFilter('completed');
            }
          } className={`${filter==='completed'?'text-zinc-900 border':''} inline-block px-4 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white`}>Completed</div>
        </li>
        
    </ul>

    {/* <TodoButton onClick={()=>clearCompleted()} button_text={'Clear Completed'}></TodoButton> */}

    </div>
  )
}

export default TodoTabs
