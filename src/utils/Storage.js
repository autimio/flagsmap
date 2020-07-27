import _ from 'underscore';
import AsyncStorage from '@react-native-community/async-storage';

export default {
  async setItem(key, value) {
    if (_.isObject(value)) {
      value = JSON.stringify(value);
    }

    AsyncStorage.setItem(key, value);
  },
  async getItem(key, isObject) {
    const item = await AsyncStorage.getItem(key);

    if (isObject) {
      return JSON.parse(item);
    }

    return item;
  },
  async removeItem(key) {
    await AsyncStorage.removeItem(key);
  },
};
