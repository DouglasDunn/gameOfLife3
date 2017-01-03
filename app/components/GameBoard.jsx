var React = require("react");

var GameBoard = React.createClass({
  tileClicked: function(e) {

    var {gameBoardArray} = this.props;
    var tileId = e.target.id;
    this.props.onTileClicked(tileId);
  },
  createColumns: function(i, keyCounter) {
    var {width, gameBoardArray} = this.props;
    var columns = [];

    for (var j = 0; j < width; j++) {
      if (gameBoardArray[i][j]) {
        columns.push(<div id={keyCounter.toString()} onClick={this.tileClicked} className="tile alive"></div>);
      } else {
        columns.push(<div id={keyCounter.toString()} onClick={this.tileClicked} className="tile"></div>);
      }

      keyCounter++;
    }

    return columns;
  },
  createRows: function() {
    var {height} = this.props;
    var rows = [];
    var keyCounter = 0;

    for (var i = 0; i < height; i++) {
      keyCounter = i * height;

      rows.push(<div className="row">{this.createColumns(i, keyCounter)}</div>);
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
