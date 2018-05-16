import React, {Component} from 'react';
import PropTypes from 'prop-types';

class App extends Component {
    draw = () => {
        if (this.canvas.getContext) {
            const ctx = this.canvas.getContext('2d');

            ctx.fillStyle = "red";
            ctx.fillRect(1,1,2,2);
        }
    }
    componentDidMount() {
        this.draw();
    }
    render() {
        return (
            <div style={{
                height: '600px',
                width: '600px',
                overflow: 'hidden',
            }}>
                <canvas
                    ref={(dom) => { this.canvas = dom; }}
                    style={{
                        width: '10000px',
                        height: '10000px',
                    }}
                >
                </canvas>
            </div>
            
        );
    }
}

App.propTypes = {};
App.defaultProps = {};

export default App;
