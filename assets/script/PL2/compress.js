
function compressButton() {
    if (player.PL2incompress){
        return "退出体积膨胀"
    }else{
        return "进入体积膨胀"
    }
}
function handleCompress(){
    if (player.PL2incompress){
        player.PL2highestVolumeInCompress = PowiainaNum.max(player.PL2highestVolumeInCompress,player.volumes)
    }
    player.PL2incompress = !player.PL2incompress
    norewardMM5reset(true)
}
function xiaopengyouMK2gain(){
    return tmp.mm5.getMM59count().pow(1.3).mul(
        PowiainaNum.pow(2,player.PL2buyable1)
    );
}
function xiaopengyouMK2loop(){
    if (player.PL2isunlockedCompress){
        player.PL2xiaopengyouMK2 = player.PL2xiaopengyouMK2.add(xiaopengyouMK2gain().mul(globalDiff))
    }
    if (player.PL2points.gte("1e1100")){
        player.PL2isunlockedCompress = true;
        if (!player.PL2xiaopengyouMK2milestone1Reached && player.PL2xiaopengyouMK2.gte(1e10)){
            player.PL2xiaopengyouMK2milestone1Reached = true;
        }
    }
    if (player.PL2xiaopengyouMK2.gte("1e11")){
        player.PL2moreRPgenerated = player.PL2moreRPgenerated.add(PowiainaNum(player.PL2xiaopengyouMK2.max(0).root(2).mul(globalDiff)))
    }
}
function xiaopengyouMK2exponent(){
    return player.PL2buyable2.div(64).add(0.0625).min(player.PL2buyable2.div(64).add(0.0625).root(4))
}
function xiaopengyouExponentMore(){
    return player.PL2xiaopengyouMK2.add(1).logBase(3).add(1).logBase(3).pow(xiaopengyouMK2exponent()).max(1)
}
function buyMM5buyable(x){
    switch(x){
        case 1:
            if (player.PL2xiaopengyouMK2.gte(MM5buyableCost1())){
                player.PL2xiaopengyouMK2 = player.PL2xiaopengyouMK2.sub(MM5buyableCost1())
                player.PL2buyable1 = player.PL2buyable1.add(1)
            }
            break;
        case 2:
            if (player.PL2xiaopengyouMK2.gte(MM5buyableCost2())){
                player.PL2xiaopengyouMK2 = player.PL2xiaopengyouMK2.sub(MM5buyableCost2())
                player.PL2buyable2 = player.PL2buyable2.add(1)
            }
            break;
        case 3:
            if (player.PL2xiaopengyouMK2.gte(MM5buyableCost3())){
                player.PL2xiaopengyouMK2 = player.PL2xiaopengyouMK2.sub(MM5buyableCost3())
                player.PL2buyable3 = player.PL2buyable3.add(1)
            }
            break;
        case 4:
            if (player.PL2xiaopengyouMK2.gte(MM5buyableCost4())){
                player.PL2xiaopengyouMK2 = player.PL2xiaopengyouMK2.sub(MM5buyableCost4())
                player.PL2buyable4 = player.PL2buyable4.add(1)
            }
            break;
    }
}
function MM5buyable3Effect(){
    return player.PL2buyable3.pow(2/3).min(player.PL2buyable3.pow(1/3).mul(2)).mul(0.01)
}
function MM5buyable4Effect(){
    return player.PL2buyable4.pow(2/3).min(player.PL2buyable4.pow(1/3).mul(2)).mul(0.005)
}
function MM5buyableCost1(){
    return PowiainaNum.mul(1000,PowiainaNum.pow(10,player.PL2buyable1));
}
function MM5buyableCost2(){
    return PowiainaNum.mul(1000,PowiainaNum.pow(100,player.PL2buyable2));
}
function MM5buyableCost3(){
    return PowiainaNum.mul(1000,PowiainaNum.pow(1000,player.PL2buyable3));
}
function MM5buyableCost4(){
    return PowiainaNum.mul(1000,PowiainaNum.pow(10000,player.PL2buyable4));
}