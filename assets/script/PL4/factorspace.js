const FACTORSPACES = {
    onActive(x, y) {
        if (!player.isPL4unlocked) return false
        return player.PL4factorspace.choosed[0] == x && player.PL4factorspace.choosed[1] == y
        /* 
        let i = player.supernova.fermions.choosed
        return i == id || (i[1] == '6' && i[0] == id[0])
        */
    },
    gain(i) {
        if (!tmp.mm7.isFactorSpaceUnlocked()) return PowiainaNum.ZERO.clone();
        
        let x = E(10)
        let base = E(1.25)

        return x
    },
    backNormal() {
        if (player.PL4factorspace.choosed[0] != -1 && player.PL4factorspace.choosed[1] != -1){
            player.PL4factorspace.choosed = [-1, -1];
            norewardMM7reset();
        }
        /*
        if (player.supernova.fermions.choosed != "") {
            player.supernova.fermions.choosed = ""
            SUPERNOVA.reset(false,false,false,true)
        }*/

    },
    choose(x,y) {
        /*let id = i+""+x
        if (player.supernova.fermions.choosed != id) {
            player.supernova.fermions.choosed = id
            if (x == 6) QUANTUM.doReset(true,false,true)
            else SUPERNOVA.reset(false,false,false,true)
        }*/
        if (player.PL4factorspace.choosed[0]!=x && player.PL4factorspace.choosed[1]!=y){
            player.PL4factorspace.choosed = [x, y];
            norewardMM7reset(true);
        }
    },
    getUnlLength() {
        let x = 1
        let y = 1
        /*if (hasTree("fn2")) u++
        if (hasTree("fn6")) u++
        if (hasTree("fn7")) u++
        if (hasTree("fn8")) u++
        if (hasTree("fn13")) u++*/
        return [x,y]
    },
    updateTemp(){

    },
    types: [
        [
            {
                unl() {return player.isPL3unlocked},
                nextTierAt(x) {
                    return PowiainaNum.POSITIVE_INFINITY.clone();
                },
                calcTier() {
                    let res = player.PL1xiaopengyouPoints;


                    return PowiainaNum(0);
                },
                eff(i/* current a因子 */, t/* current tier */){
                    return PowiainaNum(0)
                },
                desc(x) {
                    return ``
                },
                inc: "小朋友",
                cons: "小朋友指数^0.6，mm<sup>7</sup>前速度"+formatMult("1e1000", 4, 1)

            }
            /*
            {
                unl: _ => tmp.atom.unl,
                nextTierAt(x) {
                    let t = FERMIONS.getTierScaling(x)
                    return E('e50').pow(t.pow(1.25)).mul("e800")
                },
                calcTier() {
                    let res = player.atom.atomic
                    if (res.lt('e800')) return E(0)
                    let x = res.div('e800').max(1).log('e50').max(0).root(1.25)
                    return FERMIONS.getTierScaling(x, true)
                },
                eff(i, t) {
                    let x = i.max(1).log(1.1).mul(t.pow(0.75))
                    return x
                },
                desc(x) {
                    return `Adds ${format(x,0)} free Cosmic Rays`
                },
                inc: "Atomic Powers",
                cons: "^0.6 to the exponent of Atomic Powers gain",
            }
            */
        ],
        [
            {
                unl() {return player.isPL3unlocked},
                nextTierAt(x) {
                    return PowiainaNum.POSITIVE_INFINITY.clone();
                },
                calcTier() {


                    return PowiainaNum(0);
                },
                eff(i/* current a因子 */, t/* current tier */){
                    return PowiainaNum(0)
                },
                desc(x) {
                    return ``
                },
                inc: "维度提升",
                cons: "维度提升获取指数^0.3，小朋友复读机星系失去效果，mm<sup>7</sup>前速度"+formatMult("1e1500", 4, 1)

            }

        ]
    ]
}