import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRouters from './AppRouters';
import Header from './Components/Header';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <AppRouters />
      </BrowserRouter>
    </div>
  );
}

export default App;
