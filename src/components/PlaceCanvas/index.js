import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Magnifier from '../Magnifier';
import './style.less';

class PlaceCanvas extends Component {
    canvasConfig = {
        height: 1000,
        width: 1000,

        // 放大缩小中心
        zoomPt: {
            x: 200,
            y: 300,
        }
    }
    state = {
        scale: 1,
        position: {
            x: 0,
            y: 0,
        }
    }
    drawPoint = (x, y, color) => {
        if (this.canvas.getContext) {
            const ctx = this.canvas.getContext('2d');

            ctx.fillStyle = color;
            ctx.fillRect(x, y, 1, 1);
        }
    }
    handleClick = (e) => {
        console.log(e.pageX / this.state.scale);
    }
    handleScale = (scale) => () => {
        this.setState({
            scale,
        })
    }
    handleCanvasMouseDown = (e) => {
        this.ifDnDrag = true;
        console.log(e.screenX);
        const { x, y } = this.state.position;
        this.lastMousePt = {
            screenX: e.screenX,
            screenY: e.screenY,
            x,
            y,
        };
        this.setState({

        })
    }
    handleCanvasMouseMove = (e) => {
        //
        this.magMouseMove(e);

        if (!this.ifDnDrag) return;
        const { screenX, screenY, x, y } = this.lastMousePt;
        console.log(x + e.screenX - screenX, y + e.screenY - screenY);
        this.setState({
            position: {
                x: x + e.screenX - screenX,
                y: y + e.screenY - screenY,
            }
        })

        // mag

    }
    handleCanvasMouseUp = (e) => {
        this.ifDnDrag = false;
        this.lastMousePt = {
            screenX: e.screenX,
            screenY: e.screenY
        };

    }
    componentDidMount() {
        const { height, width } = this.canvasConfig;
        this.canvas.setAttribute('width', `${width}`);
        this.canvas.setAttribute('height', `${height}`);
        this.drawPoint(4, 4, 'red');

    }
    render() {
        const { height, width } = this.canvasConfig;
        const { scale, position } = this.state;
        return (
            <div>
                <button onClick={this.handleScale(1)}>1</button>
                <button onClick={this.handleScale(2)}>2</button>
                <button onClick={this.handleScale(5)}>5</button>
                <button onClick={this.handleScale(10)}>10</button>
                <div
                    className="place-canvas-container"
                    style={{
                        position: 'relative',
                    }}
                >
                    <canvas
                        id="place-canvas"
                        className="place-canvas"
                        ref={(dom) => { this.canvas = dom; }}
                        style={{
                            width: `${width * scale}px`,
                            height: `${height * scale}px`,
                            position: 'absolute',
                            left: `${position.x}px`,
                            top: `${position.y}px`
                        }}
                        onClick={this.handleClick}
                        onMouseDown={this.handleCanvasMouseDown}
                        onMouseMove={this.handleCanvasMouseMove}
                        onMouseUp={this.handleCanvasMouseUp}
                    />
                </div>
                <Magnifier exportMethods={({ handleMouseMove }) => { this.magMouseMove = handleMouseMove }}/>
            </div>
        );
    }
}

PlaceCanvas.propTypes = {};
PlaceCanvas.defaultProps = {};

export default PlaceCanvas;
