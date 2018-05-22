import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PlaceCanvas from './components/PlaceCanvas';

class App extends Component {
    render() {
        return (
            <div>
                <PlaceCanvas />
            </div>
        );
    }
}

App.propTypes = {};
App.defaultProps = {};

export default App;
