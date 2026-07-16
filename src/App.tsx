import React, { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { Movie } from './types/Movie'; // Убедись, что путь к типам верный
import moviesFromServer from './api/movies.json';

export const App: React.FC = () => {
  // Инициализируем стейт данными, пришедшими с "сервера" (из JSON файла)
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);

  // Функция добавления нового фильма с генерацией уникального ID
  const handleAddMovie = (newMovie: Omit<Movie, 'id'>) => {
    setMovies((prevMovies) => {
      const nextId = Math.max(...prevMovies.map((m) => m.id), 0) + 1;

      return [
        ...prevMovies,
        {
          ...newMovie,
          id: nextId,
        },
      ];
    });
  };

  return (
    <div className="page">
      <div className="page-content">
        {/* Передаем динамический стейт movies вместо статического файла json */}
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        {/* Передаем нашу готовую функцию handleAddMovie */}
        <NewMovie onAdd={handleAddMovie} />
      </div>
    </div>
  );
};
