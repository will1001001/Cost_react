import {BrowserRouter as Router, Route , Routes} from 'react-router-dom' 
import Home from './components/pages/Home'
import Contact from './components/pages/Contact'
import Company from './components/pages/Company'
import NewProject from './components/pages/NewProject'
import Navbar from './components/layout/NavBar'
import Contain from './components/layout/Container'
import Footer from './components/layout/Footer'
import Projects from './components/pages/Projects'
import Project from './components/pages/Project'

function App() {
  return (
    <Router>
      <Navbar/>
      <Contain customClass='min-heigth'> 
      <Routes>
          <Route exact path='/' element={<Home/>}/>
           <Route  path='/projects' element={<Projects/>}/>
           <Route  path='/company' element={<Company/>}/>
           <Route  path='/contact' element={<Contact/>}/>
           <Route  path='/newproject' element={<NewProject/>}/>
           <Route  path='/project/:id' element={<Project/>}/>
         </Routes>
      </Contain>
      <Footer/>
    </Router>
  );
}

export default App;
