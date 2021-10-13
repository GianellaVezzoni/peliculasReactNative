import {useEffect, useState} from 'react';
import movieDb from '../api/movieDb';
import {MovieFull} from '../interfaces/movieInterface';
import {CastCredits} from '../interfaces/creditsInterface';

interface MovieDetails {
  isLoading: boolean;
  movieFull: MovieFull;
  cast: CastCredits[];
}

export const useMovieDetails = (movieId: number) => {
  const [state, setState] = useState<MovieDetails>({
    isLoading: true,
    movieFull: undefined,
    cast: [],
  });

  const getMovieDetails = async () => {
    const movieDetailsPromise = movieDb.get<MovieFull>(`/${movieId}`);
    const castPromise = movieDb.get<CastCredits>(`/${movieId}/credits`);
    const [movieDetailsResponse, castPromiseResponse] = await Promise.all([
      movieDetailsPromise,
      castPromise,
    ]);

    setState({
      isLoading: false,
      movieFull: movieDetailsResponse.data,
      cast: castPromiseResponse.data.cast,
    });
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  return {
    ...state,
  };
};
