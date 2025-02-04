import AsyncStorage from '@react-native-async-storage/async-storage';

export const setLocalStorage =async(key,value)=>{
    await AsyncStorage.setItem(key,JSON.stringify(value));
}

export const getLocalStorage= async(key)=>{
    try{
    const result= await AsyncStorage.getItem(key);
    return result? JSON.parse(result):null;
    }catch(e){
        console.log('error aa rha h', e);
        return null;
    }
}

// whenever user logout we will delete all the local storage
export const clearLocalStorage = async () => {
    await AsyncStorage.clear();
    }


// gpt bkl ka code
// import AsyncStorage from '@react-native-async-storage/async-storage';

// /**
//  * Save data to local storage
//  * @param {string} key - The key for storing the data
//  * @param {any} value - The value to be stored
//  */
// export const setLocalStorage = async (key, value) => {
//   try {
//     await AsyncStorage.setItem(key, JSON.stringify(value));
//   } catch (error) {
//     console.error('Error saving to AsyncStorage:', error);
//   }
// };

// /**
//  * Retrieve data from local storage
//  * @param {string} key - The key for retrieving data
//  * @returns {Promise<any>} - Returns the parsed data or null if not found
//  */
// export const getLocalStorage = async (key) => {
//   try {
//     const result = await AsyncStorage.getItem(key);
//     return result ? JSON.parse(result) : null;
//   } catch (error) {
//     console.error('Error retrieving from AsyncStorage:', error);
//     return null;
//   }
// };

// /**
//  * Remove a specific key from local storage
//  * @param {string} key - The key to remove
//  */
// export const removeLocalStorage = async (key) => {
//   try {
//     await AsyncStorage.removeItem(key);
//   } catch (error) {
//     console.error('Error removing from AsyncStorage:', error);
//   }
// };

// /**
//  * Clear all local storage (used for logout)
//  */
// export const clearLocalStorage = async () => {
//   try {
//     await AsyncStorage.clear();
//   } catch (error) {
//     console.error('Error clearing AsyncStorage:', error);
//   }
// };
