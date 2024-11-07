function xpyrepLoop(){if(player.PL3materialupg7.eq(PowiainaNum.ONE)){
    player.PL3xpyrep = player.PL3xpyrep.add(xpyRepSpeed().mul(timeDifferences[0]));
    if (player.PL3xpyrep.gte(1e6)){
        buymm6buyable(1);
        buymm6buyable(2);
        buymm6buyable(3);
    }
    if (player.PL3xpyrep.gte(3e156)){
        player.reached3e156xpyrepl = true;
    }
}}

function xpyRepSpeed(nosoftcap = false){
    let temp1 = PowiainaNum(0.03);
    if (player.PL3xpyrep.gte(18)){
        temp1 = temp1.add(player.PL3xpyrep.sub(18).root(2).mul(0.005))
    }
    if (player.PL3xpyrep.gte(34)) temp1 = temp1.mul(3)
    if (player.PL3xpyrep.gte(40)) temp1 = temp1.mul(2)
    temp1 = temp1.mul(mm6buyableEffect(1))
    if (player.PL3xpyrep.gte(180)) temp1 = temp1.add(player.volumes.max(1).log10().max(1).log10().mul(0.05))
    temp1 = softcap(temp1, 1e32, 0.7, "pow", nosoftcap);
    return temp1;
}
function xpyRepSpeedSoftcappedText(){
    if (xpyRepSpeed().gte("1e32")){
        return "<span class=\"soft\">(受软上限限制)</span>"
    }
}
function getxpyrepgalcount(){
    // 2+3**0, 2+3**1, 2+3**2
    // 2+3**repgalcount
    // log3(player.PL3xpyrep-3)
    if (player.PL3xpyrep.lt(3)){
        return PowiainaNum.ZERO.clone();
    }else{
        return player.PL3xpyrep.sub(2).logBase(2).ceil();
    }

}
function getnextxpyrepgal(){
    if (player.PL3xpyrep.lt(3)){
        return PowiainaNum.tetr(10,3);
    }else{
        return PowiainaNum.tetr(10,PowiainaNum.pow(2,getxpyrepgalcount()).add(2))
    }
    
}
function getxpyrepto4dv(){
    return player.PL3xpyrep.gte(23) ? player.PL3xpyrep.sub(23).div(20).add(1).max(1) : PowiainaNum(1)
}
function getxpyrepEff1(){
    return player.PL3xpyrep.gte(160) ? getxpyrepto4dv().mul(0.01).min(5e4) : PowiainaNum(0)
}
function buymm6buyable(id){
    let bulkbuy;
    switch (id){
        case 1:
            bulkbuy = player.PL3xpyrep.sub(2000).div(100).logBase(2.5).ceil();
            if (player.PL3xpybuyable1.lt(bulkbuy)){
                player.PL3xpybuyable1 = bulkbuy;
            }
            break;
        case 2:
            bulkbuy = player.PL3xpyrep.sub(9900).div(100).logBase(2).ceil().min(526);
            if (player.PL3xpybuyable2.lt(bulkbuy)){
                player.PL3xpybuyable2 = bulkbuy;
            }
            break;
        case 3:
            bulkbuy = player.PL3xpyrep.div(1e45).logBase(4).ceil().min(50);
            if (player.PL3xpybuyable3.lt(bulkbuy)){
                player.PL3xpybuyable3 = bulkbuy;
            }
            break;
    }
}
function mm6buyableCost(id){
    switch (id){
        case 1:
            return PowiainaNum.add(2000, PowiainaNum.pow(2.5,player.PL3xpybuyable1).mul(100))
        case 2:
            return PowiainaNum.add(9900, PowiainaNum.pow(2,player.PL3xpybuyable2).mul(100))
        case 3:
            return PowiainaNum.pow(4,player.PL3xpybuyable3).mul(1e45)
    }
}

function mm6buyableEffect2Base(){
    return PowiainaNum(1.1).add(mm6buyableEffect(3))
}
function mm6buyableEffect(id){
    switch (id){
        case 1:
            let reached10Bought = player.PL3xpybuyable1.add(player.PL3xpybuyable3.mul(3)).gt(10);
            let temp1;
            if (!reached10Bought) return PowiainaNum.pow(2,player.PL3xpybuyable1.add(player.PL3xpybuyable3.mul(3)));
            else temp1 = PowiainaNum(1024).mul(PowiainaNum.pow(1.75,player.PL3xpybuyable1.add(player.PL3xpybuyable3.mul(3)).sub(10)))
            return temp1;
        case 2:
            return softcap(PowiainaNum.pow(mm6buyableEffect2Base(),player.PL3xpybuyable2.add(player.PL3xpybuyable3.mul(2))),"1e100", 0.2, "pow")
        case 3:
            return PowiainaNum.mul(264454438/1e10,player.PL3xpybuyable3)
    }
}