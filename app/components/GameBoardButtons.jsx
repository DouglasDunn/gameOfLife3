var React = require("react");

var GameBoardButtons = React.createClass({
  start: function() {
    this.refs.start.style["pointer-events"] = "none";
    this.refs.stop.style["pointer-events"] = "auto";
    this.refs.start.style["background"] = "#ff6666";
    this.refs.stop.style["background"] = "buttonface";
    this.props.start();
  },
  stop: function() {
    this.refs.start.style["pointer-events"] = "auto";
    this.refs.stop.style["pointer-events"] = "none";
    this.refs.stop.style["background"] = "#ff6666";
    this.refs.start.style["background"] = "buttonface";
    this.props.stop();
  },
  clear: function() {
    this.refs.start.style["pointer-events"] = "auto";
    this.refs.stop.style["pointer-events"] = "none";
    this.refs.stop.style["background"] = "buttonface";
    this.refs.start.style["background"] = "buttonface";
    this.props.clear();
  },
  render: function() {
    var {generationCounter} = this.props;

    return (
      <div className="buttons">
        <button onClick={this.start} ref="start" id="start">Start</button>
        <button onClick={this.stop} ref="stop" id="stop">Stop</button>
        <button onClick={this.clear} ref="clear" id="clear">Clear</button>
        <p>Generation: {generationCounter}</p>
      </div>
    );
  }
});

module.exports = GameBoardButtons;
