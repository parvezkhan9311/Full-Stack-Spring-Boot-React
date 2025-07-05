import './App.css'
import EmployeeComponent from './Components/EmployeeComponent'
import FooterComponent from './Components/FooterComponent'
import HeaderComponent from './Components/HeaderComponent'
import ListEmployee from './Components/ListEmployee'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* //http://localhost:3000 */}
          <Route path='/' element={<ListEmployee />}></Route>
          {/* //http://localhost:3000/employees */}
          <Route path='/employees' element={<ListEmployee />}></Route>
                    {/* //http://localhost:3000/add-employee */}
          <Route path='/add-employee' element={<EmployeeComponent />}></Route>

                 {/* //http://localhost:3000/edit-employee/1 */}
                 <Route path='/edit-employee/:id' element={<EmployeeComponent/>}></Route>
        </Routes>

        <FooterComponent />
      </BrowserRouter>

    </>

  )
}

export default App
