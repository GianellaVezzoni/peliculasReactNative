import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Cast} from '../interfaces/creditsInterface';

interface Props {
  actor: Cast;
}

export const CastCard = ({actor}: Props) => {
  const uri = `https://image.tmdb.org/t/p/w500/${actor.profile_path}`;

  return (
    <View style={style.container}>
        {
            actor.profile_path &&  <Image source={{uri}} style={style.image} />
        }
      <View style={style.actorInfo}>
        <Text style={style.actorName}>{actor.name}</Text>
        <Text style={style.characterText}>{actor.character}</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 18,
    shadowColor: '#000',
    height: 50,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,
    elevation: 9,
    marginLeft: 20,
    paddingRight: 15,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  actorName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  characterText: {
    fontSize: 16,
    opacity: 0.7,
  },
  actorInfo: {
    marginLeft: 10,
    marginTop: 4
  }
});
