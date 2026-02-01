let choose = Array.from(document.querySelectorAll(".choose li"));

let myPage = document.querySelector(".myPage");

let show = document.querySelector(".show");
let level = show.getElementsByClassName("level")[0];
let timeAv = show.getElementsByClassName("time")[0];

let currentword = document.querySelector(".currentWord");
let start = document.querySelector(".start");
let input = document.querySelector(".enter");
let time = document.querySelector(".pass .time");
let score = document.querySelector(".pass .score");

let congrat = document.querySelector(".congrat");
let fail = document.querySelector(".fail");
let failOpt = document.querySelector(".after .fail-opt");
let another = document.querySelector(".fail-opt .another");
let again = document.querySelector(".again");

let levels = {
  Easy: 7,
  Normal: 4,
  Hard: 2,
};

let easy = [
  "Go",
  "No",
  "Fathy",
  "Ahmed",
  "Islam",
  "Front",
  "Play",
  "Funny",
  "Yes",
  "CSS",
  "Hello",
  "Khalda",
];
let normal = [
  "Mahmoud",
  "Mohamed",
  // "Fathy",
  // "Ahmed",
  // "Islam",
  // "Front",
  // "Working",
  // "Funny",
  // "JavaScript",
  // "CSS",
  // "Hello",
  // "Khalda",
];
let hard = [
  "Mahmoud",
  "Mohamed",
  "Fathy",
  "Lalalala",
  "Textcontent",
  "Laptop",
  "Working",
  "Funny",
  "JavaScript",
  "Government",
  "Signal",
  "Khalda",
];

input.onpaste = () => false;

function backBeforePlay() {
  start.style.display = "block";
  currentword.style.display = "none";
  fail.style.display = "none";
  failOpt.style.display = "none";
  congrat.style.display = "none";
  input.value = "";
}

choose.forEach((e) => {
  e.onclick = () => {
    // not double click on same element & game not started
    if (!e.classList.contains("clicked")) {
      // add and remove active
      choose.forEach((e) => {
        e.classList.remove("active");
      });
      e.classList.add("active");
      let active = document.querySelector(".active");

      // change page data based on active
      level.textContent = active.textContent;
      let varTime = levels[active.textContent] + 3;
      timeAv.textContent = varTime;
      time.textContent = `Time Left: ${varTime - 3} Second`;

      myPage.style.display = "block";
      backBeforePlay();

      // create left word
      let leftWord = document.createElement("ul");
      leftWord.classList.add("leftWord");
      leftWord.textContent = "Words Will Show Here";

      // choose the words based on active
      let myArray =
        active.textContent === "Easy"
          ? easy
          : active.textContent === "Normal"
          ? normal
          : hard;

      // change score data based on active
      let scoring = 0;
      score.textContent = `Score: ${scoring} From ${myArray.length}`;

      // start the game
      start.onclick = () => {
        input.removeAttribute("disabled");
        time.textContent = `Time Left: ${varTime} Second`;

        input.after(leftWord);
        // make choose not clickable
        choose.forEach((e) => {
          e.classList.add("clicked");
          e.style.cursor = "no-drop";
        });

        input.focus();

        // -- ramdom word from newArr
        let newArr = myArray.slice(0);
        let randomWord = newArr[Math.floor(Math.random() * newArr.length)];
        newArr.splice(newArr.indexOf(randomWord), 1);
        currentword.textContent = randomWord;

        start.style.display = "none";
        currentword.style.display = "block";

        // remove and add words to leftWord
        let add = () => {
          leftWord.textContent = "";
          newArr.forEach((e) => {
            let li = document.createElement("li");
            li.textContent = `${e}`;
            leftWord.append(li);
          });
        };
        add();

        // counter
        let check = setInterval(() => {
          time.textContent = `Time Left: ${--varTime} Second`;

          // to click enter for not wait counter
          document.onkeydown = (e) => {
            if (e.key === "Enter") {
              varTime = 1;
            }
          };

          // right answer or not
          if (varTime === 0) {
            // reTime
            varTime = levels[active.textContent];

            if (
              input.value.toLowerCase() ===
              currentword.textContent.toLowerCase()
            ) {
              // true answer change score
              input.value = "";
              input.focus();
              score.textContent = `Score: ${++scoring} From ${myArray.length}`;

              if (scoring !== myArray.length) {
                // if not last word change current
                randomWord = newArr[Math.floor(Math.random() * newArr.length)];
                currentword.textContent = randomWord;
                newArr.splice(newArr.indexOf(randomWord), 1);
                add();
              } else {
                // complete
                // last word => congrat !!
                congrat.style.display = "block";
                clearInterval(check);
                input.setAttribute("disabled", "");
                failOpt.style.display = "flex";
                currentword.textContent = "";
              }
              // if empty => remove
              if (leftWord.textContent === "") {
                leftWord.remove();
              }
            } else {
              // fail !!
              clearInterval(check);
              input.setAttribute("disabled", "");
              failOpt.style.display = "flex";
              fail.style.display = "block";
            }
          }
        }, 1000);
      };

      // if fail show the fail option
      // put this here to know the vaiables myArray and varTime => localVariables
      again.onclick = () => {
        leftWord.remove();
        backBeforePlay();
        scoring = 0;
        score.textContent = `Score: ${scoring} From ${myArray.length}`;
        varTime = levels[active.textContent] + 3;
        time.textContent = `Time Left: ${varTime - 3} Second`;
      };

      another.onclick = () => {
        input.value = "";
        myPage.style.display = "none";
        leftWord.remove();
        choose.forEach((e) => {
          e.classList.remove("clicked");
          e.classList.remove("active");
          e.style.cursor = "pointer";
        });
      };
    }
  };
});
