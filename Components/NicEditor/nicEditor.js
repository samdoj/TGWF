import React, { Component } from 'react';
import { WebView, Platform } from 'react-native';

export default class  NicEditor extends Component {

  postMessage(message)
  {
    this.myWebView.postMessage(message);
  }

  onMessage(event) {
    //console.log(`WV_DATA: ${JSON.stringify(event)}`);
    console.log(event.nativeEvent.data);
    //alert(event.nativeEvent.data);
    this.setState({ message: event.nativeEvent.data });
  }

  constructor(props)
  {
    super(props);
    this.state = ({ message: null });
  }

  render() {
    let injectedScript = () => {
        window.postMessage(document.body.innerHTML);
        window.postMessage = window.originalPostMessage || window.postMessage;
      };

    injectedScript = `(${String(injectedScript)})()`;
    if (Platform.OS === 'ios')
    {
      injectedScript = "OS = 'ios'";
    }

    return (
    <WebView
    style={
        {
            flex: 1,
            minHeight: 200,
            maxHeight: 250,
            minWidth: 100,
            marginVertical: 10,
          }}
    source={this.props.source}
    injectedJavaScript={injectedScript}
    ignoreSslError={true}
    javascriptEnabled={true}
    ref={(webview) => {
        this.myWebView = webview;
      }}

    onMessage={this.onMessage.bind(this)}
    />);
  }
}
