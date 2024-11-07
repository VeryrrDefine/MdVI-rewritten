const ACHIEVEMENTS = {
    achievements:[
        [
            {title: "生产器", goal: "Get first 4D Dimension", condition() {return player.dimensions[DIMENSIONS_POINTS][0].gt(0)}},
            {title: "生产器生产器", goal: "Get second 4D Dimension", condition() {return player.dimensions[DIMENSIONS_POINTS][1].gt(0)}},
            {title: "生产器生产器的生产器", goal: "Get third 4D Dimension", condition() {return player.dimensions[DIMENSIONS_POINTS][2].gt(0)}},
            {title: "《1*1=2, 2*2=4》", goal: "Get fourth 4D Dimension", condition() {return player.dimensions[DIMENSIONS_POINTS][3].gt(0)}},
            {title: "VVVVVVVVVVVV", goal: "Get fifth 4D Dimension", condition() {return player.dimensions[DIMENSIONS_POINTS][4].gt(0)}},
            {title: "δδδ这个入开桂了", goal: "Get sixth 4D Dimension", condition() {return player.dimensions[DIMENSIONS_POINTS][5].gt(0)}},
            {title: "One week has seven days", goal: "Get seventh 4D Dimension", condition() {return player.dimensions[DIMENSIONS_POINTS][6].gt(0)}},
            {title: "8i=∞", goal: "Get eighth 4D Dimension", condition() {return player.dimensions[DIMENSIONS_POINTS][7].gt(0)}},
            
        ],
        [
            {title: "I can't parse 小数", goal: "Reach 4503599627370496 mm<sup>4</sup>", condition() {return player.volumes.gte(4503599627370496)}},
            {title: "你维度提升了！吗？", goal: "Get one Dimension Boost", condition() {return player.dimBoost.gte(1)}},
            {title: "似乎出了什么问题...", goal: "Reach 1e80 mm<sup>4</sup>", condition() {return player.volumes.gte("1e80")}},
            {title: "战斗！不爽！", goal: "Get 4 DB", condition() {return player.dimBoost.gte(4)}},
            {title: "灰", goal: "Reach 1e70 mm<sup>4</sup>", condition() {return player.volumes.gte("1e70")}},
            {title: "古戈尔铺列渴死", goal: "Reach 3.234476509624758e+84 mm<sup>4</sup>", condition() {return player.volumes.gte(3.234476509624758e+84)}},
            {title: "618大甩卖（不是）", goal: "Buy 61.8 4D Dimensions at total", condition() {
                let totalBought = PowiainaNum(0);
                for (let i = 0; i<8; i++){
                    totalBought = totalBought.add(player.dimensions[DIMENSIONS_BOUGHT][i])
                }
                return totalBought.gte(61.8)
            }, tooltipMore(){
                let totalBought = PowiainaNum(0);
                for (let i = 0; i<8; i++){
                    totalBought = totalBought.add(player.dimensions[DIMENSIONS_BOUGHT][i])
                }
                return "<br>You have bought "+ formatWhole(totalBought)+" 4D Dimensions at total"
            }},
            {title: "undefined is not an obiect", goal: "Reach 1.14514e191 mm<sup>4</sup>", condition() {return player.volumes.gte(1.14514e+191)}}
        ],
        [
            {title: "三向箔", goal: "Go the first prestige layer reset.", condition() {return player.PL1times.gte(1)}},
            {title: "无限", goal: "Reach 1.7976931348623157e+308 mm<sup>4</sup>", condition() {return player.volumes.gte("1.7976931348623157e308")}},
            {title: "散装维度提升", goal: "Get 75 DB", condition() {return player.dimBoost.gte(75)}}
        ]
        /*
        
            {title: "本游戏未使用lchzh3473模拟器", goal: "Reach 1e3473 mm<sup>4</sup>", condition() {return player.volumes.gte("1e3473")}}
        
            */
    ],
    init(){
        
        for (let i in this.achievements) {
            this.achievements[i].id = parseInt(i)+1
                for (let ii in this.achievements[i]) {
                    this.achievements[i][ii].id = parseInt(ii)+1
                    this.achievements[i][ii].tooltip = function () {
                    let tooltip = `要求：${this.goal}`
                    if (this.tooltipMore) tooltip += `${this.tooltipMore()}`
                    if (this.reward) tooltip += `<br>奖励：${this.reward}`
                    if (this.effectDisplay) tooltip += `<br>当前：${this.effectDisplay}`
                    return tooltip
                }
            }
        }
        Vue.component("achievements",{
            template: `<div>
                <table>
                    <tr v-for="achRow in ACHIEVEMENTS.achievements">
                        <td v-for="achievement in achRow">
                            <div :class="ACHIEVEMENTS.getAchClass(String(achRow.id)+achievement.id)" align="center">
                            <span style="height: 70px;" v-html="achievement.title"></span>
                            <div class="tooltip" v-html="achievement.tooltip()"></div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>`,
        })
    },
    hasAch(id){
        return player.achievements.includes(id);
    },
    getAch(id){
        if (this.hasAch(id)) return;
        player.achievements.push(id);
    },
    loop(){
        player.achievements = [...(new Set(player.achievements))];

        for (let i in this.achievements) {
            for (let ii in this.achievements[i]) {
                if (Object.hasOwn(this.achievements[i][ii], 'condition')){
                    if (this.achievements[i][ii].condition()){
                        this.getAch((+i*10+10)+(+ii+1));
                    }
                }
            }
        }

    },
    getAchClass(ach) {
        let name = "achi tooltipBox"
        ach = parseInt(ach)
        if (ACHIEVEMENTS.hasAch(ach)) name += " achiunlocked"
        return name
    }
}