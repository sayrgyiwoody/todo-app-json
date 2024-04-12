import React, { memo, useContext, useState } from 'react'
import { TodosContext } from '../context/TodosContext.jsx';
import { api } from '../api/apiResource.js';

const TodoList = () => {



    const {todos,setTodos,filteredTodos,updateTodosApi,deleteTodoApi} = useContext(TodosContext);

    function deleteList(todoId){
        const newTodos = todos.filter((todo) => todo.id !== todoId);
        deleteTodoApi(todoId);
        setTodos(newTodos);
    }


    function handleCheck(todoId){
        let newTodo = {};
        const newTodos = todos.map((todo)=> {
            if(todoId === todo.id){
                todo.isCompleted = !todo.isCompleted;
                newTodo = todo;
            }
            return todo;
        })
        
        updateTodosApi(todoId,newTodo);
        setTodos(newTodos);
    }

    function remarkAsEdit(todoId) {
        let newTodo = {};
        const newTodos = todos.map((todo)=> {
            if(todoId === todo.id){
                todo.isEditing = !todo.isEditing;
                newTodo = todo;
            }
            return todo;
        })
        updateTodosApi(todoId,newTodo);
        setTodos(newTodos);
    }

    function updateTodo(todoId,value){
        if(value){
            const newTodo = {
                'id': todoId,
                'text': value,
                'isCompleted': false,
                'isEditing': false,
            };
    
            const newTodos = todos.map((todo)=> {
                if(todoId === todo.id){
                    return newTodo;
                }
                return todo;
            })
            updateTodosApi(todoId,newTodo);
            setTodos(newTodos);
        }
        
    }

    function cancelEdit(todoId) {
        const newTodos = todos.map((todo)=> {
            if(todoId === todo.id){
                todo.isEditing = false;
            }
            return todo;
        })
        setTodos(newTodos);
    }



    return (
        <>
            {filteredTodos().map((todo) => {
                return (
                    <div key={todo.id}>
                        {todo.isEditing === false ? (
                            <div onDoubleClick={()=>remarkAsEdit(todo.id)} className="flex items-center justify-between rounded hover:bg-slate-50 py-3 px-2">
                                <div className="flex items-center">
                                    <input checked={todo.isCompleted} onChange={() => handleCheck(todo.id)} id={`todo ${todo.id}`} type="checkbox" value="" className=" cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor={`todo ${todo.id}`} className={`cursor-pointer ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 ${todo.isCompleted ? 'line-through' : '' }`}>{todo.text}</label>
                                </div>
                                <svg onClick={() => deleteList(todo.id)} className='w-4 h-4 me-3 cursor-pointer hover:text-red-500 duration-150 hover:scale-110' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 15 15"><path fill="currentColor" d="M3.64 2.27L7.5 6.13l3.84-3.84A.92.92 0 0 1 12 2a1 1 0 0 1 1 1a.9.9 0 0 1-.27.66L8.84 7.5l3.89 3.89A.9.9 0 0 1 13 12a1 1 0 0 1-1 1a.92.92 0 0 1-.69-.27L7.5 8.87l-3.85 3.85A.92.92 0 0 1 3 13a1 1 0 0 1-1-1a.9.9 0 0 1 .27-.66L6.16 7.5L2.27 3.61A.9.9 0 0 1 2 3a1 1 0 0 1 1-1c.24.003.47.1.64.27" /></svg>
                            </div>
                        ) : (
                            <input onDoubleClick={()=>remarkAsEdit(todo.id)} autoFocus onKeyDown={(e)=> {
                                if(e.key === "Enter"){
                                    updateTodo(todo.id,e.target.value)
                                }else if (e.key === "Escape"){
                                    cancelEdit(todo.id);
                                }
                            }}  defaultValue={todo.text} type="text" className="bg-gray-50 border my-2 border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        )}
                    </div>
                );
            })}
        </>
    );
    
    
    
}

export default TodoList
