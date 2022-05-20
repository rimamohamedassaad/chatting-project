import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Register from './pages/Register';
import Navbar from "./components/navbar";
import Login from './pages/Login';
import { AuthProvider } from './context/auth'
import { PrivateRoute } from './components/privateRoute'
import { Profile } from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/register' exact element={<Register />}> </Route>
          <Route path='/login' exact element={<Login />}> </Route>
          <Route element={<PrivateRoute />}>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/profile' element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
