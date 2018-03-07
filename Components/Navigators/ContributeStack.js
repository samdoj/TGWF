import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import Contribute from '../../Screens/Contribute';
import Login from '../Login/Login';
import WebsiteView from '../../Screens/WebsiteView';
import {ImageBackground, View} from 'react-native';
import NewUser from "../NewUser/NewUser";

export default class ContributeStack extends Component<Props>
{

    render()
    {
        const Stacks = StackNavigator({
            Login: {screen: Login,      navigationOptions:
                    { header: null,

                    }},
            NewUser: {screen: NewUser, navigationOptions: {headerTitle: 'Return', headerStyle:{backgroundColor: 'transparent', fontSize:12},
                    headerTitleStyle: {width:100} }},
            Contribute: {screen: Contribute,
            }
        },
            {
                mode: 'card',
                cardStyle: { backgroundColor: 'transparent' },
                transitionConfig: () => ({
                    containerStyle: {
                        backgroundColor: 'transparent',
                    }
                }),

            });
        const stackNav = <Stacks sceneStyle={{flex:1, backgroundColor: 'blue'}}/>
        return (
            <ImageBackground
                style={{ flex: 1, zIndex: 1 }}
                source={require('../../assets/images/iceberg.jpg')}
            >
                {stackNav}
            </ImageBackground>


        )
    }

}