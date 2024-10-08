var blackListProperties = [];
var hasLoaded = {
    status: false
}
function resetDimensions() {
    player.dimensions = [
        [E(0), E(0), E(0), E(0), E(0), E(0), E(0), E(0)], //dimensions
        [E(1), E(1), E(1), E(1), E(1), E(1), E(1), E(1)], //dimensions_multi
        [E(0), E(0), E(0), E(0), E(0), E(0), E(0), E(0)], // dimensions_bought
        [E(10), E(100), E(1000), E(1e4), E(1e5), E(1e6), E(1e7), E(1e8)],// dim_cost
        [E(1), E(1), E(1), E(1), E(1), E(1), E(1), E(1)], //dim_exponent
        [E(1), E(1), E(1), E(1), E(1), E(1), E(1), E(1)], //dim_doubleexponent
    ]
}
function hardReset() {
    player = {
        version: 1,
        dimensions: [
            [E(0), E(0), E(0), E(0), E(0), E(0), E(0), E(0)], //dimensions
            [E(1), E(1), E(1), E(1), E(1), E(1), E(1), E(1)], //dimensions_multi
            [E(0), E(0), E(0), E(0), E(0), E(0), E(0), E(0)], // dimensions_bought
            [E(10), E(100), E(1000), E(1e4), E(1e5), E(1e6), E(1e7), E(1e8)],// dim_cost
            [E(1), E(1), E(1), E(1), E(1), E(1), E(1), E(1)], //dim_exponent
            [E(1), E(1), E(1), E(1), E(1), E(1), E(1), E(1)], //dim_doubleexponent
        ],
        volumes: E(7),
        currentPage: 1,
        time: Date.now(),

        dimBoost: E(0),
        dimBoostTimespent: 0,

        auto: [],

        offlinedTime: 0,
        offlinePower: 0,
        isOffline: false,
        timeSpeed: 0,
        optHotkey: true,

        // mm^3
        isPL1unlocked: false,
        PL1Timespent: 0,
        PL1points: E(0),
        PL1times: E(0),
        PL1total: E(0),
        PL1upgrades: [],
        PL1chal: [],
        PL1inchal: 0,

        PL1autoupg1: 0,
        PL1autoupg2: 0,
        PL1autoupgDIMBOOST:0,
        PL1autoupgMM3RESET: 0,

        PL1buyable1: E(0),

        PL1breakedPL1limit: false,

        PL1xiaopengyouUnl: false,

        PL1xiaopengyouPoints: E(0),
        PL1buyable2: E(0),

        dimBoost2: E(0),
        automationState: {
            
        },

        PL2points: E(0),
        isPL2unlocked: false,
        PL2times: E(0),
        PL2total: E(0),
        PL2Timespent: 0,

    }
}

function deepCopyProps(source,target) {
    for (let key in source) {  
        if (source.hasOwnProperty(key)) {  
            // 如果源对象的属性是对象或数组，则递归复制  
            if ((typeof source[key] === 'object' && !(source[key] instanceof ExpantaNum)) && source[key] !== null) {  
                // 如果目标对象没有这个属性，或者属性是null，则创建一个新的  
                if (!target.hasOwnProperty(key) || target[key] == null || Array.isArray(source[key]) !== Array.isArray(target[key])) {  
                    target[key] = Array.isArray(source[key]) ? [] : {};  
                }  
                // 递归复制属性  
                deepCopyProps(source[key], target[key]);  
            } else {  
                // 如果属性不是对象或数组，则直接复制  
                target[key] = source[key];  
            }  
        }  
    }  
}

function transformToE(object) {
    for(let key in object) {
        if (blackListProperties.includes(key)){
            continue;
        }
        if(typeof object[key] === "string" && !E.isNaN(object[key])) {
            object[key] = new E(object[key]);
        }
        if(typeof object[key] === "object") {
            transformToE(object[key]);
        }
    }
}

function iiuaed(object,objectName,setApply){ // if is undefined, apply else disable
    if (object[objectName] === void 0){
        object[objectName] = setApply;
    }
}
function fixOldSave() {

}
function load(){
    hardReset();
    let loadplayer = localStorage.getItem("vol-inc-rew");
    if (loadplayer != null){
        let loadplayer = formatsave.decode(localStorage.getItem("vol-inc-rew"));
        transformToE(loadplayer);
        deepCopyProps(loadplayer, player);
        fixOldSave();
        player.offlinedTime += (Date.now()-player.time)/1000
    }
    loadVue();
    hasLoaded.status = true;
}

var formatsave = {
    startString: 'MultiDimensionalVolumeIncrementalRewrittenSaveFormat',
    endString: 'EndOfSaveFile',
    steps: [
        {
            encode: JSON.stringify,
            decode: JSON.parse
        },
        {
            encode: x => btoa(x),
            decode: x => atob(x)
        },
        {
            encode: x => formatsave.startString + x + formatsave.endString,
            decode: x => x.slice(formatsave.startString.length, -formatsave.endString.length),
        }
    ],
    encode(s) {
        return this.steps.reduce((x, f) => f.encode(x), s);
    },
    decode(s) {
        return this.steps.reduceRight((x, f) => f.decode(x), s);
    },
}
  
  
function exportCopy() {
    return copyToClipboard(formatsave.encode(player))
}
  
function exportFile() {
    let str = formatsave.encode(player)
    let file = new Blob([str], {
        type: "text/plain"
    })
    window.URL = window.URL || window.webkitURL;
    let a = document.createElement("a")
    a.href = window.URL.createObjectURL(file)
    a.download = "Mdv Incremental Save - " + getCurrentBeijingTime() + ".txt"
    a.click()
}
  
function formattedHardReset() {
    confirms = 3
    for(let i = 1; i < 3; i++) {
        let promption = prompt(`请输入${i}以进行第${i}/${confirms}次确认，此操作无法还原!`)
        if(promption != String(i)) return
    }
    let promption = prompt(`请输入${confirms}以进行最后一次确认，此操作无法还原!`)
    if(promption != String(confirms)) return
    hardReset()
    save()
    location.reload()
}

function importFile() {
    let a = document.createElement("input")
    a.setAttribute("type", "file")
    a.click()
    a.onchange = () => {
        let fr = new FileReader();
        fr.onload = () => {
            let save = fr.result
            importing_player = formatsave.decode(save)
            transformToE(importing_player);
            deepCopyProps(importing_player, player)
            console.clear()
        }
        fr.readAsText(a.files[0]);
    }
}

// 复制文本内容方法
function copyToClipboard(textToCopy) {
    if(document.execCommand('copy')) {
        // 创建textarea
        var textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // 使textarea不在viewport，同时设置不可见
        textArea.style.position = "fixed";
        textArea.style.opacity = 0;
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
            // 执行复制命令并移除文本框
            document.execCommand('copy') ? res() : rej();
            textArea.remove();
        });
    } else if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      // navigator clipboard 向剪贴板写文本
        return navigator.clipboard.writeText(textToCopy);
    }
    addNotify("复制失败")
}
function copyToFile(str,name) {
    let file = new Blob([str], {
        type: "text/plain"
    })
    window.URL = window.URL || window.webkitURL;
    let a = document.createElement("a")
    a.href = window.URL.createObjectURL(file)
    a.download = name + ".txt"
    a.click()
}


function save() {
    localStorage.setItem("vol-inc-rew", formatsave.encode(player))
}
function getCurrentBeijingTime() {
    const t = new Date,
        e = t.getUTCFullYear(),
        r = String(t.getUTCMonth() + 1).padStart(2, "0"),
        a = String(t.getUTCDate()).padStart(2, "0"),
        n = t.getUTCHours(),
        g = t.getUTCMinutes(),
        i = t.getUTCSeconds(),
        S = t.getUTCMilliseconds();
    let o = (n + 8) % 24;
    return o < 0 && (t.setUTCDate(t.getUTCDate() + 1), o += 24), `${e}-${r}-${a} ${o.toString().padStart(2,"0")}:${g.toString().padStart(2,"0")}:${i.toString().padStart(2,"0")}.${S.toString().padStart(3,"0")}`
}
  