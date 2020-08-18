import React from 'react';
import { StyleSheet, View, Image, asset, Animated, Text } from 'react-360';
import { connect } from '../Store';
const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedText = Animated.createAnimatedComponent(Text);
class BaseLoadingScreen extends React.Component {
    state = {
        opacity: new Animated.Value(0),
        textOpacity: new Animated.Value(1)
    };
    componentDidMount() {
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 3000
        }).start();
        Animated.timing(this.state.textOpacity, {
            toValue: 0,
            duration: 3000
        }).start();
    }
    render() {
        return !this.props.PokeDesk.showPokeballs ? (
            <View style={styles.panel}>
                <AnimatedImage
                    style={{
                        height: '100',
                        width: '100',
                        opacity: this.state.opacity
                    }}
                    source={asset('pokemon-wall.jpg')}
                ></AnimatedImage>
                <AnimatedText
                    style={{
                        position: 'absolute',
                        fontSize: 50,
                        fontWeight: 'bold',
                        opacity: this.state.textOpacity
                    }}
                >
                    Loading your world....
                </AnimatedText>
            </View>
        ) : null;
    }
}

const styles = StyleSheet.create({
    panel: {
        // Fill the entire surface
        width: 1000,
        height: 600,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const LoadingScreen = connect(BaseLoadingScreen);
export default LoadingScreen;
