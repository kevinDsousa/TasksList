import './App.css';
import { useReducer, useState } from 'react';
import computer from './assets/computer.jpg'

interface Task {
  name: string;
  isCompleted: boolean;
}

interface AppState {
  tasks: Task[];
  tasksCount: number;
}

type AppAction =
  | { type: 'add-task'; payload: string }
  | { type: 'toggle-task'; payload: number };

const reducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'add-task':
      return {
        tasks: [...state.tasks, { name: action.payload, isCompleted: false }],
        tasksCount: state.tasksCount + 1,
      };
    case 'toggle-task':
      return {
        ...state,
        tasks: state.tasks.map((item, index) =>
          index === action.payload ? { ...item, isCompleted: !item.isCompleted } : item
        ),
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, { tasks: [], tasksCount: 0 });
  const [inputValue, setInputValue] = useState('');

  return (
    <section className='flex flex-1 font-mono max-sm:flex-col'>
      <section className='bg-opacity-25 bg-slate-600 w-1/2 h-screen max-sm:w-full max-sm:h-1/2 text-cyan-50 flex flex-col items-center border-2 border-zinc-500'>
        <h2 className='text-4xl font-bold py-5 max-sm:text-2xl'>To do list</h2>

        <p className='text-center text-sm text-green-400'>Informe a sua tarefa no campo de digitação e clique em Adicionar</p>

        <div className='flex flex-col justify-center items-center gap-2 my-4'>
          <p className='text-zinc-300 font-semibold'>Descreva sua tarefa</p>
          <input
            className='bg-zinc-500 rounded px-6 py-2 outline-none text-white placeholder:text-white placeholder:text-sm focus:bg-zinc-400'
            type='text'
            id=''
            placeholder='Adicione uma tarefa aqui'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className='bg-slate-200 hover:bg-green-400 hover:text-white outline-none text-zinc-900 rounded w-full h-10'
            onClick={() => {
              dispatch({ type: 'add-task', payload: inputValue });
              setInputValue('');
            }}
          >
            Adicionar
          </button>
          <div className='mt-11'>
            <img
              src={computer} alt="computer"
              className='rounded-full w-60 h-60 border-2 border-slate-950 max-sm:hidden' />
          </div>
        </div>
      </section>
      <section className='w-1/2 max-sm:w-full max-sm:h-1/2 text-green-400'>
        <div className='flex flex-col items-center justify-center my-4 gap-2'>
          <h2 className='text-white font-bold text-3xl my-4 max-sm:text-2xl'>Atividades adicionadas</h2>
          {state.tasks.map((task, index) => (
            <p
              key={index}
              onClick={() => dispatch({ type: 'toggle-task', payload: index })}
              style={task.isCompleted ? { textDecoration: 'line-through', color: 'red' } : {}}
              className='text-lg border-2 w-2/3 h-8 pl-1 rounded cursor-pointer text-center truncate'
            >
              {task.name}
            </p>
          ))}
        </div>
      </section>
    </section>
  );
}

export default App;
