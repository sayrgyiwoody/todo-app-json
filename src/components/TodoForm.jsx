import React, { useCallback, useContext, useState } from 'react'
import { TodosContext } from '../context/TodosContext.jsx'
import { api } from '../api/apiResource.js';

const TodoForm = () => {

    const { todos, setTodos, filter, todoId, setTodoId, addTodoApi } = useContext(TodosContext);

    const [todoInput, setTodoInput] = useState('');


    const addTodo = useCallback((e) => {
        e.preventDefault();

        if (todoInput.trim().length === 0) {
            return;
        }

        const todo = {
            'id': todoId,
            'text': todoInput,
            'isCompleted': false,
            'isEditing': false,
        };

        setTodos([...todos, todo]);
        addTodoApi(todo);

        setTodoId(preId => (parseInt(preId) + 1).toString());

        setTodoInput('');
    }, [todoInput, todos, todoId]);

    




    function handleInput(e) {
        setTodoInput(e.target.value);
    }






    return (
        <div className="my-4">
            <form action="#" onSubmit={(e) => addTodo(e)}>

                <input value={todoInput} onChange={(e) => handleInput(e)} type="text" placeholder='What do you need to do?' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </form>
        </div>
    )
}

export default TodoForm
