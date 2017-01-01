var React = require("react");
var GameBoard = require("GameBoard");
var GameBoardButtons = require("GameBoardButtons");

var GameOfLife =  React.createClass({
  getDefaultProps: function() {
    return {
      width: 45,
      height: 45
    };
  },
  getInitialState: function() {
    return {
      gameBoardArray: this.createInitialGameBoard(),
      intervalId: undefined,
      generationCounter: 0
    };
  },
  componentDidMount: function() {
    this.incrementGeneration();
  },
  incrementGeneration: function() {
    var intervalId = setInterval(this.nextGeneration, 100);
    this.setState({
      intervalId: intervalId
    });
  },
  nextGeneration: function() {
    var {gameBoardArray, generationCounter, intervalId} = this.state;
    var newGameBoardArray = [];

    for (var i = 0; i < gameBoardArray.length; i++) {
      newGameBoardArray.push([]);

      for (var j = 0; j < gameBoardArray[i].length; j++) {

        var top = i == 0 ? gameBoardArray.length - 1 : i - 1;
        var bottom = i == gameBoardArray.length - 1 ? 0 :  i + 1;
        var left = j == 0 ? gameBoardArray[i].length - 1 : j - 1;
        var right = j == gameBoardArray[i].length - 1 ? 0 : j + 1;

        var neighbors = [
          gameBoardArray[top][left],
          gameBoardArray[top][j],
          gameBoardArray[top][right],
          gameBoardArray[i][left],
          gameBoardArray[i][right],
          gameBoardArray[bottom][left],
          gameBoardArray[bottom][j],
          gameBoardArray[bottom][right]
        ];

        var aliveNeighbors = neighbors.filter(function(neighbor) {
          return neighbor == 1;
        });

        if (gameBoardArray[i][j]) {
          if (aliveNeighbors.length > 3 || aliveNeighbors.length < 2) {
            newGameBoardArray[i].push(0)
          } else {
            newGameBoardArray[i].push(1);
          }
        } else {
          if (aliveNeighbors.length === 3) {
            newGameBoardArray[i].push(1);
          } else {
            newGameBoardArray[i].push(0)
          }
        }

      }
    }

    this.setState({
      gameBoardArray: newGameBoardArray,
      generationCounter: ++generationCounter
    });

    if (this.checkIfGameBoardIsEmpty()) {
      clearInterval(intervalId);

      this.setState({
        generationCounter: 0
      });
    }

  },
  checkIfGameBoardIsEmpty: function() {
    var {gameBoardArray} = this.state;
    var counter = 0;

    for (var i = 0; i < gameBoardArray.length; i++) {
      for (var j = 0; j < gameBoardArray[i].length; j++) {
        if (gameBoardArray[i][j]) {
          counter++;
        }
      }
    }

    if (counter) {
      return false
    } else {
      return true;
    }
  },
  createInitialGameBoard: function() {
    var {width, height} = this.props;
    var gameBoardArray = [];

    for (var i = 0; i < height; i++) {
      gameBoardArray.push([]);

      for (var j = 0; j < width; j++) {
        var number = Math.round(Math.random());
        gameBoardArray[i].push(number);
      }
    }

    return gameBoardArray;
  },
  start: function() {
    this.incrementGeneration();
    console.log("start");
  },
  stop: function() {
    var {intervalId} = this.state;

    clearInterval(intervalId);
    console.log("stop");
  },
  clear: function() {
    var {gameBoardArray, intervalId} = this.state;
    var newGameBoardArray = [];

    clearInterval(intervalId);

    for (var i = 0; i < gameBoardArray.length; i++) {
      newGameBoardArray.push([]);

        for (var j = 0; j < gameBoardArray[i].length; j++) {
          newGameBoardArray[i].push(0);
        }
    }

    this.setState({
      gameBoardArray: newGameBoardArray,
      generationCounter: 0
    });
    console.log("clear");
  },
  render: function() {
    var {width, height} = this.props;
    var {gameBoardArray, intervalId, generationCounter} = this.state;

    return (
      <div>
        <h1>Game of life!</h1>
        <GameBoard width={width} height={height} gameBoardArray={gameBoardArray}/>
        <GameBoardButtons start={this.start} stop={this.stop} clear={this.clear} generationCounter={generationCounter}/>
      </div>
    );
  }
});

module.exports = GameOfLife;
