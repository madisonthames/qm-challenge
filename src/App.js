import SearchBuilder from './components/SearchBuilder/SearchBuilder';
import { CardProvider } from './context/context';
import './App.css';

function App() {
  return (
    <div className="app">
      <CardProvider>
        <SearchBuilder />
      </CardProvider>
    </div>
  );
}

export default App;
