function mm7dimbuyable(dim){
    // dim = 17-24
    return player.PL4points.gte(player.dimensions[DIMENSIONS_COST][dim - 1])
}
function mm7dimScale(dim){
    // dim = 17-24
    return PowiainaNum(([2, 4, 16, 2e10, 2e25, "2e50", "2e100", "2e250" ][dim-17]))

}
function mm7dimCost(dim){
    return PowiainaNum(mm7dimStartPrice(dim)).mul(
        mm7dimScale(dim).pow(player.dimensions[DIMENSIONS_BOUGHT][dim - 1])
    )
}
function mm7dimStartPrice(dim){
    // dim = 17-24
    return PowiainaNum(([50000, 100000, 50000000, 5e22, 5e250, "5e310", "5e500", "5e750" ][dim-17]))
}
function buymm7all(){
    buymm7dim(17);
    buymm7dim(18);
    buymm7dim(19);
    buymm7dim(20);
    buymm7dim(21);
    buymm7dim(22);
    buymm7dim(23);
    buymm7dim(24);
}
function buymm7dim(dim, single = false) {
    // dim = 17-24
    if (mm7dimbuyable(dim)) {
        let temp1 = player.PL4points.div(mm7dimStartPrice(dim)).logarithm(mm7dimScale(dim))
        let temp2 = (player.dimensions[DIMENSIONS_COST][dim - 1]).div(mm7dimStartPrice(dim)).logarithm(mm7dimScale(dim))
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
function calculatemm7Dimensions(){
    for (let i = 16; i < 24; i++) {

        if (i != 23){
            player.dimensions[DIMENSIONS_POINTS][i] = player.dimensions[DIMENSIONS_POINTS][i]
                .add(
                    
                    player.dimensions[DIMENSIONS_POINTS][i + 1]
                        .mul(player.dimensions[DIMENSIONS_MULTI][i + 1])
                        .pow(player.dimensions[DIMENSIONS_EXPONENT][i + 1])
                        .mul(timeDifferences[1])
                );
            
        }
        if (player.dimensions[DIMENSIONS_POINTS][i].isNaN()) {
            player.dimensions[DIMENSIONS_POINTS][i] = E(0);
        }
        player.dimensions[DIMENSIONS_MULTI][i] = tmp.mm7.getDimMultiplierafter16(i+1);
        player.dimensions[DIMENSIONS_EXPONENT][i] = tmp.mm7.getDimExponentplierafter16(i+1);
        player.dimensions[DIMENSIONS_COST][i] = mm7dimCost(i+1,)
    }
    player.PL4dimensionalEnergy = player.PL4dimensionalEnergy.add(
        (
            player.dimensions[DIMENSIONS_POINTS][16]
            .mul(player.dimensions[DIMENSIONS_MULTI][16])
            .pow(player.dimensions[DIMENSIONS_EXPONENT][16])
            .mul(timeDifferences[1]))
        )

}