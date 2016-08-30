import React from 'react';

function clamp (n, min, max) {
    return Math.max(min, Math.min(max, n));
}

export class RadialProgress extends React.Component {
    constructor(props) {
        super(props);
        this.generatePath = this.generatePath.bind(this);
        this.state = {value: props.value || 0};
    }

    componentWillUnmount() {
        if (this.props.animated) clearInterval(this.interval);
    }

    componentWillReceiveProps({ value = 0 }) {
        this.setState({ value });
    }

    generatePath(degrees) {
        const radius = this.props.radius;
        const radians = (degrees * Math.PI / 180);
        var x = Math.sin(radians) * radius;
        var y = Math.cos(radians) * -radius;
        const halfEdgeSize = this.props.edgeSize/2;
        x += halfEdgeSize;
        y += halfEdgeSize;
        const largeArcSweepFlag = degrees > 180 ? 1 : 0;
        const startX = halfEdgeSize;
        const startY = halfEdgeSize - radius;
        return `M${startX},${startY} A${radius},${radius} 0 ${largeArcSweepFlag} 1 ${x},${y} `;
    }

    render() {
        const center = this.props.edgeSize / 2;
        const radius = this.props.radius;
        let degrees, text = '';
        if (this.props.unit === 'percent') {
            let percent = clamp(this.state.value, 0, 100);
            degrees = percent / 100  * 360;
            degrees = clamp(degrees, 0, 359.9);
            text = this.props.formatText(percent)
        } else {
            degrees = this.state.value;
            degrees = clamp(degrees, 0, 359.9);
            text = this.props.formatText(degrees)
        }

        const pathDescription = this.generatePath(degrees);

        return (
            <svg height={this.props.edgeSize} width={this.props.edgeSize}>
                <circle cx={center} cy={center} r={radius}
                        stroke={this.props.circleStroke}
                        strokeWidth={this.props.circleStrokeWidth}
                        fill={this.props.circleFill}/>
                <path d={pathDescription}
                      fill="transparent"
                      stroke={this.props.progressStroke}
                      strokeWidth={this.props.circleStrokeWidth}/>
                {
                    this.props.displayText &&
                    <text x={center} y={this.props.forcedTextY || center} textAnchor="middle">{text}</text>
                }
            </svg>
        );
    }
}

RadialProgress.defaultProps = {
    edgeSize: 100,
    radius: 45,
    circleStrokeWidth: 4,
    circleStroke: '#D8D8D8',
    circleFill: 'transparent',
    progressStroke: 'black',
    unit: 'degrees',
    displayText: true,
    formatText: (value) => value,
    forcedTextY: 0,
};

RadialProgress.propTypes = {
    edgeSize: React.PropTypes.number.isRequired,
    radius: React.PropTypes.number.isRequired,
    circleStrokeWidth: React.PropTypes.number.isRequired,
    circleStroke: React.PropTypes.string.isRequired,
    circleFill: React.PropTypes.string.isRequired,
    progressStroke: React.PropTypes.string.isRequired,
    value: React.PropTypes.number.isRequired,
    unit: React.PropTypes.oneOf(['degrees', 'percent']).isRequired,
    displayText: React.PropTypes.bool.isRequired,
    formatText: React.PropTypes.func,
    forcedTextY: React.PropTypes.number.isRequired,
};

export default RadialProgress;
