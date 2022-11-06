import React, { useState, useEffect, useRef, useCallback } from 'react'
import '../App.css'
export const TodoForm = (props) => {

    const [userInput, setInput] = useState('')

    const inputRef = useRef(null)
    useEffect(() => {
        inputRef.current.focus()
    });

    const handleInput = useCallback(e => {
        setInput(e.target.value)
    }, []);

    const preDefault = useCallback(e => {

        e.preventDefault();/* stops the form from submitting by default */

        props.onSubmit({
            id: Math.floor(Math.random() * Date.now()),
            text: userInput
        });/* after user adds a todo this will generate a object for the the user's todo. we will randomly generate an id key for the user and the users input will be added to the text key as it's value */

        setInput('')/*resets the displayed input of the user after they submit */
    }, [props, userInput]);

    return (

        <form className='todo-form' onSubmit={preDefault}>

            <input
                className='todo-input'
                onChange={handleInput}
                type='text'
                placeholder='Add a new Todo'
                value={userInput}
                name='text'
                ref={inputRef}
            />

            <button className='todo-button'>Add Todo</button>
        </form>

    )
};
