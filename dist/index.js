'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RadialProgress = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
}

var RadialProgress = exports.RadialProgress = function (_React$Component) {
    _inherits(RadialProgress, _React$Component);

    function RadialProgress(props) {
        _classCallCheck(this, RadialProgress);

        var _this = _possibleConstructorReturn(this, (RadialProgress.__proto__ || Object.getPrototypeOf(RadialProgress)).call(this, props));

        _this.generatePath = _this.generatePath.bind(_this);
        _this.state = { value: props.value || 0 };
        return _this;
    }

    _createClass(RadialProgress, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.props.animated) clearInterval(this.interval);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(_ref) {
            var _ref$value = _ref.value;
            var value = _ref$value === undefined ? 0 : _ref$value;

            this.setState({ value: value });
        }
    }, {
        key: 'generatePath',
        value: function generatePath(degrees) {
            var radius = this.props.radius;
            var radians = degrees * Math.PI / 180;
            var x = Math.sin(radians) * radius;
            var y = Math.cos(radians) * -radius;
            var halfEdgeSize = this.props.edgeSize / 2;
            x += halfEdgeSize;
            y += halfEdgeSize;
            var largeArcSweepFlag = degrees > 180 ? 1 : 0;
            var startX = halfEdgeSize;
            var startY = halfEdgeSize - radius;
            return 'M' + startX + ',' + startY + ' A' + radius + ',' + radius + ' 0 ' + largeArcSweepFlag + ' 1 ' + x + ',' + y + ' ';
        }
    }, {
        key: 'render',
        value: function render() {
            var center = this.props.edgeSize / 2;
            var radius = this.props.radius;
            var degrees = void 0,
                text = '';
            if (this.props.unit === 'percent') {
                var percent = clamp(this.state.value, 0, 100);
                degrees = percent / 100 * 360;
                degrees = clamp(degrees, 0, 359.9);
                text = this.props.formatText(percent);
            } else {
                degrees = this.state.value;
                degrees = clamp(degrees, 0, 359.9);
                text = this.props.formatText(degrees);
            }

            var pathDescription = this.generatePath(degrees);

            return _react2.default.createElement(
                'svg',
                { height: this.props.edgeSize, width: this.props.edgeSize },
                _react2.default.createElement('circle', { cx: center, cy: center, r: radius,
                    stroke: this.props.circleStroke,
                    strokeWidth: this.props.circleStrokeWidth,
                    fill: this.props.circleFill }),
                _react2.default.createElement('path', { d: pathDescription,
                    fill: 'transparent',
                    stroke: this.props.progressStroke,
                    strokeWidth: this.props.circleStrokeWidth }),
                this.props.displayText && _react2.default.createElement(
                    'text',
                    { x: center, y: this.props.forcedTextY || center, textAnchor: 'middle' },
                    text
                )
            );
        }
    }]);

    return RadialProgress;
}(_react2.default.Component);

RadialProgress.defaultProps = {
    edgeSize: 100,
    radius: 45,
    circleStrokeWidth: 4,
    circleStroke: '#D8D8D8',
    circleFill: 'transparent',
    progressStroke: 'black',
    unit: 'degrees',
    displayText: true,
    formatText: function formatText(value) {
        return value;
    },
    forcedTextY: 0
};

RadialProgress.propTypes = {
    edgeSize: _react2.default.PropTypes.number.isRequired,
    radius: _react2.default.PropTypes.number.isRequired,
    circleStrokeWidth: _react2.default.PropTypes.number.isRequired,
    circleStroke: _react2.default.PropTypes.string.isRequired,
    circleFill: _react2.default.PropTypes.string.isRequired,
    progressStroke: _react2.default.PropTypes.string.isRequired,
    value: _react2.default.PropTypes.number.isRequired,
    unit: _react2.default.PropTypes.oneOf(['degrees', 'percent']).isRequired,
    displayText: _react2.default.PropTypes.bool.isRequired,
    formatText: _react2.default.PropTypes.func,
    forcedTextY: _react2.default.PropTypes.number.isRequired
};

exports.default = RadialProgress;
