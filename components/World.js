import React, { PureComponent } from 'react';
import { asset, NativeModules } from 'react-360';
import Entity from 'Entity';
const { AudioModule } = NativeModules;

export default class World extends PureComponent {
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
