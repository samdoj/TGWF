import React, { Component } from 'react';
import { WebView } from 'react-native';

class WebsiteView extends Component
{
  constructor(props)
  {
    super(props);
    this.state =
        { uri: props.lostPassword ?
            'http://www.theglobalwarmingfoundation.org/wp-login.php?action=lostpassword'
            : 'http://www.tgwf.org', };

  }

  render()
  {

    return (
<WebView
ref = "WebView"
source = {{ uri: this.state.uri } }

/>);
  }

}
export default  WebsiteView;
