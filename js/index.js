let src,
  app,
  baseTexture,
  textureUpload,
  spriteCardFrame,
  spriteUpload,
  classSprite,
  elSprite,
  titleSprite,
  fontStyle,
  textContainer;
let enableScale = false;
const titleCounts = 15,
  fontsize = 600,
  radius = 800;
const dict = [
  "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽゔゝゞゟ",
  "ぁぃぅぇぉゕゖっゃゅょゎ",
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポヴヷヸヹヺヽヾヿー",
  "ァィゥェォヵヶッャュョヮㇰㇱㇲㇳㇴㇵㇶㇷㇸㇹㇺㇻㇼㇽㇾㇿ",
  "・"
];
let dragGroup = new PIXI.display.Group(0, true);
const i10n = {
  selectElement: ["属性選択", "选择属性", "Select Element"],
  selectClass: ["クラス選択", "选择职业", "Select Class"],
  selectTitle: ["作品選択", "选择作品", "Select Title"],
  emptyTitle: ["空", "空", "Empty"],
  wait: [
    "リソースの読み込みが完了してから選択してください",
    "渲染器尚未加载完成,请稍等",
    "Please wait for resource loading"
  ],
  firstImg: [
    "画像を読み込んでからサイズを調整してください",
    "请先导入图片再调整大小!",
    "Please import an image first"
  ],
  waitFont: [
    "フォントの読み込みが完了してから選択してください",
    "字体文件尚未加载完成,请稍等",
    "Please wait for font loading"
  ],
  custom: ["カスタム", "自定义图片", "Custom"]
};
const languages = { j: 0, z: 1, e: 2 };
let lang = 0;
try {
  console.log("User Language: " + navigator.languages[0]);
  var l = languages[navigator.languages[0][0]];
  lang = l == undefined ? 2 : l;
} catch (e) {
  console.log(e);
}
const trans = i => (i10n[i] && i10n[i][lang] ? i10n[i][lang] : i);

$("#niseForm").ready(() => {
  let elS = ``;
  for (var i = 0; i < 6; i++) {
    elS += `<div class="Radio">
            <label for="el${i}">
                <img src="./img/element/${i}.png" alt="" class="r_el">
                <input type="radio" value="${i}" name="element" id="el${i}" class="r_el">
            </label>
        </div>`;
  }
  elS = trans("selectElement") + elS;
  elS += `<div class="Custom">
            <label for="elFile" id="elFileLabel">${trans("custom")}</label>
            <input type="file" name="elFile" id="elFile" accept="image/*" hidden/>
          </div>`.trim();
  $("#elementSelector").html(elS);
  $("#el0").prop("checked", true);
  $("#elFile").on("change", function() {
    $("input[name=element]").prop('checked', false);
    let thisFile = this.files[0];
    src = window.URL.createObjectURL(thisFile);
    $("#imgHolder").html('<img src="' + src + '" id="imgEl" hidden>');
    let imgEl = document.getElementById("imgEl");
    drawEl(imgEl);
  });

  let classS = ``;
  for (var i = 0; i < 5; i++) {
    classS += `<div class="Radio">
            <label for="class${i}">
                <img src="./img/class/${i}.png" alt="" class="r_cl">
                <input type="radio" value="${i}" name="class" id="class${i}" class="r_cl">
            </label>
        </div>`.trim();
  }
  classS = trans("selectClass") + classS;
  classS += `<div class="Custom">
            <label for="classFile" id="classFileLabel">${trans("custom")}</label>
            <input type="file" name="classFile" id="classFile" accept="image/*" hidden/>
          </div>`.trim();
  $("#classSelector").html(classS);
  $("#class0").prop("checked", true);
  $("#classFile").on("change", function() {
    $("input[name=class]").prop('checked', false);
    let thisFile = this.files[0];
    src = window.URL.createObjectURL(thisFile);
    $("#imgHolder").html('<img src="' + src + '" id="imgEl" hidden>');
    let imgEl = document.getElementById("imgEl");
    drawClass(imgEl);
  });

  let titleS = ``;
  for (var i = 0; i < titleCounts; i++) {
    titleS += `<div class="Radio">
            <label for="title${i}">
                <img src="./img/title/${i}.png" alt="" class="r_t">
                <input type="radio" value="${i}" name="title" id="title${i}" class="r_t">
            </label>
        </div>`.trim();
  }
  titleS = trans("selectTitle") + titleS;
  titleS += `<div class="Radio">
            <label for="title${titleCounts}">
            <div style="width: 148px;height: 64px" id="tempTitle">${trans(
              "emptyTitle"
            )}</div>
                <img src="./img/title/empty.png" alt="">
                <input type="radio" value="${titleCounts}" name="title" id="title${titleCounts}">
            </label>
        </div>
          <div class="Custom">
            <label for="titleFile" id="titleFileLabel">${trans("custom")}</label>
            <input type="file" name="titleFile" id="titleFile" accept="image/*" hidden/>
          </div>`.trim();
  $("#titleSelector").html(titleS);
  $("#title0").prop("checked", true);
  $("#titleFile").on("change", function() {
    $("input[name=title]").prop('checked', false);
    let thisFile = this.files[0];
    src = window.URL.createObjectURL(thisFile);
    $("#imgHolder").html('<img src="' + src + '" id="imgEl" hidden>');
    let imgEl = document.getElementById("imgEl");
    drawTitle(imgEl);
  });

  $("input[name=element]").on("change", function() {
    drawEl($(this).prev()[0]);
  });
  $("input[name=class]").on("change", function() {
    drawClass($(this).prev()[0]);
  });
  $("input[name=title]").on("change", function() {
    drawTitle($(this).prev()[0]);
  });
});

$(() => {
  const isPhone = /Android|webOS|iPhone|iPod|BlackBerry/i.test(
    navigator.userAgent
  );
  if (isPhone) {
    $("#convertToImg").css("display", "block");
  }
  pixi = new PIXI.Application({
    width: 750,
    height: 1000,
    backgroundColor: 0x000000,
    transparent: true
  });
  document.getElementById("pixiHolder").appendChild(pixi.view);
  PIXI.loader.add("./img/cardFrame.png").load(setup);
});

$("#file").on("change", function() {
  console.log($("#fontLoader").height());
  if (spriteUpload) {
    enableScale = true;
    let thisFile = this.files[0];
    src = window.URL.createObjectURL(thisFile);
    $("#imgHolder").html('<img src="' + src + '" id="imgEl" hidden>');
    let imgEl = document.getElementById("imgEl");
    baseTexture = new PIXI.BaseTexture(imgEl);
    textureUpload = new PIXI.Texture(baseTexture);
    spriteUpload.texture = textureUpload;
    spriteUpload.position.set(spriteUpload.width / 2, spriteUpload.height / 2);
  } else {
    this.value = "";
    alert(trans("wait"));
  }
});

function setScale(event) {
  let that = $("#charaScale")[0];
  if (enableScale) {
    setUploadScale(that.value * that.value / 2500);
  } else {
    $("#charaScale").val(50);
    alert(trans("firstImg"));
  }
}

function setup() {
  spriteCardFrame = new PIXI.Sprite(
    PIXI.loader.resources["./img/cardFrame.png"].texture
  );
  spriteUpload = new PIXI.Sprite();
  spriteUpload.interactive = true;
  spriteUpload.buttonMode = true;
  spriteUpload
    .on("mousedown", onDragStart)
    .on("touchstart", onDragStart)
    .on("mouseup", onDragEnd)
    .on("mouseupoutside", onDragEnd)
    .on("touchend", onDragEnd)
    .on("touchendoutside", onDragEnd)
    .on("mousemove", onDragMove)
    .on("touchmove", onDragMove);

  classSprite = new PIXI.Sprite();
  elSprite = new PIXI.Sprite();
  titleSprite = new PIXI.Sprite();

  pixi.stage.addChild(spriteUpload);
  pixi.stage.addChild(spriteCardFrame);

  elSprite.anchor.set(0.5, 0.5);
  elSprite.width = 114;
  elSprite.height = 114;
  elSprite.position.set(75, 926);

  classSprite.anchor.set(0.5, 0.5);
  classSprite.width = 114;
  classSprite.height = 114;
  classSprite.position.set(678, 926);

  titleSprite.anchor.set(0.5, 0.5);
  titleSprite.width = 186;
  titleSprite.height = 56;
  titleSprite.position.set(375, 958);

  pixi.stage.addChild(classSprite);
  pixi.stage.addChild(elSprite);
  pixi.stage.addChild(titleSprite);

  let a = $("#class0").prev()[0];
  let b = $("#el0").prev()[0];
  let c = $("#title0").prev()[0];
  drawClass(a);
  drawEl(b);
  drawTitle(c);

  fontStyle = new PIXI.TextStyle();
  fontStyle.fontFamily = "nameFont";
  fontStyle.fill = "white";
  fontStyle.fontSize = 45;
  fontStyle.dropShadow = true;
  fontStyle.dropShadowAlpha = 0.3;
  fontStyle.dropShadowAngle = 3.1415 / 2;
  fontStyledropShadowDistance = 10;

  textContainer = new PIXI.Container();
  pixi.stage.addChild(textContainer);
}

function drawClass(image) {
  let classBaseTexture = new PIXI.BaseTexture(image);
  let classTexture = new PIXI.Texture(classBaseTexture);
  classSprite.texture = classTexture;
}

function drawEl(image) {
  let elBaseTexture = new PIXI.BaseTexture(image);
  let elTexture = new PIXI.Texture(elBaseTexture);
  elSprite.texture = elTexture;
}

function drawTitle(image) {
  let elBaseTexture = new PIXI.BaseTexture(image);
  let elTexture = new PIXI.Texture(elBaseTexture);
  titleSprite.texture = elTexture;
}

function onDragStart(event) {
  if (!this.dragging) {
    this.data = event.data;
    this.oldGroup = this.parentGroup;
    this.parentGroup = dragGroup;
    this.dragging = true;
    this.dragPoint = event.data.getLocalPosition(this.parent);
    this.dragPoint.x -= this.x;
    this.dragPoint.y -= this.y;
  }
}

function onDragEnd() {
  if (this.dragging) {
    this.dragging = false;
    this.parentGroup = this.oldGroup;
    this.data = null;
  }
}

function onDragMove() {
  if (this.dragging) {
    var newPosition = this.data.getLocalPosition(this.parent);
    this.x = newPosition.x - this.dragPoint.x;
    this.y = newPosition.y - this.dragPoint.y;
  }
}

function setUploadScale(x) {
  spriteUpload.scale.x = x;
  spriteUpload.scale.y = x;
}

$("#convertToImg").click(function() {
  pixi.renderer.render(pixi.stage);
  var imageData = pixi.view.toDataURL("image/png");
  $("#appendImg")[0].src = imageData;
});

function getTextWidth(s) {
  let returnR;
  if (" " < s && s <= "~") {
    returnR = (350 * fontsize / 500) >> 0;
    return returnR / 13;
  }
  if (dict[0].indexOf(s) !== -1 || dict[2].indexOf(s) !== -1) {
    returnR = (450 * fontsize / 500) >> 0;
  } else if (dict[1].indexOf(s) !== -1 || dict[3].indexOf(s) !== -1) {
    returnR = (350 * fontsize / 500) >> 0;
  } else if (dict[4].indexOf(s) !== -1) {
    returnR = (300 * fontsize / 500) >> 0;
  } else if (s == " " || s == "　") {
    returnR = 200;
  } else {
    returnR = fontsize;
  }
  return returnR / 13;
}

function getAllTextWidth(s) {
  let allLen = 0;
  for (let i of s) {
    allLen += getTextWidth(i);
  }
  return allLen;
}

class nameString {
  constructor(string = "") {
    this.text = string;
    this.textW = getAllTextWidth(this.text);
    this.textArr = [];
    let charCount = 0;
    let hisW = 0;
    for (let s of this.text) {
      let index = charCount;
      charCount += 1;
      let thisW = hisW + getTextWidth(s) / 2;
      let thisL = this.textW / 2 - thisW;
      let thisAngle = thisL / radius;
      let thisAngleRatio = [
        Math.sin(thisAngle),
        Math.cos(thisAngle),
        Math.tan(thisAngle)
      ];
      let thisX = 375 - thisAngleRatio[0] * radius;
      let thisY = 1664 - thisAngleRatio[1] * radius;
      this.textArr.push({
        index: index,
        char: s,
        w: thisW,
        l: thisL,
        angle: thisAngle,
        angleRatio: thisAngleRatio,
        position: {
          x: thisX,
          y: thisY
        }
      });
      hisW += getTextWidth(s);
    }
  }

  draw() {
    textContainer.removeChildren();
    for (let el of this.textArr) {
      let text = new PIXI.Text(el["char"], fontStyle);
      text.position.set(el["position"]["x"], el["position"]["y"]);
      text.anchor.x = 0.5;
      text.anchor.y = 0.5;
      // text.rotation = el["angle"]
      text.rotation = -1 * el["angle"];
      textContainer.addChild(text);
    }
  }
}

$("#charaName").on("input", function() {
  if ($("#fontLoader").height() > 30) {
    let nnn = new nameString($(this).val());
    nnn.draw();
  } else {
    alert(trans("waitFont"));
  }
});
