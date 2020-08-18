import React, { PureComponent } from 'react';
import { asset, Environment } from 'react-360';
import VideoModule from 'VideoModule';
import { connect, setPokeballVisibility } from '../Store';
import Entity from 'Entity';

class BaseWorld extends PureComponent {
    componentDidMount() {
        setTimeout(() => {
            setPokeballVisibility(true);
            //play in-line on a surface
            Environment.setScreen(
                'default' /* screen name */,
                'myplayer' /* player unique id */,
                'default' /* surface name */,
                0 /* x */,
                0 /* y */,
                800 /* width */,
                300 /* height */
            );
            VideoModule.resume('myplayer');
        }, 4000);
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
