import './App.css'
import { useReducer, useState } from 'react'

const reducer = (state, action) => {
  switch (action.type) {
    case 'add-task':
      return {
        tasks: [...state.tasks, { name: action.payload, isCompleted: false }],
        tasksCount: state.tasksCount + 1,
      };
    case 'toggle-task':
      return {
        ...state,
        tasks: state.tasks.map((item, index) => index === action.payload ? { ...item, isCompleted: !item.isCompleted} : item)
      }
    default:
      return state;
  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, { tasks: [], tasksCount: 0 })
  const [inputValue, setInputValue] = useState('')

  return (
    <section className='bg-slate-900 w-full h-full text-cyan-50 flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-bold mt-3'>To do list</h2>

      <div className='flex flex-1 justify-center items-center gap-2 mt-8'>
        <p className='text-zinc-300'>Descreva sua tarefa</p>
        <input className='bg-zinc-500 rounded px-6 py-2 outline-none text-white' type="text" id="" value={inputValue} onChange={e => setInputValue(e.target.value)} />
        <button
          onClick={() => {
            dispatch({ type: 'add-task', payload: inputValue })
            setInputValue("")
          }}>Adicionar</button>
      </div>
      <div>
        {state.tasks.map((task, index) => (
          <p
            key={index}
            onClick={() => dispatch({ type: 'toggle-task', payload: index })}
            style={task.isCompleted ? { textDecoration: 'line-through' } : {}}
            className=''
          >
            {task.name}
          </p>
        ))}

      </div>
    </section>
  )
}

export default App
