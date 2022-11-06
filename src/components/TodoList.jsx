import React, { useState, useCallback, useEffect } from 'react'
import { TodoForm } from './TodoForm'
import { Todo } from './Todo'
import '../App.css'

export const TodoList = () => {
    const [todos, setTodos] = useState(() => {
        const storedTodos = localStorage.getItem('todos');
        return storedTodos ? JSON.parse(storedTodos) : []

    })

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos]);

    const addTodo = useCallback(todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return
        }
        const newTodos = [todo, ...todos]
        setTodos(newTodos)

    }, [todos])

    const completeTodo = useCallback(id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        });
        setTodos(updatedTodos);
    }, [todos])

    const updateTodo = useCallback((todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }
        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item))
        );
    }, [])

    const removeTodo = useCallback(id => {
        const removeArr = todos.filter(todo => todo.id !== id)
        setTodos(removeArr)
    }, [todos])


    return (
        <div>
            <h1>Lets Create Some Todos!!!</h1>
            <TodoForm onSubmit={addTodo} />
            <Todo
                todos={todos}
                completeTodo={completeTodo}
                removeTodo={removeTodo}
                updateTodo={updateTodo}
            />
        </div>
    )
}
