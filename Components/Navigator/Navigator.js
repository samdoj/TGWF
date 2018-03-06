import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import Contribute from '../../Screens/Contribute';
import Login from '../Login/Login';
import WebsiteView from '../../Screens/WebsiteView';
import {View} from 'react-native';



export default class Navigator extends Component<Props>
{

    render()
    {
        const Tabs = TabNavigator({
            Contribute: {screen: Login},
            Website: {screen: WebsiteView}
        });
        const tabNav = <Tabs style={{flex:1}}/>
        return (
            tabNav

           )
    }

}