import React, { Component } from 'react';
import { WebView } from 'react-native';

class WebsiteView extends Component
{
  render()
  {
    return (
  <WebView
  ref = "WebView"
  source = {{ uri: 'http://www.tgwf.org' }}
  />);
  }

}export default  WebsiteView;
