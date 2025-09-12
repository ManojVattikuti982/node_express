import {useState} from 'react'

const App = () => {
  let [count, setCount] = useState(0);

  const handleIncrement = () => {
   setTimeout(() => {
     setCount((prev)=>prev+1);
   },2000);
  }

  const handleDecrement = () => {
    setCount((prev)=>prev-1);
  }

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
    </div>
  )
}

export default App