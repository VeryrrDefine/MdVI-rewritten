
function getEnglishNumberOrdinal(num){
    if (num < 1 || Number.isNaN(num) || !Number.isFinite(num)){
        throw RangeError("ordinal number cannot be less than 1, NaN, or Infinity");
    }
    let x = Math.floor(num);
    let tenIsOne = Math.floor(x%100/10)===1 ? true : false;
    let mod = x%10;
    let result = "";
    result = result.concat(x.toString());
    if (tenIsOne){
        result = result.concat("th");
        return result;
    } else {
        if (mod === 1){
            result = result.concat("st")
        }else if(mod === 2){
            result = result.concat("nd")
        }else if(mod === 3){
            result = result.concat("rd")
        }else {
            result = result.concat("th");
        }
    }
    return result;
}

var tabShow = {
    inPrimaryTab(primaryTab) {
        let subtabIDList = [];
        for (const key in this[primaryTab]){
            if (key === "text" || key === "class" || key === "unlocked" || key === "firstTabID" || key === "style"){
                
            }else{
                subtabIDList.push(this[primaryTab][key].id)
            }
        }
        return subtabIDList.includes(player.currentPage) || player.currentPage == this[primaryTab].firstTabID
    },
    inSecondaryTab(primaryTab, secondaryTab) {
        return player.currentPage == this[primaryTab][secondaryTab].id
    },
    main: {
        dimensions: {
            id: 1,
            text: "tabDimensionsonetoeight",
            unlocked() {
                return true;
            },
        },
        dimboost: {
            id: 4,
            text: "tabDimensionBoost", 
            unlocked() {
                return true;
            }
        },
        offline: {
            id:5,
            text: "tabOfflinedTime",
            unlocked() {
                return true;
            }
        },
        fivedimensiondimensions: {
            id: 15,
            class: "mm5btn",
            text: "9-16维度",
            unlocked(){
                return player.PL2times.gte(1500)    
            }
        },
        text: "tabMain",
        firstTabID: 1
    },
    automation: {
        text: "tabAutomation",
        firstTabID: 8,
        auto: {
            text: "tabAutomation",
            id: 8
        },
        unlocked(){
            return hasMM3Upg(2)
        }
    },
    reset: {
        text: "tabReset",
        firstTabID: 9,
        faketab: {
            unlocked(){return false},
            id: 9
        },
        unlocked(){
            return player.PL1breakedPL1limit
        }
    },
    battle: {
        text: "战斗场",
        firstTabID: 13,
        battle: {
            text: "战斗界面",
            
            id: 13
        },
        enemy: {
            text: "对方选择",
            
            id: 14
        },
        unlocked(){
            return player.PL2times.gte(4)
        }
    },
    mm3: {
        text: "3维体积",
        firstTabID : 6,
        upgrades: {
            id: 6,
            class: "mm3btn",
            text: "升级"
        },
        challenges: {
            id: 7,
            class: "mm3btn",
            text: "挑战"
        },
        xiaopengyou: {
            id: 10,
            class: "mm3btn",
            text: "小朋友"
        },
        get class(){
            return "mm3btn "
        } ,
        unlocked() {
            return player.isPL1unlocked || showAllPrestigeLayers;
        }
    },
    mm5: {
        text: "5维体积",
        firstTabID: 12,
        upgradestoo: {
            id: 12,
            class: 'mm5btn',
            text: "里程碑"
        },
        upgradeTower: {
            id: 16,
            class: 'mm5btn',
            text: "研究升级"
        },
        reactor: {
            id: 17,
            class: "mm5btn",
            text: "反应堆"
        },
        volumeDilate: {
            id: 18,
            class: "mm5btn",
            text: "体积"/*反向*/+"膨胀"
        },
        class: "mm5btn",
        unlocked() {
            if (showAllPrestigeLayers){
                return true;
            }
            if (player.isPL2unlocked){
                return true;
            }
        }
    },
    mm6: {
        text: "6维体积",
        firstTabID: -999,
        "6dfractal": {
            id: -999,
            text: "6D分型",
            class: "mm6btn"
        },
        class: "mm6btn",
        unlocked() {
            return showAllPrestigeLayers
        }
    },
    mm7: {
        text: "7维体积",
        firstTabID: -998,
        
        class: "mm7btn",
        unlocked() {
            return showAllPrestigeLayers
        }
    },
    mm8: {
        text: "8维体积",
        firstTabID: -997,
        
        class: "mm8btn",
        unlocked() {
            return showAllPrestigeLayers
        }
    },
    mm9: {
        text: "9维体积",
        firstTabID: 9006,
        
        class: "mm9btn",
        unlocked() {
            return showAllPrestigeLayers
        }
    },
    mm10: {
        text: "10维体积",
        firstTabID: -995,
        
        class: "mm10btn",
        unlocked() {
            return showAllPrestigeLayers
        }
    },
    mm11evolution: {
        get text() {
            let progress = Math.min(player.volumes.slog(10).log10().sub(
                Math.log10(Number.MAX_SAFE_INTEGER)
            ).div(Math.log10(Number.MAX_VALUE)-Math.log10(Number.MAX_SAFE_INTEGER)).toNumber(),1)
            return progress >= 1 ? "11维体积" : ""
        },
        firstTabID: 999999999-11870502,
        /*evolue:{
            id: 9999999999-11870502,
            text: "商店",
            class: "evolue",
        },*/
        get style(){
            if (player.volumes.lt(PowiainaNum.TETRATED_MAX_SAFE_INTEGER)){
                return "display: none;"
            }
            let progress = Math.min(player.volumes.slog(10).log10().sub(
                Math.log10(Number.MAX_SAFE_INTEGER)
            ).div(Math.log10(Number.MAX_VALUE)-Math.log10(Number.MAX_SAFE_INTEGER)).toNumber(),1)
            return `opacity: ${progress}; width: ${progress*69.132}px; white-space: nowarp;`
        },
        class: "evolue",
        unlocked() {
            return true;
        }
    },
    settings: {
        text: "选项",
        firstTabID: 2,
        save: {
            id: 2,
            text: "保存",
        },
        about: {
            id: 3,
            text: "关于"
        },
        backgroundSettings: {
            id: 11,
            text: "概要"
        }
    },
    test: {
        text: "1187",
        firstTabID: 11870903,
        test: {
            id: 11870903,
            text: "测试"
        },
        unlocked(){
            return location.host.includes("127.0.0.1")
        }
    },

};
function primaryTabSort() {
    let result = [];
    for (const key in tabShow){
        if (key === "inPrimaryTab" || key === "inSecondaryTab"){
            continue;
        }else{
            let showThisTab = false;
            if (tabShow[key].unlocked === void 0){
                showThisTab = true
            }else{
                showThisTab = tabShow[key].unlocked()
            }
            if (showThisTab){
                result.push(
                    {
                        style: (tabShow[key].style ?? ""),
                        text:  glt(tabShow[key].text),
                        name: key,
                        id: tabShow[key].firstTabID
                    }
                )
            }
        }
    }
    return result;
}
function secondaryTabSort() {
    let result = [];
    for (const key in tabShow){
        if (tabShow.inPrimaryTab(key)){
            for (const subtabKey in tabShow[key]){
                if (subtabKey === "firstTabID" || subtabKey === "text" || subtabKey==="unlocked" || subtabKey === "class"|| subtabKey === "style"){continue;}else{
                    let showThisSubTab = true;
                    if (tabShow[key][subtabKey].unlocked === void 0){
                        showThisSubTab = true;
                    }else{
                        showThisSubTab = tabShow[key][subtabKey].unlocked()
                    }
                    if (showThisSubTab){
                        result.push(
                            {
                                id: tabShow[key][subtabKey].id,
                                style: (tabShow[key][subtabKey].style ?? ""),
                                text:  glt(tabShow[key][subtabKey].text),
                                name: subtabKey,
                                parentTab: key
                            }
                        )
                    }
                }
            }
        }
    }
    return result;
}
function getTabClass(tabname) {
    return "btn "+tabShow[tabname].class ?? ""
}
function getSubTabClass(parentTab,subTabName) {
    return "btn "+tabShow[parentTab][subTabName].class ?? ""
}

function colorText(elem, color, text) {
    return "<" + elem + " style='color:" + color + ";text-shadow:0px 0px 10px;'>" + text + "</" + elem + ">"
}
function convertToB16(n) {
    let codes = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
    let x = n % 16
    return codes[(n - x) / 16] + codes[x]
}
  
function getUndulatingColor(period = Math.sqrt(760)) {
    let t = new Date().getTime()
    let a = Math.sin(t / 1e3 / period * 2 * Math.PI + 0)
    let b = Math.sin(t / 1e3 / period * 2 * Math.PI + 2)
    let c = Math.sin(t / 1e3 / period * 2 * Math.PI + 4)
    a = convertToB16(Math.floor(a * 128) + 128)
    b = convertToB16(Math.floor(b * 128) + 128)
    c = convertToB16(Math.floor(c * 128) + 128)
    return "#" + String(a) + String(b) + String(c)
}

function formatEndgame() {
    const x = getUndulatingColor()
    const endgameText = "当前Endgame：" + colorText('b', x, Endgame.format()) + " mm<sup>4</sup>"
    return endgameText
}
function formatHardcap(){
    const x = getUndulatingColor()
    const endgameText = "数值非硬编码硬上限：" + colorText('b', x, PowiainaNum.MAX_POWIAINANUM_VALUE.format()+ "({10,9007199254740991,1,1,1,2})") 
    return endgameText

}
function display4DDimCost(dimid) {
    if (player.PL1breakedPL1limit  && (player.PL1inchal!=1)){
        return glt("dimensionsBoughtTimes").replace("%n", format(player.dimensions[DIMENSIONS_BOUGHT][dimid - 1 ])) 
    }else{
        return `${glt("pricecolon")} ${format(player.dimensions[DIMENSIONS_COST][dimid - 1 ])} mm<sup>4</sup>`
    }
}

function dimensionsLabel(dimid){
    if (currentLanguage == 1){
        return `${getEnglishNumberOrdinal(+dimid)} Dimension`
    }
    return `第${dimid}维度`
}