import React, { Component } from 'react';
import { Color } from 'src/styles/main'

import { View, StyleSheet, Text, TouchableOpacity, Animated, Easing } from 'react-native'

export default class myLoader extends Component {
    constructor() {
        super();

        this.state = {
            animation: new Animated.Value(0),
            isLoading: false,
            toVal: 100
        }
    }


    render() {

        const animatedStyle = {
            transform: [
                {
                    rotate: this.state.animation.interpolate({
                        inputRange: [0, 180],
                        outputRange: ['0deg', '360deg'],
                    })
                }
            ]
        }

        return (
            <Animated.View style={[styleThis.loader, animatedStyle, {}]}>
            </Animated.View>
        )
    }

    componentDidMount() {

        this.intervalId = setInterval(() => {

            this.setState({
                toVal: this.state.toVal == 180 ? 0 : 180
            })

            Animated.timing(this.state.animation, {
                toValue: this.state.toVal,
                duration: 1000,
                useNativeDriver: true,
            }).start()

        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }
}

const styleThis = StyleSheet.create({

    loader: {
        borderTopWidth: 10,
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 10,
        borderRadius: 50,
        borderTopColor: Color.amber300,
        borderLeftColor: Color.yellow300,
        borderRightColor: Color.deepOrange200,
        borderBottomColor: Color.deepOrange300,
        width: 50,
        height: 50,
    }

})