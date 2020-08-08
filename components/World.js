import React, { PureComponent } from 'react';
import { asset, NativeModules } from 'react-360';
import { connect, setPokeballVisibility } from '../Store';
import Entity from 'Entity';
const { AudioModule } = NativeModules;

class BaseWorld extends PureComponent {
    componentDidMount() {
        setTimeout(() => {
            setPokeballVisibility(true);
        }, 5000);
        AudioModule.playEnvironmental({
            source: asset('pokemon-world-music.mp3'),
            volume: 0.4
        });
    }
    render() {
        return (
            <Entity
                source={{
                    obj: asset('world/model.obj'),
                    mtl: asset('world/materials.mtl')
                }}
                style={{
                    transform: [
                        { translate: [0, 2, 0] },
                        { scaleX: 5 },
                        { scaleY: 5 },
                        { scaleZ: 5 }
                    ]
                }}
            />
        );
    }
}
const World = connect(BaseWorld);
export default World;
