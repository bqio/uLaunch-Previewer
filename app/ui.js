const $ = require('jquery');
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const url = require('url');
const {Howler} = require('howler');
const platformFolder = require("platform-folders");
const {getCurrentWindow} = require("electron").remote;
let documents = platformFolder.getDocumentsFolder();
const html2canvas = require("html2canvas");
let ui = path.join(__dirname, "theme", "ui");
let manifest;
let emitter = require('events').EventEmitter;
let switchem = new emitter();
$(function() {
  $.fn.ctrlCmd = function(key) {
    var allowDefault = true;
    if (!$.isArray(key)) {
      key = [key];
    }
    return this.keydown(function(e) {
      for (var i = 0, l = key.length; i < l; i++) {
        if(e.keyCode === key[i].toUpperCase().charCodeAt(0) && e.metaKey) {
          allowDefault = false;
        }
      };
      return allowDefault;
    });
  };
  $.fn.disableSelection = function() {
    this.ctrlCmd(['a', 'c']);
    return this.attr('unselectable', 'on')
     .css({'-moz-user-select':'-moz-none',
           '-moz-user-select':'none',
           '-o-user-select':'none',
           '-khtml-user-select':'none',
           '-webkit-user-select':'none',
           '-ms-user-select':'none',
           'user-select':'none'})
     .bind('selectstart', false)
     .on('mousedown', false);
  };
  let keysdown = {};
  $(document).keydown(function(e){
    if(keysdown[e.which]) return;
    keysdown[e.which] = true;
    if(e.which === 80){
      power();
    } if(e.which === 38){
      arrowup();
      e.preventDefault();
    } if(e.which === 40){
      arrowdown();
      e.preventDefault();
    } if(e.which === 37){
      arrowleft();
      e.preventDefault();
    } if(e.which === 39){
      arrowright();
      e.preventDefault();
    } if(e.which === 107){
      volp();
      e.preventDefault();
    } if(e.which === 109){
      volm();
      e.preventDefault();
    }
    $(this).on('keyup', function() {
      delete keysdown[e.which];
    });
  });
  console.log('JQuery Initialized.');
  $("#plus").click(() => {
    plus();
  });
  $("#pluss").click(() => {
    plus();
  });
  $("#plusss").click(() => {
    plus();
  });
  $("#minus").click(() => {
    minus();
  });
  $("#arrowup").click(() => {
    arrowup();
  });
  $("#arrowdown").click(() => {
    arrowdown();
  });
  $("#arrowleft").click(() => {
    arrowleft();
  });
  $("#arrowright").click(() => {
    arrowright();
  });
  $("#capturebg").click(() => {
    capture();
  });
  $("#capture").click(() => {
    capture();
  });
  $("#l").click(() => {
    l();
  });
  $("#a").click(() => {
    a();
  });
  $("#b").click(() => {
    b();
  });
  $("#x").click(() => {
    x();
  });
  $("#y").click(() => {
    y();
  });
  $("#home").click(() => {
    home();
  });
  $("#r").click(() => {
    r();
  });
  $("#volp").click(() => {
    volp();
  });
  $("#volm").click(() => {
    volm();
  });
  $("#power").click(() => {
    power();
  });
  $('#ltop').on('mousedown', function() {
    document.getElementById("ljoybutton").setAttribute("style", "position:relative;top:0;left:-20");
    ltopstart();
  }).on('mouseup mouseleave', function() {
    document.getElementById("ljoybutton").setAttribute("style", "position:relative;top:20;left:-20");
    ltopstop();
  });
  $('#ltopleft').on('mousedown', function() {
    document.getElementById("ljoybutton").setAttribute("style", "position:relative;top:0;left:-40");
    ltopleftstart();
  }).on('mouseup mouseleave', function() {
    document.getElementById("ljoybutton").setAttribute("style", "position:relative;top:20;left:-20");
    ltopleftstop();
  });
  $('#lleft').on('mousedown', function() {
    document.getElementById("ljoybutton").setAttribute("style", "position:relative;top:20;left:-40");
    lleftstart();
  }).on('mouseup mouseleave', function() {
    document.getElementById("ljoybutton").setAttribute("style", "position:relative;top:20;left:-20");
    lleftstop();
  });
  $('#lleftbottom').on('mousedown', function() {
    document.getElementById("ljoybutton").setAttribute("style", "position:relative;top:40;left:-40");
    lleftbottomstart();
  }).on('mouseup mouseleave', function() {
    document.getElementById("ljoybutton").setAttribute("style", "position:relative;top:20;left:-20");
    lleftbottomstop();
  });
  $('#lbottom').on('mousedown', function() {
    document.getElementById("ljoybutton").setAttribute("style", "position:relative;top:40;left:-20");
    lbottomstart();
  }).on('mouseup mouseleave', function() {
    document.getElementById("ljoybutton").setAttribute("style", "position:relative;top:20;left:-20");
    lbottomstop();
  });
  $('#lbottomright').on('mousedown', function() {
    document.getElementById("ljoybutton").setAttribute("style", "position:relative;top:40;left:0");
    lbottomrightstart();
  }).on('mouseup mouseleave', function() {
    document.getElementById("ljoybutton").setAttribute("style", "position:relative;top:20;left:-20");
    lbottomrightstop();
  });
  $('#lright').on('mousedown', function() {
    document.getElementById("ljoybutton").setAttribute("style", "position:relative;top:20;left:0");
    lrightstart();
  }).on('mouseup mouseleave', function() {
    document.getElementById("ljoybutton").setAttribute("style", "position:relative;top:20;left:-20");
    lrightstop();
  });
  $('#lrighttop').on('mousedown', function() {
    document.getElementById("ljoybutton").setAttribute("style", "position:relative;top:0;left:0");
    lrighttopstart();
  }).on('mouseup mouseleave', function() {
    document.getElementById("ljoybutton").setAttribute("style", "position:relative;top:20;left:-20");
    lrighttopstop();
  });
  $('#rtop').on('mousedown', function() {
    document.getElementById("rjoybutton").setAttribute("style", "position:relative;top:0;left:-20");
    rtopstart();
  }).on('mouseup mouseleave', function() {
    document.getElementById("rjoybutton").setAttribute("style", "position:relative;top:20;left:-20");
    rtopstop();
  });
  $('#rtopleft').on('mousedown', function() {
    document.getElementById("rjoybutton").setAttribute("style", "position:relative;top:0;left:-40");
    rtopleftstart();
  }).on('mouseup mouseleave', function() {
    document.getElementById("rjoybutton").setAttribute("style", "position:relative;top:20;left:-20");
    rtopleftstop();
  });
  $('#rleft').on('mousedown', function() {
    document.getElementById("rjoybutton").setAttribute("style", "position:relative;top:20;left:-40");
    rleftstart();
  }).on('mouseup mouseleave', function() {
    document.getElementById("rjoybutton").setAttribute("style", "position:relative;top:20;left:-20");
    rleftstop();
  });
  $('#rleftbottom').on('mousedown', function() {
    document.getElementById("rjoybutton").setAttribute("style", "position:relative;top:40;left:-40");
    rleftbottomstart();
  }).on('mouseup mouseleave', function() {
    document.getElementById("rjoybutton").setAttribute("style", "position:relative;top:20;left:-20");
    rleftbottomstop();
  });
  $('#rbottom').on('mousedown', function() {
    document.getElementById("rjoybutton").setAttribute("style", "position:relative;top:40;left:-20");
    rbottomstart();
  }).on('mouseup mouseleave', function() {
    document.getElementById("rjoybutton").setAttribute("style", "position:relative;top:20;left:-20");
    rbottomstop();
  });
  $('#rbottomright').on('mousedown', function() {
    document.getElementById("rjoybutton").setAttribute("style", "position:relative;top:40;left:0");
    rbottomrightstart();
  }).on('mouseup mouseleave', function() {
    document.getElementById("rjoybutton").setAttribute("style", "position:relative;top:20;left:-20");
    rbottomrightstop();
  });
  $('#rright').on('mousedown', function() {
    document.getElementById("rjoybutton").setAttribute("style", "position:relative;top:20;left:0");
    rrightstart();
  }).on('mouseup mouseleave', function() {
    document.getElementById("rjoybutton").setAttribute("style", "position:relative;top:20;left:-20");
    rrightstop();
  });
  $('#rrighttop').on('mousedown', function() {
    document.getElementById("rjoybutton").setAttribute("style", "position:relative;top:0;left:0");
    rrighttopstart();
  }).on('mouseup mouseleave', function() {
    document.getElementById("rjoybutton").setAttribute("style", "position:relative;top:20;left:-20");
    rrighttopstop();
  });
  $('#a').disableSelection();
  $('#b').disableSelection();
  $('#y').disableSelection();
  $('#x').disableSelection();
  init();
})

let sound = undefined;
let titlelaunch = undefined;
let menutoggle = undefined;

async function init(){
  if(!fs.existsSync(path.join(documents, "uLaunch-Previewer"))){
    fs.mkdirSync(path.join(documents, "uLaunch-Previewer"));
  }
  let ulaunchtester = path.join(documents, "uLaunch-Previewer");
  if(!fs.existsSync(path.join(ulaunchtester, "sdmc"))){
    fs.mkdirSync(path.join(ulaunchtester, "sdmc"));
  } if(!fs.existsSync(path.join(ulaunchtester, "sdmc", "ulaunch"))){
    fs.mkdirSync(path.join(ulaunchtester, "sdmc", "ulaunch"));
  } if(!fs.existsSync(path.join(ulaunchtester, "sdmc", "ulaunch", "entries"))){
    fs.mkdirSync(path.join(ulaunchtester, "sdmc", "ulaunch", "entries"));
  } if(!fs.existsSync(path.join(ulaunchtester, "sdmc", "ulaunch", "lang"))){
    fs.mkdirSync(path.join(ulaunchtester, "sdmc", "ulaunch", "lang"));
  } if(!fs.existsSync(path.join(ulaunchtester, "sdmc", "ulaunch", "themes"))){
    fs.mkdirSync(path.join(ulaunchtester, "sdmc", "ulaunch", "themes"));
  } if(!fs.existsSync(path.join(ulaunchtester, "testersettings"))){
    fs.mkdirSync(path.join(ulaunchtester, "testersettings"));
  } if(!fs.existsSync(path.join(ulaunchtester, "testersettings", "users.json"))){
    fs.writeFileSync(path.join(ulaunchtester, "testersettings", "users.json"), JSON.stringify([{"username": "Default User", "usericon": "default", "password": false}], null, 2), function(err){if(err) throw err;});
  } if(!fs.existsSync(path.join(ulaunchtester, "testersettings", "ulaunch.json"))){
    fs.writeFileSync(path.join(ulaunchtester, "testersettings", "ulaunch.json"), JSON.stringify({"skipstartup":false,"isthemerestart":false,"volume":1,"currenttheme":"default","lang":"en","connected":false,"charging":false,"time":"auto","battery":"100%","firmware":"9.0.0","consolename":"uLaunchTester","viewer_enabled":"False","flog_enabled":"False","console_info_upload":"False","auto_titles_dl":"False","auto_update":"False","wireless_lan":"False","usb_30":"True","bluetooth":"False","nfc":"False"}, null, 2), function(err){if(err) throw err;});
  } if(!fs.existsSync(path.join(ulaunchtester, "testersettings", "menuitems.json"))){
    fs.writeFileSync(path.join(ulaunchtester, "testersettings", "menuitems.json"), JSON.stringify({"folders":{},"hb":[]}, null, 2), function(err){if(err) throw err;});
  } if(!fs.existsSync(path.join(ulaunchtester, "screenshot"))){
    fs.mkdirSync(path.join(ulaunchtester, "screenshot"));
  }
  switchem.on("capture", () => {
    html2canvas(document.getElementById("switchcontainer"), {
        width: 1280,
        height: 720
    }).then(canvas => {
      canvas.setAttribute("style", "width:1280;height:720;display: none;");
      document.body.appendChild(canvas);
      let img = $("canvas").get(0).toDataURL();
      let data = img.replace(/^data:image\/\w+;base64,/, "");
      let buf = Buffer.from(data, 'base64');
      let date = new Date();
      let nums = [];
      for(var i=1; i<61; i++){
        nums.push((i.toString().length == 1) ? `0${i}` : `${i}`);
      }
      let filename = `${date.getFullYear()}-${nums[date.getMonth()]}-${nums[date.getDay()]} ${nums[date.getHours()]}-${nums[date.getMinutes()]}-${nums[date.getSeconds()]}.png`;
      fs.writeFileSync(path.join(ulaunchtester, "screenshot", filename), buf, (err) => {if(err) throw err});
      document.body.removeChild(canvas);
    });
  });
  document.getElementById("switchcontainer").innerHTML = `<div id="ulaunchscreen"></div>`
  let testersettings = require(path.join(ulaunchtester, "testersettings", "ulaunch.json"));
  let currenttheme = testersettings.currenttheme;
  let user;
  let timeout = null;
  document.getElementById("setvol").setAttribute("style", document.getElementById("setvol").getAttribute("style").replace(`width:300`, `width:${testersettings.volume*300}`));
  let vnum = 15;
  switchem.on("volp", () => {
    clearTimeout(timeout);
    let HTMLvolume = parseFloat(document.getElementById("setvol").getAttribute("style").split("width:")[1].split(";")[0].replace("px", ""));
    if(HTMLvolume/300 >= 1){
      $("#vol").fadeTo(100, 1, function(){
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          $("#vol").fadeTo(100, 0);
        }, 3000);
      });
      Howler.volume(1);
      testersettings.volume = 1;
      fs.writeFileSync(path.join(ulaunchtester, "testersettings", "ulaunch.json"), JSON.stringify(testersettings, null, 2), function(err){if(err) throw err;});
    } else {
      document.getElementById("setvol").setAttribute("style", document.getElementById("setvol").getAttribute("style").replace(`width: ${HTMLvolume}px`, `width: ${HTMLvolume+vnum}px`));
      $("#vol").fadeTo(100, 1, function(){
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          $("#vol").fadeTo(100, 0);
        }, 3000);
      });
      Howler.volume((HTMLvolume+vnum)/300);
      testersettings.volume = (HTMLvolume+vnum)/300;
      fs.writeFileSync(path.join(ulaunchtester, "testersettings", "ulaunch.json"), JSON.stringify(testersettings, null, 2), function(err){if(err) throw err;});
    }
  });
  switchem.on("volm", () => {
    clearTimeout(timeout);
    let HTMLvolume = parseFloat(document.getElementById("setvol").getAttribute("style").split("width:")[1].split(";")[0].replace("px", ""));
    if(HTMLvolume/300 <= 0){
      $("#vol").fadeTo(100, 1, function(){
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          $("#vol").fadeTo(100, 0);
        }, 3000);
      });
      Howler.volume(0);
      testersettings.volume = 0;
      fs.writeFileSync(path.join(ulaunchtester, "testersettings", "ulaunch.json"), JSON.stringify(testersettings, null, 2), function(err){if(err) throw err;});
    } else {
      document.getElementById("setvol").setAttribute("style", document.getElementById("setvol").getAttribute("style").replace(`width: ${HTMLvolume}px`, `width: ${HTMLvolume-vnum}px`));
      $("#vol").fadeTo(100, 1, function(){
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          $("#vol").fadeTo(100, 0);
        }, 3000);
      });
      Howler.volume((HTMLvolume-vnum)/300);
      testersettings.volume = (HTMLvolume-vnum)/300;
      fs.writeFileSync(path.join(ulaunchtester, "testersettings", "ulaunch.json"), JSON.stringify(testersettings, null, 2), function(err){if(err) throw err;});
    }
  });
  let defaultui;
  if(currenttheme !== "default"){
    if(fs.existsSync(path.join(ulaunchtester, "sdmc", "ulaunch", "themes", currenttheme))){
      defaultui = path.join(ulaunchtester, "sdmc", "ulaunch", "themes", currenttheme, "ui");
      if(fs.existsSync(path.join(ulaunchtester, "sdmc", "ulaunch", "themes", currenttheme, "sound", "BGM.mp3"))){
        let bgm;
        let defbgm = require(path.join(__dirname, "ulaunch", "romFs", "default", "sound", "BGM.json"));
        if(fs.existsSync(path.join(ulaunchtester, "sdmc", "ulaunch", "themes", currenttheme, "sound", "BGM.json"))){
          bgm = require(path.join(ulaunchtester, "sdmc", "ulaunch", "themes", currenttheme, "sound", "BGM.json"));
          if(bgm.loop === undefined){
            bgm.loop = defbgm.loop;
          } if(bgm.fade_in_ms === undefined){
            bgm.fade_in_ms = defbgm.fade_in_ms;
          } if(bgm.fade_out_ms === undefined){
            bgm.fade_out_ms = defbgm.fade_out_ms;
          }
        } else {
          bgm = defbgm;
        }
        sound = new Howl({
          src: [path.join(ulaunchtester, "sdmc", "ulaunch", "themes", currenttheme, "sound", "BGM.mp3")],
          autoplay: true,
          loop: bgm.loop
        });
        sound.on('load', () => {
          Howler.volume(testersettings.volume);
          fade(sound.duration());
        });
        function fade(duration){
          sound.fade(0,1,bgm.fade_in_ms);
          setTimeout(() => {
            sound.fade(1,0,bgm.fade_out_ms);
            setTimeout(() => {
              if(bgm.loop) fade(duration);
            }, bgm.fade_out_ms);
          }, duration*1000-bgm.fade_out_ms);
        }
      } if(fs.existsSync(path.join(ulaunchtester, "sdmc", "ulaunch", "themes", currenttheme, "sound", "TitleLaunch.wav"))){
        titlelaunch = new Howl({
          src: [path.join(ulaunchtester, "sdmc", "ulaunch", "themes", currenttheme, "sound", "TitleLaunch.wav")],
          autoplay: false,
          loop: false
        });
        titlelaunch.on('load', () => {
          Howler.volume(testersettings.volume);
        });
      } if(fs.existsSync(path.join(ulaunchtester, "sdmc", "ulaunch", "themes", currenttheme, "sound", "MenuToggle.wav"))){
        menutoggle = new Howl({
          src: [path.join(ulaunchtester, "sdmc", "ulaunch", "themes", currenttheme, "sound", "MenuToggle.wav")],
          autoplay: false,
          loop: false
        });
        menutoggle.on('load', () => {
          Howler.volume(testersettings.volume);
        });
      }
    } else {
      defaultui = path.join(__dirname, "ulaunch", "romFs", "default", "ui");
      testersettings.currenttheme = "default";
      fs.writeFileSync(path.join(ulaunchtester, "testersettings", "ulaunch.json"), JSON.stringify(testersettings, null, 2), function(err){if(err) throw err;});
    }
  } else {
    defaultui = path.join(__dirname, "ulaunch", "romFs", "default", "ui");
  }
  let suspended;
  let romfsui = path.join(__dirname, "ulaunch", "romFs", "default", "ui");
  let lang = require(path.join(__dirname, "ulaunch", "romFs", "LangDefault.json"));
  let uijson = InitializeUIJson(require(existsUI("UI.json", defaultui, romfsui)));
  $(document.head).append("<style>@font-face {font-family: 'Font';font-style: normal;src: url('"+existsUI("Font.ttf", defaultui, romfsui).replace(/\\/g, "/")+"');}</style>");
  let defaulticon = {
    albumicon: existsUI("AlbumIcon.png", defaultui, romfsui),
    background: existsUI("Background.png", defaultui, romfsui),
    bannerfolder: existsUI("BannerFolder.png", defaultui, romfsui),
    bannerhomebrew: existsUI("BannerHomebrew.png", defaultui, romfsui),
    bannerinstalled: existsUI("BannerInstalled.png", defaultui, romfsui),
    bannertheme: existsUI("BannerTheme.png", defaultui, romfsui),
    batterychargingicon: existsUI("BatteryChargingIcon.png", defaultui, romfsui),
    batterynormalicon: existsUI("BatteryNormalIcon.png", defaultui, romfsui),
    connectionicon: existsUI("ConnectionIcon.png", defaultui, romfsui),
    controllericon: existsUI("ControllerIcon.png", defaultui, romfsui),
    cursor: existsUI("Cursor.png", defaultui, romfsui),
    folder: existsUI("Folder.png", defaultui, romfsui),
    hbmenu: existsUI("Hbmenu.png", defaultui, romfsui),
    helpicon: existsUI("HelpIcon.png", defaultui, romfsui),
    multiselect: existsUI("Multiselect.png", defaultui, romfsui),
    noconnectionicon: existsUI("NoConnectionIcon.png", defaultui, romfsui),
    powericon: existsUI("PowerIcon.png", defaultui, romfsui),
    quickmenucontrolleritem: existsUI("QuickMenuControllerItem.png", defaultui, romfsui),
    quickmenuhelpitem: existsUI("QuickMenuHelpItem.png", defaultui, romfsui),
    quickmenumain: existsUI("QuickMenuMain.png", defaultui, romfsui),
    quickmenusettingsitem: existsUI("QuickMenuSettingsItem.png", defaultui, romfsui),
    quickmenuthemesitem: existsUI("QuickMenuThemesItem.png", defaultui, romfsui),
    quickmenuwebitem: existsUI("QuickMenuWebItem.png", defaultui, romfsui),
    settingeditable: existsUI("SettingEditable.png", defaultui, romfsui),
    settingnoeditable: existsUI("SettingNoEditable.png", defaultui, romfsui),
    settingsicon: existsUI("SettingsIcon.png", defaultui, romfsui),
    suspended: existsUI("Suspended.png", defaultui, romfsui),
    themesicon: existsUI("ThemesIcon.png", defaultui, romfsui),
    toggleclick: existsUI("ToggleClick.png", defaultui, romfsui),
    topmenu: existsUI("TopMenu.png", defaultui, romfsui),
    usericon: existsUI("UserIcon.png", defaultui, romfsui),
    webicon: existsUI("WebIcon.png", defaultui, romfsui),
  }
  let size = await InitializeSize({
    albumicon: {w: 50,h: 50},
    background: {w: 1280,h: 720},
    bannerfolder: {w: 1280,h: 135},
    bannerhomebrew: {w: 1280,h: 135},
    bannerinstalled: {w: 1280,h: 135},
    bannertheme: {w: 1280,h: 135},
    batterychargingicon: {w: 30,h: 30},
    batterynormalicon: {w: 30,h: 30},
    connectionicon: {w: 50,h: 50},
    controllericon: {w: 50,h: 50},
    cursor: {w: 296,h: 296},
    folder: {w: 256,h: 256},
    hbmenu: {w: 256,h: 256},
    helpicon: {w: 50,h: 50},
    multiselect: {w: 296,h: 296},
    noconnectionicon: {w: 50,h: 50},
    powericon: {w: 50,h: 50},
    quickmenucontrolleritem: {w: 150,h: 150},
    quickmenuhelpitem: {w: 150,h: 150},
    quickmenumain: {w: 300,h: 300},
    quickmenusettingsitem: {w: 150,h: 150},
    quickmenuthemesitem: {w: 150,h: 150},
    quickmenuwebitem: {w: 150,h: 150},
    settingeditable: {w: 100,h: 100},
    settingnoeditable: {w: 100,h: 100},
    settingsicon: {w: 50,h: 50},
    suspended: {w: 296,h: 296},
    themesicon: {w: 50,h: 50},
    toggleclick: {w: 240,h: 70},
    topmenu: {w: 1200,h: 85},
    usericon: {w: 50,h: 50},
    webicon: {w: 50,h: 50},
  }, defaulticon, uijson);
  function startup(){
    return new Promise(function(resolve, reject) {
      let res = false;
      let selected = 0;
      let max = 0;
      let down,leftclick;
      let users = require(path.join(ulaunchtester, "testersettings", "users.json"));
      if(testersettings.skipstartup || testersettings.isthemerestart){
        if(testersettings.isthemerestart) {
          testersettings.isthemerestart = false;
          fs.writeFileSync(path.join(ulaunchtester, "testersettings", "ulaunch.json"), JSON.stringify(testersettings, null, 2), function(err){if(err) throw err;});
          ShowNotification(lang["theme_changed"], uijson);
        }
        user = users[0];
        console.log(user);
        if(user === undefined){
          user = {"username": "Default User", "usericon": "default", "password": false}
        }
        mainmenu();
        resolve();
      } else {
        document.getElementById("ulaunchscreen").innerHTML = ejs.render(fs.readFileSync(path.join(__dirname, "ulaunch", "startup.ejs"), "utf8"), {defaulticon, lang, uijson, users, path});
        let inputs = $("#ulaunchscreen :input");
        max = inputs.length
        console.log(max);
        inputs.click((e) => {
          leftclick = true;
          click(e.currentTarget.id);
        });
        switchem.on("arrowdown", () => {
          leftclick = false;
          down = true;
          click(selected+1);
        });
        switchem.on("lbottomstart", () => {
          leftclick = false;
          down = true;
          click(selected+1);
        });
        switchem.on("rbottomstart", () => {
          leftclick = false;
          down = true;
          click(selected+1);
        });
        switchem.on("arrowup", () => {
          leftclick = false;
          down = false;
          click(selected-1);
        });
        switchem.on("ltopstart", () => {
          leftclick = false;
          down = false;
          click(selected-1);
        });
        switchem.on("rtopstart", () => {
          leftclick = false;
          down = false;
          click(selected-1);
        });
        switchem.on("a", () => {
          dblclick(selected);
        });
        inputs.dblclick((e) => {
          dblclick(e.currentTarget.id);
        });
        function click(id){
          if(res) return;
          let input = document.getElementById(id+"g");
          let before = document.getElementById(selected+"g");
          if(input === null) return;
          selected = parseInt(id);
          before.setAttribute("style", before.getAttribute("style").replace(uijson["menu_focus_color"], uijson["menu_bg_color"]));
          input.setAttribute("style", input.getAttribute("style").replace(uijson["menu_bg_color"], uijson["menu_focus_color"]));
          if(leftclick) return;
          let scroll = document.getElementById("users").scrollTop;
          if(down){
            if(selected*100-400 < scroll) return;
            $(`#users`).animate({
                scrollTop: selected*100-400
            }, 0);
          } else {
            if(selected*100 > scroll) return;
            $(`#users`).animate({
                scrollTop: selected*100
            }, 0);
          }
        }
        function dblclick(id){
          if(res) return;
          let input = document.getElementById(id);
          if(users.length == parseInt(id)){
            users.push({
              "username": "New User",
              "usericon": "default",
              "password": false
            });
            fs.writeFileSync(path.join(ulaunchtester, "testersettings", "users.json"), JSON.stringify(users, null, 2), function(err){if(err) throw err;});
            startup();
            res = true;
            resolve();
          } else {
            user = users[id];
            mainmenu();
            res = true;
            resolve();
          }
        }
      }
    });
  }
  function mainmenu(){
    return new Promise(async function(resolve, reject) {
      let res = false;
      let interval = null;
      let logo = path.join(__dirname, "ulaunch", "romFs", "Logo.png");
      let gameimg = path.join(__dirname, "ulaunch", "game.png");
      let usericon = (user.usericon === "default") ? path.join(__dirname, "ulaunch", "User.png") : user.usericon;
      let games = require(path.join(__dirname, "ulaunch", "game", "games.json"));
      document.getElementById("ulaunchscreen").innerHTML = ejs.render(fs.readFileSync(path.join(__dirname, "ulaunch", "main.ejs"), "utf8"), {defaulticon, games, testersettings, uijson, logo, size, usericon, gameimg});
      if(suspended !== undefined){
        $("#suspendedimgg").show();
      }
      document.getElementById("in").innerHTML = games[0].name;
      document.getElementById("ia").innerHTML = games[0].author;
      document.getElementById("iv").innerHTML = "v"+games[0].version;
      if(testersettings.time === "auto"){
        let time = new Date();
        let minutes = [];
        let hours = [];
        for(var i=0; i<61; i++){
          minutes.push((i.toString().length == 1) ? "0"+i : i);
          if(i < 24){
            hours.push((i.toString().length == 1) ? "0"+i : i);
          }
        }
        let hour = hours[time.getHours()];
        let minute = minutes[time.getMinutes()];
        let times = `${hour}:${minute}`;
        document.getElementById("time").innerHTML = times;
        interval = setInterval(() => {
          time = new Date();
          hour = hours[time.getHours()];
          minute = minutes[time.getMinutes()];
          times = `${hour}:${minute}`;
          document.getElementById("time").innerHTML = times;
        }, 1);
      }
      $(':not(input,select,textarea)').disableSelection();
      $("#theme").click(() => {
        if(res) return;
        clearInterval(interval);
        theme();
        res = true;
        resolve();
      });
      $("#setting").click(() => {
        if(res) return;
        clearInterval(interval);
        settings();
        res = true;
        resolve();
      });
      $("#logo").click(async () => {
        if(res) return;
        res = true;
        let ress = false;
        let dialog = await createDialog(lang["ulaunch_about"], `uLaunch v0.1<br><br>${lang["ulaunch_desc"]}<br><br>${lang["ulaunch_contribute"]}:<br>https://github.com/XorTroll/uLaunch`, ["Ok"], false, path.join(__dirname, "ulaunch", "romFs", "LogoLarge.png"));
        $("#ulaunchscreen").append(dialog);
        let inputs = $("#dialog :input");
        let selected = 0;
        let max = inputs.length;
        inputs.click((e) => {
          click(e.currentTarget.id);
        });
        switchem.on("arrowright", () => {
          click(selected+1);
        });
        switchem.on("lrightstart", () => {
          click(selected+1);
        });
        switchem.on("rrightstart", () => {
          click(selected+1);
        });
        switchem.on("arrowleft", () => {
          click(selected-1);
        });
        switchem.on("lleftstart", () => {
          click(selected-1);
        });
        switchem.on("rleftstart", () => {
          click(selected-1);
        });
        switchem.on("a", () => {
          dblclick(selected);
        });
        inputs.dblclick((e) => {
          dblclick(e.currentTarget.id);
        });
        function click(id){
          if(ress) return;
          let input = $(`#dialog #${id}`).get(0);
          let before = $(`#dialog #${selected}`).get(0);
          if(input === undefined) return;
          before.setAttribute("style", before.getAttribute("style").replace("#B4B4C8FF", "#B4B4C800"));
          input.setAttribute("style", input.getAttribute("style").replace("#B4B4C800", "#B4B4C8FF"));
          selected = parseInt(id);
        }
        function dblclick(id){
          if(ress) return;
          ress = true;
          res = false;
          $("#dialog").remove();
        }
      });
      $("#user").click(async () => {
        if(res) return;
        res = true;
        let ress = false;
        let dialog = await createDialog(lang["user_settings"], `${lang["user_selected"]}: ${user.username}<br>${lang["user_option"]}`, [`${(user.password) ? lang["user_pass_ch"] : lang["user_pass_reg"]}`, lang["user_view_page"], lang["user_logoff"], lang["cancel"]], false, usericon);
        $("#ulaunchscreen").append(dialog);
        let inputs = $("#dialog :input");
        let selected = 0;
        let max = inputs.length;
        inputs.click((e) => {
          click(e.currentTarget.id);
        });
        switchem.on("arrowright", () => {
          click(selected+1);
        });
        switchem.on("lrightstart", () => {
          click(selected+1);
        });
        switchem.on("rrightstart", () => {
          click(selected+1);
        });
        switchem.on("arrowleft", () => {
          click(selected-1);
        });
        switchem.on("lleftstart", () => {
          click(selected-1);
        });
        switchem.on("rleftstart", () => {
          click(selected-1);
        });
        switchem.on("a", () => {
          dblclick(selected);
        });
        inputs.dblclick((e) => {
          dblclick(e.currentTarget.id);
        });
        function click(id){
          if(ress) return;
          let input = $(`#dialog #${id}`).get(0);
          let before = $(`#dialog #${selected}`).get(0);
          if(input === undefined) return;
          before.setAttribute("style", before.getAttribute("style").replace("#B4B4C8FF", "#B4B4C800"));
          input.setAttribute("style", input.getAttribute("style").replace("#B4B4C800", "#B4B4C8FF"));
          selected = parseInt(id);
        }
        function dblclick(id){
          if(ress) return;
          ress = true;
          res = false;
          $("#dialog").remove();
        }
      });
      function menuitems(){
        return new Promise(async function(resolve, reject) {
          let ress = false;
          document.getElementById("bi").setAttribute("style", document.getElementById("bi").getAttribute("style").replace("hidden", uijson["main_menu"]["banner_image"]["visible"]))
          document.getElementById("bf").setAttribute("style", document.getElementById("bf").getAttribute("style").replace("visible", "hidden"));
          document.getElementById("bh").setAttribute("style", document.getElementById("bh").getAttribute("style").replace("visible", "hidden"));
          let menuitems = require(path.join(ulaunchtester, "testersettings", "menuitems.json"));
          let height = [size.cursor.h, size.multiselect.h, size.suspended.h].sort((a, b) => a > b)[0];
          let top = (height-256)/2;
          let left = 0;
          let n = -1;
          let cursor = (height-size.cursor.h)/2;
          let suspendedd = (height-size.suspended.h)/2;
          let multiselectt = (height-size.multiselect.h)/2;
          let items = [];
          let folders = menuitems.folders;
          let ifolders = [];
          let numf = Object.keys(folders);
          let ids = [];
          for(var i=0; i<numf.length; i++){
            n += 1;
            let name = numf[i];
            let titles = folders[name];
            ids = ids.concat(titles);
            if(n == 0){
              let entry = `${titles.length} ${(titles.length < 2) ? lang["folder_entry_single"] : lang["folder_entry_mult"]}`;
              document.getElementById("in").innerHTML = name;
              document.getElementById("ia").innerHTML = entry;
              document.getElementById("iv").innerHTML = "";
              document.getElementById("bi").setAttribute("style", document.getElementById("bi").getAttribute("style").replace("visible", "hidden"))
              document.getElementById("bf").setAttribute("style", document.getElementById("bf").getAttribute("style").replace("hidden", uijson["main_menu"]["banner_image"]["visible"]));
              document.getElementById("bh").setAttribute("style", document.getElementById("bh").getAttribute("style").replace("visible", "hidden"));
              left = 98;
              ifolders.push(`<img width="256" height="256" style="position: absolute;top: ${top}; left: ${left}" src="${defaulticon.folder}" alt="folder/${entry}/${name}"/><p style="position: absolute;top: ${uijson["menu_folder_text_y"]}; left: ${uijson["menu_folder_text_x"] + left};border: 0;font-family: 'Font'; font-size: ${uijson["menu_folder_text_size"]};margin: 0px 0px; background-color: transparent; border: 0; color: ${uijson["text_color"]}">${name}</p><input style="width:256;height:256;position: absolute;top: ${top}; left: ${left};z-index: 1;outline: none;border: none;background-color: transparent;pointer-events:auto;" type="button" id="${n}" alt="folder/${entry}/${name}"/>`)
            } else {
              let entry = `${titles.length} ${(titles.length < 2) ? lang["folder_entry_single"] : lang["folder_entry_mult"]}`;
              left += 276;
              ifolders.push(`<img width="256" height="256" style="position: absolute;top: ${top}; left: ${left}" src="${defaulticon.folder}" alt="folder/${entry}/${name}"/><p style="position: absolute;top: ${uijson["menu_folder_text_y"]}; left: ${uijson["menu_folder_text_x"] + left};border: 0;font-family: 'Font'; font-size: ${uijson["menu_folder_text_size"]};margin: 0px 0px; background-color: transparent; border: 0; color: ${uijson["text_color"]}">${name}</p><input style="width:256;height:256;position: absolute;top: ${top}; left: ${left};z-index: 1;outline: none;border: none;background-color: transparent;pointer-events:auto;" type="button" id="${n}" alt="folder/${entry}/${name}"/>`)
            }
          }
          items = items.concat(ifolders);
          let igames = games.map((game) => {
            if(ids.includes(game.id)) return "";
            n += 1;
            let width = 256;
            let height = 256;
            if(n == 0){
              document.getElementById("in").innerHTML = game.name;
              document.getElementById("ia").innerHTML = game.author;
              document.getElementById("iv").innerHTML = "v"+game.version;
              left = 98;
              return `<img width="256" height="256" style="position: absolute;top: ${top}; left: ${left}" src="${path.join(__dirname, "ulaunch", "game", game.icon)}" alt="game/${game.id}"/><input style="width:256;height:256;position: absolute;top: ${top}; left: ${left};z-index: 1;outline: none;border: none;background-color: transparent;pointer-events:auto;" type="button" id="${n}" alt="game/${game.id}"/>`
            } else {
              left += 276;
              return `<img width="256" height="256" style="position: absolute;top: ${top}; left: ${left}" src="${path.join(__dirname, "ulaunch", "game", game.icon)}" alt="game/${game.id}"/><input style="width:256;height:256;position: absolute;top: ${top}; left: ${left};z-index: 1;outline: none;border: none;background-color: transparent;pointer-events:auto;" type="button" id="${n}" alt="game/${game.id}"/>`
            }
          });
          items = items.concat(igames);
          let hbi = menuitems.hb.map(file => {
            let ret = false;
            numf.map(f => {
              if(folders[f].includes(file)) ret = true;
            });
            if(ret) return "";
            file = path.join(ulaunchtester, "sdmc", "ulaunch", "entries", file);
            let content = require(file);
            if(content.icon == "" || content.icon == null || content.icon == undefined || !fs.existsSync(content.icon.replace("sdmc:", path.join(ulaunchtester, "sdmc")))) return "";
            left += 276;
            n += 1;
            return `<img width="256" height="256" style="position: absolute;top: ${top}; left: ${left}" src="${content.icon.replace("sdmc:", path.join(ulaunchtester, "sdmc"))}" alt="homebrew/${content.name.substring(0, 0x1FF)}/${content.author.substring(0, 0xFF)}/${content.version.substring(0, 0xF)}"/><input style="width:256;height:256;position: absolute;top: ${top}; left: ${left};z-index: 1;outline: none;border: none;background-color: transparent;pointer-events:auto;" type="button" id="${n}" alt="homebrew/${content.name.substring(0, 0x1FF)}/${content.author.substring(0, 0xFF)}/${content.version.substring(0, 0xF)}"/>`;
          });
          items = items.concat(hbi);
          items.push(`<img width="${size.suspended.w}" height="${size.suspended.h}" style="position: absolute;top: ${suspendedd}; left: ${98-(size.suspended.w-256)/2};pointer-events:none;display:none;" src="${defaulticon.suspended}" id="suspended"/>`)
          items.push(`<img width="${size.cursor.w}" height="${size.cursor.h}" style="position: absolute;top: ${cursor}; left: ${98-(size.cursor.w-256)/2}" src="${defaulticon.cursor}" id="cursor"/>`)
          items.push(`<div id="multiselect" style="position:absolute;top:0;left:0;width:100%;height:100%;background-color: transparent;pointer-events:none;"></div>`)
          items.push(`<input type="button" style="position: absolute;border:none;outline:none;background-color:transparent;top:0;width:1;height:1;left:${left+256+86}"/>`)
          items = items.join("");
          document.getElementById("items").innerHTML = items;
          if(suspended !== undefined){
            try {
              let item = $(`input[alt="${suspended}"]`).get(0).getAttribute("style");
              let l = item.split("left:")[1].split(";")[0];
              document.getElementById("suspended").setAttribute("style", `position: absolute;top: ${suspendedd}; left: ${l-(size.suspended.w-256)/2};pointer-events:none;display:none;`);
              $("#suspended").show();
            }catch(e){}
          }
          let max = 0;
          let selected = 0;
          let inputs = $("#items :input");
          max = inputs.length;
          inputs.click((e) => {
            click(e.currentTarget.id);
          });
          switchem.on("arrowright", () => {
            click(selected+1);
          });
          switchem.on("lrightstart", () => {
            click(selected+1);
          });
          switchem.on("rrightstart", () => {
            click(selected+1);
          });
          switchem.on("arrowleft", () => {
            click(selected-1);
          });
          switchem.on("lleftstart", () => {
            click(selected-1);
          });
          switchem.on("rleftstart", () => {
            click(selected-1);
          });
          switchem.on("a", () => {
            dblclick(selected);
          });
          inputs.dblclick((e) => {
            dblclick(e.currentTarget.id);
          });
          function click(id){
            if(ress || res) return;
            let input = document.getElementById(id);
            if(input === null) return;
            let cursor = ([size.cursor.h, size.multiselect.h, size.suspended.h].sort((a, b) => a > b)[0]-size.cursor.h)/2;
            let leftcursor = 98+276*parseInt(id)-20;
            selected = parseInt(id);
            document.getElementById("cursor").setAttribute("style", `position: absolute;top: ${cursor}; left: ${leftcursor}`);
            let alt = input.getAttribute("alt");
            if(alt.startsWith("game")){
              let game = games.find(g => g.id === alt.split("/")[1]);
              document.getElementById("in").innerHTML = game.name;
              document.getElementById("ia").innerHTML = game.author;
              document.getElementById("iv").innerHTML = "v"+game.version;
              document.getElementById("bi").setAttribute("style", document.getElementById("bi").getAttribute("style").replace("hidden", uijson["main_menu"]["banner_image"]["visible"]))
              document.getElementById("bf").setAttribute("style", document.getElementById("bf").getAttribute("style").replace("visible", "hidden"));
              document.getElementById("bh").setAttribute("style", document.getElementById("bh").getAttribute("style").replace("visible", "hidden"));
            } else if(alt.startsWith("folder")){
              let name = alt.split("/")[2];
              let entry = alt.split("/")[1];
              document.getElementById("in").innerHTML = name;
              document.getElementById("ia").innerHTML = entry;
              document.getElementById("iv").innerHTML = "";
              document.getElementById("bi").setAttribute("style", document.getElementById("bi").getAttribute("style").replace("visible", "hidden"))
              document.getElementById("bf").setAttribute("style", document.getElementById("bf").getAttribute("style").replace("hidden", uijson["main_menu"]["banner_image"]["visible"]));
              document.getElementById("bh").setAttribute("style", document.getElementById("bh").getAttribute("style").replace("visible", "hidden"));
            } else if(alt.startsWith("homebrew")){
              alt = alt.split("/");
              document.getElementById("in").innerHTML = alt[1];
              document.getElementById("ia").innerHTML = alt[2];
              document.getElementById("iv").innerHTML = alt[3];
              document.getElementById("bi").setAttribute("style", document.getElementById("bi").getAttribute("style").replace("visible", "hidden"))
              document.getElementById("bf").setAttribute("style", document.getElementById("bf").getAttribute("style").replace("visible", "hidden"));
              document.getElementById("bh").setAttribute("style", document.getElementById("bh").getAttribute("style").replace("hidden", uijson["main_menu"]["banner_image"]["visible"]));
            }
            let scroll = document.getElementById("items").scrollLeft;
            if(selected*276 > scroll){
              if(selected*276-276*3 < scroll) return;
              $(`#items`).animate({
                  scrollLeft: selected*276-276*3
              }, 0);
            } else {
              $(`#items`).animate({
                  scrollLeft: selected*276
              }, 0);
            }
          }
          async function dblclick(id){
            if(ress || res) return;
            let alt = document.getElementById(id).getAttribute("alt");
            let iid = id;
            if(alt.startsWith("folder")){
              ress = true;
              folderitems(alt.split("/")[2]);
              resolve();
            } else if(alt.startsWith("homebrew")) {
              if(suspended !== undefined){
                let ret = await new Promise(async function(resolve, reject) {
                  let resss = false;
                  res = true;
                  let dialog = await createDialog(lang["suspended_app"], lang["suspended_close"], [lang["yes"], lang["cancel"]]);
                  $("#ulaunchscreen").append(dialog);
                  let inputs = $("#dialog :input");
                  let selected = 0;
                  let max = inputs.length;
                  inputs.click((e) => {
                    click(e.currentTarget.id);
                  });
                  switchem.on("arrowright", () => {
                    click(selected+1);
                  });
                  switchem.on("lrightstart", () => {
                    click(selected+1);
                  });
                  switchem.on("rrightstart", () => {
                    click(selected+1);
                  });
                  switchem.on("arrowleft", () => {
                    click(selected-1);
                  });
                  switchem.on("lleftstart", () => {
                    click(selected-1);
                  });
                  switchem.on("rleftstart", () => {
                    click(selected-1);
                  });
                  switchem.on("a", () => {
                    dblclick(selected);
                  });
                  inputs.dblclick((e) => {
                    dblclick(e.currentTarget.id);
                  });
                  function click(id){
                    if(ress) return;
                    let input = $(`#dialog #${id}`).get(0);
                    let before = $(`#dialog #${selected}`).get(0);
                    if(input === undefined) return;
                    before.setAttribute("style", before.getAttribute("style").replace("#B4B4C8FF", "#B4B4C800"));
                    input.setAttribute("style", input.getAttribute("style").replace("#B4B4C800", "#B4B4C8FF"));
                    selected = parseInt(id);
                  }
                  function dblclick(id){
                    if(resss) return;
                    if(id == 0){
                      $("#title").remove();
                      $("#suspended").hide();
                      suspended = undefined;
                      resss = true;
                      res = false;
                      $("#dialog").remove();
                      resolve(false);
                    } else {
                      resss = true;
                      res = false;
                      $("#dialog").remove();
                      resolve(true);
                    }
                  }
                });
                if(ret) return;
              }
              res = true;
              let dialog = await createDialog(lang["hb_launch"], lang["hb_launch_conf"], [lang["hb_applet"], lang["hb_app"], lang["cancel"]]);
              $("#ulaunchscreen").append(dialog);
              let inputs = $("#dialog :input");
              let selected = 0;
              let max = inputs.length;
              inputs.click((e) => {
                click(e.currentTarget.id);
              });
              switchem.on("arrowright", () => {
                click(selected+1);
              });
              switchem.on("lrightstart", () => {
                click(selected+1);
              });
              switchem.on("rrightstart", () => {
                click(selected+1);
              });
              switchem.on("arrowleft", () => {
                click(selected-1);
              });
              switchem.on("lleftstart", () => {
                click(selected-1);
              });
              switchem.on("rleftstart", () => {
                click(selected-1);
              });
              switchem.on("a", () => {
                dblclick(selected);
              });
              inputs.dblclick((e) => {
                dblclick(e.currentTarget.id);
              });
              function click(id){
                if(ress) return;
                let input = $(`#dialog #${id}`).get(0);
                let before = $(`#dialog #${selected}`).get(0);
                if(input === undefined) return;
                before.setAttribute("style", before.getAttribute("style").replace("#B4B4C8FF", "#B4B4C800"));
                input.setAttribute("style", input.getAttribute("style").replace("#B4B4C800", "#B4B4C8FF"));
                selected = parseInt(id);
              }
              function dblclick(id){
                if(ress) return;
                if(id == 0){
                  $("#dialog").remove();
                  if(sound) sound.stop();
                  if(titlelaunch !== undefined){
                    if(titlelaunch.playing()) titlelaunch.stop();
                    titlelaunch.play();
                  }
                  $("#ulaunchscreen").append(`<input type="button" style="background-color:#111;outline:none;border:none;position:absolute;top:0;left:0;width:1280;height:720" id="title"/>`);
                  setTimeout(() => {
                    $("#title").remove();
                    if(sound) sound.play();
                    res = false;
                  }, 1000);
                } else if(id == 1){
                  $("#dialog").remove();
                  if(sound) sound.stop();
                  if(titlelaunch !== undefined){
                    if(titlelaunch.playing()) titlelaunch.stop();
                    titlelaunch.play();
                  }
                  $("#ulaunchscreen").append(`<input type="button" style="background-color:#111;outline:none;border:none;position:absolute;top:0;left:0;width:1280;height:720" id="title"/>`);
                  setTimeout(() => {
                    $("#title").remove();
                    suspended = alt;
                    if(sound) sound.play();
                    $("#suspendedimg").append(`<input type="button" style="background-color:#111;outline:none;border:none;top:50%;left:50%;transform:translate(-50%, -50%);position:absolute;width:1280;height:720;" id="title"/>`);
                    $("#title").animate({width: 1008,height:584,opacity:0.5}, 1000, () => {
                      res = false;
                    });
                    let item = document.getElementById(iid).getAttribute("style");
                    let l = item.split("left:")[1].split(";")[0];
                    document.getElementById("suspended").setAttribute("style", `position: absolute;top: ${suspendedd}; left: ${l-(size.suspended.w-256)/2};pointer-events:none;display:none;`)
                    $("#suspended").show();
                  }, 1000);
                } else if(id == 2){
                  res = false;
                  $("#dialog").remove();
                }
              }
            } else {
              if(suspended !== undefined){
                let ret = await new Promise(async function(resolve, reject) {
                  let resss = false;
                  res = true;
                  let dialog = await createDialog(lang["suspended_app"], lang["suspended_close"], [lang["yes"], lang["cancel"]]);
                  $("#ulaunchscreen").append(dialog);
                  let inputs = $("#dialog :input");
                  let selected = 0;
                  let max = inputs.length;
                  inputs.click((e) => {
                    click(e.currentTarget.id);
                  });
                  switchem.on("arrowright", () => {
                    click(selected+1);
                  });
                  switchem.on("lrightstart", () => {
                    click(selected+1);
                  });
                  switchem.on("rrightstart", () => {
                    click(selected+1);
                  });
                  switchem.on("arrowleft", () => {
                    click(selected-1);
                  });
                  switchem.on("lleftstart", () => {
                    click(selected-1);
                  });
                  switchem.on("rleftstart", () => {
                    click(selected-1);
                  });
                  switchem.on("a", () => {
                    dblclick(selected);
                  });
                  inputs.dblclick((e) => {
                    dblclick(e.currentTarget.id);
                  });
                  function click(id){
                    if(ress) return;
                    let input = $(`#dialog #${id}`).get(0);
                    let before = $(`#dialog #${selected}`).get(0);
                    if(input === undefined) return;
                    before.setAttribute("style", before.getAttribute("style").replace("#B4B4C8FF", "#B4B4C800"));
                    input.setAttribute("style", input.getAttribute("style").replace("#B4B4C800", "#B4B4C8FF"));
                    selected = parseInt(id);
                  }
                  function dblclick(id){
                    if(resss) return;
                    if(id == 0){
                      $("#title").remove();
                      $("#suspended").hide();
                      suspended = undefined;
                      resss = true;
                      res = false;
                      $("#dialog").remove();
                      resolve(false);
                    } else {
                      resss = true;
                      res = false;
                      $("#dialog").remove();
                      resolve(true);
                    }
                  }
                });
                if(ret) return;
              }
              if(sound) sound.stop();
              if(titlelaunch !== undefined){
                if(titlelaunch.playing()) titlelaunch.stop();
                titlelaunch.play();
              }
              $("#ulaunchscreen").append(`<input type="button" style="background-color:#111;outline:none;border:none;position:absolute;top:0;left:0;width:1280;height:720" id="title"/>`);
              setTimeout(() => {
                $("#title").remove();
                suspended = alt;
                if(sound) sound.play();
                $("#suspendedimg").append(`<input type="button" style="background-color:#111;outline:none;border:none;top:50%;left:50%;transform:translate(-50%, -50%);position:absolute;width:1280;height:720;" id="title"/>`);
                $("#title").animate({width: 1008,height:584,opacity:0.5}, 1000, () => {
                  res = false;
                });
                let item = document.getElementById(iid).getAttribute("style");
                let l = item.split("left:")[1].split(";")[0];
                document.getElementById("suspended").setAttribute("style", `position: absolute;top: ${suspendedd}; left: ${l-(size.suspended.w-256)/2};pointer-events:none;display:none;`)
                $("#suspended").show();
              }, 1000);
            }
          }
          $("#toggleclick").click(() => {
            hbmenu();
          });
          switchem.on("arrowup", () => {
            hbmenu();
          });
          switchem.on("ltopstart", () => {
            hbmenu();
          });
          switchem.on("rtopstart", () => {
            hbmenu();
          });
          function hbmenu(){
            if(ress || res) return;
            if(menutoggle !== undefined){
              if(menutoggle.playing()) menutoggle.stop();
              menutoggle.play();
            }
            ress = true;
            hbitems();
          }
        });
      }
      function folderitems(name){
        return new Promise(function(resolve, reject) {
          let ress = false;
          document.getElementById("bi").setAttribute("style", document.getElementById("bi").getAttribute("style").replace("hidden", uijson["main_menu"]["banner_image"]["visible"]))
          document.getElementById("bf").setAttribute("style", document.getElementById("bf").getAttribute("style").replace("visible", "hidden"));
          document.getElementById("bh").setAttribute("style", document.getElementById("bh").getAttribute("style").replace("visible", "hidden"));
          let height = [size.cursor.h, size.multiselect.h, size.suspended.h].sort((a, b) => a > b)[0];
          let top = (height-256)/2;
          let left = 98;
          let n = -1;
          let folders = require(path.join(ulaunchtester, "testersettings", "menuitems.json")).folders[name];
          let items = games.filter((game) => {
            if(folders.includes(game.id)){
              folders = folders.filter(f => f !== game.id);
              return true
            }
          }).map((game) => {
            n += 1;
            if(n == 0){
              document.getElementById("in").innerHTML = game.name;
              document.getElementById("ia").innerHTML = game.author;
              document.getElementById("iv").innerHTML = "v"+game.version;
              left = 98;
              return `<img width="256" height="256" style="position: absolute;top: ${top}; left: ${left}" src="${path.join(__dirname, "ulaunch", "game", game.icon)}" alt="game/${game.id}"/><input style="width:256;height:256;position: absolute;top: ${top}; left: ${left};z-index: 1;outline: none;border: none;background-color: transparent;pointer-events:auto;" type="button" id="${n}" alt="game/${game.id}"/>`
            } else {
              left += 276;
              return `<img width="256" height="256" style="position: absolute;top: ${top}; left: ${left}" src="${path.join(__dirname, "ulaunch", "game", game.icon)}" alt="game/${game.id}"/><input style="width:256;height:256;position: absolute;top: ${top}; left: ${left};z-index: 1;outline: none;border: none;background-color: transparent;pointer-events:auto;" type="button" id="${n}" alt="game/${game.id}"/>`
            }
          });
          let hb = folders.map(file => {
            file = path.join(ulaunchtester, "sdmc", "ulaunch", "entries", file);
            let content = require(file);
            if(content.icon == "" || content.icon == null || content.icon == undefined || !fs.existsSync(content.icon.replace("sdmc:", path.join(ulaunchtester, "sdmc")))) return "";
            left += 276;
            n += 1;
            return `<img width="256" height="256" style="position: absolute;top: ${top}; left: ${left}" src="${content.icon.replace("sdmc:", path.join(ulaunchtester, "sdmc"))}" alt="homebrew/${content.name.substring(0, 0x1FF)}/${content.author.substring(0, 0xFF)}/${content.version.substring(0, 0xF)}"/><input style="width:256;height:256;position: absolute;top: ${top}; left: ${left};z-index: 1;outline: none;border: none;background-color: transparent;pointer-events:auto;" type="button" id="${n}" alt="homebrew/${content.name.substring(0, 0x1FF)}/${content.author.substring(0, 0xFF)}/${content.version.substring(0, 0xF)}"/>`;
          });
          items = items.concat(hb);
          let cursor = (height-size.cursor.h)/2;
          let suspendedd = (height-size.suspended.h)/2;
          let multiselectt = (height-size.multiselect.h)/2;
          items.push(`<img width="${size.suspended.w}" height="${size.suspended.h}" style="position: absolute;top: ${suspendedd}; left: ${98-(size.suspended.w-256)/2};pointer-events:none;display:none;" src="${defaulticon.suspended}" id="suspended"/>`)
          items.push(`<img width="${size.cursor.w}" height="${size.cursor.h}" style="position: absolute;top: ${cursor}; left: ${98-(size.cursor.w-256)/2}" src="${defaulticon.cursor}" id="cursor"/>`)
          items.push(`<div id="multiselect" style="position:absolute;top:0;left:0;width:100%;height:100%;background-color: transparent;pointer-events:none;"></div>`)
          items.push(`<input type="button" style="position: absolute;border:none;outline:none;background-color:transparent;top:0;width:1;height:1;left:${left+256+86}"/>`)
          items = items.join("");
          document.getElementById("items").innerHTML = items;
          if(suspended !== undefined){
            try {
              let item = $(`input[alt="${suspended}"]`).get(0).getAttribute("style");
              let l = item.split("left:")[1].split(";")[0];
              document.getElementById("suspended").setAttribute("style", `position: absolute;top: ${suspendedd}; left: ${l-(size.suspended.w-256)/2};pointer-events:none;display:none;`);
              $("#suspended").show();
            }catch(e){}
          }
          let max = 0;
          let selected = 0;
          let inputs = $("#items :input");
          console.log(inputs)
          max = inputs.length;
          inputs.click((e) => {
            click(e.currentTarget.id);
          });
          switchem.on("arrowright", () => {
            click(selected+1);
          });
          switchem.on("lrightstart", () => {
            click(selected+1);
          });
          switchem.on("rrightstart", () => {
            click(selected+1);
          });
          switchem.on("arrowleft", () => {
            click(selected-1);
          });
          switchem.on("lleftstart", () => {
            click(selected-1);
          });
          switchem.on("rleftstart", () => {
            click(selected-1);
          });
          switchem.on("a", () => {
            dblclick(selected);
          });
          switchem.on("b", () => {
            if(ress || res) return;
            ress = true;
            menuitems();
          });
          inputs.dblclick((e) => {
            dblclick(e.currentTarget.id);
          });
          function click(id){
            if(ress || res) return;
            let input = document.getElementById(id);
            if(input === null) return;
            let cursor = ([size.cursor.h, size.multiselect.h, size.suspended.h].sort((a, b) => a > b)[0]-size.cursor.h)/2;
            let leftcursor = 98+276*parseInt(id)-20;
            selected = parseInt(id);
            document.getElementById("cursor").setAttribute("style", `position: absolute;top: ${cursor}; left: ${leftcursor}`);
            let alt = input.getAttribute("alt");
            if(alt.startsWith("game")){
              let game = games.find(g => g.id === alt.split("/")[1]);
              document.getElementById("in").innerHTML = game.name;
              document.getElementById("ia").innerHTML = game.author;
              document.getElementById("iv").innerHTML = "v"+game.version;
              document.getElementById("bi").setAttribute("style", document.getElementById("bi").getAttribute("style").replace("hidden", uijson["main_menu"]["banner_image"]["visible"]))
              document.getElementById("bf").setAttribute("style", document.getElementById("bf").getAttribute("style").replace("visible", "hidden"));
              document.getElementById("bh").setAttribute("style", document.getElementById("bh").getAttribute("style").replace("visible", "hidden"));
            } else if(alt.startsWith("homebrew")){
              alt = alt.split("/");
              document.getElementById("in").innerHTML = alt[1];
              document.getElementById("ia").innerHTML = alt[2];
              document.getElementById("iv").innerHTML = alt[3];
              document.getElementById("bi").setAttribute("style", document.getElementById("bi").getAttribute("style").replace("visible", "hidden"))
              document.getElementById("bf").setAttribute("style", document.getElementById("bf").getAttribute("style").replace("visible", "hidden"));
              document.getElementById("bh").setAttribute("style", document.getElementById("bh").getAttribute("style").replace("hidden", uijson["main_menu"]["banner_image"]["visible"]));
            }
            let scroll = document.getElementById("items").scrollLeft;
            if(selected*276 > scroll){
              if(selected*276-276*3 < scroll) return;
              $(`#items`).animate({
                  scrollLeft: selected*276-276*3
              }, 0);
            } else {
              $(`#items`).animate({
                  scrollLeft: selected*276
              }, 0);
            }
          }
          async function dblclick(id){
            if(ress || res) return;
            let alt = document.getElementById(id).getAttribute("alt");
            let iid = id;
            if(suspended !== undefined){
              let ret = await new Promise(async function(resolve, reject) {
                let resss = false;
                res = true;
                let dialog = await createDialog(lang["suspended_app"], lang["suspended_close"], [lang["yes"], lang["cancel"]]);
                $("#ulaunchscreen").append(dialog);
                let inputs = $("#dialog :input");
                let selected = 0;
                let max = inputs.length;
                inputs.click((e) => {
                  click(e.currentTarget.id);
                });
                switchem.on("arrowright", () => {
                  click(selected+1);
                });
                switchem.on("lrightstart", () => {
                  click(selected+1);
                });
                switchem.on("rrightstart", () => {
                  click(selected+1);
                });
                switchem.on("arrowleft", () => {
                  click(selected-1);
                });
                switchem.on("lleftstart", () => {
                  click(selected-1);
                });
                switchem.on("rleftstart", () => {
                  click(selected-1);
                });
                switchem.on("a", () => {
                  dblclick(selected);
                });
                inputs.dblclick((e) => {
                  dblclick(e.currentTarget.id);
                });
                function click(id){
                  if(ress) return;
                  let input = $(`#dialog #${id}`).get(0);
                  let before = $(`#dialog #${selected}`).get(0);
                  if(input === undefined) return;
                  before.setAttribute("style", before.getAttribute("style").replace("#B4B4C8FF", "#B4B4C800"));
                  input.setAttribute("style", input.getAttribute("style").replace("#B4B4C800", "#B4B4C8FF"));
                  selected = parseInt(id);
                }
                function dblclick(id){
                  if(resss) return;
                  if(id == 0){
                    $("#title").remove();
                    $("#suspended").hide();
                    $("#suspendedimgg").hide();
                    suspended = undefined;
                    resss = true;
                    res = false;
                    $("#dialog").remove();
                    resolve(false);
                  } else {
                    resss = true;
                    res = false;
                    $("#dialog").remove();
                    resolve(true);
                  }
                }
              });
              if(ret) return;
            }
            if(alt.startsWith("homebrew")) {
              res = true;
              let dialog = await createDialog(lang["hb_launch"], lang["hb_launch_conf"], [lang["hb_applet"], lang["hb_app"], lang["cancel"]]);
              $("#ulaunchscreen").append(dialog);
              let inputs = $("#dialog :input");
              let selected = 0;
              let max = inputs.length;
              inputs.click((e) => {
                click(e.currentTarget.id);
              });
              switchem.on("arrowright", () => {
                click(selected+1);
              });
              switchem.on("lrightstart", () => {
                click(selected+1);
              });
              switchem.on("rrightstart", () => {
                click(selected+1);
              });
              switchem.on("arrowleft", () => {
                click(selected-1);
              });
              switchem.on("lleftstart", () => {
                click(selected-1);
              });
              switchem.on("rleftstart", () => {
                click(selected-1);
              });
              switchem.on("a", () => {
                dblclick(selected);
              });
              inputs.dblclick((e) => {
                dblclick(e.currentTarget.id);
              });
              function click(id){
                if(ress) return;
                let input = $(`#dialog #${id}`).get(0);
                let before = $(`#dialog #${selected}`).get(0);
                if(input === undefined) return;
                before.setAttribute("style", before.getAttribute("style").replace("#B4B4C8FF", "#B4B4C800"));
                input.setAttribute("style", input.getAttribute("style").replace("#B4B4C800", "#B4B4C8FF"));
                selected = parseInt(id);
              }
              function dblclick(id){
                if(ress) return;
                if(id == 0){
                  $("#dialog").remove();
                  if(sound) sound.stop();
                  if(titlelaunch !== undefined){
                    if(titlelaunch.playing()) titlelaunch.stop();
                    titlelaunch.play();
                  }
                  $("#ulaunchscreen").append(`<input type="button" style="background-color:#111;outline:none;border:none;position:absolute;top:0;left:0;width:1280;height:720" id="title"/>`);
                  setTimeout(() => {
                    $("#title").remove();
                    if(sound) sound.play();
                    res = false;
                  }, 1000);
                } else if(id == 1){
                  $("#dialog").remove();
                  if(sound) sound.stop();
                  if(titlelaunch !== undefined){
                    if(titlelaunch.playing()) titlelaunch.stop();
                    titlelaunch.play();
                  }
                  $("#ulaunchscreen").append(`<input type="button" style="background-color:#111;outline:none;border:none;position:absolute;top:0;left:0;width:1280;height:720" id="title"/>`);
                  setTimeout(() => {
                    $("#title").remove();
                    suspended = alt;
                    if(sound) sound.play();
                    $("#suspendedimg").append(`<input type="button" style="background-color:#111;outline:none;border:none;top:50%;left:50%;transform:translate(-50%, -50%);position:absolute;width:1280;height:720;" id="title"/>`);
                    $("#title").animate({width: 1008,height:584,opacity:0.5}, 1000, () => {
                      res = false;
                    });
                    let item = document.getElementById(iid).getAttribute("style");
                    let l = item.split("left:")[1].split(";")[0];
                    document.getElementById("suspended").setAttribute("style", `position: absolute;top: ${suspendedd}; left: ${l-(size.suspended.w-256)/2};pointer-events:none;display:none;`)
                    $("#suspended").show();
                  }, 1000);
                } else if(id == 2){
                  res = false;
                  $("#dialog").remove();
                }
              }
            } else {
              if(sound) sound.stop();
              if(titlelaunch !== undefined){
                if(titlelaunch.playing()) titlelaunch.stop();
                titlelaunch.play();
              }
              $("#ulaunchscreen").append(`<input type="button" style="background-color:#111;outline:none;border:none;position:absolute;top:0;left:0;width:1280;height:720" id="title"/>`);
              setTimeout(() => {
                $("#title").remove();
                suspended = alt;
                if(sound) sound.play();
                $("#suspendedimg").append(`<input type="button" style="background-color:#111;outline:none;border:none;top:50%;left:50%;transform:translate(-50%, -50%);position:absolute;width:1280;height:720;" id="title"/>`);
                $("#title").animate({width: 1008,height:584,opacity:0.5}, 1000, () => {
                  res = false;
                });
                let item = document.getElementById(iid).getAttribute("style");
                let l = item.split("left:")[1].split(";")[0];
                document.getElementById("suspended").setAttribute("style", `position: absolute;top: ${suspendedd}; left: ${l-(size.suspended.w-256)/2};pointer-events:none;display:none;`)
                $("#suspended").show();
              }, 1000);
            }
          }
          $("#toggleclick").click(() => {
            hbmenu();
          });
          switchem.on("arrowup", () => {
            hbmenu();
          });
          switchem.on("ltopstart", () => {
            hbmenu();
          });
          switchem.on("rtopstart", () => {
            hbmenu();
          });
          function hbmenu(){
            if(ress || res) return;
            if(menutoggle !== undefined){
              if(menutoggle.playing()) menutoggle.stop();
              menutoggle.play();
            }
            ress = true;
            hbitems();
          }
        });
      }
      function hbitems(){
        return new Promise(function(resolve, reject) {
          let ress = false;
          document.getElementById("bi").setAttribute("style", document.getElementById("bi").getAttribute("style").replace("visible", "hidden"))
          document.getElementById("bf").setAttribute("style", document.getElementById("bf").getAttribute("style").replace("visible", "hidden"));
          document.getElementById("bh").setAttribute("style", document.getElementById("bh").getAttribute("style").replace("hidden", uijson["main_menu"]["banner_image"]["visible"]));
          document.getElementById("in").innerHTML = "Launch hbmenu";
          document.getElementById("ia").innerHTML = "";
          document.getElementById("iv").innerHTML = "";
          let height = [size.cursor.h, size.multiselect.h, size.suspended.h].sort((a, b) => a > b)[0];
          let top = (height-256)/2;
          let menuhb = require(path.join(ulaunchtester, "testersettings", "menuitems.json")).hb;
          let jsonsfiles = getFiles(path.join(ulaunchtester, "sdmc", "ulaunch", "entries"));
          let left = 98;
          let n = 0;
          let items = [];
          items.push(`<img width="256" height="256" style="position: absolute;top: ${top}; left: ${left}" src="${defaulticon.hbmenu}" alt="${lang["hbmenu_launch"]}//"/><input style="width:256;height:256;position: absolute;top: ${top}; left: ${left};z-index: 1;outline: none;border: none;background-color: transparent;pointer-events:auto;" type="button" id="${n}" alt="Launch hbmenu//"/>`)
          let cursor = (height-size.cursor.h)/2;
          let suspendedd = (height-size.suspended.h)/2;
          let multiselectt = (height-size.multiselect.h)/2;
          let hbi = jsonsfiles.map(file => {
            if(!file.endsWith(".json")) return "";
            if(menuhb.includes(path.basename(file))) return "";
            let content = require(file);
            if(content.icon == "" || content.icon == null || content.icon == undefined || !fs.existsSync(content.icon.replace("sdmc:", path.join(ulaunchtester, "sdmc")))) return "";
            left += 276;
            n += 1;
            return `<img width="256" height="256" style="position: absolute;top: ${top}; left: ${left}" src="${content.icon.replace("sdmc:", path.join(ulaunchtester, "sdmc"))}" alt="${content.name.substring(0, 0x1FF)}/${content.author.substring(0, 0xFF)}/${content.version.substring(0, 0xF)}"/><input style="width:256;height:256;position: absolute;top: ${top}; left: ${left};z-index: 1;outline: none;border: none;background-color: transparent;pointer-events:auto;" type="button" id="${n}" alt="${content.name.substring(0, 0x1FF)}/${content.author.substring(0, 0xFF)}/${content.version.substring(0, 0xF)}"/>`;
          });
          items = items.concat(hbi);
          items.push(`<img width="${size.suspended.w}" height="${size.suspended.h}" style="position: absolute;top: ${suspendedd}; left: ${98-(size.suspended.w-256)/2};pointer-events:none;display:none;" src="${defaulticon.suspended}" id="suspended"/>`)
          items.push(`<img width="${size.cursor.w}" height="${size.cursor.h}" style="position: absolute;top: ${cursor}; left: ${98-(size.cursor.w-256)/2};pointer-events:none;" src="${defaulticon.cursor}" id="cursor"/>`)
          items.push(`<div id="multiselect" style="position:absolute;top:0;left:0;width:100%;height:100%;background-color: transparent;pointer-events:none;"></div>`)
          items.push(`<input type="button" style="position: absolute;border:none;outline:none;background-color:transparent;top:0;width:1;height:1;left:${left+256+86}"/>`)
          items = items.join("");
          document.getElementById("items").innerHTML = items;
          if(suspended !== undefined){
            try {
              let item = $(`input[alt="${suspended}"]`).get(0).getAttribute("style");
              let l = item.split("left:")[1].split(";")[0];
              document.getElementById("suspended").setAttribute("style", `position: absolute;top: ${suspendedd}; left: ${l-(size.suspended.w-256)/2};pointer-events:none;display:none;`);
              $("#suspended").show();
            }catch(e){}
          }
          let max = 0;
          let selected = 0;
          let inputs = $("#items :input");
          max = inputs.length;
          inputs.click((e) => {
            click(e.currentTarget.id);
          });
          switchem.on("arrowright", () => {
            click(selected+1);
          });
          switchem.on("lrightstart", () => {
            click(selected+1);
          });
          switchem.on("rrightstart", () => {
            click(selected+1);
          });
          switchem.on("arrowleft", () => {
            click(selected-1);
          });
          switchem.on("lleftstart", () => {
            click(selected-1);
          });
          switchem.on("rleftstart", () => {
            click(selected-1);
          });
          switchem.on("a", () => {
            dblclick(selected);
          });
          switchem.on("x", async () => {
            if(res || ress) return;
            let resss = false;
            res = true;
            let dialog = await createDialog(lang["suspended_app"], lang["suspended_close"], [lang["yes"], lang["cancel"]]);
            $("#ulaunchscreen").append(dialog);
            let inputs = $("#dialog :input");
            let selected = 0;
            let max = inputs.length;
            inputs.click((e) => {
              click(e.currentTarget.id);
            });
            switchem.on("arrowright", () => {
              click(selected+1);
            });
            switchem.on("lrightstart", () => {
              click(selected+1);
            });
            switchem.on("rrightstart", () => {
              click(selected+1);
            });
            switchem.on("arrowleft", () => {
              click(selected-1);
            });
            switchem.on("lleftstart", () => {
              click(selected-1);
            });
            switchem.on("rleftstart", () => {
              click(selected-1);
            });
            switchem.on("a", () => {
              dblclick(selected);
            });
            inputs.dblclick((e) => {
              dblclick(e.currentTarget.id);
            });
            function click(id){
              if(ress) return;
              let input = $(`#dialog #${id}`).get(0);
              let before = $(`#dialog #${selected}`).get(0);
              if(input === undefined) return;
              before.setAttribute("style", before.getAttribute("style").replace("#B4B4C8FF", "#B4B4C800"));
              input.setAttribute("style", input.getAttribute("style").replace("#B4B4C800", "#B4B4C8FF"));
              selected = parseInt(id);
            }
            function dblclick(id){
              if(resss) return;
              if(id == 0){
                $("#title").remove();
                $("#suspended").hide();
                $("#suspendedimgg").hide();
                suspended = undefined;
                resss = true;
                res = false;
                $("#dialog").remove();
                resolve();
              } else {
                resss = true;
                res = false;
                $("#dialog").remove();
                resolve();
              }
            }
          });
          inputs.dblclick((e) => {
            dblclick(e.currentTarget.id);
          });
          function click(id){
            if(ress || res) return;
            let input = document.getElementById(id);
            if(input === null) return;
            let cursor = ([size.cursor.h, size.multiselect.h, size.suspended.h].sort((a, b) => a > b)[0]-size.cursor.h)/2;
            let leftcursor = 98+276*parseInt(id)-20;
            selected = parseInt(id);
            document.getElementById("cursor").setAttribute("style", `position: absolute;top: ${cursor}; left: ${leftcursor}`);
            let alt = input.getAttribute("alt").split("/");
            document.getElementById("in").innerHTML = alt[0];
            document.getElementById("ia").innerHTML = alt[1];
            document.getElementById("iv").innerHTML = alt[2];
            let scroll = document.getElementById("items").scrollLeft;
            if(selected*276 > scroll){
              if(selected*276-276*3 < scroll) return;
              $(`#items`).animate({
                  scrollLeft: selected*276-276*3
              }, 0);
            } else {
              $(`#items`).animate({
                  scrollLeft: selected*276
              }, 0);
            }
          }
          async function dblclick(id){
            if(ress || res) return;
            if(suspended !== undefined){
              let ret = await new Promise(async function(resolve, reject) {
                let resss = false;
                res = true;
                let dialog = await createDialog(lang["suspended_app"], lang["suspended_close"], [lang["yes"], lang["cancel"]]);
                $("#ulaunchscreen").append(dialog);
                let inputs = $("#dialog :input");
                let selected = 0;
                let max = inputs.length;
                inputs.click((e) => {
                  click(e.currentTarget.id);
                });
                switchem.on("arrowright", () => {
                  click(selected+1);
                });
                switchem.on("lrightstart", () => {
                  click(selected+1);
                });
                switchem.on("rrightstart", () => {
                  click(selected+1);
                });
                switchem.on("arrowleft", () => {
                  click(selected-1);
                });
                switchem.on("lleftstart", () => {
                  click(selected-1);
                });
                switchem.on("rleftstart", () => {
                  click(selected-1);
                });
                switchem.on("a", () => {
                  dblclick(selected);
                });
                inputs.dblclick((e) => {
                  dblclick(e.currentTarget.id);
                });
                function click(id){
                  if(ress) return;
                  let input = $(`#dialog #${id}`).get(0);
                  let before = $(`#dialog #${selected}`).get(0);
                  if(input === undefined) return;
                  before.setAttribute("style", before.getAttribute("style").replace("#B4B4C8FF", "#B4B4C800"));
                  input.setAttribute("style", input.getAttribute("style").replace("#B4B4C800", "#B4B4C8FF"));
                  selected = parseInt(id);
                }
                function dblclick(id){
                  if(resss) return;
                  if(id == 0){
                    $("#title").remove();
                    $("#suspended").hide();
                    $("#suspendedimgg").hide();
                    suspended = undefined;
                    resss = true;
                    res = false;
                    $("#dialog").remove();
                    resolve(false);
                  } else {
                    resss = true;
                    res = false;
                    $("#dialog").remove();
                    resolve(true);
                  }
                }
              });
              if(ret) return;
            }
            let alt = document.getElementById(id).getAttribute("alt");
            let iid = id;
            res = true;
            let dialog = await createDialog(lang["hb_launch"], lang["hb_launch_conf"], [lang["hb_applet"], lang["hb_app"], lang["cancel"]]);
            $("#ulaunchscreen").append(dialog);
            let inputs = $("#dialog :input");
            let selected = 0;
            let max = inputs.length;
            inputs.click((e) => {
              click(e.currentTarget.id);
            });
            switchem.on("arrowright", () => {
              click(selected+1);
            });
            switchem.on("lrightstart", () => {
              click(selected+1);
            });
            switchem.on("rrightstart", () => {
              click(selected+1);
            });
            switchem.on("arrowleft", () => {
              click(selected-1);
            });
            switchem.on("lleftstart", () => {
              click(selected-1);
            });
            switchem.on("rleftstart", () => {
              click(selected-1);
            });
            switchem.on("a", () => {
              dblclick(selected);
            });
            inputs.dblclick((e) => {
              dblclick(e.currentTarget.id);
            });
            function click(id){
              if(ress) return;
              let input = $(`#dialog #${id}`).get(0);
              let before = $(`#dialog #${selected}`).get(0);
              if(input === undefined) return;
              before.setAttribute("style", before.getAttribute("style").replace("#B4B4C8FF", "#B4B4C800"));
              input.setAttribute("style", input.getAttribute("style").replace("#B4B4C800", "#B4B4C8FF"));
              selected = parseInt(id);
            }
            function dblclick(id){
              if(ress) return;
              if(id == 0){
                $("#dialog").remove();
                if(sound) sound.stop();
                if(titlelaunch !== undefined){
                  if(titlelaunch.playing()) titlelaunch.stop();
                  titlelaunch.play();
                }
                $("#ulaunchscreen").append(`<input type="button" style="background-color:#111;outline:none;border:none;position:absolute;top:0;left:0;width:1280;height:720" id="title"/>`);
                setTimeout(() => {
                  $("#title").remove();
                  if(sound) sound.play();
                  res = false;
                }, 1000);
              } else if(id == 1){
                $("#dialog").remove();
                if(sound) sound.stop();
                if(titlelaunch !== undefined){
                  if(titlelaunch.playing()) titlelaunch.stop();
                  titlelaunch.play();
                }
                $("#ulaunchscreen").append(`<input type="button" style="background-color:#111;outline:none;border:none;position:absolute;top:0;left:0;width:1280;height:720" id="title"/>`);
                setTimeout(() => {
                  $("#title").remove();
                  suspended = alt;
                  if(sound) sound.play();
                  $("#suspendedimg").append(`<input type="button" style="background-color:#111;outline:none;border:none;top:50%;left:50%;transform:translate(-50%, -50%);position:absolute;width:1280;height:720;" id="title"/>`);
                  $("#title").animate({width: 1008,height:584,opacity:0.5}, 1000, () => {
                    res = false;
                  });
                  let item = document.getElementById(iid).getAttribute("style");
                  let l = item.split("left:")[1].split(";")[0];
                  document.getElementById("suspended").setAttribute("style", `position: absolute;top: ${suspendedd}; left: ${l-(size.suspended.w-256)/2};pointer-events:none;display:none;`)
                  $("#suspended").show();
                }, 1000);
              } else if(id == 2){
                res = false;
                $("#dialog").remove();
              }
            }
          }
          $("#toggleclick").click(() => {
            menu();
          });
          switchem.on("arrowup", () => {
            menu();
          });
          switchem.on("ltopstart", () => {
            menu();
          });
          switchem.on("rtopstart", () => {
            menu();
          });
          function menu(){
            if(ress || res) return;
            if(menutoggle !== undefined){
              if(menutoggle.playing()) menutoggle.stop();
              menutoggle.play();
            }
            ress = true;
            menuitems();
          }
        });
      }
      menuitems();
    });
  }
  function theme(){
    return new Promise(function(resolve, reject) {
      let res = false;
      switchem.on("b", () => {
        if(res) return;
        res = true;
        mainmenu();
        resolve();
      });
      let selected = 0;
      let themes = getFiles(path.join(ulaunchtester, "sdmc", "ulaunch", "themes")).filter(n => n.indexOf("Manifest") !== -1);
      themes = themes.map(n => {
        return {
          path: n.replace(/\\/g, "/").split("sdmc/ulaunch/themes/")[1].split("/")[0],
          manifest: require(n)
        }
      });
      document.getElementById("ulaunchscreen").innerHTML = ejs.render(fs.readFileSync(path.join(__dirname, "ulaunch", "theme.ejs"), "utf8"), {ulaunchtester, defaulticon, themes, path, size, uijson, lang});
      if(currenttheme === "default"){
        document.getElementById("text").innerHTML = lang["theme_no_custom"];
      } else {
        let manifest = require(path.join(ulaunchtester, "sdmc", "ulaunch", "themes", currenttheme, "theme", "Manifest.json"));
        document.getElementById("text").innerHTML = lang["theme_current"]+":";
        document.getElementById("name").innerHTML = manifest.name;
        document.getElementById("author").innerHTML = manifest.author;
        document.getElementById("version").innerHTML = "v"+manifest.release;
        if(fs.existsSync(path.join(ulaunchtester, "sdmc", "ulaunch", "themes", currenttheme, "theme", "Icon.png"))){
          document.getElementById("logo").setAttribute("style", document.getElementById("logo").getAttribute("style").replace("hidden", uijson["themes_menu"]["current_theme_icon"]["visible"]));
          document.getElementById("logo").setAttribute("src", path.join(ulaunchtester, "sdmc", "ulaunch", "themes", currenttheme, "theme", "Icon.png"));
        }
      }
      let down,leftclick;
      let inputs = $("#ulaunchscreen :input");
      inputs.click((e) => {
        leftclick = true;
        click(e.currentTarget.id);
      });
      switchem.on("arrowdown", () => {
        leftclick = false;
        down = true;
        click(selected+1);
      });
      switchem.on("lbottomstart", () => {
        leftclick = false;
        down = true;
        click(selected+1);
      });
      switchem.on("rbottomstart", () => {
        leftclick = false;
        down = true;
        click(selected+1);
      });
      switchem.on("arrowup", () => {
        leftclick = false;
        down = false;
        click(selected-1);
      });
      switchem.on("ltopstart", () => {
        leftclick = false;
        down = false;
        click(selected-1);
      });
      switchem.on("rtopstart", () => {
        leftclick = false;
        down = false;
        click(selected-1);
      });
      switchem.on("a", () => {
        dblclick(selected);
      });
      inputs.dblclick((e) => {
        dblclick(e.currentTarget.id);
      });
      function click(id){
        if(res) return;
        let input = document.getElementById(id+"g");
        let before = document.getElementById(selected+"g");
        if(input === null) return;
        selected = parseInt(id);
        before.setAttribute("style", before.getAttribute("style").replace(uijson["menu_focus_color"], uijson["menu_bg_color"]));
        input.setAttribute("style", input.getAttribute("style").replace(uijson["menu_bg_color"], uijson["menu_focus_color"]));
        if(leftclick) return;
        let scroll = document.getElementById("themes").scrollTop;
        if(down){
          if(selected*100-400 < scroll) return;
          $(`#themes`).animate({
              scrollTop: selected*100-400
          }, 0);
        } else {
          if(selected*100 > scroll) return;
          $(`#themes`).animate({
              scrollTop: selected*100
          }, 0);
        }
      }
      function dblclick(id){
        if(res) return;
        let input = document.getElementById(id);
        let tpath = input.getAttribute("alt");
        if(testersettings.currenttheme === "default" && tpath === "default"){
          return ShowNotification(lang["theme_no_custom"], uijson);
        } else if(testersettings.currenttheme === tpath){
          return ShowNotification(lang["theme_active_this"], uijson);
        }
        console.log(tpath);
        testersettings.currenttheme = tpath;
        testersettings.isthemerestart = true;
        fs.writeFileSync(path.join(ulaunchtester, "testersettings", "ulaunch.json"), JSON.stringify(testersettings, null, 2), function(err){if(err) throw err;});
        getCurrentWindow().loadURL(url.format({
          pathname: path.join(__dirname, 'app.ejs'),
          protocol: 'file:',
          slashes: true
        }));
      }
    });
  }
  function settings(){
    return new Promise(function(resolve, reject) {
      let res = false;
      switchem.on("b", () => {
        if(res) return;
        res = true;
        mainmenu();
        resolve();
      });
      let max = 0;
      let selected = 0;
      let settings = [
        {
          "value": `${lang["set_console_nickname"]}: ${testersettings.consolename}`,
          "id": 0
        },
        {
          "value": `${lang["set_console_timezone"]}: "${Intl.DateTimeFormat().resolvedOptions().timeZone}"`,
          "id": -1
        },
        {
          "value": `${lang["set_viewer_enabled"]}: ${testersettings["viewer_enabled"]}`,
          "id": 1
        },
        {
          "value": `${lang["set_flog_enabled"]}: ${testersettings["flog_enabled"]}`,
          "id": 2
        },
        {
          "value": `${lang["set_wifi_name"]}: ${(testersettings.connected) ? "SSID" : lang["set_wifi_none"]}`,
          "id": 3
        },
        {
          "value": `${lang["set_console_lang"]}: ${testersettings["lang"]}`,
          "id": 4
        },
        {
          "value": `${lang["set_console_info_upload"]}: ${testersettings["console_info_upload"]}`,
          "id": 5
        },
        {
          "value": `${lang["set_auto_titles_dl"]}: ${testersettings["auto_titles_dl"]}`,
          "id": 6
        },
        {
          "value": `${lang["set_auto_update"]}: ${testersettings["auto_update"]}`,
          "id": 7
        },
        {
          "value": `${lang["set_wireless_lan"]}: ${testersettings["wireless_lan"]}`,
          "id": 8
        },
        {
          "value": `${lang["set_bluetooth"]}: ${testersettings["bluetooth"]}`,
          "id": 9
        },
        {
          "value": `${lang["set_usb_30"]}: ${testersettings["usb_30"]}`,
          "id": 10
        },
        {
          "value": `${lang["set_nfc"]}: ${testersettings["nfc"]}`,
          "id": 11
        },
        {
          "value": `${lang["set_serial_no"]}: XAW10074000000`,
          "id": -1
        },
        {
          "value": `${lang["set_mac_addr"]}: 00:00:00:00:00:00`,
          "id": -1
        }
      ]
      document.getElementById("ulaunchscreen").innerHTML = ejs.render(fs.readFileSync(path.join(__dirname, "ulaunch", "settings.ejs"), "utf8"), {ulaunchtester, settings, defaulticon, path, size, uijson, lang});
      let down,leftclick;
      let inputs = $("#ulaunchscreen :input");
      max = inputs.length
      inputs.click((e) => {
        leftclick = true;
        click(e.currentTarget.id);
      });
      switchem.on("arrowdown", () => {
        leftclick = false;
        down = true;
        click(selected+1);
      });
      switchem.on("lbottomstart", () => {
        leftclick = false;
        down = true;
        click(selected+1);
      });
      switchem.on("rbottomstart", () => {
        leftclick = false;
        down = true;
        click(selected+1);
      });
      switchem.on("arrowup", () => {
        leftclick = false;
        down = false;
        click(selected-1);
      });
      switchem.on("ltopstart", () => {
        leftclick = false;
        down = false;
        click(selected-1);
      });
      switchem.on("rtopstart", () => {
        leftclick = false;
        down = false;
        click(selected-1);
      });
      switchem.on("a", () => {
        dblclick(selected);
      });
      inputs.dblclick((e) => {
        dblclick(e.currentTarget.id);
      });
      function click(id){
        if(res) return;
        let input = document.getElementById(id+"g");
        let before = document.getElementById(selected+"g");
        if(input === null) return;
        selected = parseInt(id);
        before.setAttribute("style", before.getAttribute("style").replace(uijson["menu_focus_color"], uijson["menu_bg_color"]));
        input.setAttribute("style", input.getAttribute("style").replace(uijson["menu_bg_color"], uijson["menu_focus_color"]));
        if(leftclick) return;
        let scroll = document.getElementById("settings").scrollTop;
        if(down){
          if(selected*100-300 < scroll) return;
          $(`#settings`).animate({
              scrollTop: selected*100-300
          }, 0);
        } else {
          if(selected*100 > scroll) return;
          $(`#settings`).animate({
              scrollTop: selected*100
          }, 0);
        }
      }
      function dblclick(id){
        if(res) return;
        let input = document.getElementById(id);
        let setting = settings[id];
        if(setting.id === -1) return;
        if(id == 2){
          let p = document.getElementById(`${id}t`);
          if(p.innerHTML.indexOf("False") !== -1){
            testersettings["viewer_enabled"] = "True";
            fs.writeFileSync(path.join(ulaunchtester, "testersettings", "ulaunch.json"), JSON.stringify(testersettings, null, 2), function(err){if(err) throw err;});
            p.innerHTML = p.innerHTML.replace("False", "True");
          } else {
            testersettings["viewer_enabled"] = "False";
            fs.writeFileSync(path.join(ulaunchtester, "testersettings", "ulaunch.json"), JSON.stringify(testersettings, null, 2), function(err){if(err) throw err;});
            p.innerHTML = p.innerHTML.replace("True", "False");
          }
        } else if(id == 3){
          let p = document.getElementById(`${id}t`);
          if(p.innerHTML.indexOf("False") !== -1){
            testersettings["flog_enabled"] = "True";
            fs.writeFileSync(path.join(ulaunchtester, "testersettings", "ulaunch.json"), JSON.stringify(testersettings, null, 2), function(err){if(err) throw err;});
            p.innerHTML = p.innerHTML.replace("False", "True");
          } else {
            testersettings["flog_enabled"] = "False";
            fs.writeFileSync(path.join(ulaunchtester, "testersettings", "ulaunch.json"), JSON.stringify(testersettings, null, 2), function(err){if(err) throw err;});
            p.innerHTML = p.innerHTML.replace("True", "False");
          }
        } else if(id == 6){
          let p = document.getElementById(`${id}t`);
          if(p.innerHTML.indexOf("False") !== -1){
            testersettings["console_info_upload"] = "True";
            fs.writeFileSync(path.join(ulaunchtester, "testersettings", "ulaunch.json"), JSON.stringify(testersettings, null, 2), function(err){if(err) throw err;});
            p.innerHTML = p.innerHTML.replace("False", "True");
          } else {
            testersettings["console_info_upload"] = "False";
            fs.writeFileSync(path.join(ulaunchtester, "testersettings", "ulaunch.json"), JSON.stringify(testersettings, null, 2), function(err){if(err) throw err;});
            p.innerHTML = p.innerHTML.replace("True", "False");
          }
        } else if(id == 7){
          let p = document.getElementById(`${id}t`);
          if(p.innerHTML.indexOf("False") !== -1){
            testersettings["auto_titles_dl"] = "True";
            fs.writeFileSync(path.join(ulaunchtester, "testersettings", "ulaunch.json"), JSON.stringify(testersettings, null, 2), function(err){if(err) throw err;});
            p.innerHTML = p.innerHTML.replace("False", "True");
          } else {
            testersettings["auto_titles_dl"] = "False";
            fs.writeFileSync(path.join(ulaunchtester, "testersettings", "ulaunch.json"), JSON.stringify(testersettings, null, 2), function(err){if(err) throw err;});
            p.innerHTML = p.innerHTML.replace("True", "False");
          }
        } else if(id == 8){
          let p = document.getElementById(`${id}t`);
          if(p.innerHTML.indexOf("False") !== -1){
            testersettings["auto_update"] = "True";
            fs.writeFileSync(path.join(ulaunchtester, "testersettings", "ulaunch.json"), JSON.stringify(testersettings, null, 2), function(err){if(err) throw err;});
            p.innerHTML = p.innerHTML.replace("False", "True");
          } else {
            testersettings["auto_update"] = "False";
            fs.writeFileSync(path.join(ulaunchtester, "testersettings", "ulaunch.json"), JSON.stringify(testersettings, null, 2), function(err){if(err) throw err;});
            p.innerHTML = p.innerHTML.replace("True", "False");
          }
        } else if(id == 9){
          let p = document.getElementById(`${id}t`);
          if(p.innerHTML.indexOf("False") !== -1){
            testersettings["wireless_lan"] = "True";
            fs.writeFileSync(path.join(ulaunchtester, "testersettings", "ulaunch.json"), JSON.stringify(testersettings, null, 2), function(err){if(err) throw err;});
            p.innerHTML = p.innerHTML.replace("False", "True");
          } else {
            testersettings["wireless_lan"] = "False";
            fs.writeFileSync(path.join(ulaunchtester, "testersettings", "ulaunch.json"), JSON.stringify(testersettings, null, 2), function(err){if(err) throw err;});
            p.innerHTML = p.innerHTML.replace("True", "False");
          }
        } else if(id == 10){
          let p = document.getElementById(`${id}t`);
          if(p.innerHTML.indexOf("False") !== -1){
            testersettings["bluetooth"] = "True";
            fs.writeFileSync(path.join(ulaunchtester, "testersettings", "ulaunch.json"), JSON.stringify(testersettings, null, 2), function(err){if(err) throw err;});
            p.innerHTML = p.innerHTML.replace("False", "True");
          } else {
            testersettings["bluetooth"] = "False";
            fs.writeFileSync(path.join(ulaunchtester, "testersettings", "ulaunch.json"), JSON.stringify(testersettings, null, 2), function(err){if(err) throw err;});
            p.innerHTML = p.innerHTML.replace("True", "False");
          }
        } else if(id == 11){
          let p = document.getElementById(`${id}t`);
          if(p.innerHTML.indexOf("False") !== -1){
            testersettings["usb_30"] = "True";
            fs.writeFileSync(path.join(ulaunchtester, "testersettings", "ulaunch.json"), JSON.stringify(testersettings, null, 2), function(err){if(err) throw err;});
            p.innerHTML = p.innerHTML.replace("False", "True");
          } else {
            testersettings["usb_30"] = "False";
            fs.writeFileSync(path.join(ulaunchtester, "testersettings", "ulaunch.json"), JSON.stringify(testersettings, null, 2), function(err){if(err) throw err;});
            p.innerHTML = p.innerHTML.replace("True", "False");
          }
        } else if(id == 12){
          let p = document.getElementById(`${id}t`);
          if(p.innerHTML.indexOf("False") !== -1){
            testersettings["nfc"] = "True";
            fs.writeFileSync(path.join(ulaunchtester, "testersettings", "ulaunch.json"), JSON.stringify(testersettings, null, 2), function(err){if(err) throw err;});
            p.innerHTML = p.innerHTML.replace("False", "True");
          } else {
            testersettings["nfc"] = "False";
            fs.writeFileSync(path.join(ulaunchtester, "testersettings", "ulaunch.json"), JSON.stringify(testersettings, null, 2), function(err){if(err) throw err;});
            p.innerHTML = p.innerHTML.replace("True", "False");
          }
        } else if(id == 5){
          console.log("language");
        }
      }
    });
  }
  startup();
}

function getTextWH(fontSize, text, width = "auto", height = "auto"){
   var id = '';
   var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < 25; i++ ) {
      id += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   $(document.body).append(`<p id="${id}" style="font-family: 'Font';font-size:${fontSize};width:${width};height:${height};position:absolute;top:0;left:0;opacity:0;margin:0px 0px;padding: 0px"><span style="word-break: break-all;">${text}</span></p>`)
   var test = document.getElementById(id);
   let textw = test.clientWidth;
   let texth = test.clientHeight;
   let ret = [test.clientWidth, test.clientHeight];
   $(`#${id}`).remove();
   return ret;
}

async function ShowNotification(text, uijson, ms = 1500){
  if(document.getElementById("notification") !== null){
    await new Promise(function(resolve, reject) {
      let interval = null;
      interval = setInterval(() => {
        if(document.getElementById("notification") == null){
          stop();
        }
      });
      function stop(){
        clearInterval(interval);
        resolve();
      }
    });
  }
  let wh = getTextWH(20, text);
  let toastw = wh[0] + (wh[1] * 4);
  let toasth = wh[1] * 3;
  console.log(toastw);
  console.log(toasth);
  $("#"+id).remove();
  console.log(uijson["toast_base_color"]);
  console.log(uijson["toast_text_color"]);
  $("#switchcontainer").append(`<input type="button" id="notification" style="position: absolute;left: ${(1280 - toastw) / 2};top: 550;width: ${toastw};text-align: center;color: ${uijson["toast_text_color"]};z-index: 2;height: ${toasth};font-size: 20;padding: 10 32.5;border: none;border-radius: 32.5px;background-color: ${uijson["toast_base_color"]};opacity:0;" value="${text}"/>`);
  $("#notification").fadeTo(350, 200/255, function(){
    setTimeout(() => {
      $("#notification").fadeTo(350, 0, function(){
        setTimeout(() => {$("#notification").remove();}, 150);
      });
    }, ms);
  });
}

function existsUI(name, defaultui, romfsui){
  if(fs.existsSync(path.join(defaultui, name))){
    return path.join(defaultui, name)
  } else {
    return path.join(romfsui, name)
  }
}

function InitializeUIJson(uijson){
  uijson["suspended_final_alpha"] = ApplyConfigForElement(uijson, "suspended_final_alpha");
  uijson["menu_focus_color"] = ApplyConfigForElement(uijson, "menu_focus_color");
  uijson["menu_bg_color"] = ApplyConfigForElement(uijson, "menu_bg_color");
  uijson["text_color"] = ApplyConfigForElement(uijson, "text_color");
  uijson["toast_text_color"] = ApplyConfigForElement(uijson, "toast_text_color");
  uijson["toast_base_color"] = ApplyConfigForElement(uijson, "toast_base_color");
  uijson["menu_folder_text_x"] = ApplyConfigForElement(uijson, "menu_folder_text_x");
  uijson["menu_folder_text_y"] = ApplyConfigForElement(uijson, "menu_folder_text_y");
  uijson["menu_folder_text_size"] = ApplyConfigForElement(uijson, "menu_folder_text_size");
  if(uijson["settings_menu"] === undefined){
    uijson["settings_menu"] = ApplyConfigForElement(uijson, "settings_menu");
  } else {
    uijson["settings_menu"]["info_text"] = ApplyConfigForElement(uijson, "settings_menu", "info_text");
    uijson["settings_menu"]["settings_menu_item"] = ApplyConfigForElement(uijson, "settings_menu", "settings_menu_item");
  }
  if(uijson["languages_menu"] === undefined){
    uijson["languages_menu"] = ApplyConfigForElement(uijson, "languages_menu");
  } else {
    uijson["languages_menu"]["info_text"] = ApplyConfigForElement(uijson, "languages_menu", "info_text");
    uijson["languages_menu"]["languages_menu_item"] = ApplyConfigForElement(uijson, "languages_menu", "languages_menu_item");
  }
  if(uijson["startup_menu"] === undefined){
    uijson["startup_menu"] = ApplyConfigForElement(uijson, "startup_menu");
  } else {
    uijson["startup_menu"]["info_text"] = ApplyConfigForElement(uijson, "startup_menu", "info_text");
    uijson["startup_menu"]["users_menu_item"] = ApplyConfigForElement(uijson, "startup_menu", "users_menu_item");
  }
  if(uijson["main_menu"] === undefined){
    uijson["main_menu"] = ApplyConfigForElement(uijson, "main_menu");
  } else {
    uijson["main_menu"]["top_menu_bg"] = ApplyConfigForElement(uijson, "main_menu", "top_menu_bg");
    uijson["main_menu"]["banner_image"] = ApplyConfigForElement(uijson, "main_menu", "banner_image");
    uijson["main_menu"]["connection_icon"] = ApplyConfigForElement(uijson, "main_menu", "connection_icon");
    uijson["main_menu"]["user_icon"] = ApplyConfigForElement(uijson, "main_menu", "user_icon");
    uijson["main_menu"]["logo_icon"] = ApplyConfigForElement(uijson, "main_menu", "logo_icon");
    uijson["main_menu"]["web_icon"] = ApplyConfigForElement(uijson, "main_menu", "web_icon");
    uijson["main_menu"]["time_text"] = ApplyConfigForElement(uijson, "main_menu", "time_text");
    uijson["main_menu"]["battery_text"] = ApplyConfigForElement(uijson, "main_menu", "battery_text");
    uijson["main_menu"]["battery_icon"] = ApplyConfigForElement(uijson, "main_menu", "battery_icon");
    uijson["main_menu"]["settings_icon"] = ApplyConfigForElement(uijson, "main_menu", "settings_icon");
    uijson["main_menu"]["themes_icon"] = ApplyConfigForElement(uijson, "main_menu", "themes_icon");
    uijson["main_menu"]["firmware_text"] = ApplyConfigForElement(uijson, "main_menu", "firmware_text");
    uijson["main_menu"]["menu_toggle_button"] = ApplyConfigForElement(uijson, "main_menu", "menu_toggle_button");
    uijson["main_menu"]["banner_name_text"] = ApplyConfigForElement(uijson, "main_menu", "banner_name_text");
    uijson["main_menu"]["banner_author_text"] = ApplyConfigForElement(uijson, "main_menu", "banner_author_text");
    uijson["main_menu"]["banner_version_text"] = ApplyConfigForElement(uijson, "main_menu", "banner_version_text");
    uijson["main_menu"]["items_menu"] = ApplyConfigForElement(uijson, "main_menu", "items_menu");
  }
  if(uijson["themes_menu"] === undefined){
    uijson["themes_menu"] = ApplyConfigForElement(uijson, "themes_menu");
  } else {
    uijson["themes_menu"]["banner_image"] = ApplyConfigForElement(uijson, "themes_menu", "banner_image");
    uijson["themes_menu"]["themes_menu_item"] = ApplyConfigForElement(uijson, "themes_menu", "themes_menu_item");
    uijson["themes_menu"]["current_theme_text"] = ApplyConfigForElement(uijson, "themes_menu", "current_theme_text");
    uijson["themes_menu"]["current_theme_name_text"] = ApplyConfigForElement(uijson, "themes_menu", "current_theme_name_text");
    uijson["themes_menu"]["current_theme_author_text"] = ApplyConfigForElement(uijson, "themes_menu", "current_theme_author_text");
    uijson["themes_menu"]["current_theme_version_text"] = ApplyConfigForElement(uijson, "themes_menu", "current_theme_version_text");
    uijson["themes_menu"]["current_theme_icon"] = ApplyConfigForElement(uijson, "themes_menu", "current_theme_icon");
  }
  return uijson;
}

function getFiles(dir, files_) {
  files_ = files_ || [];
  if(fs.existsSync(dir)) {
    var files = fs.readdirSync(dir);
    for(var i in files) {
      var name = dir + '/' + files[i];
      if(fs.statSync(name).isDirectory()) {
        getFiles(name, files_);
      } else {
        files_.push(name);
      }
    }
  }
  return files_;
}

function ApplyConfigForElement(json, obj1, obj2){
  let defjson = require(path.join(__dirname, "ulaunch", "default.json"));
  if(obj2 === undefined) {
    if(typeof defjson[obj1] === "string"){
      return (json[obj1] !== undefined) ? json[obj1] : defjson[obj1];
    } else {
      let obj = Object.keys(defjson[obj1]);
      for(var i in obj){
        let element = obj[i];
        defjson[obj1][element]["visible"] = visibility(defjson[obj1][element]["visible"])
      }
      return defjson[obj1];
    }
  } else {
    return {
      "x": (json[obj1][obj2] !== undefined) ? ((json[obj1][obj2]["x"] !== undefined) ? json[obj1][obj2]["x"] : defjson[obj1][obj2]["x"]) : defjson[obj1][obj2]["x"],
      "y": (json[obj1][obj2] !== undefined) ? ((json[obj1][obj2]["y"] !== undefined) ? json[obj1][obj2]["y"] : defjson[obj1][obj2]["y"]) : defjson[obj1][obj2]["y"],
      "visible": (json[obj1][obj2] !== undefined) ? ((json[obj1][obj2]["visible"] === false) ? visibility(json[obj1][obj2]["visible"]) : visibility(defjson[obj1][obj2]["visible"])) : visibility(defjson[obj1][obj2]["visible"])
    }
  }
}

async function InitializeSize(size, defaulticon, uijson){
  let sizeKeys = Object.keys(size);
  for(var i=0; i<sizeKeys.length; i++){
    await new Promise(function(resolve, reject) {
      let s = size[i];
      let k = sizeKeys[i];
      let img = new Image();
      img.onload = () => {
        size[k] = {w: img.width,h: img.height}
        resolve();
      };
      img.src = defaulticon[k];
    });
  }
  return size;
}

async function createDialog(title, content, opts, hasCancel = false, icon){
  let html = `<div style="background-color: #0000007F;z-index:99;position:absolute;top:0;left:0;width:1280;height:720;" id="dialog">`;
  if(hasCancel) opts.push("Cancel");
  if(opts.length !== 0){
    let dw = (20 * (opts.length - 1)) + 250;
    for(var i = 0; i < opts.length; i++){
        let tw = getTextWH(18, opts[i])[0];
        dw += tw + 20;
    }
    if(dw > 1280) dw = 1280;
    let icm = 30;
    let elemh = 60;
    let tdw = getTextWH(20, content)[0] + 157.5;
    console.log(tdw-90);
    if(tdw > dw) dw = tdw;
    tdw = getTextWH(30, title)[0] + 157.5;
    console.log(tdw-90);
    if(tdw > dw) dw = tdw;
    let ely = getTextWH(20, content)[1] + getTextWH(30, title)[1] + 140;
    if(icon){
      await new Promise(function(resolve, reject) {
        let img = new Image();
        img.onload = () => {
          let tely = img.height + icm + 25;
          if(tely > ely) ely = tely;
          tdw = getTextWH(20, content)[0] + 90 + img.width + 20;
          if(tdw > dw) dw = tdw;
          tdw = getTextWH(30, title)[0] + 90 + img.width + 20;
          if(tdw > dw) dw = tdw;
          resolve();
        }
        img.src = icon;
      });
    }
    if(dw > 1280) dw = 1280;
    let dh = ely + elemh + 30;
    if(dh > 720) dh = 720;
    let dx = (1280 - dw) / 2;
    let dy = (720 - dh) / 2;
    ely += dy;
    let elemw = ((dw - (20 * (opts.length + 1))) / opts.length);
    let elx = dx + ((dw - ((elemw * opts.length) + (20 * (opts.length - 1)))) / 2);
    let r = 35;
    let nr = "B4";
    let ng = "B4";
    let nb = "C8";
    let end = false;
    let initfact = 0;
    let bw = dw;
    let bh = dh;
    let fw = bw - (r * 2);
    let fh = bh - (r * 2);
    let clr = "#e1e1e1";
    html += `<div style="background-color:transparent;width:${bw};height:${bh};position:absolute;overflow:hidden;top:${dy};left:${dx};"><input type="button" style="z-index:-1;outline:none;border:none;width:${bw};height:${bh};position:absolute;top:0;left:0;border-radius:${r}px;background-color:${clr};" disabled/>`
    let iconwidth = 0;
    if(icon){
      await new Promise(function(resolve, reject) {
        let img = new Image();
        img.onload = () => {
          let icw = img.width;
          let icx = (dw - (icw + icm));
          let icy = icm;
          iconwidth = icw+(bw-(icx+icw))-20;
          html += `<img style="position:absolute;top:${icy};left:${icx}" src="${icon}"/>`;
          resolve();
        }
        img.src = icon;
      });
    }
    html += `<div style="background-color:transparent;position:absolute;top:0;left:45;width:${bw-90-iconwidth};height:${bh};"><p style="user-select:none;margin:0px 0px;padding: 0px;font-size:30;font-family: 'Font';position:relative;top:55;left:0"><span style="word-break: break-all;">${title}</span></p><p style="user-select:none;margin:0px 0px;padding: 0px;font-size:20;font-family: 'Font';position:relative;top:110;left:0"><span style="word-break: break-all;">${content}</span></p></div>`
    for(var i=0; i<opts.length; i++){
      let n = i;
      let txt = opts[n];
      let tw = getTextWH(18, txt)[0];
      let th = getTextWH(18, txt)[1];
      let tx = elx + ((elemw - tw) / 2) + ((elemw + 20) * i);
      let ty = ely + ((elemh - th) / 2);
      let rx = elx + ((elemw + 20) * i);
      let ry = ely;
      let rr = (elemh / 2);
      let dclr = `#${nr}${ng}${nb}${(n == 0) ? "FF" : "00"}`;
      html += `<input type="button" style="outline:none;border:none;background-color:${dclr};font-size:18;font-family:'Font';border-radius:${rr}px;width:${elemw};height:${elemh};top:${bh-elemh-30};padding:0px 0px 0px 0px;position:relative;margin: 0px 0px 0px 20px;" value="${txt}" id="${n}"/>`
    }
    html += "</div>";
  };
  html += "</div>";
  return html;
}

function visibility(visible){
  if(visible === false){
    return "hidden";
  } else {
    return "visible";
  }
}

let ispower = true;
function minus(){
  if(!ispower) return
  switchem.emit('minus');
}
function plus(){
  if(!ispower) return
  switchem.emit('plus');
}
function ltopstart(){
  if(!ispower) return
  switchem.emit('ltopstart');
}
function ltopstop(){
  if(!ispower) return
  switchem.emit('ltopstop');
}
function ltopleftstart(){
  if(!ispower) return
  switchem.emit('ltopleftstart');
}
function ltopleftstop(){
  if(!ispower) return
  switchem.emit('ltopleftstop');
}
function lleftstart(){
  if(!ispower) return
  switchem.emit('lleftstart');
}
function lleftstop(){
  if(!ispower) return
  switchem.emit('lleftstop');
}
function lleftbottomstart(){
  if(!ispower) return
  switchem.emit('lleftbottomstart');
}
function lleftbottomstop(){
  if(!ispower) return
  switchem.emit('lleftbottomstop');
}
function lbottomstart(){
  if(!ispower) return
  switchem.emit('lbottomstart');
}
function lbottomstop(){
  if(!ispower) return
  switchem.emit('lbottomstop');
}
function lbottomrightstart(){
  if(!ispower) return
  switchem.emit('lbottomrightstart');
}
function lbottomrightstop(){
  if(!ispower) return
  switchem.emit('lbottomrightstop');
}
function lrightstart(){
  if(!ispower) return
  switchem.emit('lrightstart');
}
function lrightstop(){
  if(!ispower) return
  switchem.emit('lrightstop');
}
function lrighttopstart(){
  if(!ispower) return
  switchem.emit('lrighttopstart');
}
function lrighttopstop(){
  if(!ispower) return
  switchem.emit('lrighttopstop');
}
function arrowup(){
  if(!ispower) return
  switchem.emit('arrowup');
}
function arrowdown(){
  if(!ispower) return
  switchem.emit('arrowdown');
}
function arrowright(){
  if(!ispower) return
  switchem.emit('arrowright');
}
function arrowleft(){
  if(!ispower) return
  switchem.emit('arrowleft');
}
function capture(){
  if(!ispower) return
  switchem.emit('capture');
}
function l(){
  if(!ispower) return
  switchem.emit('l');
}
function rtopstart(){
  if(!ispower) return
  switchem.emit('rtopstart');
}
function rtopstop(){
  if(!ispower) return
  switchem.emit('rtopstop');
}
function rtopleftstart(){
  if(!ispower) return
  switchem.emit('rtopleftstart');
}
function rtopleftstop(){
  if(!ispower) return
  switchem.emit('rtopleftstop');
}
function rleftstart(){
  if(!ispower) return
  switchem.emit('rleftstart');
}
function rleftstop(){
  if(!ispower) return
  switchem.emit('rleftstop');
}
function rleftbottomstart(){
  if(!ispower) return
  switchem.emit('rleftbottomstart');
}
function rleftbottomstop(){
  if(!ispower) return
  switchem.emit('rleftbottomstop');
}
function rbottomstart(){
  if(!ispower) return
  switchem.emit('rbottomstart');
}
function rbottomstop(){
  if(!ispower) return
  switchem.emit('rbottomstop');
}
function rbottomrightstart(){
  if(!ispower) return
  switchem.emit('rbottomrightstart');
}
function rbottomrightstop(){
  if(!ispower) return
  switchem.emit('rbottomrightstop');
}
function rrightstart(){
  if(!ispower) return
  switchem.emit('rrightstart');
}
function rrightstop(){
  if(!ispower) return
  switchem.emit('rrightstop');
}
function rrighttopstart(){
  if(!ispower) return
  switchem.emit('rrighttopstart');
}
function rrighttopstop(){
  if(!ispower) return
  switchem.emit('rrighttopstop');
}
function a(){
  if(!ispower) return
  switchem.emit('a');
}
function b(){
  if(!ispower) return
  switchem.emit('b');
}
function x(){
  if(!ispower) return
  switchem.emit('x');
}
function y(){
  if(!ispower) return
  switchem.emit('y');
}
function home(){
  if(!ispower) return
  switchem.emit('home');
}
function r(){
  if(!ispower) return
  switchem.emit('r');
}
function volp(){
  if(!ispower) return
  switchem.emit('volp');
}
function volm(){
  if(!ispower) return
  switchem.emit('volm');
}
let istounpower = false;
let istopower = false;
let ispowerpressed = false;
async function power(){
  switchem.emit('power');
  ispowerpressed = true;
  if(ispower){
    unpower();
  } else {
    onpower();
  }
  function unpower(){
    if(istounpower) return;
    ispowerpressed = false;
    istounpower = true
    $('#switchcontainer').find('input, textarea, button, select').prop('disabled', true);
    $("#switchcontainer").fadeTo(300, 0, function(){
      sound.pause();
      istounpower = false;
      ispower = false;
      if(ispowerpressed){
        onpower();
        ispowerpressed = false;
      }
    });
  }
  function onpower(){
    if(istopower) return;
    sound.play();
    ispowerpressed = false;
    istopower = true
    $("#switchcontainer").fadeTo(300, 1, function(){
      istopower = false;
      ispower = true;
      $('#switchcontainer').find('input, textarea, button, select').prop("disabled", false);
      if(ispowerpressed){
        unpower();
        ispowerpressed = false;
      }
    });
  }
}
