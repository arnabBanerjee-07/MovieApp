import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import MovieCard from './MovieCard';
import {FONTS, SIZE} from '../../Utilis/Constants';
import {useThemes} from '../../Utilis/ThemeProvider';
import LoadingSkeleton from './LoadingSkeleton';

const MovieList = ({title, data, onPress, loading}) => {
  const {theme} = useThemes();
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontFamily: FONTS.semiBold,
          fontSize: SIZE.large,
          color: theme.colors.backgroundColor_light,
        }}>
        {title}
      </Text>
      <FlatList
        data={loading ? Array(5).fill({}) : data}
        renderItem={({ item }) =>
          loading ? (
            <LoadingSkeleton />
          ) : (
            <MovieCard item={item} onPress={onPress} />
          )
        }
        keyExtractor={(item, index) => (loading ? index.toString() : item.id.toString())}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 20,
  },
});

export default MovieList;
