import './App.css';
import Home from './Home';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import SearchResult from './SearchResult';
import { useSelector } from 'react-redux';
import { result } from './features/searchResultSlice';
import Error from './Error';
import MovieInfo from './MovieInfo';

function App() {
  const allMovies = useSelector(result)
  return (
    <Router>
      <Routes>
        <Route path='/' element={allMovies ? <SearchResult/> : <Home/>}/>
        <Route path='/movieInfo' element={<MovieInfo/>}/>
        <Route errorElement={<Error/>}/>
      </Routes>
    </Router>
  );
}

export default App;
