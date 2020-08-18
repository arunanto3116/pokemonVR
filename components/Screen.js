import React from 'react';
import { StyleSheet, Text, View } from 'react-360';
import AmbientLight from 'AmbientLight';
import PointLight from 'PointLight';

export default class Screen extends React.PureComponent {
    render() {
        return (
            <View style={styles.panel}>
                <AmbientLight intensity={1.0} color={'#ffffff'} />
                <PointLight intensity={1} />
                <View style={styles.greetingBox}>
                    <Text style={styles.greeting}>
                        Turn around and click on the pokeball.
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    panel: {
        // Fill the entire surface
        width: 800,
        height: 300,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    greetingBox: {
        padding: 20,
        backgroundColor: '#000000'
    },
    greeting: {
        fontSize: 30
    }
});
