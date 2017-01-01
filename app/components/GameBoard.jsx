var React = require("react");

var GameBoard = React.createClass({
  createColumns: function(i) {
    var {width, gameBoardArray} = this.props;
    var columns = [];

    for (var j = 0; j < width; j++) {
      if (gameBoardArray[i][j]) {
        columns.push(<div className="tile alive"></div>);
      } else {
        columns.push(<div className="tile"></div>);
      }
    }

    return columns;
  },
  createRows: function() {
    var {height} = this.props;
    var rows = [];

    for (var i = 0; i < height; i++) {
      rows.push(<div className="row">{this.createColumns(i)}</div>);
    }

    return rows;
  },
  render: function() {
    var gameBoard = this.createRows();

    return (
      <div className="gameBoard">
        {gameBoard}
      </div>
    );
  }
});

module.exports = GameBoard;
