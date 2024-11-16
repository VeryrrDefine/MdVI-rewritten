function genTREEBLANK() {
    return {
        id: null,
        req() {},
        reqDesc: '',
        content: '',
        cost: PowiainaNum.NaN.clone(),
        isBLANK: true
    }
}
var treeUpgrades = {
    main: [
        [
            {
                id: 'c',
                req() { return player.PL4times.gte(1)},
                reqDesc: `进行一次mm<sup>7</sup>重置`,
                desc: "每秒获得1.0000mm<sup>7.02</sup>",
                content: `A`,
                cost: PowiainaNum.ZERO.clone()
            }
        ],
        [
            {
                id: "4dv1",
                desc: "基于7.02维体积加成4维体积获取",
                content: "B",
                cost: PowiainaNum(100),
                effect(){
                    let x = PowiainaNum(1e10).pow(player.PL4mm702.add(1).log10().pow(5).softcap(1e3,0.25,"pow")).min('ee100');
                    let y = PowiainaNum(1);
                    y = player.PL4mm702.add(1).log10().add(1).log10().div(10).add(1)
                    return [x,y]
                },
                effDesc(x) { 
                    return formatMult(x[0])+
                    (x[0].max(1).log(1e100).gte(1e3)?" <span class='soft'>(softcapped)</span>":"")
                    +", "+formatPow(x[1])
                
                },
                unl(){
                    return hasTreeUpgrade("c")
                }
        
            },
            {
                id: "mm705-1",
                desc: "基于4维体积获取加成7.02维体积",
                content: "C",
                cost: PowiainaNum(300),
                effect(){
                    let x = player.volumes.add(1).log10().add(1).div(1e3).max(1)
                    return x
                },
                effDesc(x) { 
                    return formatMult(x)
                
                },
                unl(){
                    return hasTreeUpgrade("c")
                }
            }
        ],
        [
            {
                id: "4dv2",
                desc: "获得^1,000多的4维体积",
                unl(){
                    return hasTreeUpgrade("4dv1") && hasTreeUpgrade("mm705-1")
                },
                reqDesc: `2 mm<sup>7</sup>重置`,
                req() { return player.PL4times.gte(2)},
                content: "D",
                cost: PowiainaNum("1e300")
            }
        ],
        [
            {
                id: "qol1",
                desc: "重置时保留3,5维内容，进度升级",
                unl(){
                    return hasTreeUpgrade("4dv2")
                },
                reqDesc: `在未进行一次mm<sup>5</sup>重置时完成第一次mm<sup>6</sup>重置 in a mm<sup>7</sup> run`,
                req() { return player.PL4treeUpgradeRequirements.includes(1)},
                content: "E",
                cost: PowiainaNum("1e300")
            },
            {
                id: "qol2",
                desc: "元素挖矿不再需要时间",
                unl(){
                    return hasTreeUpgrade("4dv2")
                },
                content: "F",
                cost: PowiainaNum("1e304")
            },
            {
                id: "qol3",
                desc: "使获取资源双指数×10",
                unl(){
                    return hasTreeUpgrade("4dv2")
                },
                content: "G",
                cost: PowiainaNum("1e307")
            }
        ],
        [
            {
                id: "xpyrep1",
                desc: "小朋友复读机速度71高效(×72)",
                unl(){
                    return hasTreeUpgrade("qol1") || hasTreeUpgrade("qol2") ||hasTreeUpgrade("qol3") 
                },
                content: "H",
                cost: PowiainaNum("1e307")

            }
        ],
        [
            {
                id: "ovf1",
                desc: "4维体积溢出延迟^1.0000e30",
                unl(){
                    return hasTreeUpgrade("xpyrep1")
                },
                reqDesc: `3 mm<sup>7</sup>重置`,
                req() { return player.PL4times.gte(3)},
                content: "I",
                cost: PowiainaNum("1e310")
            },
            {
                id: "qol4",
                desc: "重置时保留元素挖矿和材料升级",
                unl(){
                    return hasTreeUpgrade("xpyrep1")
                },
                reqDesc: `5 mm<sup>7</sup>重置`,
                req() { return player.PL4times.gte(5)},
                content: "J",
                cost: PowiainaNum("1e330")
            },
            {
                id: "qol5",
                desc: "重置时保留小朋友的购买项",
                unl(){
                    return hasTreeUpgrade("xpyrep1")
                },
                reqDesc: `7 mm<sup>7</sup>重置`,
                req() { return player.PL4times.gte(7)},
                content: "K",
                cost: PowiainaNum("1e340")
            },
        ],
        [
            {
                id: "chal1",
                desc: "解锁二阶挑战",
                unl(){
                    return hasTreeUpgrade("ovf1")
                },
                reqDesc: `10 mm<sup>7</sup>重置`,
                req() { return player.PL4times.gte(10)},
                content: "L",
                cost: PowiainaNum("1e340")
            }
        ],
        [
            {
                id: "de1",
                desc: "1-8维度双指数乘子+0.05",
                unl() {
                    return hasTreeUpgrade("chal1")
                },
                reqDesc: `获得${format("ee360")} mm<sup>4</sup>`,
                req() { return player.volumes.gte("ee360")},
                content: "M",
                cost: PowiainaNum("1e358")
            }, {
                id: "de2",
                desc: "基于7维维度维度能量提升1-8维度双指数乘子",
                unl() {
                    return hasTreeUpgrade("chal1")
                },
                reqDesc: `获得${format("e3e380")} mm<sup>4</sup>`,
                req() { return player.volumes.gte("e3e385")},
                content: "N",
                cost: PowiainaNum("1e384"),
                effect(){
                    let x = player.PL4dimensionalEnergy.add(1).log10().add(1).div(1e3).max(0)
                    return x
                },
                effDesc(x) { 
                    return "+"+format(x)
                
                },
            }
        ],
        [
            {
                id: "pasgen1",
                desc: "自动获取100%mm<sup>7</sup>",
                unl() {
                    return hasTreeUpgrade("de1") && hasTreeUpgrade("de2")
                },
                reqDesc: `获得${format(1e6)} mm<sup>7</sup>`,
                req() { return player.PL4points.gte(1e6)},
                content: "O",
                cost: PowiainaNum("1e400"),
            }
        ],
        [
            {
                id: "unlfactorspace",
                desc: "解锁因子空间",
                unl() {
                    return hasTreeUpgrade("pasgen1")
                },
                reqDesc: `获得${format(1e33)} mm<sup>7</sup>`,
                req() { return player.PL4points.gte(1e33)},
                content: "P",
                cost: PowiainaNum("1e780"),
            }
        ]
    ],
    test: [
        [
            {
                id: "d",
                desc: "Res",
                content: "Res",
                cost: PowiainaNum.POSITIVE_INFINITY
            }
        ]
    ]
}
function treeUpgradeAfford(position){
    let t_ch = treeUpgrades[position[2]][position[0]][position[1]];
    return (!t_ch.req || t_ch.req()) && t_ch.currency.gte(t_ch.cost)

}
let FIDTUCache=new Map();
function fromIDtoTreeUpgrade(id){
    if (FIDTUCache.has(id)){
        return FIDTUCache.get(id)
    }
    
    for (const key in treeUpgrades){
        treeUpgrades[key].name = key;
        for (let i = 0; i<treeUpgrades[key].length; i++){
            for (let j = 0; j<treeUpgrades[key][i].length; j++){
                if (treeUpgrades[key][i][j].id == id){
                    FIDTUCache.set(id, treeUpgrades[key][i][j])
                    return treeUpgrades[key][i][j]
                }
            }
        }
    
    }
    FIDTUCache.set(id, null)
    return null;
}
function hasTreeUpgrade(...args){
    if (args.length == 1 && typeof args[0] == "string") position = fromIDtoTreeUpgrade(args[0]).position;
    if (args.length == 3) position = [args[0],args[1],args[2]];
    if (args.length == 1 && Array.isArray(args[0])) position = args[0];

    for (const upgid of player.PL4treeUpgradesBought){
        if (upgid[0] == position[0] && upgid[1] == position[1] && upgid[2] == position[2]){
            return true;
        }    
    }
    return false;
}
function buyTreeUpgrade(position){
    let t_ch = treeUpgrades[position[2]][position[0]][position[1]];
    if (treeUpgradeAfford(position)) {
        if (player.PL4treeUpgradesBought.includes(position)){
            
        }else{
            t_ch.currency = t_ch.currency.sub(t_ch.cost);
            player.PL4treeUpgradesBought.push(position);

        }
    }
}
function getTreeUpgradeStyle(position){
    if (hasTreeUpgrade(position)){
        return "border-color: #000070"
    }

}
function handleTreeUpgrade(position){
    if (tmp.mm7.tree.t_ch[0] == position[0] && tmp.mm7.tree.t_ch[1] == position[1] && tmp.mm7.tree.t_ch[2] == position[2])
    {
        buyTreeUpgrade(position);
    }else{
        tmp.mm7.tree.t_ch = position
    }
}
for (const key in treeUpgrades){
    treeUpgrades[key].name = key;
    for (let i = 0; i<treeUpgrades[key].length; i++){
        for (let j = 0; j<treeUpgrades[key][i].length; j++){
            treeUpgrades[key][i][j].position = [i, j, key]
            //#region get currency 
            let currency = "player.PL4mm702"
            //#endregion
            Object.defineProperty(treeUpgrades[key][i][j],"currency", {
                set: Function("x",`${currency} = x`),
                get: Function(`return ${currency}`),
            })
        }
    }

}
function getDescHTML(){
    if (tmp.mm7.tree.t_ch[0] == -1 && tmp.mm7.tree.t_ch[1] == -1 && tmp.mm7.tree.t_ch[2] == null) return ``
    let t_ch = treeUpgrades[tmp.mm7.tree.t_ch[2]][tmp.mm7.tree.t_ch[0]][tmp.mm7.tree.t_ch[1]];
    let currency = "mm<sup>7.02</sup>"
    let req = t_ch.reqDesc ? `<span style="color: ${t_ch.req()?"green":"red"}">
    ${ "条件: "+(typeof t_ch.reqDesc == "function"?t_ch.reqDesc():t_ch.reqDesc)}
    </span>` : ""

    return `${hasTreeUpgrade(t_ch.position) ? 
        "" : `<div style="font-size: 12px; font-weight: bold;">
        ${req}
    </div>`}
    <span class="sky"><b>[${t_ch.id}]</b> ${t_ch.desc}</span><br>
    <span>花费: ${format(t_ch.cost)} ${currency}</span><br>
    <span class="green">${t_ch.effDesc?"当前： "+t_ch.effDesc(t_ch.effect()):""}</span>
    `
}