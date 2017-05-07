import React from 'react';
import { Rect } from 'react-konva';


const size = 15;


function calculateInitialPos(hw) {
  return (hw / 2) - size / 2;
}


class Ball extends React.Component {

  state = {
    ySpeed: 10,
    xSpeed: 10,
    xBounced: false,
    yBounced: false,
    stop: false,
  };

  constructor(props) {
    super(props);
    this._loop = this._loop.bind(this);
    this._restart = this._restart.bind(this);
  }

  componentWillMount() {
    const { windowHeight, windowWidth } = this.props;
    this.setState({
      x: calculateInitialPos(windowWidth),
      y: calculateInitialPos(windowHeight),
    });
  }

  componentDidMount() {
    this._loop();
  }

  render() {
    const { x, y } = this.state;
    return (
      <Rect
        width={size}
        height={size}
        fill="white"
        x={x}
        y={y} />
    );
  }

  _loop() {
    const { windowWidth, windowHeight } = this.props;
    const { x, y, xSpeed, ySpeed, xBounced, yBounced, stop } = this.state;

    // HORIZONTAL
    if (x >= windowWidth || x < -size) {
      this._stop();
    }

    if ((x < windowWidth / 2 && xSpeed < 0 && xBounced)
        || (x > windowWidth / 2 && xSpeed > 0 && xBounced)) {
      this.setState({
        xBounced: false,
      });
    }


    // VERTICAL
    if ((y + size >= windowHeight && ! yBounced)
        || (y <= 0 && ! yBounced)) {
      this.setState({
        ySpeed: -ySpeed,
        yBounced: true,
      });
    }

    if ((y < windowHeight / 2 && ySpeed < 0 && yBounced)
        || (y > windowHeight / 2 && ySpeed > 0 && yBounced)) {
      this.setState({
        yBounced: false,
      });
    }


    // MOVEMENT
    if (! stop && x && y) {
      this.setState({
        x: x + xSpeed,
        y: y + ySpeed,
      });
    }

    requestAnimationFrame(this._loop);
  }

  _stop() {
    const { windowWidth, windowHeight } = this.props;
    this.setState({
      x: calculateInitialPos(windowWidth),
      xSpeed: 10,
      xBounced: false,
      y: calculateInitialPos(windowHeight),
      ySpeed: 10,
      yBounced: false,
      stop: true,
    });
    setTimeout(this._restart, 2000);
  }

  _restart() {
    this.setState({
      stop: false,
    });
  }
}


export default Ball;
