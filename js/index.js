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
const titleCounts = 24,
  fontsize = 600,
  radius = 800;
const dict = [
  "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽゔゝゞゟ",
  "ぁぃぅぇぉゕゖっゃゅょゎ", "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポヴヷヸヹヺヽヾヿー々",
  "ァィゥェォヵヶッャュョヮㇰㇱㇲㇳㇴㇵㇶㇷㇸㇹㇺㇻㇼㇽㇾㇿ",
  "・"
];
const ascii = {' ': 0.4, '!': 0.39, '"': 0.448, '#': 0.656, '$': 0.612, '%': 0.936, '&': 0.858, "'": 0.246, '(': 0.32, ')': 0.32, '*': 0.556, '+': 0.594, ',': 0.292, '-': 0.554, '.': 0.262, '/': 0.602, '0': 0.7, '1': 0.7, '2': 0.7, '3': 0.7, '4': 0.7, '5': 0.7, '6': 0.7, '7': 0.7, '8': 0.7, '9': 0.7, ':': 0.35, ';': 0.35, '<': 0.622, '=': 0.554, '>': 0.622, '?': 0.632, '@': 0.812, 'A': 0.788, 'B': 0.718, 'C': 0.676, 'D': 0.732, 'E': 0.65, 'F': 0.642, 'G': 0.698, 'H': 0.822, 'I': 0.296, 'J': 0.42, 'K': 0.752, 'L': 0.582, 'M': 0.868, 'N': 0.74, 'O': 0.836, 'P': 0.686, 'Q': 0.844, 'R': 0.68, 'S': 0.576, 'T': 0.586, 'U': 0.736, 'V': 0.744, 'W': 1.066, 'X': 0.796, 'Y': 0.78, 'Z': 0.686, '[': 0.388, '\\': 0.602, ']': 0.388, '^': 0.488, '_': 0.46, '`': 0.334, 'a': 0.626, 'b': 0.626, 'c': 0.552, 'd': 0.626, 'e': 0.602, 'f': 0.416, 'g': 0.628, 'h': 0.62, 'i': 0.314, 'j': 0.342, 'k': 0.6, 'l': 0.326, 'm': 0.824, 'n': 0.626, 'o': 0.62, 'p': 0.628, 'q': 0.628, 'r': 0.456, 's': 0.494, 't': 0.408, 'u': 0.612, 'v': 0.652, 'w': 0.902, 'x': 0.624, 'y': 0.586, 'z': 0.558, '{': 0.31, '|': 0.4, '}': 0.31, '~': 0.624, '\x7f': 1.0}
let dragGroup = new PIXI.display.Group(0, true);
const i10n = {
  titleSettings: ["設定","设置","Settings"],
  selectElement: ["属性", "属性", "Element"],
  selectClass: ["クラス", "职业", "Class"],
  selectTitle: ["作品", "作品", "Title"],
  selectImage: ["画像", "图像", "Image"],
  selectScale: ["画像サイズ", "缩放", "Scale"],
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
const languages = {j: 0, z: 1, e: 2};
let lang = 0;
try {
  console.log("User Language: " + navigator.languages[0]);
  var l = languages[navigator.languages[0][0]];
  lang = l == undefined ? 2 : l;
} catch (e) {
  console.log(e);
}
const trans = i =>(i10n[i] && i10n[i][lang] ? i10n[i][lang] : i);

let dialog_title = document.querySelector('#dialog_title');
dialogPolyfill.registerDialog(dialog_title);
//select anime
$("#titleSelected").click(function () {
  dialog_title.showModal();
});

$("#niseForm").ready(() => {
  let elS = ``;
  for (var i = 0; i < 6; i++) {
    elS += `
<button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-button--mini-fab elemental" id="el${i}" data-elemental="${i}" >
  <img src="./img/element/${i}.png" alt="" class="grayimg r_el">
</button>`;
  }
//elS = trans("selectElement") + elS;
  elS += `<div class = "customdiv">
            <label class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-button--mini-fab" for="elFile" id="elFileLabel"><i class="material-icons">+</i></label>
            <input type="file" name="elFile" id="elFile" accept="image/*" hidden/>
          </div>`;
  $("#elementSelector").html(elS);
  $("#el0").click();
  $("#elFile").on("change", function () {
    $("input[name=element]").prop('checked', false);
    let thisFile = this.files[0];
    src = window.URL.createObjectURL(thisFile);
    $("#imgHolder").html('<img src="' + src + '" id="imgEl" hidden>');
    let imgEl = document.getElementById("imgEl");
    drawEl(imgEl);
  });

let classS = ``;
for (var i = 0; i < 6; i++) {
    classS += `
<button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-button--mini-fab _class" id="class${i}">
  <img src="./img/class/${i}.png" alt="" class="grayimg r_el">
</button>`.trim();
  }
//classS = trans("selectClass") + classS;
  classS += `<div class = "customdiv">
            <label class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-button--mini-fab" for="classFile" id="classFileLabel"><i class="material-icons">+</i></label>
            <input type="file" name="classFile" id="classFile" accept="image/*" hidden/>
          </div>`.trim();
  $("#classSelector").html(classS);
  $("#class0").click();
  $("#classFile").on("change", function () {
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
  //titleS = trans("selectTitle") + titleS;
  titleS += `<div class="Radio">
            <label for="title${titleCounts}">
            <div style="width: 148px;height: 64px" id="tempTitle">${trans(
    "emptyTitle"
  )}</div>
                <img src="./img/title/empty.png" alt="">
                <input type="radio" value="${titleCounts}" name="title" id="title${titleCounts}">
            </label>
        </div>
          <div>
            <label class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" for="titleFile" id="titleFileLabel">${trans("custom")}</label>
            <input type="file" name="titleFile" id="titleFile" accept="image/*" hidden/>
          </div>`.trim();
  $("#titleSelector").html(titleS);
  $("#title0").prop("checked", true);
  $("#titleFile").on("change", function () {
  dialog_title.close();
    $("input[name=title]").prop('checked', false);
    let thisFile = this.files[0];
    src = window.URL.createObjectURL(thisFile);
    $("#imgHolder").html('<img src="' + src + '" id="imgEl" hidden>');
    let imgEl = document.getElementById("imgEl");
    drawTitle(imgEl);
  });

  $(".elemental").click(function () {
    $(".elemental > img").attr("class", "grayimg r_el");
    $(this).find('img').attr("class", "hovorimg r_el");
    drawEl($(this).find('img')[0]);
  });

  $("._class").click(function () {
    $("._class > img").attr("class", "grayimg r_el");
    $(this).find('img').attr("class", "hovorimg r_el");
    drawClass($(this).find('img')[0]);
  });

  $("dialog_title").click(function(){
    dialog_title.close();
  });
  $("input[name=title]").on("change", function () {
    dialog_title.close();
    $("#titleSelectedImage").attr("src", $(this).prev().attr("src"));
    drawTitle($(this).prev()[0]);
  });
  
  //Set titles;
  $("#titleElement").html(trans("selectElement"));
  $("#titleClass").html(trans("selectClass"));
  $("#titleTitle").html(trans("selectTitle"));
  $("#titleImage").html(trans("selectImage"));
  $("#titleScale").html(trans("selectScale"));
  $("#titleSettings").html(trans("titleSettings"));
})
;

$(() => {
  pixi = new PIXI.Application({
    width: 750,
    height: 1000,
    backgroundColor: 0x000000,
    transparent: true
  });
  document.getElementById("pixiHolder").appendChild(pixi.view);
  $(pixi.view).css("width", "100%");
  PIXI.loader.add("./img/cardFrame.png").load(setup);
})
;

$(window).resize(function () {
  //pixi.renderer.view.resize(pixi.renderer.view.getParentDivWidth(), pixi.renderer.view.getParentDivHeight());
});

$("#file").on("change", function () {
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

$("#convertToImg").click(function () {
  pixi.renderer.render(pixi.stage);
  var imageData = pixi.view.toDataURL();
  this.href = imageData;
});

function getTextWidth(s) {
  let returnR;
  if (" " <= s && s <= "~") {
    returnR = ascii[s];
  } else if (dict[0].indexOf(s) !== -1 || dict[2].indexOf(s) !== -1) {
    returnR = 0.9;
  } else if (dict[1].indexOf(s) !== -1 || dict[3].indexOf(s) !== -1) {
    returnR = 0.7;
  } else if (dict[4].indexOf(s) !== -1) {
    returnR = 0.6;
  } else {
    returnR = 1.0;
  }
  return parseInt(returnR * fontsize / 13);
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
      if (this.textW > 6 * fontsize / 13) {
        thisAngle = thisAngle * Math.sqrt((6 * fontsize / 13) / this.textW)
      }
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

document.fonts.ready.then(function () {
  $("#loading").remove();
});

$("#charaName").on("input", function () {
  let nnn = new nameString($(this).val());
  nnn.draw();
});
