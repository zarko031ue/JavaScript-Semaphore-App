const url =
  "https://www.random.org/integers/?num=1&min=0&max=255&col=1&base=10&format=plain&rnd=new";
const circleDivs = document.querySelectorAll(".circle");

{
  const interval = setInterval(() => start(), 3000);

  setTimeout(() => clearInterval(interval), 150000);

  async function start() {
    yellow();
    const randNumber = await getRandomNumber();
    console.log("init: " + randNumber);
    changeColor(randNumber);
  }

  async function getRandomNumber() {
    let randNumber;

    await fetch(url, { method: "GET" })
      .then((response) => response.json())
      .then((data) => (randNumber = data))
      .then(() => console.log("getRandomNumber: " + randNumber));

    return randNumber;
  }

  function convertFromDecToBin(number) {
    var binaryNumber = [];

    for (let i = number; i > 0; i--) {
      binaryNumber.push(number % 2);
      number = Math.floor(number / 2);
    }
    if (binaryNumber.length < circleDivs.length) {
      for (
        let i = circleDivs.length - binaryNumber.length;
        i < circleDivs.length;
        i++
      ) {
        binaryNumber.push(0);
      }
    }

    return binaryNumber;
  }


  function yellow() {
    circleDivs.forEach((circle) => (circle.style.background = "yellow"));
  }


  function changeColor(number) {
    const binary = convertFromDecToBin(number);
    circleDivs.forEach((circle, i) => {
      circle.style.background = binary[i] ? "green" : "red";
    });
  }
}
