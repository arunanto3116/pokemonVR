import React, { PureComponent } from 'react';
import { asset, Environment, NativeModules } from 'react-360';
import VideoModule from 'VideoModule';
import { connect, setPokeballVisibility } from '../Store';
const { AudioModule } = NativeModules;
import Entity from 'Entity';

class BaseWorld extends PureComponent {
    componentDidMount() {
        setTimeout(() => {
            setPokeballVisibility(true);
            //play video in-line on a surface
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

            // Since there is no support for video player in mobile browsers,
            // and to makesure atleast audio plays in mobile, I have done a small hack. :)
            // I have ripped the audio from video and we are playing it as an enviornmental audio
            // which will play in loop just like our audio.
            AudioModule.playEnvironmental({
                source: asset('pokemon-intro.mp3'),
                volume: 0.6
            });
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
