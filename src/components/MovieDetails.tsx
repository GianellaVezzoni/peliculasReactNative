import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import currencyFormatter from 'currency-formatter';
import {CastCard} from './CastCard';

interface Props {
  movieFull: MovieFull;
  cast: Cast[];
}

export const MovieDetails = ({movieFull, cast}: Props) => {
  return (
    <>
      <View style={style.viewMainContainer}>
        <View style={style.viewContainer}>
          <Icon name="star-outline" color="#000" size={16} />
          <Text>{movieFull.vote_average}</Text>
          <Text style={style.genresText}>
            - {movieFull.genres.map(g => g.name).join(', ')}
          </Text>
        </View>

        <Text style={style.storyText}>
          Historia
        </Text>
        <Text style={style.contentText}>{movieFull.overview}</Text>

        <Text style={style.presupuestoText}>
          Presupuesto
        </Text>
        <Text style={style.contentText}>
          {currencyFormatter.format(movieFull.budget, {code: 'USD'})}
        </Text>

        <View style={style.viewReparto}>
        <Text style={style.storyText}>
            Reparto
          </Text>
          <FlatList
            data={cast}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <CastCard actor={item} />}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{marginTop: 10, height: 70}}
          />
        </View>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  viewMainContainer: {
    marginHorizontal: 20,
  },
  viewContainer: {
    flexDirection: 'row',
  },
  genresText: {
    marginLeft: 5,
  },
  storyText: {
    fontSize: 23,
    marginTop: 10,
    fontWeight: 'bold',
  },
  presupuestoText: {
    fontSize: 23,
    marginTop: 10,
    fontWeight: 'bold',
  },
  viewReparto:{
    marginTop: 10,
    marginBottom: 100,
  },
  contentText: {
    fontSize: 16,
  },
});
