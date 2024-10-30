import { MMKV } from 'react-native-mmkv';

// import moment from 'moment';

const prefix = 'cache';
// const expiryInMinutes = 5;

const storage = new MMKV();

const store = (key, value) => {
  try {
    storage.set(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  } finally {
    console.log(`store successfull`);
  }
};

const get = (key) => {
  try {
    const value = storage.getString(key);
    return value != null ? JSON.parse(value) : null;
  } catch (error) {
    console.log(error);
  }
};

const remove = (key) => {
  try {
    storage.delete(key);
  } catch (e) {
    console.log(e);
  }
};

const removeAll = () => {
  try {
    storage.clearAll();
  } catch (e) {
    console.log(e);
  }
};

const getAllKeys = () => {
  try {
    storage.getAllKeys();
  } catch (e) {
    console.log(e);
  }
};

const listener = (key) => {
  storage.addOnValueChangedListener((key) => {
    const newValue = storage.getString(key);
    console.log(`"${key}" new value: ${newValue}`);
  });
};

const storeTemp = (key, value) => {
  try {
    const obj = {
      value,
      timestamp: new Date(),
    };
    storage.set(prefix + key, JSON.stringify(obj));
  } catch (error) {
    console.log(`error storing storage data storeTemp`, error);
  } finally {
    //console.log(`storeTemp successfull`);
  }
};

export default {
  store,
  get,
  remove,
  storeTemp,
  listener,
  removeAll,
  getAllKeys,
};
