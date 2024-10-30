import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import BasicLayout from '../../Components/Wrapper/BasicLayout';
import {assetsImages} from '../../Utilis/ImagesPath';
import {FONTS, SIZE} from '../../Utilis/Constants';
import {useThemes} from '../../Utilis/ThemeProvider';
import MovieList from '../../Components/MovieList/MovieList';
import authService from '../../Api/auth';
import route from '../../Components/route';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const Home = ({navigation}) => {
  const {theme} = useThemes();
  const [popularData, setPopularData] = useState([]);
  const [topRatedData, setTopRatedData] = useState([]);
  const [nowPlayingData, setNowPlayingData] = useState([]);
  const [upcomingData, setUpcomingData] = useState([]);
  const [popularLoading, setPopularLoading] = useState(false);
  const [topRatedLoading, setTopRatedLoading] = useState(false);
  const [nowPlayingLoading, setNowPlayingLoading] = useState(false);
  const [upcomingLoading, setUpcomingLoading] = useState(false);
  const { t } = useTranslation();

  useFocusEffect(
    useCallback(() => {
      getPopularMovieContent();
      getUpcomingMovieContent();
      getNowPlayingMovieContent();
      getTopRatedMovieContent();
    }, [])
  );

  const getPopularMovieContent = async () => {
    setPopularLoading(true);
    await authService
      .getPopular()
      .then(res => {
        // console.log('Popular Content:', res?.data);
        setPopularData(res?.data?.results);
        setPopularLoading(false);
      })
      .catch(err => {
        setPopularLoading(false);
        console.error(
          'Error fetching Popular Content:',
          err.response?.data?.message || err.message,
        );
      });
  };

  const getUpcomingMovieContent = async () => {
    setUpcomingLoading(true);
    await authService
      .getUpcoming()
      .then(res => {
        console.log('Upcoming:', res?.data);
        setUpcomingData(res?.data?.results);
        setUpcomingLoading(false);
      })
      .catch(err => {
        console.error(
          'Error fetching Upcoming Data:',
          err.response?.data?.message || err.message,
        );
        setUpcomingLoading(false);
      });
  };

  const getTopRatedMovieContent = async () => {
    setTopRatedLoading(true);
    await authService
      .getTopRated()
      .then(res => {
        console.log('Top Rated:', res?.data);
        setTopRatedData(res?.data?.results);
        setTopRatedLoading(false);
      })
      .catch(err => {
        console.error(
          'Error fetching Top Rated Content:',
          err.response?.data?.message || err.message,
          setTopRatedLoading(false),
        );
      });
  };
  
  const getNowPlayingMovieContent = async () => {
    setNowPlayingLoading(true);
    await authService
      .getNowPlaying()
      .then(res => {
        console.log('Now Playing:', res?.data);
        setNowPlayingData(res?.data?.results);
        setNowPlayingLoading(false);
      })
      .catch(err => {
        console.error(
          'Error fetching Now Playing Content:',
          err.response?.data?.message || err.message,
        );
        setNowPlayingLoading(false);
      });
  };

  const handlePress = item => {
    console.log(item);
    navigation.navigate(route.Details,{movieId: item.id, movieName: item.original_title, moviePoster: item.poster_path})
  };
  return (
    <BasicLayout>
      <Image
        source={assetsImages.movieBanner}
        style={styles.imgStyle}
        resizeMode="stretch"
      />

      <MovieList
        title={t("Popular")}
        data={popularData}
        onPress={handlePress}
        loading={popularLoading}
      />
      <MovieList
        title={t("NowPlaying")}
        data={nowPlayingData}
        onPress={handlePress}
        loading={nowPlayingLoading}
      />
      <MovieList
        title={t("Upcoming")}
        data={upcomingData}
        onPress={handlePress}
        loading={upcomingLoading}
      />
      <MovieList
        title={t("TopRated")}
        data={topRatedData}
        onPress={handlePress}
        loading={topRatedLoading}
      />
    </BasicLayout>
  );
};

export default Home;

const styles = StyleSheet.create({
  imgStyle: {
    height: 350,
    width: '100%',
  },
});
