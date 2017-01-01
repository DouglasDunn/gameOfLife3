var React = require("react");

var GameBoardButtons = React.createClass({
  start: function() {
    this.refs.start.style["pointer-events"] = "none";
    this.refs.stop.style["pointer-events"] = "auto";
    this.props.start();
  },
  stop: function() {
    this.refs.start.style["pointer-events"] = "auto";
    this.refs.stop.style["pointer-events"] = "none";
    this.props.stop();
  },
  clear: function() {
    this.refs.start.style["pointer-events"] = "auto";
    this.refs.stop.style["pointer-events"] = "none";
    this.props.clear();
  },
  render: function() {
    var {generationCounter} = this.props;

    return (
      <div>
        <button onClick={this.start} ref="start" id="start">Start</button>
        <button onClick={this.stop} ref="stop">Stop</button>
        <button onClick={this.clear} ref="clear">Clear</button>
        <p>{generationCounter}</p>
      </div>
    );
  }
});

module.exports = GameBoardButtons;
