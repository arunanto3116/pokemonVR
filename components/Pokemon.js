import React, { PureComponent } from 'react';
import { asset, Animated, NativeModules, VrButton } from 'react-360';
const { AudioModule } = NativeModules;
import { connect } from '../Store';
import Entity from 'Entity';
const AnimatedEntity = Animated.createAnimatedComponent(Entity);

class BasePokemon extends PureComponent {
    state = { scale: new Animated.Value(0), visible: false };
    componentDidUpdate(prevProps, prevState) {
        if (
            !prevProps.PokeDesk[`show${this.props.name}`] &&
            this.props.PokeDesk[`show${this.props.name}`]
        ) {
            this.setState({ visible: true }, () => {
                this.showPokemon();
            });
        } else if (
            !this.props.PokeDesk[`show${this.props.name}`] &&
            this.state.scale._value === 1
        ) {
            this.hidePokemon();
        }
    }
    showPokemon = () => {
        Animated.timing(this.state.scale, {
            toValue: 1,
            duration: 500
        }).start(({ finished }) => {
            this.playPokemonSound();
        });
    };
    hidePokemon = () => {
        Animated.timing(this.state.scale, {
            toValue: 0,
            duration: 500
        }).start(({ finished }) => {
            this.setState({ visible: false });
        });
    };
    playPokemonSound = () => {
        AudioModule.playOneShot({
            source: asset(`${this.props.name.toLowerCase()}.mp3`),
            volume: 1
        });
    };
    render() {
        const transform = [
            { translate: this.props.translate },
            { scale: this.state.scale },
            { rotateY: this.props.rotateY }
        ];
        if (this.props.rotateX) {
            transform.push({ rotateX: this.props.rotateX });
        }
        return this.state.visible ? (
            <VrButton onEnter={() => this.playPokemonSound()}>
                <AnimatedEntity
                    source={{
                        obj: asset(
                            `${this.props.name.toLowerCase()}/model.obj`
                        ),
                        mtl: asset(
                            `${this.props.name.toLowerCase()}/materials.mtl`
                        )
                    }}
                    style={{ transform }}
                />
            </VrButton>
        ) : null;
    }
}
const Pokemon = connect(BasePokemon);
export default Pokemon;
