const CHALS = {
    choose(x) {
        if (player.chalchoosed == x) {
            this.enter()
        }
        player.chalchoosed = x
    },
    inChal(x) { return player.chalactive == x },
    reset(x, chal_reset=true){
        norewardMM7reset();
    },
    exit(auto=false) {
        if (!player.chalactive == 0) {
            if (tmp.chal.canFinish) {
                player.chalcomps[player.chalactive] = player.chalcomps[player.chalactive].add(tmp.chal.gain).min(tmp.chal.max[player.chalactive])
            }
            if (!auto) {
                this.reset(player.chalactive)
                player.chalactive = 0
            }
        }
    },
    enter() {
        /*onEnterChallenge */
        if (player.chalchoosed != player.chalactive) {
            this.exit(true)
        }
        player.chalactive = player.chalchoosed
        if (this[player.chalchoosed].onEnterChallenge) this[player.chalchoosed].onEnterChallenge()
        this.reset(player.chalchoosed, false)
    },
    getResource(){
        return player.volumes
    },
    getResName(x) {
        return 'mm<sup>4</sup>'
    },
    getFormat(x) {
        return format
    },
    getReset(x) {
        return "进入挑战将进行一次mm<sup>7</sup>重置！"
    },
    
    getMax(i) {
        let x = this[i].max;

        return x.floor();
    },
    getScaleName(i) {
        if (player.chalcomps[i].gte(1000)) return " 三阶折算"
        if (player.chalcomps[i].gte(50)) return " 二阶折算"
        if (player.chalcomps[i].gte(10)) return " 一阶折算"
        return ""
    },
    getPower(i) { //折算
        let x = PowiainaNum(1)
        return x
    },
    getPower2(i) {
        let x = PowiainaNum(1)
        return x
    },
    getPower3(i) {
        let x = PowiainaNum(1)
        return x
    },
    getChalData(x, r=PowiainaNum(-1)) {
        let res = this.getResource(x)
        let lvl = r.lt(0)?player.chalcomps[x]:r
        let chal = this[x]
        let fp = 1
        //if (QCs.active()) fp /= tmp.qu.qc_eff[5]
        let s1 = 10
        let s2 = 50
        let s3 = 1000
        let pow = chal.pow
        chal.pow = chal.pow.max(1)
        let goal = chal.inc.pow(lvl.div(fp).pow(pow)).mul(chal.start)
        let bulk = res.div(chal.start).max(1).logBase(chal.inc).root(pow).mul(fp).add(1).floor()
        if (res.lt(chal.start)) bulk = PowiainaNum(0)
        if (lvl.max(bulk).gte(s1)) {
            let start = PowiainaNum(s1);
            let exp = PowiainaNum(3).pow(this.getPower());
            goal =
            chal.inc.pow(
                    lvl.div(fp).pow(exp).div(start.pow(exp.sub(1))).pow(pow)
                ).mul(chal.start)
            bulk = res
                .div(chal.start)
                .max(1)
                .logBase(chal.inc)
                .root(pow)
                .times(start.pow(exp.sub(1)))
                .root(exp).mul(fp)
                .add(1)
                .floor();
        }
        if (lvl.max(bulk).gte(s2)) {
            let start = PowiainaNum(s1);
            let exp = PowiainaNum(3).pow(this.getPower());
            let start2 = PowiainaNum(s2);
            let exp2 = PowiainaNum(4.5).pow(this.getPower2())
            goal =
            chal.inc.pow(
                    lvl.div(fp).pow(exp2).div(start2.pow(exp2.sub(1))).pow(exp).div(start.pow(exp.sub(1))).pow(pow)
                ).mul(chal.start)
            bulk = res
                .div(chal.start)
                .max(1)
                .logBase(chal.inc)
                .root(pow)
                .times(start.pow(exp.sub(1)))
                .root(exp)
                .times(start2.pow(exp2.sub(1)))
                .root(exp2).mul(fp)
                .add(1)
                .floor();
        }
        if (lvl.max(bulk).gte(s3)) {
            let start = PowiainaNum(s1);
            let exp = PowiainaNum(3).pow(this.getPower());
            let start2 = PowiainaNum(s2);
            let exp2 = PowiainaNum(4.5).pow(this.getPower2())
            let start3 = PowiainaNum(s3);
            let exp3 = PowiainaNum(1.001).pow(this.getPower3())
            goal =
            chal.inc.pow(
                    exp3.pow(lvl.div(fp).sub(start3)).mul(start3)
                    .pow(exp2).div(start2.pow(exp2.sub(1))).pow(exp).div(start.pow(exp.sub(1))).pow(pow)
                ).mul(chal.start)
            bulk = res
                .div(chal.start)
                .max(1)
                .logBase(chal.inc)
                .root(pow)
                .times(start.pow(exp.sub(1)))
                .root(exp)
                .times(start2.pow(exp2.sub(1)))
                .root(exp2)
                .div(start3)
			    .max(1)
			    .logBase(exp3)
			    .add(start3).mul(fp)
                .add(1)
                .floor();
        }
        return {goal: goal, bulk: bulk}
    },

    updateTemp(){
        for (let x = 1; x<= this.cols ;x++){
            if (player.chalcomps[x] === void 0){
                player.chalcomps[x] = PowiainaNum(0);
            }
            if (CHALS[x].effect) tmp.chal.eff[x] = CHALS[x].effect(player.chalcomps[x].mul(1))
            let data = CHALS.getChalData(x)
            tmp.chal.max[x] = CHALS.getMax(x)
            tmp.chal.goal[x] = data.goal
            tmp.chal.bulk[x] = data.bulk
        }
    },
    challengeButtonText(){

    },
    handleChallengeButton(){

    },
    /*
    
    
    1: {
        title: "Instant Scale",
        desc: "Super Ranks, Mass Upgrades starts at 25. In addtional, Super Tickspeed start at 50.",
        reward: `Super Ranks starts later, Super Tickspeed scaling weaker by completions.`,
        max: PowiainaNum(100),
        inc: PowiainaNum(5),
        pow: PowiainaNum(1.3),
        start: PowiainaNum(1.5e58),
        effect(x) {
            let rank = x.softcap(20,4,1).floor()
            let tick = PowiainaNum(0.96).pow(x.root(2))
            return {rank: rank, tick: tick}
        },
        effDesc(x) { return "+"+format(x.rank,0)+" later to Super Ranks, Super Tickspeed scaling "+format(PowiainaNum(1).sub(x.tick).mul(100))+"% weaker" },
    },
    
    */
    1: {
        title: "淤积",
        desc: `4维体积获取三指数为原来的${formatMult(0.5)}`,
        reward: `基于此挑战的通关次数弱化小朋友溢出，<span class="gold">在第15次通过，解锁17-24维度，自动购买二阶小朋友升级</span>`,
        max: PowiainaNum(20),
        inc: PowiainaNum("e1e17"),
        pow: PowiainaNum(1),
        start: PowiainaNum("e4e18"),
        effect(x) {
            let res = PowiainaNum(1)
            res=res.sub(x.min(10).pow(3.3).mul(0.000125));
            if (x.gte(10))res=res.sub(x.sub(10).mul(0.005))
            res=res.max(0)
            return res // before
        },
        effDesc(x) { return `弱化${formatReduction(x)}` },
    
        //res.div(chal.start).max(1).logBase(chal.inc).root(pow).mul(fp).add(1).floor()
        //资源先除以start然后最高1, 以inc为底取对数，再取pow次方根，再乘以fp，加1， 下。


    },
    2: {
        title: "压迫",
        desc: `5维维度维度能量效果指数为0，1-8维度指数硬上限在2，小朋友溢出于10开始，无法获取维度提升^2，移除f1.5000e156小朋友复读机里程碑效果<br>（进入此挑战时会重置小朋友数量）`,
        reward: `<span class="gold">在第一次通过，20%弱化4维体积二重溢出，在第100次通过，解锁时间加速</span>`,
        max: PowiainaNum(100),
        inc: PowiainaNum("e1e266"),
        pow: PowiainaNum(1),
        start: PowiainaNum("ee266"),
        unl() {return player.chalcomps[1].gte(1)},
        onEnterChallenge() {
            player.PL1xiaopengyouPoints = PowiainaNum(0);
        }
        //res.div(chal.start).max(1).logBase(chal.inc).root(pow).mul(fp).add(1).floor()
        //资源先除以start然后最高1, 以inc为底取对数，再取pow次方根，再乘以fp，加1， 下。


    },
    cols: 2
    
}
