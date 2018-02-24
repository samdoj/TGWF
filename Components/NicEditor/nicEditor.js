import React, { Component } from 'react';
import { WebView, Platform, AppState } from 'react-native';

export default class  NicEditor extends Component {

  postMessage(message)
  {
    this.myWebView.postMessage(message);
  }

  onMessage(event) {
    const { data } = event.nativeEvent;
    console.log(data);
    global.editorText = data;
    this.setState({ message: data });
  }

  componentDidMount()
  {
    AppState.addEventListener('change', (nextAppState)=>
    {
        console.log(nextAppState);
        if (nextAppState === 'active') {
          console.log(global.editorText);
        } else {
          this.postMessage('dump');
          console.log(global.editorText);
        }
      });
  }

  restoreText()
  {
    if (global.editorText)
        this.myWebView.injectJavaScript(`nicEditors.findEditor( "editor" ).setContent('${global.editorText}');`);
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

    injectedScript = `(${String(injectedScript)})();`;
    if (Platform.OS === 'ios')
    {
      injectedScript = "OS = 'ios;'";
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

    onLoadEnd={this.restoreText.bind(this)}

    onMessage={this.onMessage.bind(this)}
    />);
  }
}
