const automationTypes = {
    "buydim1": {
        time(){return 0},
        action(){buydim(1)},
        canAction(){return buyable(1) && player.auto.includes(1)},
        text: "自动购买维度1",
    },
    "buydim2": {
        time(){return 0},
        action(){buydim(2)},
        canAction(){return buyable(2) && player.auto.includes(2)},
        text: "自动购买维度2"
    },
    "buydim3": {
        time(){return 0},
        action(){buydim(3)},
        canAction(){return buyable(3) && player.auto.includes(3)},
        text: "自动购买维度3"
    },
    "buydim4": {
        time(){return 0},
        action(){buydim(4)},
        canAction(){return buyable(4) && player.auto.includes(4)},
        text: "自动购买维度4"
    },
    "buydim5": {
        time(){return 0},
        action(){buydim(5)},
        canAction(){return buyable(5) && player.auto.includes(5)},
        text: "自动购买维度5"
    },
    "buydim6": {
        time(){return 0},
        action(){buydim(6)},
        canAction(){return buyable(6) && player.auto.includes(6)},
        text: "自动购买维度6"
    },
    "buydim7": {
        time(){return 0},
        action(){buydim(7)},
        canAction(){return buyable(7) && player.auto.includes(7)},
        text: "自动购买维度7"
    },
    "buydim8": {
        time(){return 0},
        action(){buydim(8)},
        canAction(){return buyable(8) && player.auto.includes(8)},
        text: "自动购买维度8"
    },

    "dimboost":{
        time() {return 0},
        action(){dimBoost()},
        canAction(){return player.volumes.gte(tmp.dimensionBoost.require()) && player.auto.includes(9)},
        text: "自动维度提升",
        unlocked(){
            return hasMM3Upg(3)
        },
    },
    "mm3reset": {
        time() {return 0},
        action(){doMM3reset()},
        canAction(){return player.volumes.gte(mm3Require) && player.auto.includes(10)},
        text: "自动mm<sup>3</sup>重置",
        unlocked(){
            return hasMM3Upg(7)
        }
    },

    "dimboost2":{
        time() {return 0},
        action(){dimBoost2()},
        canAction(){return player.auto.includes(11)},
        text: "自动维度提升^2",
        unlocked(){
            return player.PL2times.gte(90)
        },
    },
    "dimboost3": {
        time() {return 0},
        action(){dimBoost3()},
        canAction(){return player.auto.includes(12)},
        text: "自动维度提升^3",
        unlocked() {
            return player.PL2reaUpg.includes(1);
        }
    },
    "buy5dim1": {
        time(){return 0},
        action(){buymm5dim(1+8)},
        canAction(){return buyable(1) && player.auto.includes(13)},
        text: "自动购买维度9",
        unlocked(){
            return player.PL2xiaopengyouMK2milestone1Reached
        }
    },
    "buy5dim2": {
        time(){return 0},
        action(){buymm5dim(2+8)},
        canAction(){return buyable(2) && player.auto.includes(14)},
        text: "自动购买维度10",
        unlocked(){
            return player.PL2xiaopengyouMK2milestone1Reached
        }
    },
    "buy5dim3": {
        time(){return 0},
        action(){buymm5dim(3+8)},
        canAction(){return buyable(3) && player.auto.includes(15)},
        text: "自动购买维度11",
        unlocked(){
            return player.PL2xiaopengyouMK2milestone1Reached
        }
    },
    "buy5dim4": {
        time(){return 0},
        action(){buymm5dim(4+8)},
        canAction(){return buyable(4) && player.auto.includes(16)},
        text: "自动购买维度12",
        unlocked(){
            return player.PL2xiaopengyouMK2milestone1Reached
        }
    },
    "buy5dim5": {
        time(){return 0},
        action(){buymm5dim(5+8)},
        canAction(){return buyable(5) && player.auto.includes(17)},
        text: "自动购买维度13",
        unlocked(){
            return player.PL2xiaopengyouMK2milestone1Reached
        }
    },
    "buy5dim6": {
        time(){return 0},
        action(){buymm5dim(6+8)},
        canAction(){return buyable(6) && player.auto.includes(18)},
        text: "自动购买维度14",
        unlocked(){
            return player.PL2xiaopengyouMK2milestone1Reached
        }
    },
    "buy5dim7": {
        time(){return 0},
        action(){buymm5dim(7+8)},
        canAction(){return buyable(7) && player.auto.includes(19)},
        text: "自动购买维度15",
        unlocked(){
            return player.PL2xiaopengyouMK2milestone1Reached
        }
    },
    "buy5dim8": {
        time(){return 0},
        action(){buymm5dim(8+8)},
        canAction(){return buyable(8) && player.auto.includes(20)},
        text: "自动购买维度16",
        unlocked(){
            return player.PL2xiaopengyouMK2milestone1Reached
        }
    },
}
function getAutomationTabDetail(){
    let result = ""
    for (const type in automationTypes){
        if (automationTypes[type].unlocked === undefined || automationTypes[type].unlocked()){
            result = result.concat(automationTypes[type].text)
            result = result.concat(" 间隔: ");
            result = result.concat(formatTime.fromSeconds(automationTypes[type].time()))
            if (automationTypes[type].upgradable !== undefined && automationTypes[type].upgradable()){
                result = result.concat(` <button class=\"btn mm3btn\" onclick="upgradeAuto('${type}')">${automationTypes[type].upgradeEffect} 价格：${format(automationTypes[type].cost())} mm<sup>3</sup> </button>`);

            }
            result = result.concat("<br>")
        }
    }
    return result
}
function upgradeAuto(type){
    automationTypes[type].tryUpgrade();
}
function automationLoop(){
    for (const type in automationTypes){
        if (player.automationState[type] === undefined){
            player.automationState[type] = {
                lastRun: Date.now()
            }
        }

        if (automationTypes[type].canAction() && (( Date.now()-player.automationState[type].lastRun)/1000>=automationTypes[type].time())){
            automationTypes[type].action()
            player.automationState[type].lastRun = Date.now()
        }
        
    }
}