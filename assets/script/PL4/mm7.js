loadScriptFile("PL4/treeupgrade.js")
loadScriptFile("PL4/challenge.js")
loadScriptFile("PL4/mm7dimensions.js")
function getMM705gen(){
    let temp1 = PowiainaNum.ZERO.clone();
    if (hasTreeUpgrade('c')) temp1 = PowiainaNum(1)
    
    if (hasTreeUpgrade([1, 1, 'main'])) {
        temp1 = temp1.mul(treeUpgrades.main[1][1].effect());
    }
    return temp1;
}
function mm7Loop(){
    player.PL4mm702 = player.PL4mm702.add(getMM705gen().mul(timeDifferences[1]))
    player.PL4treeUpgradeRequirements = [...(new Set(player.PL4treeUpgradeRequirements))];
    calculatemm7Dimensions();
    if (hasTreeUpgrade("pasgen1")){
        player.PL4points = player.PL4points.add(tmp.mm7.gain.mul(timeDifferences[1]))
    }
    FACTORSPACES.updateTemp();
    FACTORSPACES.update();
}
function norewardMM7reset(isFactorSpace=false){
    reset4DDimensions();
    reset5DDimensions();
    //hasTreeUpgrade("qol1")
    /*PL2*/
    
    if (!hasTreeUpgrade("qol1")){
        Object.assign(player, {

            PL2points: ExpantaNum.ZERO,
            isPL2unlocked: true,
            PL2total: ExpantaNum.ZERO,
            PL2Timespent: 0, // 时间流逝


            PL2inchallenge: 0,
            PL2chal: [],

            PL2resetTimesSpent: PowiainaNum.ZERO, 




            PL2RTupgrade1: PowiainaNum.ZERO,
            PL2RTupgrade2: PowiainaNum.ZERO,


            PL2dimensionalEnergy: PowiainaNum.ZERO.clone(),





            PL2moreRPgenerated: PowiainaNum.ZERO.clone(),

            PL2isunlockedCompress: false,
            PL2incompress: false,
            PL2highestVolumeInCompress: PowiainaNum.ZERO.clone(),
            PL2xiaopengyouMK2: PowiainaNum.ZERO.clone(),

            PL2buyable1: PowiainaNum.ZERO.clone(),
            PL2buyable2: PowiainaNum.ZERO.clone(),
            PL2buyable3: PowiainaNum.ZERO.clone(),
            PL2buyable4: PowiainaNum.ZERO.clone(),

            PL2xiaopengyouMK2milestone1Reached: false,
            PL2theorieSpent: PowiainaNum.ZERO,
            PL2theoTyp1: PowiainaNum.ZERO,
            PL2theoTyp2: PowiainaNum.ZERO,
            PL2theoTyp3: PowiainaNum.ZERO,
            PL2times: PowiainaNum(2),
            PL2theoChoose: [],

            PL2reactorStates: [],
            PL2reactors: PowiainaNum.ZERO.clone(),
            PL2mm53: PowiainaNum.ZERO.clone(),
            PL2mm54: PowiainaNum.ZERO.clone(),
            PL2mm55: PowiainaNum.ZERO.clone(),
            PL2mm56: PowiainaNum.ZERO.clone(),
            PL2mm57: PowiainaNum.ZERO.clone(),

            PL2reaUpg: [],
        }
        )
    }
    if (isFactorSpace){
        player.PL1points = PowiainaNum.ZERO.clone()
        player.PL1xiaopengyouPoints = PowiainaNum.ZERO.clone()
        player.PL2points = PowiainaNum.ZERO.clone()
        player.PL2xiaopengyouMK2 = PowiainaNum.ZERO.clone()
    }
    if (!hasTreeUpgrade("qol1")){Object.assign(player, {
        PL1Timespent: 0,
        PL1points: ExpantaNum.ZERO,
        PL1times: ExpantaNum.ZERO,
        PL1total: ExpantaNum.ZERO,
        PL1upgrades: [],
        PL1chal: [],
        PL1inchal: 0,

        PL1autoupg1: 0,
        PL1autoupg2: 0,
        PL1autoupgDIMBOOST:0,
        PL1autoupgMM3RESET: 0,

        PL1buyable1: ExpantaNum.ZERO,


        PL1xiaopengyouUnl: false,

        PL1xiaopengyouPoints: ExpantaNum.ZERO,
        PL1buyable2: ExpantaNum.ZERO,
    })}

    Object.assign(player, {
        volumes: E(7),

        currentHP: ExpantaNum.ONE.clone(),
        currentMP: ExpantaNum.ZERO.clone(),
        currentDEF: ExpantaNum.ZERO.clone(),
        currentATK: ExpantaNum.ONE.clone(),
        currentAPS: ExpantaNum.ONE.clone(),

        currentEnemyHP: ExpantaNum.ZERO.clone(),

        XP: ExpantaNum.ZERO.clone(),

        currentFilling: [],

        enemyHPspent: ExpantaNum.ZERO.clone(),
        currentBattlingEnemyId: -1,

        dimBoost: ExpantaNum.ZERO,
        dimBoostTimespent: 0,

        automationState: {
            
        },
        dimBoost2: ExpantaNum.ZERO,
        
        isUnlockedDimBoost3: false,
        dimBoost3: PowiainaNum.ZERO,

    })
    Object.assign(player, {

        
        PL3points: PowiainaNum.ZERO,
        isPL3unlocked: true,
        PL3times: PowiainaNum.ZERO.clone(),
        PL3total: PowiainaNum.ZERO,
        PL3Timespent: 0,


        PL3currentResearching: 0,
        
        PL3xpyrep: PowiainaNum.ZERO.clone(),


        


    })
    if (!hasTreeUpgrade("qol5")){
        Object.assign(player, {

            PL3xpybuyable1: PowiainaNum.ZERO.clone(),
            PL3xpybuyable2: PowiainaNum.ZERO.clone(),
            PL3xpybuyable3: PowiainaNum.ZERO.clone(),
        })
    }
    if (!hasTreeUpgrade("qol4")){
        Object.assign(player, {
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

        })
    }
    if (!hasTreeUpgrade("qol1")){
        Object.assign(player, {
            PL3researchedDisposable: [],
            PL3researchedReresearchable: {

            },
            PL3researchesProgress:{

            },

        })
    }
}
function doMM7reset() {
    if (player.volumes.gte("e1.797e308")) {
        player.PL4points = player.PL4points.add(tmp.mm7.gain);
        player.PL4total = player.PL4total.add(tmp.mm7.gain);
        player.PL4times = player.PL4times.add(1);
        player.isPL4unlocked = true;
        norewardMM7reset();
    }
}
function doMM7resetManmade() {
    if (player.volumes.gte("e1.797e308") && (hasTreeUpgrade("qol5") || confirm("are you sure you want to reset?"))) {
        
        doMM7reset()
    }
}



function getBuyable1Cost(){
    return scaleCost(5000, 1.1, player.PL4buyable1);
}
function getBuyable2Cost(){
    return scaleCost(2e10, 10, player.PL4buyable2);
}

function buyPL4buyable(id){
    if (id == 1){
        let bulk = invScaleCost(5000, 1.1, player.PL4points);
        if (bulk.gt(player.PL4buyable1)){
            player.PL4buyable1 = bulk;
        }
    }
    if (id == 2){
        let bulk = invScaleCost(2e10, 10, player.PL4points);
        if (bulk.gt(player.PL4buyable2)){
            player.PL4buyable2 = bulk;
        }
    }
}
function getPL4buyableeffect(id){
    if (id == 1){
        return PowiainaNum.pow(10, player.PL4buyable1)
    }
    if (id == 2){
        return PowiainaNum.pow(2, player.PL4buyable2.add(
            getPL4buyableFreeUpgrades(2)
        ))
    }

}
function getPL4buyableFreeUpgrades(id) {
    if (id == 1){
        return PowiainaNum(0)
    }
    if (id == 2){
        return FACTORSPACES.facEff(0, 0).max(0)
    }

}
loadScriptFile("PL4/factorspace.js")