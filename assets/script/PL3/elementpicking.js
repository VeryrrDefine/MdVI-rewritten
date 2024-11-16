
function getElementId(x) {
    x = parseInt(x)
    let log = Math.floor(Math.log10(x))
    let list = ["n", "u", "b", "t", "q", "p", "h", "s", "o", "e"]
    let r = ""
    for (var i = log; i >= 0; i--) {
        let n = Math.floor(x / Math.pow(10, i)) % 10
        if (r == "") r = list[n].toUpperCase()
        else r += list[n]
    }
    return r
}

function picking() {
    player.PL3ispicking = true;
}
const currentElements = [
    120, 135, 160, 192, 204, 218, 320, 342, "135muonic", "218muonic"
]
const baseElementDivSpeed = {
    120: PowiainaNum.pow(2, 1024),
    135: PowiainaNum.pow(2, 4096),
    160: PowiainaNum.pow(2, 6144),
    192: PowiainaNum.pow(2, 8192),
    204: PowiainaNum.pow(2, 10240),
    218: PowiainaNum.pow(2, 12288),
    320: PowiainaNum.pow(2, 18432),
    342: PowiainaNum.pow(2, 20480),
    "135muonic": PowiainaNum.pow(2, 409600),
    "218muonic": PowiainaNum.pow(2, 1228800),
}

function elementCount(id, set) {
    if (!Object.hasOwn(player.PL3elements, id)) {
        player.PL3elements[id] = PowiainaNum.ZERO.clone();
    }
    if (set === undefined) {
        return player.PL3elements[id]
    }
    else {
        return player.PL3elements[id] = set.clone();
    }
}
function getElementDivSpeed(x) {
    if (Object.hasOwn(baseElementDivSpeed, x)) {
        let result = baseElementDivSpeed[x];
        result = PowiainaNum.pow(10,result.log10().div(materialEffect(1)))
        if (player.PL3materialupg2.eq(PowiainaNum.ONE)) result = PowiainaNum.pow(10,result.log10().div(9))
        result = result.max(1)
        return result;
    } else {
        return PowiainaNum.POSITIVE_INFINITY.clone();
    }
}
function pickingAmount() {
    let result = PowiainaNum("1e40960");

    result = result.pow(materialEffect(2))

    if (player.PL3materialupg2.eq(PowiainaNum.ONE)) result = result.pow(materialEffect(4))
    if (player.PL3materialupg3.eq(PowiainaNum.ONE)) result = result.pow(materialEffect(5))
    if (player.PL3materialupg5.eq(PowiainaNum.ONE)) result = result.pow(materialEffect(7))
    if (player.PL3materialupg6.eq(PowiainaNum.ONE)) result = result.pow(60)

    if (hasTreeUpgrade("qol3")) { result = result.log10().log10().mul(10).pow10().pow10()}
    return result;
}
function pickingMax() {
    if (hasTreeUpgrade("qol2")) return PowiainaNum(1e-200)
    return PowiainaNum(5).sub(player.PL3materialupg4.eq(PowiainaNum.ONE) ? 4.6 : 0);
}
function pickingLoop() {
    if (player.PL3ispicking) {
        player.PL3pickingTime = player.PL3pickingTime.add(timeDifferences[0]);
        if (player.PL3pickingTime.gte(pickingMax())) {
            player.PL3pickingTime = PowiainaNum.ZERO.clone();
            player.PL3ispicking = false;
            pickingReward();
        }
    } else if (player.PL3materialupg4.eq(PowiainaNum.ONE)){
        picking();
    }
    if (player.PL3materialupg6.eq(PowiainaNum.ONE)) {
        player.PL3points = player.PL3points.add(tmp.mm6.gain.mul(timeDifferences[0]))
        player.PL3times = player.PL3times.add(PowiainaNum.mul(10,timeDifferences[0]))
    }
    if (player.PL3materialupg7.eq(PowiainaNum.ONE)){
        craftMaterial(1)
        craftMaterial(2)
    }
    for (const elementId of currentElements){
        elementCount(elementId, elementCount(elementId).div(getElementDivSpeed(elementId).pow(timeDifferences[0])))
    }
}
function displayElementGain(){
    return 3+(player.PL3materialupg1.mul(2).min(7)).toNumber()
}
function pickingReward(){
    let elements = choiceFromList(currentElements,3+(player.PL3materialupg1.mul(2).min(7)).toNumber());
    for (const elementId of elements){
        elementCount(elementId,elementCount(elementId).add(pickingAmount()));
    }
}

function materialCount(id, set) {
    if (!Object.hasOwn(player.PL3materials, id)) {
        player.PL3materials[id] = PowiainaNum.ZERO.clone();
    }
    if (set === undefined) {
        return player.PL3materials[id]
    }
    else {
        return player.PL3materials[id] = set.clone();
    }
}
function craftMaterial(id){
    switch (id){
        case 1:
            ubn=elementCount(120)
            utp=elementCount(135)
            uhn=elementCount(160)
            
            gainMaterial = ubn.min(utp).min(uhn);
            materialCount(1,materialCount(1).add(gainMaterial));
            break;
        case 2:
            ubn=elementCount(120)
            utp=elementCount(135)
            muutp=elementCount("135muonic")
            
            gainMaterial = ubn.min(utp).min(muutp);
            materialCount(2,materialCount(2).add(gainMaterial));
            break;
        case 3:
            material1 = materialCount(1);
            material2 = materialCount(2);
            if (material1.gte(material3Need()[0]) && material2.gte(material3Need()[1])) {
                player.PL3materialupg1 = player.PL3materialupg1.add(1)
            }
            break;
        case 4:
            material1 = materialCount(1);
            if (material1.gte(uni('e133000'))) {
                player.PL3materialupg2 = PowiainaNum.ONE.clone();
            }
            break;
        case 5:
            material1 = materialCount(1);
            if (material1.gte(uni('e504500'))) {
                player.PL3materialupg3 = PowiainaNum.ONE.clone();
            }
            break;
        case 6:
            material1 = materialCount(1);
            if (material1.gte(uni('e1.33e7'))) {
                player.PL3materialupg4 = PowiainaNum.ONE.clone();
            }
            break;
        case 7:
            material1 = materialCount(1);
            if (material1.gte(uni('e1.39e7'))) {
                player.PL3materialupg5 = PowiainaNum.ONE.clone();
            }
            break;
        case 8:
            material1 = materialCount(1);
            if (material1.gte(uni('e4.707e7'))) {
                player.PL3materialupg6 = PowiainaNum.ONE.clone();
            }
            break;
        case 9:
            material1 = materialCount(1);
            if (material1.gte(mlt(40))) {
                player.PL3materialupg7 = PowiainaNum.ONE.clone();
            }
            break;
    }
}
function material3Need(){
    if (player.PL3materialupg1.eq(0)) {
        return ["1.5e46056", "1.5e46056"]
    }
    if (player.PL3materialupg1.eq(1)) {
        return ["1.5e76056", "1.5e76056"]
    }
    if (player.PL3materialupg1.eq(2)) {
        return ["1.5e106056", "1.5e106056"]
    }
    if (player.PL3materialupg1.eq(3)) {
        return ["1.5e133056", "1.5e133056"]
    }
    return [PowiainaNum.POSITIVE_INFINITY.clone(),PowiainaNum.POSITIVE_INFINITY.clone(),]
}
function materialEffect(id){
    switch (id){
        case 1:
            return materialCount(1).max(1).logarithm(10).root(3).max(1);
        case 2:
            return softcap(materialCount(2).max(1).logarithm(10).max(1).pow(1/30).max(1),1,3,"pow");
            
        case 4:
            return player.volumes.max(1).log10().max(1).log10().mul(0.1).max(1)
        case 5:
            return player.PL3times.root(2).max(1)
        case 7:
            return materialCount(1).mul(materialCount(2)).max(1).log10().max(1).log10().root(2).max(1)
            
    }
}