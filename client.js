// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import { ReactInstance, Surface } from 'react-360-web';

function init(bundle, parent, options = {}) {
    const r360 = new ReactInstance(bundle, parent, {
        // Add custom options here
        fullScreen: true,
        ...options
    });

    r360.renderToSurface(
        r360.createRoot('LoadingScreen'),
        r360.getDefaultSurface()
    );

    const screenSurface = new Surface(800, 400, Surface.SurfaceShape.Flat);
    screenSurface.setAngle(-3.3 /* yaw angle */, 0 /* pitch angle */);

    //   Render your app content to the default cylinder surface
    r360.renderToSurface(r360.createRoot('Screen'), screenSurface);

    // Load the initial environment
    r360.compositor.setBackground(r360.getAssetURL('360_world.jpg'));

    r360.renderToLocation(
        r360.createRoot('PokeBall1', {
            position: {
                x: -1,
                y: 0,
                z: -2
            },
            open: { angle: 125 },
            close: { angle: 240 },
            pokemon: 'Pikachu'
        }),
        r360.getDefaultLocation()
    );

    r360.renderToLocation(
        r360.createRoot('PokeBall2', {
            position: {
                x: 0,
                y: 0,
                z: -2
            },
            open: { angle: 120 },
            close: { angle: 230 },
            pokemon: 'Cubone'
        }),
        r360.getDefaultLocation()
    );

    r360.renderToLocation(
        r360.createRoot('PokeBall3', {
            position: {
                x: 1,
                y: 0,
                z: -2
            },
            open: { angle: 70 },
            close: { angle: 190 },
            pokemon: 'Charmander'
        }),
        r360.getDefaultLocation()
    );

    r360.renderToLocation(
        r360.createRoot('PokeBall4', {
            position: {
                x: 2,
                y: 0,
                z: -2
            },
            open: { angle: 70 },
            close: { angle: 190 },
            pokemon: 'Haunter'
        }),
        r360.getDefaultLocation()
    );

    r360.renderToLocation(
        r360.createRoot('Pikachu', {
            name: 'Pikachu',
            translate: [-2, -1, -4],
            rotateY: 190
        }),
        r360.getDefaultLocation()
    );

    r360.renderToLocation(
        r360.createRoot('Cubone', {
            name: 'Cubone',
            translate: [0, -1, -4],
            rotateY: 160
        }),
        r360.getDefaultLocation()
    );

    r360.renderToLocation(
        r360.createRoot('Charmander', {
            name: 'Charmander',
            translate: [2, -1, -4],
            rotateY: 160
        }),
        r360.getDefaultLocation()
    );

    r360.renderToLocation(
        r360.createRoot('Haunter', {
            name: 'Haunter',
            translate: [1, 0.2, -1],
            rotateY: 120,
            rotateX: -30
        }),
        r360.getDefaultLocation()
    );

    // Creating a Video Player
    const player = r360.compositor.createVideoPlayer('myplayer');
    // Set the video to be played, and its format
    player.setSource(r360.getAssetURL('pokemon-intro.mp4'), '2D', 'mp4');
    player.setLoop(true);
    // Reason for muting the video over here is provided in components/World.js
    player.setMuted(true);

    r360.renderToLocation(r360.createRoot('World'), r360.getDefaultLocation());
}

window.React360 = { init };
