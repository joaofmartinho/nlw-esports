import * as Notifications from 'expo-notifications';

export const getPushNotificationToken = async () => {
  const { granted } = await Notifications.getPermissionsAsync();

  if (!granted) {
    await Notifications.requestPermissionsAsync();
  } else if (granted) {
    const pushToken = await Notifications.getExpoPushTokenAsync();
    return pushToken.data;
  }
};
