import React, { useState, useEffect } from 'react'

const Todo = ({todo, completeTodo, index, removeTodo}) => {
    return(
        <div className='todo' style={{textDecoration: todo.isCompleted ? 'line-through' : ''}}>
            {todo.text}
            <button onClick={() => completeTodo(index)}>✔</button>
            <button onClick={() => removeTodo(index)}>✘</button>
        </div>
    )
}

const TodoForm = ({addTodo}) => {
    const [text, setText] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        if(!text) return
        addTodo(text)
        setText('')
    }
    return(
        <form onSubmit={handleSubmit}>
            <input value={text} onChange={e => setText(e.target.value)} type='text' placeholder='Enter todo...' />
        </form>
    )
}

const TodoApp = () => {
    const [todosRemaining, setTodosRemaining] = useState(0)
    const [todos, setTodos] = useState([])

    useEffect(() => {
        setTodosRemaining(todos.filter(todo => !todo.isCompleted).length)
    })

    const addTodo = (text) => {
        const newTodos = [...todos, {text}]
        setTodos(newTodos)
    }

    const completeTodo = (index) => {
        const newTodos = [...todos]
        setTodos(newTodos)
        newTodos[index].isCompleted = true
    }

    const removeTodo = (index) => {
        const newTodos = [...todos]
        setTodos(newTodos)
        newTodos.splice(index, 1)
    }
  return (
    <div className='todo-container'>
        <h1>My Todo App</h1>
        <div className='header'>PENDING TODOS({todosRemaining})</div>
        <div>
            {todos.map((todo, index) => (<Todo todo={todo} index={index}  key={todo.id} completeTodo={completeTodo} removeTodo={removeTodo} />))}
            <TodoForm addTodo={addTodo} />
        </div>
    </div>
  )
}

export default TodoApp