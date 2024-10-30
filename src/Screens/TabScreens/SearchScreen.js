import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Image,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import TabScreenLayout from '../../Components/Wrapper/TabScreenLayout';
import {TextInput} from 'react-native-paper';
import {SIZE, FONTS, HEIGHT} from '../../Utilis/Constants';
import Search from 'react-native-vector-icons/Fontisto';
import {useThemes} from '../../Utilis/ThemeProvider';
import moment from 'moment';
import {Rating} from 'react-native-ratings';
import axios from 'axios';
import CloseIcon from 'react-native-vector-icons/MaterialIcons';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import route from '../../Components/route';
import Icon from 'react-native-vector-icons/Ionicons';
import mmkv from '../../Components/mmkv';
import { useTranslation } from 'react-i18next';
import i18n from '../../Utilis/i18n';
const SearchScreen = ({navigation}) => {
  const {t} = useTranslation()
  const {theme} = useThemes();
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularPage, setPopularPage] = useState(1);
  const [popularLoading, setPopularLoading] = useState(false);

  const [searchMovies, setSearchMovies] = useState([]);
  const [searchPage, setSearchPage] = useState(1);
  const [searchTotalPages, setSearchTotalPages] = useState(1);
  const [searchLoading, setSearchLoading] = useState(false);

  const [query, setQuery] = useState('');
  const [isEndReached, setIsEndReached] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const [isSearching, setIsSearching] = useState(false);

  const MAX_POPULAR_PAGES = 5;
  const TOKEN =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMmNiMmJlNWU3YzcwYmZmMTdjYzU2ZDJmNGE1YjE5NiIsIm5iZiI6MTczMDE0MTI0NS4zNjg2NSwic3ViIjoiNjcxYmI3ZGU0NTQyZTM3MWZlMGE4MWUyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.WgtvPEz5jC9BN3Stcuj79l1VQn16oAnLpozipVzhxuc';

    useEffect(() => {
      const storedFavorites = mmkv.get('favorites') || [];
      setFavorites(storedFavorites);
    }, []);
  
    // Toggle favorite status for a movie
    const toggleFavorite = (movie) => {
      const updatedFavorites = favorites.some(fav => fav.id === movie.id)
        ? favorites.filter(fav => fav.id !== movie.id)
        : [...favorites, movie];
  
      setFavorites(updatedFavorites);
      mmkv.store('favorites', updatedFavorites); // Update MMKV storage
    };
  
    // Check if a movie is a favorite
    const isFavoriteMovie = (movieId) => {
      return favorites.some(fav => fav.id === movieId);
    };
  // Fetch movies data
  const fetchPopularMovies = async () => {
    if (popularLoading || popularPage > MAX_POPULAR_PAGES) return;
    setPopularLoading(true);
    const currentLanguage = i18n.language; 
    try {
      const url = `https://api.themoviedb.org/3/movie/popular?language=${currentLanguage}&page=${popularPage}`;
      const response = await axios.get(url, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      if (response.data.results) {
        setPopularMovies(prevMovies => [
          ...prevMovies,
          ...response.data.results,
        ]);
      }
    } catch (error) {
      console.error('Error fetching popular movies:', error);
    } finally {
      setPopularLoading(false);
    }
  };

  const fetchSearchMovies = async () => {
    if (searchLoading) return;
    const currentLanguage = i18n.language; 
    setSearchLoading(true);
    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=${currentLanguage}&page=${searchPage}`;
      const response = await axios.get(url, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      if (response.data.results) {
        setSearchMovies(prevMovies => [
          ...prevMovies,
          ...response.data.results,
        ]);
        setSearchTotalPages(response.data.total_pages);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleLoadMorePopular = () => {
    if (popularPage < MAX_POPULAR_PAGES) {
      setPopularPage(prevPage => prevPage + 1);
    }
  };
  const handleLoadMoreSearch = () => {
    if (searchPage < searchTotalPages) {
      setSearchPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    if (query === '') {
      fetchPopularMovies();
      setIsSearching(false);
    } else if (query !== '' && isSearching) {
      fetchSearchMovies();
    }
  }, [popularPage, searchPage]);
  useEffect(() => {
    if (query === '') {
      setIsSearching(false);
    }
  }, [query]);

  const handleSearch = () => {
    setSearchPage(1);
    setSearchMovies([]);
    fetchSearchMovies();
    setIsSearching(true);
    Keyboard.dismiss();
  };

  const clearSearch = () => {
    setIsSearching(false);
    setQuery('');
    setSearchMovies([]);
    setSearchPage(1);
    setPopularPage(1);
    // setPopularMovies([]);
    fetchPopularMovies();
  };
  const handlePress = item => {
    console.log(item);
    navigation.navigate(route.Details,{movieId: item.id, movieName: item.original_title, moviePoster: item.poster_path})
  };
  const renderMovieItem = ({item}) => {
    const isFavorite = isFavoriteMovie(item.id);

    const formattedDate = moment(item.release_date).format('Do MMMM, YYYY');
    return (
      <TouchableOpacity
        style={[styles.movieCard, {backgroundColor: theme.colors.white}]} 
        onPress={()=>handlePress(item)} 
        activeOpacity={0.5}>
        <View
          style={[
            styles.imageContainer,
            {
              backgroundColor: theme.colors.white,
              shadowColor: theme.colors.white,
            },
          ]}>
          <Image
            source={{
              uri: item.poster_path
                ? `https://image.tmdb.org/t/p/w200/${item.poster_path}`
                : 'https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg',
            }}
            style={styles.image}
          />
           {/* <TouchableOpacity
          style={styles.heartIcon}
          onPress={() => toggleFavorite(item)}
        >
          <Icon
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? 'red' : 'white'}
          />
        </TouchableOpacity> */}
        </View>
        <View style={styles.movieDetails}>
          <Text
            style={{
              fontFamily: FONTS.semiBold,
              fontSize: SIZE.medium,
              paddingRight: 5,
              color: theme.colors.textPrimary_light,
            }}
            numberOfLines={3}>
            {item.title}
          </Text>
          <Text
            style={[
              styles.date,
              {
                fontFamily: FONTS.medium,

                fontSize: SIZE.regular,
                color: theme.colors.textSecondary,
              },
            ]}>
            {formattedDate}
          </Text>
          <View style={styles.ratingContainer}>
            <Rating
              type="star"
              ratingCount={5}
              imageSize={18}
              readonly
              tintColor={theme.colors.white}
              startingValue={(item.vote_average / 10) * 5} // Normalize to 5-star scale
            />
            <Text
              style={[
                styles.voteCount,
                {
                  fontSize: SIZE.small,
                  color: theme.colors.transparentBackground,
                  fontFamily: FONTS.light,
                },
              ]}>
              ({item.vote_count})
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: theme.colors.backgroundColor_dark}}>
      <StatusBar
        backgroundColor={theme.colors.black}
        barStyle={theme.mode === 'light' ? 'dark-content' : 'light-content'}
      />
      <View style={{width: '90%', alignSelf: 'center', marginTop: 25}}>
        <TextInput
          style={styles.inputContainer}
          contentStyle={{
            fontFamily: FONTS.r_regular,
            fontSize: SIZE.medium,
          }}
          onChangeText={text => setQuery(text)}
          value={query}
          textColor={theme.colors.backgroundColor_light}
          placeholder={t('SearchForTitle')}
          placeholderTextColor={theme.colors.buttonColor}
          underlineColor={'transparent'}
          activeUnderlineColor={'transparent'}
          keyboardType="default"
          autoCapitalize="none"
          right={
            <TextInput.Icon
              icon={() =>
                isSearching ? (
                  <CloseIcon
                    name="close"
                    size={25}
                    color={theme.colors.buttonColor}
                    onPress={clearSearch}
                  />
                ) : (
                  <Search
                    name="search"
                    size={25}
                    color={theme.colors.buttonColor}
                    onPress={handleSearch}
                  />
                )
              }
            />
          }
        />

        <FlatList
          data={isSearching ? searchMovies : popularMovies}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderMovieItem}
          onEndReached={query ? handleLoadMoreSearch : handleLoadMorePopular}
          onEndReachedThreshold={0.4}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
            windowSize={5}
          contentContainerStyle={{paddingBottom: 120}}
          ListFooterComponent={
            popularMovies.length == 0 ? (
              <View
                style={{
                  marginTop: HEIGHT *0.35,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <BarIndicator size={30} color={theme.colors.textPrimary_dark} />
              </View>
            ) : popularLoading || searchLoading ? (
              <View
                style={{
                  marginTop: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom:20
                }}>
              <BarIndicator size={25} color={theme.colors.buttonColor} />
              </View>
            ) : null
          }
          //  ListEmptyComponent={
          //    <Text style={{ color: theme.colors.textPrimary_light, textAlign: 'center' }}>No results found</Text>
          //  }

          ListEmptyComponent={
            !searchLoading &&
            query &&
            isSearching && (
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: FONTS.medium,
                  color: theme.colors.textSecondary,
                  textAlign: 'center',
                  marginTop: 20,
                }}>
                No results Found
              </Text>
            )
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  inputContainer: {
    height: 60,
    width: '100%',
    backgroundColor: '#525057',
    elevation: 2,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    marginBottom: 15,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  voteCount: {
    marginLeft: 8,
  },
  mainCard: {
    marginTop: 15,
    flexDirection: 'row',
    width: '100%',
    height: 150,
    borderRadius: 15,
  },
  movieCard: {
    flexDirection: 'row',
    marginTop: 15,
    width: '100%',
    height: 150,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  imageContainer: {
    height: 150,
    width: 100,
    elevation: 3,
    shadowColor:'#aaa',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  image: {
    height: '99%',
    width: '99%',
    resizeMode: 'stretch',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  movieDetails: {
    flex: 1,
    marginLeft: 8,
    marginTop: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  heartIcon: {
    position: 'absolute',
    top: 5,
    left: 8,
    zIndex: 1,
  },
});
