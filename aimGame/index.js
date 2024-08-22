let $start = document.querySelector('#start')
let $game = document.querySelector('#game')
let $time = document.querySelector('#time')
let $result = document.querySelector('#result')
let $timeHeader = document.querySelector('#time-header')
let $resultHeader = document.querySelector('#result-header')
let $gameTime = document.querySelector('#game-time')

let score = 0
let isGameStarted = false

$start.addEventListener('click', startGame) 
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)

function show($el) {
  $el.classList.remove('hide')
}

function hide($el) {
  $el.classList.add('hide')
}

function startGame() {
  
  score = 0
  setGameTime()
  $gameTime.setAttribute('disabled', true)

  isGameStarted = true
  $game.style.backgroundColor = '#fff'
  hide($start)

  let interval = setInterval(function () {
    let time = parseFloat($time.textContent)
    if (time <= 0) {
      clearInterval(interval)
      endGame()
    } else {
      $time.textContent = (time - 0.1).toFixed(1)
    }
  }, 100)
  renderBox()
}


function setGameScore() {
  $result.textContent = score.toString()
}

function setGameTime() {
  let time = +$gameTime.value
  $time.textContent = time.toFixed(1)
  show($timeHeader)
  hide($resultHeader)
}

function endGame() {
  isGameStarted = false
  setGameScore()
  $gameTime.removeAttribute('disabled')
  show($start)
  $game.innerHTML = ''
  $game.style.backgroundColor = '#ccc'
  hide($timeHeader)
  show($resultHeader)
}

function handleBoxClick(event) {
  if (!isGameStarted) {
    return
  } else if (event.target.dataset.box) { // ???  Если в поле dataset присутствует объект-ключ box, это значит, что мы сделали клик именно по квадрату
    score++
    renderBox()
  }

}

function renderBox() {
  $game.innerHTML = '' //чтоб удалить box после его нажатия (удаляем все в $game, так как box дублируется)
  let box = document.createElement('div')
  let boxSize = getRandom(20, 70)
  let gameSize = $game.getBoundingClientRect()
  let maxTop = gameSize.height - boxSize
  let maxLeft = gameSize.width - boxSize

  console.log(gameSize)

  box.style.height = box.style.width = boxSize + 'px'
  box.style.position = 'absolute'
  box.style.backgroundColor = '#000'
  box.style.borderRadius = '50%'
  box.style.top = getRandom(0, maxTop) + 'px'
  box.style.left = getRandom(0, maxLeft) + 'px'
  box.style.cursor = 'pointer'
  box.setAttribute('data-box', true)

  $game.insertAdjacentElement('afterbegin', box)      // см сайт mdn - добавляет переданный элемент в DOM-дерево относительно элемента, вызвавшего метод

}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

//event.target
