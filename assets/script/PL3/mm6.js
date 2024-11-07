
loadScriptFile("PL3/progressUpgrade.js")
loadScriptFile("PL3/elementpicking.js")
loadScriptFile("PL3/xiaopengyouReplicate.js")
function mm6Loop(){
    if (hasTheorie(91)) player.boughttheorie91 = true;

    reserachLoop();
    pickingLoop();
    xpyrepLoop();
}

function reset5DDimensions(){
    
    
    for (let i = 8; i<16; i++){
        player.dimensions[DIMENSIONS_POINTS][i] = PowiainaNum.ZERO.clone();
        player.dimensions[DIMENSIONS_BOUGHT][i] = PowiainaNum.ZERO.clone();
    }
}
function norewardMM6reset(){
    reset4DDimensions();
    reset5DDimensions();
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
        


        
        //#region PL2
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

        dimBoost: ExpantaNum.ZERO,
        dimBoostTimespent: 0,

        auto: [],
        automationState: {
            
        },
        dimBoost2: ExpantaNum.ZERO,
        isPL1unlocked: true,
        PL1breakedPL1limit: true,
    })
    if (!player.PL3materialupg2.eq(PowiainaNum.ONE)){
        Object.assign(player, {
            PL2isunlockedCompress: false,
            PL2incompress: false,
            PL2highestVolumeInCompress: PowiainaNum.ZERO.clone(),
            PL2xiaopengyouMK2: PowiainaNum.ZERO.clone(),
    
            PL2buyable1: PowiainaNum.ZERO.clone(),
            PL2buyable2: PowiainaNum.ZERO.clone(),
            PL2buyable3: PowiainaNum.ZERO.clone(),
            PL2buyable4: PowiainaNum.ZERO.clone(),
    
            PL2xiaopengyouMK2milestone1Reached: false,
        })

    }
    if (!researchLevel(6) == 1){
        Object.assign(player, {
            
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

        })
    }else{
        
        if (!researchLevel(9)) player.PL2times = PowiainaNum(160)
    }
    if (!researchLevel(7) == 1){
        Object.assign(player, {
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
        })
    }else{
        if (!researchLevel(9)) player.PL2times = PowiainaNum(1600)

    }
    if (researchLevel(8 )==1){
        player.auto = [1, 2, 3, 4, 6, 5, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    }
}
function doMM6reset() {
    player.PL3points = player.PL3points.add(tmp.mm6.gain);
    player.PL3total = player.PL3total.add(tmp.mm6.gain);
    player.PL3times = player.PL3times.add(1);
    player.isPL3unlocked = true;
    norewardMM6reset();
}

function doMM6resetManmade() {
    if (player.volumes.gte("e1.3e12")) {
        doMM6reset()
    }
}
