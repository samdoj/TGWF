import { StyleSheet, Platform } from 'react-native';
const OS = Platform.OS;
export default StyleSheet.create(
    {
        errorText:
            {
                color: 'red',
                backgroundColor: 'transparent',
                fontSize: 20,
              },
        entryText:
            { flex: 1,
                fontSize: 20,
                backgroundColor: 'transparent',
              },
        mainContainer:
            { flex: 3,
                paddingVertical: 20,
                paddingHorizontal: 20,
                justifyContent: 'center',
                backgroundColor: 'transparent',
              },
        entryView:
            { height: 23,
                marginBottom: 10,
                flexDirection: 'row',
                backgroundColor: 'transparent',
              },
        entry:
            {
                flex: 2,
                alignSelf: 'stretch',
                minHeight: OS === 'android' ? 40 : 30,
                backgroundColor: 'white',
                paddingBottom: OS === 'android' ? 17 : 0,
                paddingTop: OS === 'android' ? -10 : 0,
            },
        noMoreTries:
            { paddingHorizontal: 20,
                opacity: 0,
                flex: 100,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: -1,
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0, },
        linkText:   //iOS specific styles
            { fontSize: 20,
                color: 'blue',
                textDecorationLine: 'underline',
                backgroundColor: 'transparent',
                alignContent: 'stretch', },
        linkContainer:
            { width: 100,
                height: 20,
                alignContent: 'stretch',
                backgroundColor: 'transparent',
              },

      }
);
