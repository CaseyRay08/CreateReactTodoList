import React, { useCallback, useState } from 'react'
import { BiTrashAlt } from 'react-icons/bi'
import { TiEdit } from 'react-icons/ti'
import { TodoForm } from './TodoForm'
import '../App.css'

export const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    })

    const submitUpdate = useCallback(value => {
        updateTodo(edit.id, value)
        setEdit({
            id: null,
            value: ''
        })
    }, [edit.id, updateTodo])

    if (edit.id) {
        return <TodoForm edit={edit} onSubmit={submitUpdate} />
    }

    return todos.map((todo, index) => (
        <div className={todo.isComplete ? 'todo-row complete' : 'todo-row'} key={todo.id}>
            <div onClick={() => completeTodo(todo.id)}>{`${index + 1}.`} {todo.text} </div>
            <div className='icons'>
                <TiEdit onClick={() => setEdit({ id: todo.id, value: todo.text })} className='edit-icon' />
                <BiTrashAlt onClick={() => removeTodo(todo.id)} className='delete-icon' />
            </div>
        </div>
    ));
}
