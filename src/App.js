
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/header/Header';
import Home from './pages/home/home';
import MovieList from './components/movieList/movieList';
import Movie from './pages/movieDetail/movie';


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="movie/:id" element={<Movie />} />
          <Route path="movies/:type" element={<MovieList />} />
          <Route path="*" element={<ErrorPage />} /> {/* Dedicated Error Page */}
        </Routes>
      </Router>
    </div>
  );
}

function ErrorPage() {
  return <h1>Error 404: Page is Not Found</h1>; // Simple error page
}


export default App;
