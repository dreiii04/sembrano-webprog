import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='App'>
        <header className='App-header'>
          <h1> welcome to my react app</h1>
          <p>
              Name: Sembrano, Andrei <br />
              Email: andrei@gmail.com <br />
              address: Malabon city <br />
              Age:21 <br />
              Course: BSIT <br />
              Year: 3rd year <br />
              github:<a href="https://github.com/dreiii04/sembrano-webprog/tree/main" target="_blank" rel="noopener noreferrer">
                https://github.com/dreiii04/sembrano-webprog/tree/main
              </a>
          </p>
        </header>
      </div>
        
    </>
  )
}

export default App
