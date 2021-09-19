import React from 'react';
import { FlatList } from 'react-native';
import { BottomNavigation } from 'react-native-paper';

import FeedPage from './pages/FeedPage';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';

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

const HomeRoute = () => <HomePage />

const App = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'feed', title: 'Feed', icon: 'home' },
    { key: 'upload', title: 'Upload', icon: 'camera' },
    { key: 'home', title: 'Home', icon: 'water' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    feed: FeedRoute,
    upload: UploadRoute,
    home: HomeRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      labeled={false}
    />
  );
};

export default App;
