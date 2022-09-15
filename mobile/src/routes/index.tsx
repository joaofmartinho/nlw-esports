import { NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './app.routes';

export const Routes = () => {
  return (
    <NavigationContainer>
      <AppRoutes></AppRoutes>
    </NavigationContainer>
  );
};
