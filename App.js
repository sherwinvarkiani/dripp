import React from 'react';
import { FlatList } from 'react-native';
import { Provider, BottomNavigation } from 'react-native-paper';

import FeedPage from './pages/FeedPage';
import UploadPage from './pages/UploadPage';
import ProfilePage from './pages/ProfilePage';

const FeedRoute = () => (
  <FlatList
    decelerationRate={0}
    snapToInterval={417}
    pagingEnabled
    data={require('./mockdata.json')}
    renderItem={({ item }) =>
      <FeedPage username={item.username} upvotes={item.upvotes} caption={item.caption} deletetime={item.deletetime} />}
    keyExtractor={item => item._id}
  />
);

const UploadRoute = () => <UploadPage />

const ProfileRoute = () => <ProfilePage />

const App = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'feed', title: 'Feed', icon: 'home' },
    { key: 'upload', title: 'Upload', icon: 'plus-circle-outline' },
    { key: 'profile', title: 'Profile', icon: 'water' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    feed: FeedRoute,
    upload: UploadRoute,
    profile: ProfileRoute,
  });

  return (
    <Provider>
      <BottomNavigation
        barStyle={{ backgroundColor: "#97a4ff" }}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        labeled={false}
      />
    </Provider>
  );
};

export default App;
