import React from 'react';
import { AppRegistry } from 'react-360';
import Screen from './components/Screen';
import Pokemon from './components/Pokemon';
import PokeBall from './components/PokeBall';
import World from './components/World';

AppRegistry.registerComponent('Screen', () => Screen);
AppRegistry.registerComponent('PokeBall1', () => PokeBall);
AppRegistry.registerComponent('PokeBall2', () => PokeBall);
AppRegistry.registerComponent('PokeBall3', () => PokeBall);
AppRegistry.registerComponent('PokeBall4', () => PokeBall);
AppRegistry.registerComponent('Pikachu', () => Pokemon);
AppRegistry.registerComponent('Cubone', () => Pokemon);
AppRegistry.registerComponent('Charmander', () => Pokemon);
AppRegistry.registerComponent('Haunter', () => Pokemon);
AppRegistry.registerComponent('World', () => World);
