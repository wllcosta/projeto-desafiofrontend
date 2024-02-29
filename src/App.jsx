import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
      <ToastContainer />
    </Router>
  );
}

export default App;

