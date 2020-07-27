import Geolocation from '@react-native-community/geolocation';

export function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        resolve(position);
      },
      (error) => {
        reject(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 60000,
        maximumAge: 1000,
      },
    );
  });
}
