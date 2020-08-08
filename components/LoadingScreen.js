import React from 'react';
import { StyleSheet, Text, View } from 'react-360';
import { connect } from '../Store';

class BaseLoadingScreen extends React.Component {
    render() {
        return !this.props.PokeDesk.showPokeballs ? (
            <View style={styles.panel}>
                <View style={styles.greetingBox}>
                    <Text style={styles.greeting}>Loading your world....</Text>
                </View>
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
    },
    greetingBox: {
        padding: 20,
        backgroundColor: '#000000',
        borderColor: '#639dda',
        borderWidth: 2
    },
    greeting: {
        fontSize: 30
    }
});

const LoadingScreen = connect(BaseLoadingScreen);
export default LoadingScreen;
