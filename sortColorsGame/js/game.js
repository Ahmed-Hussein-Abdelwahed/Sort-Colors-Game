let stacks = document.getElementById("pumps-cont").querySelectorAll(".stack");
let clickedItems = [];
let fullPumpsCount = 0;

function initilizeGame() {
  document.getElementById("staus").style.visibility = "hidden";
  const colorSet = [
    "Red",
    "Green",
    "Blue",
    "Gray",
    "Aqua",
    "Yellow",
    "DodgerBlue",
    "SlateBlue",
    "Violet",
    "Tomato",
    "Gold",
    "Orange",
    "Teal",
    "White",
    "Black",
  ];

  let gameColors = chooseColors(colorSet);
  let pumpColors = null;

  let counter = 0;
  for (let i = 1; i <= stacks.length - 3; i++) {
    pumpColors = shuffleColors(gameColors);

    for (let j = 0; j < pumpColors.length; j++, counter++) {
      stacks[
        i - 1
      ].innerHTML += `<div class="color" style="background-color:${pumpColors[j]}; order:${j+1}">
                                </div>`;
    }
  }
}

function shuffleColors(cArr) {
  let currentIndex = cArr.length;
  let randomIndex = 0;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    [cArr[currentIndex], cArr[randomIndex]] = [
      cArr[randomIndex],
      cArr[currentIndex],
    ];
  }
  return cArr;
}

function chooseColors(cArray) {
  // we have 10 pumps, we need 7 colors

  let cont = new Set();

  while (cont.size !== 7) {
    cont.add(cArray[Math.floor(Math.random() * cArray.length)]);
  }

  return [...cont];
}

initilizeGame();

stacks.forEach(function (stack) {
  stack.addEventListener("click", function () {
    clickedItems.push(stack);

    if (clickedItems.length === 2) {
      moveColor();
    }
  });
});

function moveColor() {
  // 7 ==> maximum number of colors for each pump

  if (clickedItems[0].getAttribute("data-index") !== clickedItems[1].getAttribute("data-index")) {
    if (clickedItems[1].children.length === 0) {
      let counter = 2;

        for(let i = 0; i < clickedItems[1].children.length; i++){
          clickedItems[1].children[i].style.order = counter.toString();
          counter += 1;
        }

      clickedItems[0].children[0].style.order = "1";
      clickedItems[1].appendChild(clickedItems[0].children[0]);
      // clickedItems[1].appendChild(clickedItems[0].firstChild);
      // changeOrder(clickedItems[0]);
      // changeOrder(clickedItems[1]);
    } else if (clickedItems[1].children.length < 7) {
      let color1 = clickedItems[0].firstChild.style.backgroundColor;
      let color2 = clickedItems[1].firstChild.style.backgroundColor;

      if (color1 === color2) {
        let counter = 2;

        for(let i = 0; i < clickedItems[1].children.length; i++){
          clickedItems[1].children[i].style.order = counter.toString();
          counter += 1;
        }

        clickedItems[0].children[0].style.order = "1";
        clickedItems[1].appendChild(clickedItems[0].children[0]);
        // changeOrder(clickedItems[0]);
        // changeOrder(clickedItems[1]);
        
      }
    }

    changeOrder(clickedItems[0]);
    // changeOrder(clickedItems[1]);
    clickedItems = [];
    // checkFullPumps();
    // checkStatus();
  }
  else{
    clickedItems = [];
  }
}

function changeOrder(container){
  let counter = 1;

  for(let i = 0; i < container.children.length; i++){
    container.children[i].style.order = counter.toString();
    counter += 1;
  }
}

function checkStatus() {
  // 7 ==> number of game colors

  if (fullPumpsCount === 7) {
    document.getElementById("staus").style.visibility = "visible";
    document.getElementById("pumps-cont").style.pointerEvents = "none";
  }
}

function checkFullPumps() {
  let counter = 0;
  let fColor = "";

  for (let p = 0; p < stacks.children.length; p++) {
    fColor = stacks[p].children[0].style.backgroundColor;
    for (let c = 1; c < stacks[p].children.length; c++) {
      if (stacks[p].children[c] === fColor) {
        counter += 1;
      } else {
        break;
      }
    }
    if (counter === 7) {
      stacks[p].style.pointerEvents = "none";
      fullPumpsCount += 1;
    }
    console.log(fullPumpsCount);
    counter = 0;
  }
}


