import React, { Component } from 'react';
import { WebView } from 'react-native';

export default class  NicEditor extends Component {

  postMessage(message)
  {
    this.myWebView.postMessage(message);
  }

  onMessage(event) {
    console.dir(event);
    //alert(event.nativeEvent.data);
    this.setState({ message: event.data });
  }

  constructor(props)
  {
    super(props);
    this.state = ({ message: null });
  }

  render() {
    const injectedScript = () => {
        window.postMessage(document.body.innerHTML);
        window.postMessage = window.originalPostMessage || window.postMessage;
      };

    return(
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
    injectedJavaScript={`(${String(injectedScript)})()`}
    ignoreSslError={true}
    javascriptEnabled={true}
    ref={(webview) => {
        this.myWebView = webview;
      }}

    onMessage={this.onMessage.bind(this)}
    />);
  }
}
