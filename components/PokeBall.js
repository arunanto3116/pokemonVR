import React, { PureComponent } from 'react';
import {
    StyleSheet,
    asset,
    Animated,
    VrButton,
    NativeModules
} from 'react-360';
const { AudioModule } = NativeModules;
import { connect, setPokemonVisibility } from '../Store';
import Entity from 'Entity';
const AnimatedEntity = Animated.createAnimatedComponent(Entity);

class BasePokeBall extends PureComponent {
    state = {
        rotation: new Animated.Value(0),
        open: { size: new Animated.Value(0.7), size1: 0.9, size2: 1.3 },
        close: { size: new Animated.Value(0.2), size1: 0.3, size2: 0.5 },
        pokeballState: 'close'
    };
    componentDidUpdate(prevProps, prevState) {
        if (
            !prevProps.PokeDesk.showPokeballs &&
            this.props.PokeDesk.showPokeballs
        ) {
            Animated.timing(this.state.rotation, {
                toValue: 1,
                duration: 1500
            }).start(({ finished }) => {
                this.startSizeAnim();
            });
        }
    }
    onPokeBallClick = () => {
        const pokeballState =
            this.state.pokeballState === 'close' ? 'open' : 'close';
        this.setState({ pokeballState });
        AudioModule.playOneShot({
            source: asset(`${pokeballState}-pokeball.mp3`),
            volume: 0.2
        });
        setPokemonVisibility(this.props.pokemon);
    };
    startSizeAnim = () => {
        const pokeballState = this.state.pokeballState;
        Animated.timing(this.state[pokeballState].size, {
            toValue: this.state[pokeballState].size1,
            friction: 2,
            duration: 1500
        }).start();
    };
    increaseSizeAnim = () => {
        const pokeballState = this.state.pokeballState;
        Animated.timing(this.state[pokeballState].size, {
            toValue: this.state[pokeballState].size2,
            duration: 300
        }).start();
    };
    decreaseSizeAnim = () => {
        const pokeballState = this.state.pokeballState;
        Animated.timing(this.state[pokeballState].size, {
            toValue: this.state[pokeballState].size1
        }).start();
    };
    render() {
        const { pokeballState } = this.state;
        const spin = this.state.rotation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', `${this.props[pokeballState].angle}deg`]
        });
        const folder = `pokeball/${pokeballState}/`;
        const { x, y, z } = this.props.position;
        const { showPokeballs } = this.props.PokeDesk;
        let itemStyle = showPokeballs ? styles.show : styles.hide;
        return (
            <VrButton
                onClick={() => this.onPokeBallClick()}
                onEnter={() => this.increaseSizeAnim()}
                onExit={() => this.decreaseSizeAnim()}
                style={itemStyle}
            >
                <AnimatedEntity
                    source={{
                        obj: asset(`${folder}model.obj`),
                        mtl: asset(`${folder}materials.mtl`)
                    }}
                    style={{
                        transform: [
                            { translate: [x, y, z] },
                            { scale: this.state[pokeballState].size },
                            { rotateY: spin }
                        ]
                    }}
                />
            </VrButton>
        );
    }
}
const styles = StyleSheet.create({
    show: {
        display: 'flex'
    },
    hide: {
        display: 'none'
    }
});
const PokeBall = connect(BasePokeBall);
export default PokeBall;
