import React, {useContext, useEffect} from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import {GradientBackground} from '../components/GradientBackground';
import {HorizontalSlider} from '../components/HorizontalSlider';
import {MovieCard} from '../components/MovieCard';
import {useMovies} from '../hooks/useMovies';
import {getImageColors} from '../helpers/getColorsHelper';
import {GradientContext} from '../context/GradientContext';

const {width} = Dimensions.get('window');

export const HomeScreen = () => {
  const {nowPlaying, isLoading, popular, topRated, upcoming} = useMovies();
  const {top} = useSafeAreaInsets();
  const {setMainColors} = useContext(GradientContext);

  const getColorImage = async (index: number) => {
    const movie = nowPlaying[index];
    const uri = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    const [primary = 'green', secondary = 'orange'] = await getImageColors(uri);

    setMainColors({primary, secondary});
  };

  useEffect(() => {
    if (nowPlaying.length > 0) {
      getColorImage(0);
    }
  }, [nowPlaying]);

  if (isLoading) {
    return (
      <View style={styles.view}>
        <ActivityIndicator color="red" size={100} />
      </View>
    );
  }

  return (
    <GradientBackground>
      <ScrollView>
        <View style={{marginTop: top + 20}}>
          <View style={styles.viewContainercarousel}>
            <Carousel
              data={nowPlaying}
              renderItem={({item}: any) => <MovieCard movie={item} />}
              itemWidth={300}
              sliderWidth={width}
              onSnapToItem={index => getColorImage(index)}
            />
          </View>

          <HorizontalSlider title={'Populares'} movies={popular} />
          <HorizontalSlider title={'Mejor calificadas'} movies={topRated} />
          <HorizontalSlider title={'Proximamente'} movies={upcoming} />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  viewContainercarousel: {
    height: 440,
  },
});
