import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import WebsiteView from '../../Screens/WebsiteView';
import ContributeStack from "./ContributeStack";



export default class RootNavigator extends Component<Props>
{

    render()
    {
        const Tabs = TabNavigator({
            Contribute: {screen: ContributeStack},
            Website: {screen: WebsiteView}
        });
        const tabNav = <Tabs style={{flex:1}}/>
        return (
            tabNav

           )
    }

}