window.onload = function () {


  document.getElementById('gameover').style.display = 'none'
  document.getElementById('canvass').style.display = 'none'
  document.getElementById("start-button").onclick = function () {
    document.getElementById('start').style.display = 'none'
    // document.getElementById('start-button').style.display = 'none'
    document.getElementById('canvass').style.display = 'block'
    game.restart()



    startGame()
  };
  document.getElementById("restart").onclick = function () {
    document.getElementById('start').style.display = 'none'
    // document.getElementById('start-button').style.display = 'none'
    document.getElementById('gameover').style.display = 'none'
    document.getElementById('canvass').style.display = 'block'

    game.restart()
    startGame()
  };



};

function startGame() {
  game.init();
  return true

}