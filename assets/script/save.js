var blackListProperties = [];
var hasLoaded = {
    status: false
}
function resetDimensions() {
    player.dimensions = [
        new Array(24).fill(PowiainaNum.ZERO.clone()), //dimensions
        new Array(24).fill(PowiainaNum.ONE.clone()), //dimensions_multi
        new Array(24).fill(PowiainaNum.ZERO.clone()), // dimensions_bought
        new Array(24).fill(PowiainaNum.POSITIVE_INFINITY.clone()),// dim_cost
        new Array(24).fill(PowiainaNum.ONE.clone()), //dim_exponent
        new Array(24).fill(PowiainaNum.ONE.clone()), //dim_doubleexponent
    ]
}
function hardReset() {
    player = {
        version: 1,
        dimensions: [
            new Array(24).fill(PowiainaNum.ZERO.clone()), //dimensions
            new Array(24).fill(PowiainaNum.ONE.clone()), //dimensions_multi
            new Array(24).fill(PowiainaNum.ZERO.clone()), // dimensions_bought
            new Array(24).fill(PowiainaNum.POSITIVE_INFINITY.clone()),// dim_cost
            new Array(24).fill(PowiainaNum.ONE.clone()), //dim_exponent
            new Array(24).fill(PowiainaNum.ONE.clone()), //dim_doubleexponent
        ],
        volumes: E(7),
        volumesTotal: PowiainaNum.ZERO.clone(),
        currentPage: 1,
        time: Date.now(),

        dimBoost: PowiainaNum.ZERO,
        dimBoostTimespent: 0,

        auto: [],

        offlinedTime: 0,
        offlinePower: 0,
        isOffline: false,
        timeSpeed: 0,
        optHotkey: true,

        achievements: [],

        //#region PL1
        isPL1unlocked: false,
        PL1Timespent: 0,
        PL1points: PowiainaNum.ZERO,
        PL1times: PowiainaNum.ZERO,
        PL1total: PowiainaNum.ZERO,
        PL1upgrades: [],
        PL1chal: [],
        PL1inchal: 0,

        PL1autoupg1: 0,
        PL1autoupg2: 0,
        PL1autoupgDIMBOOST:0,
        PL1autoupgMM3RESET: 0,

        PL1buyable1: PowiainaNum.ZERO,

        PL1breakedPL1limit: false,

        PL1xiaopengyouUnl: false,

        PL1xiaopengyouPoints: PowiainaNum.ZERO,
        PL1buyable2: PowiainaNum.ZERO,

        dimBoost2: PowiainaNum.ZERO,
        PL1dimensions: [
            [PowiainaNum.ZERO, PowiainaNum.ZERO, PowiainaNum.ZERO, PowiainaNum.ZERO, PowiainaNum.ZERO, PowiainaNum.ZERO, PowiainaNum.ZERO, PowiainaNum.ZERO], //dimensions
            [PowiainaNum.ONE, PowiainaNum.ONE, PowiainaNum.ONE, PowiainaNum.ONE, PowiainaNum.ONE, PowiainaNum.ONE, PowiainaNum.ONE, PowiainaNum.ONE], //dimensions_multi
            [PowiainaNum.ZERO, PowiainaNum.ZERO, PowiainaNum.ZERO, PowiainaNum.ZERO, PowiainaNum.ZERO, PowiainaNum.ZERO, PowiainaNum.ZERO, PowiainaNum.ZERO], // dimensions_bought
            [E(10), E(100), E(1000), E(1e4), E(1e5), E(1e6), E(1e7), E(1e8)],// dim_cost
            [PowiainaNum.ONE, PowiainaNum.ONE, PowiainaNum.ONE, PowiainaNum.ONE, PowiainaNum.ONE, PowiainaNum.ONE, PowiainaNum.ONE, PowiainaNum.ONE], //dim_exponent
            [PowiainaNum.ONE, PowiainaNum.ONE, PowiainaNum.ONE, PowiainaNum.ONE, PowiainaNum.ONE, PowiainaNum.ONE, PowiainaNum.ONE, PowiainaNum.ONE], //dim_doubleexponent
        ],
        automationState: {
            
        },
        //#endregion
        
        //#region PL2
        PL2points: PowiainaNum.ZERO,
        isPL2unlocked: false,
        PL2times: PowiainaNum.ZERO,
        PL2total: PowiainaNum.ZERO,
        PL2Timespent: 0, // 时间流逝


        PL2inchallenge: 0,
        PL2chal: [],

        PL2resetTimesSpent: PowiainaNum.ZERO, 

        PL2RTupgrade1: PowiainaNum.ZERO,
        PL2RTupgrade2: PowiainaNum.ZERO,

        PL2dimensionalEnergy: PowiainaNum.ZERO,

        PL2theorieSpent: PowiainaNum.ZERO,
        PL2theoTyp1: PowiainaNum.ZERO,
        PL2theoTyp2: PowiainaNum.ZERO,
        PL2theoTyp3: PowiainaNum.ZERO,

        PL2theoChoose: [],

        PL2reactorStates: [],
        PL2reactors: PowiainaNum.ZERO.clone(),
        PL2mm53: PowiainaNum.ZERO.clone(),
        PL2mm54: PowiainaNum.ZERO.clone(),
        PL2mm55: PowiainaNum.ZERO.clone(),
        PL2mm56: PowiainaNum.ZERO.clone(),
        PL2mm57: PowiainaNum.ZERO.clone(),

        PL2reaUpg: [],
        isUnlockedDimBoost3: false,
        dimBoost3: PowiainaNum.ZERO,

        PL2isunlockedCompress: false,
        PL2incompress: false,
        PL2highestVolumeInCompress: PowiainaNum.ZERO.clone(),
        PL2xiaopengyouMK2: PowiainaNum.ZERO.clone(),

        PL2buyable1: PowiainaNum.ZERO.clone(),
        PL2buyable2: PowiainaNum.ZERO.clone(),
        PL2buyable3: PowiainaNum.ZERO.clone(),
        PL2buyable4: PowiainaNum.ZERO.clone(),

        PL2xiaopengyouMK2milestone1Reached: false,

        PL2moreRPgenerated: PowiainaNum.ZERO.clone(),


        //#endregion
        //#region PL3

        
        PL3points: PowiainaNum.ZERO,
        isPL3unlocked: false,
        PL3times: PowiainaNum.ZERO,
        PL3total: PowiainaNum.ZERO,
        PL3Timespent: 0,


        PL3currentResearching: 0,
        PL3researchedDisposable: [],
        PL3researchedReresearchable: {

        },
        PL3researchesProgress:{

        },


        PL3elements: {
            
        },
        PL3pickingTime: PowiainaNum.ZERO.clone(),
        PL3ispicking: false,
        PL3materials: {

        },

        PL3materialupg1: PowiainaNum.ZERO.clone(),
        PL3materialupg2: PowiainaNum.ZERO.clone(),
        PL3materialupg3: PowiainaNum.ZERO.clone(),
        PL3materialupg4: PowiainaNum.ZERO.clone(),
        PL3materialupg5: PowiainaNum.ZERO.clone(),
        PL3materialupg6: PowiainaNum.ZERO.clone(),
        PL3materialupg7: PowiainaNum.ZERO.clone(),

        PL3xpyrep: PowiainaNum.ZERO.clone(),

        PL3xpybuyable1: PowiainaNum.ZERO.clone(),
        PL3xpybuyable2: PowiainaNum.ZERO.clone(),
        PL3xpybuyable3: PowiainaNum.ZERO.clone(),


        //#endregion
        boughttheorie91: false,
        reached3e156xpyrepl: false,

        PL4points: PowiainaNum.ZERO,
        isPL4unlocked: false,
        PL4times: PowiainaNum.ZERO,
        PL4total: PowiainaNum.ZERO,
        PL4Timespent: 0,

        PL4mm702: PowiainaNum.ZERO,
        PL4treeUpgradesBought: [],

        PL4treeUpgradeRequirements:[], 

        chalchoosed: 0, //二阶挑战
        chalactive: 0,
        chalcomps: {
            
        },
        PL4buyable1: PowiainaNum.ZERO.clone(),
        PL4buyable2: PowiainaNum.ZERO.clone(),
        
        PL4dimensionalEnergy: PowiainaNum.ZERO,

        PL4factorspace: {
            points: [PowiainaNum(0), PowiainaNum(0)],
            tiers: [[PowiainaNum(0),PowiainaNum(0),PowiainaNum(0),PowiainaNum(0),PowiainaNum(0),PowiainaNum(0),PowiainaNum(0)],[PowiainaNum(0),PowiainaNum(0),PowiainaNum(0),PowiainaNum(0),PowiainaNum(0),PowiainaNum(0),PowiainaNum(0)]],
            choosed: [-1, -1],
        },
        
        PL5points: PowiainaNum.ZERO,
        isPL5unlocked: false,
        PL5times: PowiainaNum.ZERO,
        PL5total: PowiainaNum.ZERO,
        PL5Timespent: 0,

        PL6points: PowiainaNum.ZERO,
        isPL6unlocked: false,
        PL6times: PowiainaNum.ZERO,
        PL6total: PowiainaNum.ZERO,
        PL6Timespent: 0,

        PL7points: PowiainaNum.ZERO,
        isPL7unlocked: false,
        PL7times: PowiainaNum.ZERO,
        PL7total: PowiainaNum.ZERO,
        PL7Timespent: 0,
        
        
        
        format_mode: 0,

        //#region Battle

        currentHP: PowiainaNum.ONE.clone(),
        currentMP: PowiainaNum.ZERO.clone(),
        currentDEF: PowiainaNum.ZERO.clone(),
        currentATK: PowiainaNum.ONE.clone(),
        currentAPS: PowiainaNum.ONE.clone(),

        currentEnemyHP: PowiainaNum.ZERO.clone(),

        XP: PowiainaNum.ZERO.clone(),

        currentFilling: [],

        fillFeatureProgress1: PowiainaNum.ZERO.clone(),
        fillFeatureProgress2: PowiainaNum.ZERO.clone(),
        fillFeatureProgress3: PowiainaNum.ZERO.clone(),

        enemyHPspent: PowiainaNum.ZERO.clone(),
        currentBattlingEnemyId: -1,
        
        battleUpgrade: [],

        enemiesUnlocked: [],

        //#endregion
    }
}

function deepCopyProps(source,target) {
    for (let key in source) {  
        if (source.hasOwnProperty(key)) {  
            // 如果源对象的属性是对象或数组，则递归复制  
            if ((typeof source[key] === 'object' && !(source[key] instanceof PowiainaNum)) && source[key] !== null) {  
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
    let loadplayer = localStorage.getItem("vol-inc-rew-testPowiainaNum");
    if (loadplayer != null){
        let loadplayer = formatsave.decode(localStorage.getItem("vol-inc-rew-testPowiainaNum"));
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
async function importText(){
    let save2 = prompt("输入存档");
    let a = ssf[0](save2);

    if (a) {
        a();
    }
    else{
        importing_player = formatsave.decode(save2)
        hardReset();
        transformToE(importing_player);
        deepCopyProps(importing_player, player)
        save()

        location.href = location.href;
    }
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
        fr.onload = function () {
            let save = fr.result
            importing_player = formatsave.decode(save)
            hardReset();
            transformToE(importing_player);
            deepCopyProps(importing_player, player)
            
            save();
            console.clear()
            location.href = location.href;
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
    localStorage.setItem("vol-inc-rew-testPowiainaNum", formatsave.encode(player))
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
  

function findNaN(object,node=["player"]) {
    let nanNodes = [];
    for(let key in object) {
        if (object[key]=="NaN"){
            nanNodes.push([...node,key])
        }
        if(typeof object[key] === "object") {
            if (object[key] instanceof PowiainaNum){
                if (object[key].isNaN()){
                    nanNodes.push([...node,key])
                }
            } else{
                nanNodes.push(...findNaN(object[key], [...node,key]))

            }
        }
    }
    return nanNodes;
}