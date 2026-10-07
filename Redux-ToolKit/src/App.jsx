import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from './redux/slices-feature/counterSlice';

const App = () => {
 const count = useSelector((state)=> state.counter.value) // selector for access value
  const theme = useSelector((state)=> state.theme.value)
  const dispatch = useDispatch() // to run function
  return (
    <div className="h-screen w-full bg-zinc-800 flex items-center justify-center flex-col">
      <h1 className="text-amber-50 font-mono text-6xl">{count}</h1>
      <div className="p-4 flex w-[30%] justify-between">
        <button onClick={()=>{dispatch(increment())}} className=" p-4 rounded-full bg-green-500">+</button>
        <button onClick={()=>{dispatch(decrement())}} className="p-4 rounded-full bg-red-500">-</button>
      </div>
    </div>
  )
}

export default App
