import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import UserPreferences from './components/UserPreferences/UserPreferences.jsx';
import { getPlacesData } from './api';

const App = () => {
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userPrefs, setUserPrefs] = useState({
    budget: 'all',
    cuisine: 'all',
    accessibility: false,
    atmosphere: 'any',
  });
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [childClicked, setChildClicked] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {
    if (bounds) {
      setIsLoading(true);
      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
          setIsLoading(false);
        });
    }
  }, [type, bounds]);

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    try {
      const place = autocomplete.getPlace();
      if (place.name) {
        setSearchQuery(place.name);
        const searchResults = places.filter((p) => (
          p.name.toLowerCase().includes(place.name.toLowerCase())
        ));
        setPlaces(searchResults);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error handling place change:', error);
    }
  };

  useEffect(() => {
    const filteredResults = places.filter((place) => Number(place.rating) > rating);
    setFilteredPlaces(filteredResults);
  }, [rating, places]);

  const getRecommendations = (place) => {
    const recommendations = [];

    if (userPrefs.budget !== 'all' && place.price_level) {
      if (userPrefs.budget === 'low' && place.price_level > 2) {
        recommendations.push('Above budget range');
      } else if (userPrefs.budget === 'high' && place.price_level < 3) {
        recommendations.push('Premium options available');
      }
    }

    if (place.rating >= 4.5) {
      recommendations.push('Highly rated');
    }

    if (userPrefs.accessibility && place.wheelchair_accessible) {
      recommendations.push('Wheelchair accessible');
    }

    return recommendations;
  };

  return (
    <>
      <CssBaseline />
      <Header
        onPlaceChanged={onPlaceChanged}
        onLoad={onLoad}
        searchQuery={searchQuery}
      />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <UserPreferences
            preferences={userPrefs}
            setPreferences={setUserPrefs}
          />
          <List
            isLoading={isLoading}
            childClicked={childClicked}
            places={filteredPlaces.length ? filteredPlaces : places}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
            getRecommendations={getRecommendations}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setChildClicked={setChildClicked}
            setBounds={setBounds}
            setCoordinates={setCoordinates}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
