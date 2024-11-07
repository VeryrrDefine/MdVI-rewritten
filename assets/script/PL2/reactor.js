
function getReactorClass(id) {
    
    if (player.PL2reactorStates.includes(id)){
        return "rea rea_active"
    }else{
        return "rea"
    }
}
function toggleReactorState(i) {
    let temp1 = player.PL2reactorStates.indexOf(i)
    if (temp1 == -1) {
        player.PL2reactorStates.push(i)
    } else {
        player.PL2reactorStates.splice(temp1, 1)
    }
}
function getReactor(){
    if (player.PL2dimensionalEnergy.gte(reactorCost())){
        player.PL2reactors = player.PL2reactors.add(1)
    }
}
function reactorCost(){
    return PowiainaNum.pow(10,PowiainaNum.mul(50,PowiainaNum.pow(1.1,player.PL2reactors)));
}
function reactorSpeed(){
    return player.PL2reactors.mul(3)
}
function reactorLoop(){
    if (player.PL2reactorStates.includes(1)){
        player.PL2mm53 = player.PL2mm53.add(reactorSpeed().mul(timeDifferences[0]))
    }

    if (player.PL2reactorStates.includes(2)){
        if (reactorSpeed().mul(timeDifferences[0]).mul(4).lte(player.PL2mm53)){
            player.PL2mm54 = player.PL2mm54.add(reactorSpeed().mul(timeDifferences[0]))
            player.PL2mm53 = player.PL2mm53.sub(reactorSpeed().mul(timeDifferences[0]).mul(4))
        }
    }
    if (player.PL2reactorStates.includes(3)){
        if (reactorSpeed().mul(timeDifferences[0]).mul(4).lte(player.PL2mm54)){
            player.PL2mm55 = player.PL2mm55.add(reactorSpeed().mul(timeDifferences[0]))
            player.PL2mm54 = player.PL2mm54.sub(reactorSpeed().mul(timeDifferences[0]).mul(4))
        }
    }
    if (player.PL2reactorStates.includes(4)){
        if (reactorSpeed().mul(timeDifferences[0]).mul(4).lte(player.PL2mm55)){
            player.PL2mm56 = player.PL2mm56.add(reactorSpeed().mul(timeDifferences[0]))
            player.PL2mm55 = player.PL2mm55.sub(reactorSpeed().mul(timeDifferences[0]).mul(4))
        }
    }
    if (player.PL2reactorStates.includes(5)){
        if (reactorSpeed().mul(timeDifferences[0]).mul(4).lte(player.PL2mm56)){
            player.PL2mm57 = player.PL2mm57.add(reactorSpeed().mul(timeDifferences[0]))
            player.PL2mm56 = player.PL2mm56.sub(reactorSpeed().mul(timeDifferences[0]).mul(4))
        }
    }

}

function buyReacUpg(x){
    if (x==1 && player.PL2mm54.gte(128) && !player.PL2reaUpg.includes(1)) player.PL2reaUpg.push(1)
    if (x==2 && player.PL2mm55.gte(256) && !player.PL2reaUpg.includes(2)) player.PL2reaUpg.push(2)
    if (x==3 && player.PL2mm56.gte(512) && !player.PL2reaUpg.includes(3)) player.PL2reaUpg.push(3)
    if (x==4 && player.PL2mm57.gte(256) && !player.PL2reaUpg.includes(4)) player.PL2reaUpg.push(4)
}
function getReacUpgEffect2(){
    return player.PL2reaUpg.includes(2) ? player.PL2mm55.max(1).pow(1.2).min(1e5) : PowiainaNum.ONE.clone();
}
function getReacUpgEffect3A(){
    return player.PL2reaUpg.includes(3) ? player.volumes.max(1).logBase(2).max(1).logBase(2).div(4096) : PowiainaNum.ZERO.clone();
}
function getReacUpgEffect3B(){
    return player.PL2reaUpg.includes(3) ? player.PL2dimensionalEnergy.max(1).logBase(2).max(1).logBase(2).div(4096) : PowiainaNum.ZERO.clone();
}