import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Success from './components/Success'
import Cancel from './components/Cancel';
function App() {
  return (
   
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/checkOut" element={<Checkout />} />
            {/* <PrivateRoute path="/addToCart" element={<Cart/>} /> */}
            <Route path="/addToCart" element={<PrivateRoute component={Cart} />} />
            <Route path="/success" element={<Success/>} />
            <Route path="/cancel" element={<Cancel/>} />
            <Route path="signup" element={<Signup/>} />
            
          </Routes>
        </div>
      </Router>

      
   
  );
}

const PrivateRoute = ({ component: Component }) => {
  const token = localStorage.getItem('token');
  return token ? <Component /> : <Navigate to="/login" replace />;
};

export default App;
