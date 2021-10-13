import {useEffect, useState} from 'react';
import movieDb from '../api/movieDb';
import {Movie, MovieDBResponse} from '../interfaces/movieInterface';

interface MoviesState {
  nowPlaying: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
}

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [moviesState, setMovieState] = useState<MoviesState[]>({
    nowPlaying: [],
    popular: [],
    topRated: [],
    upcoming: [],
  });

  const getMovies = async () => {
    const nowPlayingPromise = movieDb.get<MovieDBResponse>('/now_playing');
    const popularPromise = movieDb.get<MovieDBResponse>('/popular');
    const topRatedPromise = movieDb.get<MovieDBResponse>('/top_rated');
    const upcomingPromise = movieDb.get<MovieDBResponse>('/upcoming');

    const responses = await Promise.all([
      nowPlayingPromise,
      popularPromise,
      topRatedPromise,
      upcomingPromise,
    ]);
    setMovieState({
      nowPlaying: responses[0].data.results,
      popular: responses[1].data.results,
      topRated: responses[2].data.results,
      upcoming: responses[3].data.results,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return {
    ...moviesState,
    isLoading,
  };
};
