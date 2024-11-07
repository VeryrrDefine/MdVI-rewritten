function research(id){
    if (id>=5){
        if (!player.PL3researchedDisposable.includes(id)){
            player.PL3currentResearching = id;
            player.PL3researchProgress = PowiainaNum.ZERO.clone()

        }
    }
}
function getCurrentPL3toPL2resetTimes(){
    return PowiainaNum.pow(2, player.PL3times)
    .min(player.PL3times.mul(4))
    .min(player.PL3times.mul(1e10).max(1).pow(0.25)).max(1)
}
function getCurrentResearchSpeed(){
    return player.PL3times.mul(PowiainaNum.pow(1.414213562,player.PL3times.sub(2).max(0)))
    .min(player.PL3times.pow(4)).min(player.PL3times.mul(1e30))
}
function researchProgress(id, progress){
    if (!Object.hasOwn(player.PL3researchesProgress,id)){
        player.PL3researchesProgress[id]=PowiainaNum.ZERO.clone();
    }
    if (progress === undefined){
        return player.PL3researchesProgress[id]
    }
    else{
        return player.PL3researchesProgress[id] = progress.clone();
    }
}
function reserachLoop(){
    if (player.PL3currentResearching){
        let id= player.PL3currentResearching;
        researchProgress(id, 
            researchProgress(id).add(getCurrentResearchSpeed().mul(timeDifferences[0]))
        )
        if (getResearchProgressNeed(id).lte(
            researchProgress(id)
        )) {
            researchProgress(id, PowiainaNum(0));
            if (id >=5){
                player.PL3researchedDisposable.push(id);
                player.PL3currentResearching = 0
            }
        }
    }
    player.PL3researchedDisposable = [...(new Set(player.PL3researchedDisposable))];
}
function getProgressWidth(){
    if (!player.PL3currentResearching){
        return "0%"
    }else{
        return (researchProgress(player.PL3currentResearching).div(getResearchProgressNeed(player.PL3currentResearching)).toNumber()*100).toFixed(3).toString()+"%"
    }

}
function researchLevel(id){
    if (id >= 5){
        return +player.PL3researchedDisposable.includes(id)
    }
}
function getResearchProgressNeed(id){
    if (id == 5){
        return PowiainaNum(10);
    }
    if (id == 6){
        return PowiainaNum(100);
    }
    if (id == 7){
        return PowiainaNum(400);
    }
    if (id == 8){
        return PowiainaNum(1600);
    }
    if (id == 9){
        return PowiainaNum(6400);
    }
    if (id == 10){
        return PowiainaNum(1e11);
    }
}