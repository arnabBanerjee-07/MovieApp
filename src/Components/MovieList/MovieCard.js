import React,{useState, useEffect} from 'react';
import {TouchableOpacity, Image, StyleSheet, View} from 'react-native';
import {useThemes} from '../../Utilis/ThemeProvider';
import Icon from 'react-native-vector-icons/Ionicons';
import mmkv from '../mmkv';

const MovieCard = ({item, onPress}) => {
  const {theme} = useThemes();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check if the movie is already in favorites
    const favoriteMovies = mmkv.get('favorites') || [];
    setIsFavorite(favoriteMovies.some(fav => fav.id === item.id));
  }, [item.id]);

  const toggleFavorite = () => {
    const favoriteMovies = mmkv.get('favorites') || [];
    let updatedFavorites;

    if (isFavorite) {
      // Remove from favorites
      updatedFavorites = favoriteMovies.filter(fav => fav.id !== item.id);
    } else {
      // Add to favorites
      updatedFavorites = [...favoriteMovies, item];
    }

    mmkv.store('favorites', updatedFavorites);
    setIsFavorite(!isFavorite);
  };
  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      style={styles.card}
      activeOpacity={0.8}>
      <View
        style={[
          styles.cardContainer,
          {
            alignItems: 'center',
            backgroundColor: theme.colors.white,
            shadowColor: theme.colors.white,
          },
        ]}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
          }}
          style={styles.image}
          resizeMode="stretch"
        />
        <TouchableOpacity style={styles.heartIcon} onPress={toggleFavorite}>
          <Icon
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? 'red' : 'white'}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginRight: 10,
    marginTop: 10,
  },
  image: {
    height: '99%',
    width: '99%',
    borderRadius: 12,
  },
  cardContainer: {
    height: 180,
    width: 130,
    justifyContent: 'center',
    elevation: 50,
    borderRadius: 12,
  },
  heartIcon: {
    position: 'absolute',
    top: 5,
    left: 8,
    zIndex: 1,
  },
});

export default MovieCard;
