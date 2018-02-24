import { StyleSheet, Platform } from 'react-native';

const OS = Platform.OS;
export default StyleSheet.create({

  webViewStyle:
      { flex: 1,
          minHeight: 200,
          maxHeight: 250,
          minWidth: 100,
          marginVertical: 10,
      }

});
