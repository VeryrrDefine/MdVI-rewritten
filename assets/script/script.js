var player = {};
var thisFrame = Date.now();
var lastFrame = Date.now();

var isHoldMax = false;
var globalDiff = 0;
var realityDiff = 0;
function loop(){
    thisFrame = Date.now();
    window.realityDiff = (thisFrame-lastFrame)/1000;
    window.globalDiff = realityDiff;
    updateOffline();
    updateDimensionData();
    calculateDimensions();
    updateVolumes();
    fixInfinity();
    automationLoop();
    mm3Loop();
    player.time = thisFrame
    lastFrame = thisFrame;
}
/*
function updateAuto() {
    if (hasMM3Upg(2)){
        for (let i = 1; i<=8; i++){
            if (player.auto.includes(i)){
                buydim(i,true);
            }
        }
    }
    if (hasMM3Upg(3)){
        if (player.auto.includes(9) && player.volumes.lt(mm3Require)){
            dimBoost()
        }
    }
}*/

function buyable(dim) {
    let temp1 = player.dimensions[DIMENSIONS_COST][dim - 1]
    if (player.volumes.gte(mm3Require)){
        return false
    }
    return player.volumes.gte(temp1)
}

function buyall(){
    buydim(1);
    buydim(2);
    buydim(3);
    buydim(4);
    buydim(5);
    buydim(6);
    buydim(7);
    buydim(8);
}

function calculateDimensions() {
    for (let i = 0; i < 7; i++) {
        player.dimensions[DIMENSIONS_POINTS][i] = player.dimensions[DIMENSIONS_POINTS][i]
            .add(
                player.dimensions[DIMENSIONS_POINTS][i + 1]
                    .mul(player.dimensions[DIMENSIONS_MULTI][i + 1])
                    .pow(player.dimensions[DIMENSIONS_EXPONENT][i + 1])
                    .mul(globalDiff)
            );
        if (player.dimensions[DIMENSIONS_POINTS][i].isNaN()) {
            player.dimensions[DIMENSIONS_POINTS][i] = E(0);
        }
    }
}

function updateDimensionData() {
    if (isHoldMax){
        buyall();
    }
    for (let i = 0; i < 8; i++) {
        player.dimensions[DIMENSIONS_MULTI][i] = tmp.dimension.getDimMultiplier(i);
        player.dimensions[DIMENSIONS_EXPONENT][i] = tmp.dimension.getDimExponentplier(i);
        player.dimensions[DIMENSIONS_COST][i] = calc_cost(i, player.dimensions[DIMENSIONS_BOUGHT][i])
    }

}
const dimBasePrice=[7,7**2,7**3,7**4,7**5,7**6,7**7,7**8]
function calc_cost(dimid, count) {
    // count before buy
    // 1st dimension dimid = 0
    let temp1 = 
        E.mul(dimBasePrice[dimid],tmp.dimension.getDimScale(dimid + 1).pow(count.floor()));

    return temp1;
}
function updateVolumes() {
    player.volumes = player.volumes.add(tmp.mm4.gain.mul(globalDiff))
}
function buydim(dim, single = false) {
    if (player.volumes.gte(player.dimensions[DIMENSIONS_COST][dim - 1])) {
        let temp1 = player.volumes.logarithm(tmp.dimension.getDimScale(dim))
        let temp2 = (player.dimensions[DIMENSIONS_COST][dim - 1]).logarithm(tmp.dimension.getDimScale(dim))
        let bought_now = player.dimensions[DIMENSIONS_BOUGHT][dim - 1];
        let buycount = temp1.sub(temp2).ceil();
        let temp3 = buycount.clone();

        if (buycount.lt(1)) {
            buycount = E(1)
        }
        
        if (single) {
            buycount = E(1)
        }
        player.dimensions[DIMENSIONS_BOUGHT][dim - 1] = player.dimensions[DIMENSIONS_BOUGHT][dim - 1].add(buycount);
        player.dimensions[DIMENSIONS_POINTS][dim - 1] = player.dimensions[DIMENSIONS_POINTS][dim - 1].add(buycount.mul(10)); //     player.volumes = player.volumes.sub(E.pow(10,temp1.mul(dim).ceil()))


        return true
    }
    return false


}


function toggleAutobuyer(i) {
    let temp1 = player.auto.indexOf(i)
    if (temp1 == -1) {
        player.auto.push(i)
    } else {
        player.auto.splice(temp1, 1)
    }
}

(function() {
    document.addEventListener('DOMContentLoaded', function(e) {
        load(e);
        window.loopVal = setInterval(loop, 1000/30)
        window.saveVal = setInterval(save, 1000);
    });
})();

function isEndgame(){
    return player.volumes.gte(Endgame) && player.PL1total.gte(15);
}