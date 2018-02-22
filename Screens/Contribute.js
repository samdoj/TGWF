import React, { Component } from 'react';
import { View, Button, Text, TextInput, ScrollView, Platform, WebView } from 'react-native';
import styles from '../AppStyles/Styles';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Contribute extends Component {
  onMessage(event) {
    console.dir(event);
    alert(event.nativeEvent.data);
  }

  bridge(data) {
    alert(data);
  }

  doSubmit() {
    this.myWebView.postMessage('Hi!');
    alert('Your article was submitted successfully');

    // return;
  }

  constructor(props) {
    super(props);
    this.doSubmit = this.doSubmit.bind(this);
  }

  render() {
    const injectedScript = () => {
        window.postMessage(document.body.innerHTML);
        window.postMessage = window.originalPostMessage || window.postMessage;
      };

    if (global.inMemory === undefined) {
      global.inMemory = true;
      alert('* Disclaimer:  We neither request nor encourage you to endanger your life, ' +
          'body or property to contribute to us.  Always ensure your safety above all else, and comply' +
          ' with any and all instructions from law enforcement or other emergency personel.\n');
    }

    global.inMemory = true;
    console.log('Contribuet component ostensibly loaded');
    return (

      <View style={styles.mainContainer}>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ height: 20 }} />
          <View style={styles.entryView}>
            <Text style={styles.entryText}>
                            Title:
            </Text>
            <TextInput style={styles.entry} />
          </View>
          <View>
            <Text style={{ fontSize: 20, backgroundColor: 'transparent' }}>
                            Article:
            </Text>
            <View>
              <ScrollView
                ref="ScrollView"
                style={{
      flex: 1,
      minHeight: 200,
      maxHeight: 250,
      minWidth: 100,
      marginVertical: 10,
    }}
              >
                <WebView
                  style={
                                        {
      flex: 1,
      minHeight: 200,
      maxHeight: 250,
      minWidth: 100,
      marginVertical: 10,
    }}
                  source={{ uri: 'http://www.theglobalwarmingfoundation.org/rninterface.html' }}
                  injectedJavaScript={`(${String(injectedScript)})()`}
                  javascriptEnabled={true}
                  ref={(webview) => { this.myWebView = webview; }}

                  onMessage={this.onMessage.bind(this)}
                />
              </ScrollView>

            </View>
            <Text style={{
      fontSize: 18,
      marginBottom: 5,
      color: 'black',
    }}
            >
                            * We reserve the right to edit any content for brevity or clarity.
            </Text>
            <View style={
                            {
      marginVertical: 10,
      flexDirection: 'row',
      justifyContent: 'center',
    }}
            >
              <View style={{ marginHorizontal: 5 }}>
                <Icon.Button
                  name="camera"
                  backgroundColor="#0000ffaf"
                  onPress={() => {}}

                  iconStyle={{
      opacity: 1,
      zIndex: -91,
    }}
                  size={30}
                  style={{
      opacity: 1,
      backgroundColor: 0x00000000,
      zIndex: 1,
      justifyContent: 'center',
      padding: 8,
      marginRight: -10,
      flexDirection: 'column',
      right: 0,
    }}
                />
              </View>

              <View style={{ marginHorizontal: 5 }}>
                <Icon.Button
                  name="video-camera"
                  backgroundColor="#0000ffaf"
                  onPress={() => {
                                                alert('Pressed Video!');
                                                // TODO: Add media capture screen.
                                              }}

                  iconStyle={{
      opacity: 1,
      zIndex: -91,
    }}
                  size={30}
                  style={{
      opacity: 1,
      backgroundColor: 0x00000000,
      zIndex: 1,
      justifyContent: 'center',
      padding: 8,
      marginRight: -10,
      flexDirection: 'column',
      right: 0,
    }}
                />
              </View>
            </View>
            <Button
              title="Submit"
              color={Platform.OS === 'android' ? 0x0000ffaf : 'blue'}
              onPress={this.doSubmit}
            />
          </View>

          <View />
        </ScrollView>
      </View>

    );
  }
}
