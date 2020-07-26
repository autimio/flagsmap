import { PermissionsAndroid, Platform } from 'react-native';

export async function requestLocationPermission() {
  try {
    if (Platform.OS === 'android') {
      let grantedAndroid = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
        title: 'Permissão de Localização',
        message: 'Conceda permissão de localização para obtermos sua posição.',
        buttonNegative: 'Cancelar',
        buttonPositive: 'OK',
      });

      return grantedAndroid === PermissionsAndroid.RESULTS.GRANTED;
    }
  } catch (err) {
    console.warn(err);
  }
}
