/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/board.js":
/*!*********************!*\
  !*** ./js/board.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Snake = __webpack_require__(/*! ./snake.js */ \"./js/snake.js\");\n\n\nclass Board {\n\n  constructor() {\n    this.snake = new Snake(this);\n    this.apple = this.setApple();\n  }\n\n  setApple() {\n    let row = Math.floor(Math.random() * Board.GRID_HEIGHT);\n    let col = Math.floor(Math.random() * Board.GRID_WIDTH);\n\n    while (this.includedIn(this.snake, [row, col])) {\n      row = Math.floor(Math.random() * Board.GRID_HEIGHT);\n      col = Math.floor(Math.random() * Board.GRID_WIDTH);\n    }\n\n    return [row, col];\n  }\n\n  includedIn(arr, pos) {\n    for (let i = 0; i < arr.length; i++) {\n      if (arr[i][0] === pos[0] && arr[i][1] === pos[1]) {\n        return true;\n      }\n    }\n    return false;\n  }\n\n  isValid(pos) {\n    if (pos[0] < 0 || pos[0] > Board.GRID_HEIGHT - 1) {\n      return false;\n    } else if (pos[1] < 0 || pos[1] > Board.GRID_WIDTH - 1) {\n      return false;\n    } else if (this.includedIn(this.snake.segments, pos)) {\n      return false;\n    }\n    return true;\n  }\n\n}\n\nBoard.GRID_HEIGHT = 20;\nBoard.GRID_WIDTH = 20;\nmodule.exports = Board;\n\n\n//# sourceURL=webpack://javascript-snake/./js/board.js?");

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const SnakeBoard = __webpack_require__(/*! ./board.js */ \"./js/board.js\");\nconst SnakeView = __webpack_require__(/*! ./snake-view.js */ \"./js/snake-view.js\");\n\n$( () => {\n  const rootEl = $('.board');\n  const game = new SnakeBoard();\n  new SnakeView(game, rootEl);\n});\n\n\n//# sourceURL=webpack://javascript-snake/./js/main.js?");

/***/ }),

/***/ "./js/snake-view.js":
/*!**************************!*\
  !*** ./js/snake-view.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Board = __webpack_require__(/*! ./board.js */ \"./js/board.js\");\n\nclass View {\n\n  constructor (board, $el) {\n    this.board = board;\n    this.$el = $el;\n    this.level = null;\n    this.paused = \"false\";\n\n    this.bindEvents();\n    this.selectLevel();\n  }\n\n  bindEvents() {\n    let snake = this.board.snake;\n    let thisView = this;\n    key('space', function(){\n      if (thisView.paused === \"true\") {\n        $('h2').remove();\n        $('.buttons2').remove();\n        thisView.paused = \"false\";\n      } else if(thisView.paused === \"false\"){\n        let $body = $('body');\n        let $paused = $(`<h2>PAUSED</h2>`);\n        let $reset = $(`<section class=\"buttons2\"><button class=\"impossible\">Reset Game</button></section>`);\n\n        $body.append($paused);\n        $body.append($reset);\n        $(\".impossible\").click((event) => {\n          thisView.paused = null;\n          $('.board').children().remove();\n          $('h2').remove();\n          $('.buttons2').remove();\n          const rootEl = $('.board');\n          const game = new Board();\n          new View(game, rootEl);\n        });\n\n        thisView.paused = \"true\";\n      }\n    });\n\n\n    key('w', function(){\n      if (snake.direction !== 'S') {\n        snake.direction = 'N';\n      }\n    });\n    key('a', function(){\n      if (snake.direction !== 'E') {\n        snake.direction = 'W';\n      }\n    });\n    key('s', function(){\n      if (snake.direction !== 'N') {\n        snake.direction = 'S';\n      }\n    });\n    key('d', function(){\n      if (snake.direction !== 'W') {\n        snake.direction = 'E';\n      }\n    });\n\n    key('up', function(){\n      if (snake.direction !== 'S') {\n        snake.direction = 'N';\n      }\n    });\n    key('left', function(){\n      if (snake.direction !== 'E') {\n        snake.direction = 'W';\n      }\n    });\n    key('down', function(){\n      if (snake.direction !== 'N') {\n        snake.direction = 'S';\n      }\n    });\n    key('right', function(){\n      if (snake.direction !== 'W') {\n        snake.direction = 'E';\n      }\n    });\n  }\n\n  makeMove($tower) {\n    this.renderBoard();\n\n    let loop = setInterval(() => {\n      if (this.paused === \"false\") {\n        if (this.board.snake.move()) {\n          this.renderBoard();\n        } else {\n          let $body = $('body');\n          let $lost = $(`<h2>Game Over</h2><h2>Snake Length: ${this.board.snake.segments.length}</h2>`);\n          let $newGame = $(`<section class=\"buttons2\"><button class=\"new\">New Game</button></section>`);\n          $body.append($lost);\n          $body.append($newGame);\n\n          $(\".new\").click((event) => {\n            $('.board').children().remove();\n            $('h2').remove();\n            $('.buttons2').remove();\n            const rootEl = $('.board');\n            const game = new Board();\n            new View(game, rootEl);\n          });\n\n          clearInterval(loop);\n        }\n      }\n    }, this.level);\n  }\n\n  selectLevel() {\n    let $buttons = $('.buttons');\n    let $easyButton = $(`<button class=\"easy\">Easy</button>`);\n    let $mediumButton = $(`<button class=\"medium\">Medium</button>`);\n    let $hardButton = $(`<button class=\"hard\">Hard</button>`);\n    let $impossibleButton = $(`<button class=\"impossible\">Impossible</button>`);\n    let $rules = $(`<p class=\"rules\">Move the snake with WASD or Arrow keys. Press SPACE to pause. Eat the apple, but watch for the walls... and yourself!</p>`);\n\n    $buttons.append($easyButton);\n    $buttons.append($mediumButton);\n    $buttons.append($hardButton);\n    $buttons.append($impossibleButton);\n    $buttons.append($rules);\n\n    let thisView = this;\n\n    let setLevel = function (level) {\n      thisView.level = level;\n      $(\"button\").remove();\n      $(\"p\").remove();\n      thisView.makeMove();\n    };\n\n    $(\".easy\").click((event) => {\n      setLevel(250);\n    });\n\n    $(\".medium\").click((event) => {\n      setLevel(100);\n    });\n\n    $(\".hard\").click((event) => {\n      setLevel(50);\n    });\n\n    $(\".impossible\").click((event) => {\n      setLevel(10);\n    });\n\n  }\n\n  renderBoard() {\n    let $ul = $(\"ul\");\n    $ul.remove();\n\n    let rows = Board.GRID_HEIGHT;\n    let cols = Board.GRID_WIDTH;\n    let $board = $('.board');\n    for (var i = 0; i < rows; i++) {\n      $board.append($('<ul></ul>'));\n    }\n    $('ul').each( (idx, row) => {\n      for (var j = 0; j < cols; j++) {\n        $(row).append($('<li></li>'));\n      }\n    });\n\n    this.setSnake(this.board.snake.segments);\n    this.setApple();\n  }\n\n  setSnake(arr) {\n    let $uls = $('ul');\n    arr.forEach((pos) => {\n      let $ul = $($uls[pos[0]]);\n      let listItems = $ul.children();\n      let $li = $(listItems[pos[1]]);\n      $li.addClass(\"snake\");\n    });\n  }\n  setApple() {\n    let $uls = $('ul');\n    let arr = [this.board.apple];\n    arr.forEach((pos) => {\n      let $ul = $($uls[pos[0]]);\n      let listItems = $ul.children();\n      let $li = $(listItems[pos[1]]);\n      $li.addClass(\"apple\");\n    });\n  }\n\n}\nmodule.exports = View;\n\n\n//# sourceURL=webpack://javascript-snake/./js/snake-view.js?");

/***/ }),

/***/ "./js/snake.js":
/*!*********************!*\
  !*** ./js/snake.js ***!
  \*********************/
/***/ ((module) => {

eval("\n\nclass Snake {\n\n  constructor(board) {\n    this.board = board;\n    this.segments = [[10, 10]];\n    this.direction = \"N\";\n    this.growth = 0;\n  }\n\n  nextCoord() {\n    let currentHead = this.segments[0];\n    if (this.direction === \"N\") {\n      return ([currentHead[0] - 1, currentHead[1]]);\n    }\n    else if (this.direction === \"E\") {\n      return ([currentHead[0], currentHead[1] + 1]);\n    }\n    else if (this.direction === \"S\") {\n      return ([currentHead[0] + 1, currentHead[1]]);\n    }\n    else if (this.direction === \"W\") {\n      return ([currentHead[0], currentHead[1] - 1]);\n    }\n  }\n\n  move() {\n    let nextMove = this.nextCoord();\n    if (this.board.isValid(nextMove)) {\n      this.segments.unshift(this.nextCoord());\n      this.checkEating();\n\n      if (this.growth === 0) {\n        this.segments.pop();\n      } else {\n        this.growth -= 1;\n      }\n\n      return true;\n    }\n    return false;\n  }\n\n  checkEating() {\n    let apple = this.board.apple;\n    let head = this.segments[0];\n    if (head[0] === apple[0] && head[1] === apple[1]) {\n      this.board.apple = this.board.setApple();\n      this.growth += Snake.GROWTH_RATE;\n    }\n  }\n}\n\nSnake.GROWTH_RATE = 3;\n\nmodule.exports = Snake;\n\n\n//# sourceURL=webpack://javascript-snake/./js/snake.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./js/main.js");
/******/ 	
/******/ })()
;