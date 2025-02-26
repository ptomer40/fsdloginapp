
import './App.css'
import Dashboard from './component/Dashboard'
import Login from './component/Login'
import Registration from './component/Registration'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {
 
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/registration' element={<Registration />} />
      <Route path='/dashboard' element= {<Dashboard />}/>
    </Routes>
      
    </BrowserRouter>
  )
}

export default App
