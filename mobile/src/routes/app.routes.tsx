import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Game } from '../screens/Game';

import { Home } from '../screens/Home';

const { Navigator, Screen } = createNativeStackNavigator();

export const AppRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='home' component={Home}></Screen>
      <Screen name='game' component={Game}></Screen>
    </Navigator>
  );
};
