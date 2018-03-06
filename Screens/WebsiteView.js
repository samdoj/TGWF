import React, { Component } from 'react';
import  { WebView, Platform }  from 'react-native';
import AndroidView from 'react-native-custom-android-webview';

const WebViewComponent = Platform.OS === 'android' ? AndroidView : WebView;

class WebsiteView extends Component
{
  constructor(props)
  {
    super(props);
    this.state =
        { uri: props.lostPassword ?
            'http://www.theglobalwarmingfoundation.org/wp-login.php?action=lostpassword'
            : 'http://www.theglobalwarmingfoundation.org', };

  }

  render()
  {

    return (
        <WebViewComponent

ref = "WebView"
source = {{ uri: this.state.uri }}
  scalesPageToFit = {Platform.OS === 'ios' || true}
javascriptEnabled = {true}
initialScale="10%"
style={{ width: '100%', height: '100%' }}
/>
    );
  }

}
export default  WebsiteView;
