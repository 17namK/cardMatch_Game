var width = 4;
var heigth = 5;
var colorList = [];
var suffleCard = [];
var clickFlag = true; //처음 세팅 중 클릭불가
var clickCard = [];
var completeCard = [];
var startTime;

var ctx = myCanvas.getContext("2d"); //점수판을 만들기 위한 캔버스 생성

function suffle() {
  for (let i = 0; colorList.length > 0; i++) {
    suffleCard = suffleCard.concat(
      colorList.splice(Math.floor(Math.random() * colorList.length), 1)
    );
    console.log("셔플 진행", suffleCard[i]);
  }
}

function setting() {
  document.querySelector("#wrapper").innerHTML = "";
  suffleCard = [];
  colorList = [
    "https://s2js.com/Nam/embleml_hh1.png",
    "https://s2js.com/Nam/embleml_hh1.png",
    "https://s2js.com/Nam/embleml_ht1.png",
    "https://s2js.com/Nam/embleml_ht1.png",
    "https://s2js.com/Nam/embleml_kt1.png",
    "https://s2js.com/Nam/embleml_kt1.png",
    "https://s2js.com/Nam/embleml_lg1.png",
    "https://s2js.com/Nam/embleml_lg1.png",
    "https://s2js.com/Nam/embleml_lt1.png",
    "https://s2js.com/Nam/embleml_lt1.png",
    "https://s2js.com/Nam/embleml_nc1.png",
    "https://s2js.com/Nam/embleml_nc1.png",
    "https://s2js.com/Nam/embleml_ob1.png",
    "https://s2js.com/Nam/embleml_ob1.png",
    "https://s2js.com/Nam/embleml_sk1.png",
    "https://s2js.com/Nam/embleml_sk1.png",
    "https://s2js.com/Nam/embleml_ss1.png",
    "https://s2js.com/Nam/embleml_ss1.png",
    "https://s2js.com/Nam/embleml_wo1.png",
    "https://s2js.com/Nam/embleml_wo1.png",
  ];
  completeCard = [];
}

var score = 0; //점수
var unScore = 10;
function cardSetting(width_2, hiegth_2) {
  clickFlag = false;
  for (let i = 0; i < width_2 * hiegth_2; i++) {
    var card = document.createElement("div");
    card.className = "card";

    var cardInner = document.createElement("div");
    cardInner.className = "card_inner";

    var cardFront = document.createElement("div");
    cardFront.className = "card_front";

    var kboImg = document.createElement("img");
    kboImg.className = "card_back";

    //랜덤한 색 지정
    suffle();
    kboImg.src = suffleCard[i];

    console.log(suffleCard[i]);
    cardInner.appendChild(cardFront);
    cardInner.appendChild(kboImg);
    card.appendChild(cardInner);

    //클로저 문제 해결
    (function play(c) {
      ctx.clearRect(0, 0, (x = 95), (y = 55));
      ctx.fillStyle = "yellow";
      ctx.font = " 20px Arial";

      ctx.clearRect(0, 0, (x = 95), (y = 82));
      ctx.fillStyle = "yellow";
      ctx.font = " 20px Arial";

      setInterval(() => {
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

        ctx.fillText("맞춘 횟수 : " + score, 95, 55);
        ctx.fillText("남은 갯수 : " + unScore, 95, 82);
      }, 500);

      c.addEventListener("click", function (e) {
        if (clickFlag && !completeCard.includes(c)) {
          //includes 는 내부에 매개변수가 존재하는지 검사
          c.classList.toggle("flipped");
          clickCard.push(c);
          if (clickCard.length === 2) {
            if (
              clickCard[0].querySelector(".card_back").src ===
                clickCard[1].querySelector(".card_back").src &&
              clickCard[0].className === "card flipped"
            ) {
              score = score + 1;
              unScore = unScore - 1;
              console.log(score);
              console.log(unScore);
              completeCard.push(clickCard[0]);
              completeCard.push(clickCard[1]);
              clickCard = [];
              if (completeCard.length === width_2 * hiegth_2) {
                var endTime = new Date();
                var wrapTime = (endTime - startTime) / 1000;
                console.log(endTime, startTime, wrapTime);
                setTimeout(() => {
                  alert(Math.round(wrapTime) + " 초만에 성공!");
                  setting();
                  cardSetting(width, heigth);
                }, 1000);
              }
            } else {
              clickFlag = false;
              setTimeout(() => {
                clickCard[0].classList.remove("flipped");
                clickCard[1].classList.remove("flipped");
                clickFlag = true;
                clickCard = [];
              }, 1000);
            }
          }
        }
      });
    })(card);
    document.querySelector("#wrapper").appendChild(card);
  }

  //처음 시작할 때 카드를 외울 수 있게 도움
  document.querySelectorAll(".card").forEach((card, index) => {
    setTimeout(function () {
      card.classList.add("flipped");
      clickFlag = false;
    }, 1000 + 100 * index);
    setTimeout(function () {
      card.classList.remove("flipped");
      clickFlag = true;
      startTime = new Date();
    }, 5000);
  });
}
setting();
cardSetting(width, heigth);
