function generateNumber() {
  let max = getDifficulty()
  targetNum = generateRandom(max);
}

function checkInput() {
  let guess = getInput();
  if (guess) {
    if (guess > targetNum) {
      document.getElementById('hint').innerHTML = `${guess} is to high.`;
    } else if (guess < targetNum) {
      document.getElementById('hint').innerHTML = `${guess} is to low.`;
    } else {
      alert(`You win! The number was ${guess}.`)
      document.getElementById('label').innerHTML = 'Enter a number:';
      document.getElementById('hint').innerHTML = '';
    }
  }
}

function getDifficulty() {
  let diff = document.getElementsByName('difficulty');
  if (diff[0].checked) {
    return 10
  } else if (diff[1].checked) {
    return 100
  } else if (diff[2].checked) {
    return 1000
  }
}

function generateRandom(max = 10) {
  return Math.floor(Math.random()*max)+1;
}

function getInput() {
  let guess = parseInt(document.getElementById('number').value);
  if (Number.isNaN(guess)) {
    document.getElementById('label').innerHTML = 'Enter a VALID number:';
    document.getElementById('hint').innerHTML = '';
    guess = false
  }  
  return guess;
}