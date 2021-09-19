import React, { useState, useEffect } from 'react';
import { FlatList, Text } from 'react-native';
import { Provider, BottomNavigation } from 'react-native-paper';

import FeedPage from './pages/FeedPage';
import UploadPage from './pages/UploadPage';
import ProfilePage from './pages/ProfilePage';

const FeedRoute = ({ data }) => {
  return (
    <FlatList
      decelerationRate={0}
      snapToInterval={710}
      data={data}
      renderItem={(item) => <FeedPage data={item} />}
      keyExtractor={item => item._id}
      bounces
    />
  );
}

const UploadRoute = () => <UploadPage />

const ProfileRoute = ({ data }) => <ProfilePage data={data} />

const App = () => {
  const [data, setData] = useState();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'feed', title: 'Feed', icon: 'home' },
    { key: 'upload', title: 'Upload', icon: 'plus-circle-outline' },
    { key: 'profile', title: 'Profile', icon: 'water' },
  ]);

  useEffect(() => {
    fetch('https://dripp-backend-7zptn.ondigitalocean.app/images')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then(data => {
        setData(data);
      })
  }, []);

  if (!data) return <Text>Loading...</Text>;

  return (
    <Provider>
      <BottomNavigation
        barStyle={{ backgroundColor: "#97a4ff" }}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={({ route, jumpTo }) => {
          switch (route.key) {
            case 'feed':
              return <FeedRoute data={data} />;
            case 'upload':
              return <UploadRoute />;
            case 'profile':
              return <ProfileRoute data={data} />;
          }
        }}
        labeled={false}
      />
    </Provider>
  );
};

export default App;
