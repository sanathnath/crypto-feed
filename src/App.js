import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRouters from './AppRouters';
import ErrorMessage from './Components/ErrorMessage';
import Header from './Components/Header';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <AppRouters />
        <ErrorMessage />
      </BrowserRouter>
    </div>
  );
}

export default App;
