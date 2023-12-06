import '../styles/app.css';
import Header from '../components/Header';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import { useAuthContext } from '../hooks/useAuthContext';

//main app component
function App() {

  const {user} = useAuthContext();

  return (
    <div className="App">
      <Header/>
      <BrowserRouter>
        <Routes>
          {["/home", "/", "/todo-list"].map((path) => 
          <Route path={path} element={user? <Home />: <Navigate to="/login" />} />
          )}
          <Route
            path='/login'
            element={!user? <Login />: <Navigate to="/" />}
          />
          <Route
            path='/signup'
            element={!user? <Signup />: <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
