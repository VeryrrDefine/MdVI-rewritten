const mm3UpgradeCost = [
    1, 1, 3, 10, 15, 25, 40, 60, 95, 240, 0, "J^114514 19",
    2000, 10000, 50000, 300000, 700000, "1e6", "2e6", "7e9"
]

const mm3ChallengeGoal = [
    E("1e200"), E("1e200"), E("1e700")
]
function hasMM3Upg(x){
    return player.PL1upgrades.includes(x)
}
function buyMM3Upg(x){
    if (x <= 12 && player.PL1points.gte(mm3UpgradeCost[x-1]) && !hasMM3Upg(x)){
        player.PL1upgrades.push(x);
        player.PL1points = player.PL1points.sub(mm3UpgradeCost[x-1])
    }
    if (x <= 22 && player.PL1xiaopengyouPoints.gte(mm3UpgradeCost[x-1]) && !hasMM3Upg(x)){
        player.PL1upgrades.push(x);
        player.PL1xiaopengyouPoints = player.PL1xiaopengyouPoints.sub(mm3UpgradeCost[x-1])

    }
}

function fixInfinity(){
    if (player.PL1times.gte(1) ){
        if (player.PL1inchal!=0){
            player.PL1breakedPL1limit = false
        }else{
            
            player.PL1breakedPL1limit = true
        }
    }
    if (player.volumes.gte(mm3ChallengeGoal[player.PL1inchal]) && !player.PL1breakedPL1limit){
        player.volumes = mm3ChallengeGoal[player.PL1inchal].clone();
    }
    player.PL1chal = [...(new Set(player.PL1chal))]
}
function reset4DDimensions(){
    
    for (let i = 0; i<8; i++){
        player.dimensions[DIMENSIONS_POINTS][i] = PowiainaNum.ZERO.clone();
        player.dimensions[DIMENSIONS_BOUGHT][i] = PowiainaNum.ZERO.clone();
    }
}
function norewardMM3reset(){
    reset4DDimensions()
    player.PL1Timespent = 0;
    player.dimBoostTimespent = 0;
    if (player.PL2times.lt(400)) player.dimBoost = E(hasMM3Upg(7) ? 35 : 
        (hasMM3Upg(6) ? 10 : 0)
    );
    player.volumes = E(7);
    player.PL1inchal = 0;
}

function doMM3reset() {
    player.PL1points = player.PL1points.add(tmp.mm3.gain);
    player.PL1total = player.PL1total.add(tmp.mm3.gain);
    player.PL1times = player.PL1times.add(1);
    player.isPL1unlocked = true;
    norewardMM3reset();
}

function doMM3resetManmade() {
    if (player.volumes.gte(mm3Require)) {
        if (player.PL1inchal != 0){
            player.PL1chal.push(player.PL1inchal);
        }
        doMM3reset()
    }
}

function mm3Loop(){
    player.PL1upgrades = [...(new Set(player.PL1upgrades))]
    if (player.PL2times.gte(50)){
        if (tmp.mm3.gain.gt(1)){
            player.PL1points = player.PL1points.add(tmp.mm3.gain.pow(1).mul(globalDiff))
        }
    }
    else if (player.PL2times.gte(3)){
        if (tmp.mm3.gain.gt(1)){
            player.PL1points = player.PL1points.add(tmp.mm3.gain.pow(0.5).mul(globalDiff))
        }
    }
    if (player.PL2times.gte(15)){
        if (player.PL1points.gte(getBuyableCost(1))) buyBuyable(1);
        if (player.PL1xiaopengyouPoints.gte(getBuyableCost(2))) buyBuyable(2);
    }
}

function enterNorChal(x){
    if (player.PL1inchal != x){
        norewardMM3reset();
        player.PL1inchal = x;
    }
}
function exitChal(){
    if (player.PL1inchal != 0){
        if (player.volumes.gte(mm3ChallengeGoal[player.PL1inchal])){
            player.PL1chal.push(player.PL1inchal);
            doMM3reset();
            
        }else{
            norewardMM3reset();
        }
        player.PL1inchal = 0;
    }
}
function getChalClass(x){
    if (player.PL1inchal==x){
        return "inchal"
    }else{
        if (player.PL1chal.includes(x)){
            return "unlocked"
        }
    }
}

function getBuyableCost(x){
    if (x==1){
        return softcap(E(7).pow(player.PL1buyable1),7**18,2,"pow")
    }
    if (x==2){
        return E(12).pow(player.PL1buyable2)
    }
}
function getBuyableEffect(x){
    if (x==1){
        return E(2).pow(player.PL1buyable1)
    }
    if (x==2){
        return E(2).pow(player.PL1buyable2)
    }
}
function buyBuyable(x){
    switch(x){
        case 1:
            if (player.PL1buyable1.lt(softcap(player.PL1points,7**18,0.5,"pow").logarithm(7).ceil())){
                player.PL1buyable1 = softcap(player.PL1points,7**18,0.5,"pow").logarithm(7).floor();
                if (player.PL2times.lt(15)) player.PL1points = player.PL1points.sub(getBuyableCost(1))
                player.PL1buyable1 = player.PL1buyable1.add(1);

            }
            break;

            
        case 2:
            if (player.PL1xiaopengyouPoints.gte(getBuyableCost(2))){
                if (player.PL2times.lt(15)) player.PL1xiaopengyouPoints = player.PL1xiaopengyouPoints.sub(getBuyableCost(2))
                player.PL1buyable2 = player.PL1buyable2.add(1);
                
            }
            break;
    }
}

function unlockXiaopengyou(){
    if (player.PL1points.gte(player.PL2times.gte(1) ? "1e3" : "1e6")){
        player.PL1xiaopengyouUnl = true
    }
}
function getXiaopengyouGain(){
    let temp1 = E(1)
    temp1 = temp1.mul(getBuyableEffect(2))
    temp1 = temp1.mul(
        player.dimBoost2.gte(2) ? dimBoostReward2[1].effect() : 1
    )
    temp1 = temp1.mul(
        hasMM3Upg(15) ? player.PL1xiaopengyouPoints.log(Math.E).max(1) : 1
    )
    temp1 = temp1.mul(
        hasMM3Upg(18) ? player.volumes.logarithm(14).logarithm(7).max(1) : 1
    )
    temp1 = temp1.mul(
        hasMM3Upg(19) ? player.PL1points.log10().div(10).max(1) : 1
    )
    if (player.PL2times.gte(1)){
        temp1 = temp1.mul(3.2050)
    }
    if (hasBattleUpgrade(1)){
        temp1 = temp1.mul(getBattleUpgradeEffect(1));
    }
    temp1 = temp1.mul(player.PL2reaUpg.includes(2) ? getReacUpgEffect2() : 1);
    if (player.PL1xiaopengyouPoints.gte(tmp.mm3.xiaopengyouCap())){
        temp1 = E(0)
    }
    if (player.PL2reaUpg.includes(4)){
        temp1 = temp1.pow(1.2)
    }
    if (player.PL2isunlockedCompress){
        temp1 = temp1.pow(xiaopengyouExponentMore())
    }
    return temp1
}
function xiaopengyouLoop(){
    if (player.PL1xiaopengyouUnl){
        // globalDiff
        player.PL1xiaopengyouPoints = player.PL1xiaopengyouPoints.add(getXiaopengyouGain().mul(globalDiff))
        if (player.PL1xiaopengyouPoints.gte(tmp.mm3.xiaopengyouCap())){
            player.PL1xiaopengyouPoints = E(tmp.mm3.xiaopengyouCap());
        }
    }
}

function xiaopengyouEffect1(){
    return player.PL1xiaopengyouPoints.add(9).logarithm(3).add(1).logarithm(3)
}

function xiaopengyouEffect2(){
    return softcap(player.PL1xiaopengyouPoints.gte(1000) ? (

        player.PL1chal.includes(2) ?
        player.PL1xiaopengyouPoints.root(5)  :
        player.PL1xiaopengyouPoints.logarithm(7)
    
    ):0,"1e5",0.5,"pow").max(0)
    
}