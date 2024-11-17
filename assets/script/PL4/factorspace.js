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
        
        let x = PowiainaNum(10)
        let base = this.base
        /*
        if (hasTree("unl1")) x = x.mul(tmp.sn.rad.hz_effect)
        for (let j = 0; j < FERMIONS.types[i].length; j++) x = x.mul(base.pow(player.supernova.fermions.tiers[i][j]))
        if (hasTree("fn1") && tmp.sn) x = x.mul(treeEff("fn1"))

        if (tmp.dark.run) x = expMult(x,mgEff(4)[0])
        */
        for (let j =0; j<this.types[i].length; j++) {
            x = x.mul(base.pow(player.PL4factorspace.tiers[i][j]))
        }
        return x
    },
    get base() {
        let temp1 = PowiainaNum(1.25)
        return temp1;
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
    getRes(x,y){
        return this.types[x][y].res();
    },
    updateTemp(){
        let tf=tmp.mm7.factorspace
        for (let i = 0; i < 2; i++) {
            tf.gains[i] = this.gain(i)
            for (let x = 0; x < this.types[i].length; x++) {
                let f = this.types[i][x]
                if (f.unl && !f.unl()) continue
    
                
                tf.maxTier[i][x] = typeof f.maxTier == "function" ? f.maxTier() : f.maxTier||PowiainaNum.POSITIVE_INFINITY
                tf.tiers[i][x] = f.calcTier().min(tf.maxTier[i][x])
                tf.effs[i][x] = f.eff(player.PL4factorspace.points[i], player.PL4factorspace.tiers[i][x])
                
            }
        }

    },
    randomer: {
        a: 0,
        b: 0,
    },
    update() {
        if (!tmp.mm7.isFactorSpaceUnlocked()) return;
        for (let i = 0; i< 2; i++){
            for (let x = 0; x < this.types[i].length; x++){
                if (this.onActive(i, x)) player.PL4factorspace.tiers[i][x] = PowiainaNum.max(player.PL4factorspace.tiers[i][x], tmp.mm7.factorspace.tiers[i][x])
            }
            player.PL4factorspace.points[i] = player.PL4factorspace.points[i].add(tmp.mm7.factorspace.gains[i].mul(timeDifferences[1]));
        }
        this.randomer.a = Math.random() // 使数据实时更新
        this.randomer.b = Math.random() // 使数据实时更新

    },
    facEff(x, y, def=1){
        return tmp.mm7.factorspace.effs[x][y] ? tmp.mm7.factorspace.effs[x][y] : PowiainaNum(def)
        
    },
    names: [
        "ΑΒΓΘΞΣΥΨ", "αβγθξσυψ"
    ],
    types: [
        [
            {
                unl() {return player.isPL3unlocked},
                nextTierAt(x) {
                    return E('e100').pow(x.pow(1.5)).mul("e1600")
                },
                calcTier() {
                    let res = this.res();
                    if (res.lt("e1600")){
                        return PowiainaNum(0);
                        
                    }
                    return res.div("1e1600").logBase("e100").root(1.5).ceil()
                },
                maxTier() {return PowiainaNum(10)},//防止发散，先放个maxtier在这里
                eff(i/* current omega因子 */, t/* current tier */) {
                    let x = i.max(1).logBase(10).mul(t.pow(0.75))
                    return x
                },
                desc(x) {
                    return `获得${format(x,0)}免费的时间加速升级2`
                },
                inc: "小朋友",
                cons: "小朋友指数^0.6，mm<sup>7</sup>前速度"+formatMult("1e1000", 4, 1),
                res() {return player.PL1xiaopengyouPoints}
            }
            
        ],
        [
            {
                unl() {return player.isPL3unlocked},
                nextTierAt(x) {
                    return PowiainaNum.add("5e8",PowiainaNum.mul("1e8", x.pow(1.15)))
                },
                calcTier() {
                    let res = this.res();
                    if (res.lt("5e8")){
                        return PowiainaNum(0);
                        
                    }
                    return res.sub("5e8").div("1e8").root(1.15).ceil()
                },
                maxTier() {return PowiainaNum(10)},//防止发散，先放个maxtier在这里
                
                eff(i, t) {
                    let x = i.add(1).log10().mul(t).div(100).add(1).softcap(1.5,0.25,0).max(1)
                    return x
                },
                desc(x) {
                    return `4维体积三重溢出开始处双指数×${format(x)}`+(x.gte(1.5)?" <span class='soft'>(受软上限限制)</span>":"")
                },
                inc: "维度提升",
                cons: "维度提升获取指数^0.3，小朋友复读机星系失去效果，mm<sup>7</sup>前速度"+formatMult("1e1500", 4, 1),
                res() {return getRealDimBoost()}
            }

        ]
    ],
    
}
Vue.component("fsbutton", {
    template: `
<div>

<button class="fs_btn" 
    @click="FACTORSPACES.choose(x, y)"
    :class="{choosed: FACTORSPACES.onActive(x, y)}"
    v-if="(y<=FACTORSPACES.getUnlLength()[x]) && (typeof FACTORSPACES.types[x][y].unl === 'function' ? FACTORSPACES.types[x][y].unl() : true)"
>
    <b>[{{z}}]</b><br>[<span></span>Tier <span v-html="format(player.PL4factorspace.tiers[x][y],0)"></span>]<br>
    <span v-if="FACTORSPACES.onActive(x, y)">当前：{{format(FACTORSPACES.getRes(x, y))}}</span><br>
    下一个Tier：<span v-html="format(FACTORSPACES.types[x][y].nextTierAt(player.PL4factorspace.tiers[x][y]),0)"></span><br>
    (Increase by <span v-html="FACTORSPACES.types[x][y].inc"></span>)<br><br>
    效果：<span v-html="FACTORSPACES.types[x][y].desc(FACTORSPACES.facEff(x,y))">NaN</span><br>
    激活时：<span v-html="FACTORSPACES.types[x][y].cons"></span>
    <span style="display:none">{{randomer.a}}</span>
</button>
</div>`,
    props: {
        x: 0, y: 0, z: ""
    },
    data() {
        return {
            randomer: FACTORSPACES.randomer
        }
    }
})
// f.desc(fermEff(i, x))