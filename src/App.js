import './App.css';
import Blog from './components/Blog'
import Login from './components/Login';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>

        <Route exact path='/' element={<Login />} />
        <Route exact path='/blog' element={<Blog />} />
      </Routes>
    </Router>
    // <div className="App">
    //   {/* <User /> */}
    //   <Login/>
    // </div>
  );
}

export default App;
