import * as React from 'react';

/**
 * If you want to share data between multiple root components, you'll need a
 * global store like Redux. This is similar to building a web app where you
 * want to synchronize data between a sidebar and a main view - just extended
 * into three dimensions.
 * To simplify this sample, we implement a trivial Redux-like store that will
 * ensure all of our elements are synchronized.
 */
const PokeDesk = {
    showPokeballs: false,
    showPikachu: false,
    showCubone: false,
    showCharmander: false,
    showHaunter: false
};

const listeners = new Set();

function updateComponents() {
    for (const cb of listeners.values()) {
        cb();
    }
}

export function setPokemonVisibility(pokemon) {
    let key = `show${pokemon}`;
    PokeDesk[key] = !PokeDesk[key];
    updateComponents();
}

export function setPokeballVisibility(status) {
    PokeDesk['showPokeballs'] = status;
    updateComponents();
}

export function connect(Component) {
    return class Wrapper extends React.Component {
        state = {
            showPokeballs: PokeDesk.showPokeballs,
            showPikachu: PokeDesk.showPikachu,
            showCubone: PokeDesk.showCubone,
            showCharmander: PokeDesk.showCharmander,
            showHaunter: PokeDesk.showHaunter
        };

        _listener = () => {
            this.setState({
                showPokeballs: PokeDesk.showPokeballs,
                showPikachu: PokeDesk.showPikachu,
                showCubone: PokeDesk.showCubone,
                showCharmander: PokeDesk.showCharmander,
                showHaunter: PokeDesk.showHaunter
            });
        };

        componentDidMount() {
            listeners.add(this._listener);
        }

        componentWillUnmount() {
            listeners.delete(this._listener);
        }

        render() {
            return <Component {...this.props} PokeDesk={this.state} />;
        }
    };
}
