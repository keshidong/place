import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './style.less';

class Magnifier extends Component {
    constructor(props) {
        super(props);
        props.exportMethods({
            handleMouseMove: this.handleMouseMove,
        });
    }
    state = {
        x: 0,
        y: 0,
    }
    handleMouseMove = (e) => {
        const target = e.target;

        this.setState({
            x: e.pageX,
            y: e.pageY,
        })

        const x = e.pageX - target.offsetLeft;
        const y = e.pageY - target.offsetTop;

        console.log(Math.floor(x / 10), Math.floor(y / 10))
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.canvasContext.drawImage(e.target, -5 + Math.floor(x / 10), -5 + Math.floor(y / 10), 10, 10, 1, 1, 10, 10)
    }
    componentDidMount() {
        this.canvas.setAttribute('width', '10');
        this.canvas.setAttribute('height', '10');
        this.canvasContext = this.canvas.getContext('2d');
    }
    render() {

        return (
            <div
                className="magnifier-container"
                style={{
                    position: 'fixed',
                    left: `${this.state.x}px`,
                    top: `${this.state.y}px`,
                }}
            >
                <canvas
                    className="magnifier-canvas"
                    ref={(dom) => { this.canvas = dom; }}/>
            </div>
        );
    }
}

Magnifier.propTypes = {};
Magnifier.defaultProps = {};

export default Magnifier;
