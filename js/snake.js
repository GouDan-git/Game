// cube颜色生成器
class RBGCreater {
  constructor() {
    this.sign = [true, true, true];
    this.rgb = [
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
    ];
  }
  getRGB() {
    const index = Math.floor(Math.random() * 3);
    const increment = Math.floor(Math.random() * 10) + 5;
    if (this.sign[index]) {
      const result = this.rgb[index] + increment;
      if (result > 255) {
        this.rgb[index] = 255;
        this.sign[index] = false;
      } else {
        this.rgb[index] = result;
      }
    } else {
      const result = this.rgb[index] - increment;
      if (result < 0) {
        this.rgb[index] = 0;
        this.sign[index] = true;
      } else {
        this.rgb[index] = result;
      }
    }
    return {
      r: this.rgb[0],
      g: this.rgb[1],
      b: this.rgb[2],
    };
  }
}

// 游戏盒子
const content = document.getElementById("content");

// cube颜色生成器
const rgbCreater = new RBGCreater();

// 收集组成游戏区域的所有小方块
const divGroup = [];
for (let i = 0; i < 27; i++) {
  divGroup.push([]);
  for (let j = 0; j < 48; j++) {
    const div = {
      document: document.createElement("div"),
      color: { r: 0, g: 0, b: 0 },
    };
    div.document.style.backgroundColor = `rgb(${0}, ${0}, ${0})`;
    content.appendChild(div.document);
    divGroup[i].push(div);
    Object.defineProperty(div, "color", {
      set(value) {
        this.document.style.backgroundColor = `rgb(${value.r}, ${value.g}, ${value.b})`;
      },
    });
  }
}
// divGroup[1][1].document.style.backgroundColor = "red";
// divGroup[3][1].color = rgbCreater.getRGB();

const player = {
  direction: "right", // up down left right
  body: [
    { x: 3, y: 0, color: rgbCreater.getRGB() },
    { x: 2, y: 0, color: rgbCreater.getRGB() },
    { x: 1, y: 0, color: rgbCreater.getRGB() },
  ],
};

setInterval(function () {
  player.body.forEach((item) => {
    item.x += 1;
    divGroup[item.y][item.x].color = item.color;
  });
  tail = player.body[player.body.length - 1];
  divGroup[tail.y][tail.x - 1].color = { r: 0, g: 0, b: 0 };
}, 1000);
