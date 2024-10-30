import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import TabScreenLayout from '../../Components/Wrapper/TabScreenLayout';
import {assetsImages} from '../../Utilis/ImagesPath';
import authService from '../../Api/auth';
import {FONTS, SIZE} from '../../Utilis/Constants';
import {useThemes} from '../../Utilis/ThemeProvider';
import {Rating} from 'react-native-ratings';
import Icon from 'react-native-vector-icons/AntDesign';
import i18n from '../../Utilis/i18n';
import {useTranslation} from 'react-i18next';

const Details = props => {
  const {theme} = useThemes();
  const {t} = useTranslation();
  const ID = props.route.params.movieId;
  const TITLE = props.route.params.movieName;
  const POSTER = props.route.params.moviePoster;
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [creditsContent, setCreditsContent] = useState(null);
  const [cLoading, setCLoading] = useState(false);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [genere, setGenere] = useState('');
  const [directors, setDirectors] = useState('');
  const [writers, setWriters] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);
  const [releaseYear, setReleaseYear] = useState('');

  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [poster, setPoster] = useState('');

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  const getDetailContent = async () => {
    const currentLanguage = i18n?.language || 'en';
    setLoading(true);
    console.log('ID', ID);
    await authService
      .getMovieDetails(ID, currentLanguage)
      .then(res => {
        console.log('Details:', res?.data);
        setContent(res?.data);
        const year = res?.data?.release_date.substring(0, 4);
        const genreNames = res?.data.genres.map(genre => genre.name).join(', ');
        setReleaseYear(year);
        setGenere(genreNames);
        setLoading(false);
      })
      .catch(err => {
        console.error(
          'Error fetching Content:',
          err.response?.data?.message || err,
        );
        setLoading(false);
      });
  };
  const getCreditsContent = async () => {
    const currentLanguage = i18n?.language || 'en';
    setCLoading(true);
    console.log('ID', ID);
    await authService
      .getCreditDetails(ID, currentLanguage)
      .then(async res => {
        // console.log('Credit Details:', res?.data);
        let cast = res.data.cast;
        // console.log('Cast:', res.data.crew);
        const crew = res.data.crew;

        // Filter directors and writers, and format names as comma-separated text
        const directors = crew
          .filter(person => person.job === 'Director')
          .map(person => person.name)
          .join(', ');

        const writers = crew
          .filter(person => person.department === 'Writing')
          .map(person => person.name)
          .join(', ');

        // Log or set these formatted names to a state if needed
        console.log('Directors:', directors);
        console.log('Writers:', writers);

        setDirectors(directors);
        setWriters(writers);
        setCast(cast);
        setCrew(res.data.crew);
        setCreditsContent(res?.data);
        setCLoading(false);
      })
      .catch(err => {
        console.error(
          'Error fetching Credit Content:',
          err.response?.data?.message || err,
        );
        setCLoading(false);
      });
  };
  useEffect(() => {
    getDetailContent();
    getCreditsContent();
  }, []);

  return (
    <TabScreenLayout headerText={TITLE} isBack loading={loading || cLoading}>
      <Image
        source={{uri: `https://image.tmdb.org/t/p/w500/${POSTER}`}}
        style={{
          height: 280,
          width: '100%',
          resizeMode: 'contain',
          backgroundColor: theme.colors.black,
        }}
      />
      <View style={{width: '90%', alignSelf: 'center', marginTop: 15}}>
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: SIZE.large,
            color: theme.colors.backgroundColor_light,
          }}>
          {TITLE}
        </Text>
        <View
          style={{
            marginTop: 5,
            flexDirection: 'row',
            alignitems: 'center',
            flexWrap: 'wrap',
          }}>
          <Text
            style={{
              fontFamily: FONTS.regular,
              fontSize: SIZE.regular,
              color: theme.colors.textSecondary,
            }}>
            {releaseYear}
          </Text>
          <Image
            style={{
              height: 20,
              width: 20,
              resizeMode: 'contain',
              tintColor: theme.colors.textSecondary,
            }}
            source={assetsImages.line}
          />
          <Text
            style={{
              fontFamily: FONTS.regular,
              fontSize: SIZE.regular,
              color: theme.colors.textSecondary,
            }}>
            {content?.origin_country[0] || ''}
          </Text>
          <Image
            style={[
              styles.lineImg,
              {
                tintColor: theme.colors.textSecondary,
              },
            ]}
            source={assetsImages.line}
          />
          <Text
            style={{
              fontFamily: FONTS.regular,
              fontSize: SIZE.regular,
              color: theme.colors.textSecondary,
            }}>
            {content?.runtime || ''} min
          </Text>
          <Image
            style={[
              styles.lineImg,
              {
                tintColor: theme.colors.textSecondary,
              },
            ]}
            source={assetsImages.line}
          />
          <View style={styles.ratingContainer}>
            <Rating
              type="star"
              ratingCount={5}
              imageSize={18}
              readonly
              startingValue={(content?.vote_average / 10) * 5}
              tintColor={theme.colors.backgroundColor_dark}
            />
            <Text
              style={[
                styles.voteCount,
                {
                  fontSize: SIZE.small,
                  color: '#FF8913',
                  fontFamily: FONTS.light,
                },
              ]}>
              ({content?.vote_count})
            </Text>
          </View>
        </View>

        <Text
          style={[
            styles.top,
            {
              fontFamily: FONTS.regular,
              fontSize: SIZE.regular,
              color: theme.colors.white,
            },
          ]}>
          {content?.overview || ''}
        </Text>
        <Text
          style={[
            styles.top,
            {
              fontFamily: FONTS.regular,
              fontSize: SIZE.regular,
              color: theme.colors.white,
            },
          ]}>
          {i18n.t('Genre')} : {genere}
        </Text>
        <Text
          style={[
            styles.top,
            {
              fontFamily: FONTS.regular,
              fontSize: SIZE.regular,
              color: theme.colors.white,
            },
          ]}>
          {i18n.t('Director')} : {directors || 'nA'}
        </Text>
        <Text
          style={[
            styles.top,
            {
              fontFamily: FONTS.regular,
              fontSize: SIZE.regular,
              color: theme.colors.white,
            },
          ]}>
          {i18n.t('Writer')} : {writers ? writers : 'nA'}
        </Text>
        <Text
          style={[
            styles.top,
            {
              fontFamily: FONTS.regular,
              fontSize: SIZE.regular,
              color: theme.colors.white,
            },
          ]}>
          {t('Status')} :{' '}
          <Text
            style={{
              color: content?.status === 'Released' && '#228B22',
              fontFamily: FONTS.medium,
            }}>
            {content?.status}
          </Text>
        </Text>

        <TouchableOpacity
          style={styles.header}
          onPress={toggleExpanded}
          activeOpacity={0.7}>
          <Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: SIZE.medium,
              color: theme.colors.backgroundColor_light,
            }}>
            {t('Cast')}
          </Text>
          <Icon
            name={isExpanded ? 'down' : 'up'}
            size={24}
            color={theme.colors.white}
          />
        </TouchableOpacity>
        {isExpanded && (
          <View>
            {cast.map((item, index) => (
              <View style={styles.cardContainer} key={index}>
                <View
                  style={[
                    styles.profileImg,
                    {
                      backgroundColor: theme.colors.white,
                      shadowColor: theme.colors.white,
                    },
                  ]}>
                  <Image
                    source={{
                      uri: item.profile_path
                        ? `https://image.tmdb.org/t/p/original/${item.profile_path}`
                        : 'https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1',
                    }}
                    style={[
                      styles.img,
                      {
                        backgroundColor: theme.colors.black,
                      },
                    ]}
                  />
                </View>
                <View style={styles.left}>
                  <Text
                    style={{
                      fontFamily: FONTS.medium,
                      fontSize: SIZE.medium,
                      color: theme.colors.white,
                    }}>
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONTS.regular,
                      fontSize: SIZE.regular,
                      color: theme.colors.blueText,
                    }}>
                    {item.character}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </TabScreenLayout>
  );
};

export default Details;

const styles = StyleSheet.create({
  voteCount: {
    marginLeft: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 8,
  },
  top: {
    marginTop: 5,
  },
  header: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lineImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  cardContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImg: {
    height: 80,
    width: 80,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  img: {
    height: '95%',
    width: '95%',
    resizeMode: 'cover',
    borderRadius: 90,
  },
  left: {
    marginLeft: 15,
    flex: 1,
  },
});
