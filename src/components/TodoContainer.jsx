import React, { useContext, useEffect, useMemo, useState } from 'react'
import TodoForm from './TodoForm'
import TodoTittle from './TodoTittle'
import TodoList from './TodoList'
import TodoFooter from './TodoFooter'
import TodoTabs from './TodoTabs'
import UserName from './UserName'

import { TodosContext } from '../context/TodosContext.jsx'
import NoTodos from './NoTodos'
import useLocalStorage from '../hooks/useLocalStorage'
import { api } from '../api/apiResource'

const TodoContainer = () => {

    const [filter,setFilter] = useState('all');

    const [todos,setTodos] = useState([])

    const [todoId,setTodoId] = useLocalStorage('todoId',"1");

    function remainingTodos() {
        return todos.filter((todo)=>todo.isCompleted===false).length;
    }

        const filteredTodos = ()=> {
            const filteredResult = useMemo(()=>{
                // console.log("filter function called");

                if(filter === 'all'){
                    return todos;
                }else if(filter === 'active'){
                    return todos.filter(todo => todo.isCompleted === false) ;
                }else if (filter === 'completed'){
                    return todos.filter(todo => todo.isCompleted === true) ;
                }
            },[todos,filter])
            return filteredResult;
        }

        const fetchTodosApi = async () => {
            try {
                let res = await api.get('/todos');
                setTodos(res.data); 
            } catch (error){
                console.log("error : " + error);
            }
        }

        const addTodoApi = async (todo) => {
            try {
                let res = await api.post('/todos', todo);
            } catch (error) {
                console.log("error : " + error);
            }
        }

        const updateTodosApi = async (todoId,newTodo) => {
            try {
                let res = api.put(`/todos/${todoId}`,newTodo)
            }catch (error) {
                console.log("error : " + error);
            }
        }

        const deleteTodoApi = async (todoId) => {
            try {
                let res = api.delete(`/todos/${todoId}`)
            }catch (error) {
                console.log("error : " + error);
            }
        }

        // to get todo list from data.son 
        useEffect(()=> {
            fetchTodosApi();
        },[])


    return (
        <TodosContext.Provider value={{todos,setTodos,todoId,setTodoId , remainingTodos,filter,setFilter,filteredTodos , addTodoApi , updateTodosApi , deleteTodoApi}}>
            
            <div className="block max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <TodoTittle></TodoTittle>

                <UserName></UserName>

                <TodoForm ></TodoForm>

                <TodoTabs></TodoTabs>
                      
                {todos.length && todos.length > 0 ? (<TodoList></TodoList>) : (<NoTodos></NoTodos>)}

                <hr className='my-2' />

                {/* <TodoFooter></TodoFooter> */}

                {/* <hr className="mt-2" /> */}
            
    
            </div>
             





        </TodosContext.Provider>
    )
}

export default TodoContainer
