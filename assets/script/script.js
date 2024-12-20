

var player = {};
var thisFrame = Date.now();
var lastFrame = Date.now();
var isHoldMax = false;
var globalDiff = 0;
var realityDiff = 0;
var timeDifferences = [PowiainaNum(0), PowiainaNum(0)];
function loop(){
    thisFrame = Date.now();
    window.realityDiff = (thisFrame-lastFrame)/1000;
    window.globalDiff = realityDiff;
    checkNaN();
    CHALS.updateTemp();
    updateOffline();
    updateTimeDifferences();


    updateDimensionData();
    calculateDimensions();
    calculatemm5Dimensions();
    updateVolumes();
    fixInfinity();
    automationLoop();
    mm3Loop();
    xiaopengyouLoop();
    mm5Loop();
    updateTime();
    battleLoop();
    mm6Loop();
    mm7Loop();
    ACHIEVEMENTS.loop();

    checkNaN();
    player.time = thisFrame
    lastFrame = thisFrame;
}
/*
    今天是dygm在灰羊服务器偷家第2/3周年。

    dygm偷的谁的家呢？ 偷的Easten_Nolan的家。
    啥时候呢？ 2024年3月8日22时30分 UTC+0800。

    我就是通过知道了dygm在灰羊服务器偷家这个事才知道灰羊服务器的。
    dygm认为我会告诉别人而不会告诉群号。

    不过后面fy告诉我了。

    但是呢？ 2024年3月27日 21时26分12秒附近 
    dygm以违禁词测试为由给我发了一个病毒程序（实际上这个作者打基岩版+PCL的操作我早看出不对劲了）
    后续就把我顺带大约6.604×10¹¹字节（约61.5GB)的数据清除了。

    在2024年3月30日，由于[数据删除]，我被《请》出灰羊群了，理由是偷家。

    2024年5月末，我突然想起了序数增量吧，然后2024年6月5日开始制作多维体积增量， HVI。

    dygm还在告诉我灰羊群内的情况。
    fy也告诉我他还有一个小号，[数据删除]

    直到2024年7月15日， 我不小心在里面有dygm和[数据删除]群里发了多维体积增量v1.0.3时期的图片。
    然后呢？ 
    首先[数据删除]发了“又骗谁的”， 后dygm说，[数据删除]。
    后[数据删除]扬言要开我的Household Register。
    至此，我与dygm&[数据删除]的友谊关系下降到我无法描述出来。


    2024年8月9日，我[数据删除]。

    2024年9月15日，我[数据删除]。



    2024年11月2日，我加入了破碎千秋create服务器。

    2024年11月7日，我开发完了多维体积增量重制版第三层重置所有内容。

    FIN 2024/11/08

                                                            VeryrrDefine(yireojegren)
                                                                     2024/11/08
*/
function checkNaN(){
    let nanList = findNaN(player);

    for (nanNode of nanList){
        let nanObject = window;
        for (nanPropertyPos of nanNode){
            nanObject = nanObject[nanPropertyPos];
        }
        if (nanObject instanceof PowiainaNum || nanObject == "NaN"){
            var runcode = "window";
            for (nanPropertyPos of nanNode){
                runcode = runcode+`["${nanPropertyPos}"]`;
            }
            //console.warn("NaN in " + runcode +", fixed to 0")
            runcode = runcode.concat(" = PowiainaNum.ZERO.clone()")
            eval(runcode)
        }
        
    }
}
function updateTimeDifferences(){
    timeDifferences[0] = PowiainaNum(window.globalDiff).mul(tmp.mm7.prePL4speed);
    timeDifferences[1] = PowiainaNum(window.globalDiff);

}
function updateTime(){
    player.dimBoostTimespent = Math.min(player.dimBoostTimespent+timeDifferences[0].toNumber(),1e300);
    player.PL1Timespent = Math.min(player.PL1Timespent+timeDifferences[0].toNumber(),1e300);
    player.PL2Timespent = Math.min(player.PL2Timespent+timeDifferences[0].toNumber(),1e300);
    player.PL3Timespent = Math.min(player.PL3Timespent+timeDifferences[0].toNumber(),1e300);
    player.PL4Timespent = Math.min(player.PL4Timespent+timeDifferences[1].toNumber(),1e300);
}
/*
function updateAuto() {
    if (hasMM3Upg(2)){
        for (let i = 1; i<=8; i++){
            if (player.auto.includes(i)){
                buydim(i,true);
            }
        }
    }
    if (hasMM3Upg(3)){
        if (player.auto.includes(9) && player.volumes.lt(mm3Require)){
            dimBoost()
        }
    }
}*/

function buyable(dim) {
    let temp1 = player.dimensions[DIMENSIONS_COST][dim - 1]
    if (player.volumes.gte(mm3ChallengeGoal[player.PL1inchal]) && !player.PL1breakedPL1limit){
        return false
    }
    if (player.PL1breakedPL1limit){
        return true
    }
    return player.volumes.gte(temp1)
}

function buyall(){
    buydim(1);
    buydim(2);
    buydim(3);
    buydim(4);
    buydim(5);
    buydim(6);
    buydim(7);
    buydim(8);
}

function calculateDimensions() {
    for (let i = 0; i < 7; i++) {
        player.dimensions[DIMENSIONS_POINTS][i] = player.dimensions[DIMENSIONS_POINTS][i]
            .add(
                player.dimensions[DIMENSIONS_POINTS][i + 1]
                    .mul(player.dimensions[DIMENSIONS_MULTI][i + 1])
                    .pow(player.dimensions[DIMENSIONS_EXPONENT][i + 1])
                    .DEmul(player.dimensions[DIMENSIONS_DBEXPONENT][i + 1])
                    .mul(timeDifferences[0])
            );
        if (player.dimensions[DIMENSIONS_POINTS][i].isNaN()) {
            player.dimensions[DIMENSIONS_POINTS][i] =PowiainaNum(0);
        }
    }
}

function updateDimensionData() {
    if (isHoldMax){
        buyall();
    }
    for (let i = 0; i < 8; i++) {
        player.dimensions[DIMENSIONS_MULTI][i] = tmp.dimension.getDimMultiplier(i);
        player.dimensions[DIMENSIONS_EXPONENT][i] = tmp.dimension.getDimExponentplier(i);
        player.dimensions[DIMENSIONS_DBEXPONENT][i] = tmp.dimension.getDimDoubleExponentplier(i);
        player.dimensions[DIMENSIONS_COST][i] = calc_cost(i, player.dimensions[DIMENSIONS_BOUGHT][i])
    }

}
const dimBasePrice=[7,7**2,7**3,7**4,7**5,7**6,7**7,7**8]
function calc_cost(dimid, count) {
    if (player.PL1breakedPL1limit){
        return K9E15
    }
    // count before buy
    // 1st dimension dimid = 0
    let temp1 = 
        E.mul(dimBasePrice[dimid],tmp.dimension.getDimScale(dimid + 1).pow(count.floor()));

    return temp1;
}
function updateVolumes() {
    player.volumes = player.volumes.add(tmp.mm4.gain.mul(timeDifferences[0]))
    player.volumesTotal = player.volumesTotal.add(tmp.mm4.gain.mul(timeDifferences[0]))
}
function buydim(dim, single = false) {
    if (player.PL1breakedPL1limit && (player.PL1inchal!=1)){
        let buycountTotal = tmp.dimension.getBoughtDimsAftere400(dim);
        let boughtNow = player.dimensions[DIMENSIONS_BOUGHT][dim - 1];
        if (buycountTotal.gt(boughtNow)){
            let buyCount = buycountTotal.sub(boughtNow);
            player.dimensions[DIMENSIONS_BOUGHT][dim - 1] = player.dimensions[DIMENSIONS_BOUGHT][dim - 1].add(buyCount);
            player.dimensions[DIMENSIONS_POINTS][dim - 1] = player.dimensions[DIMENSIONS_POINTS][dim - 1].add(buyCount.mul(10)); 

        }
        return true;
    }
    if (buyable(dim)) {
        let temp1 = player.volumes.logarithm(tmp.dimension.getDimScale(dim))
        let temp2 = (player.dimensions[DIMENSIONS_COST][dim - 1]).logarithm(tmp.dimension.getDimScale(dim))
        let bought_now = player.dimensions[DIMENSIONS_BOUGHT][dim - 1];
        let buycount = temp1.sub(temp2).ceil();
        let temp3 = buycount.clone();

        if (buycount.lt(1)) {
            buycount =PowiainaNum(1)
        }
        
        if (single) {
            buycount =PowiainaNum(1)
        }
        player.dimensions[DIMENSIONS_BOUGHT][dim - 1] = player.dimensions[DIMENSIONS_BOUGHT][dim - 1].add(buycount);
        player.dimensions[DIMENSIONS_POINTS][dim - 1] = player.dimensions[DIMENSIONS_POINTS][dim - 1].add(buycount.mul(10)); //     player.volumes = player.volumes.sub(E.pow(10,temp1.mul(dim).ceil()))


        return true
    }
    return false


}


function toggleAutobuyer(i) {
    let temp1 = player.auto.indexOf(i)
    if (temp1 == -1) {
        player.auto.push(i)
    } else {
        player.auto.splice(temp1, 1)
    }
}


function isEndgame(){
    return player.volumes.gt(Endgame)
}
function enterFinalChallenge(){
    alert("经过推测，进入最终挑战所需的某个数值超过了Infinity，现在你还没有能力到达\n但是请等待游戏更新")
    
}

(function() {
    document.addEventListener('DOMContentLoaded', function(e) {
        loadI18N()/*.then(function (){
            const getQqQe308FansFetch = fetch(
                "https://api.bilibili.com/x/relation/stat?vmid=3493117070149692&jsonp=jsonp"
            )
            return getQqQe308FansFetch
        }).then(function (requestFetch){
            return requestFetch.text();
        }).then(function (responseText){
            var result = JSON.parse(responseText);
            if (result.code != 0){
                console.error("无法正确获取QqQe308的粉丝量，code"+result.code+"， message"+result.message);
            }else {
                window.QqQe308Fans = result.data.follower
                console.log("QqQe308粉丝量: "+QqQe308Fans)
            }
        })*/.then(function(){
            ACHIEVEMENTS.init();
            load(e);
            window.loopVal = setInterval(loop, 60)
            window.saveVal = setInterval(save, 1000);
            window.displayformatgainVal = setInterval(formatGainLoop, 1000)
        });
    });
})();
console.log("%c灰"+"羊是傻逼", "color: #000000; font-size: 30px;")
console.log("%c我们也吃金拱门，汉堡贼鸡\u5df4大", "color: #000000; font-size: 60px;")
console.log("♪I just wanna jump♪ ♪Jump♪ ♪Jump♪ ♪Jump♪ ♪Jump♪ ♪Jump♪ ♪Jump♪ ♪Jump♪ ♪Jump♪ ♪Jump♪ ♪Jump♪ ♪Jump♪ ♪Jump♪ ♪Jump♪♪I just wanna jump♪♪Jump♪ ♪Jump♪ ♪Jump♪ ♪Jump♪ ♪Jump♪ ♪Jump♪ ♪Jump♪ ♪Jump♪ ♪Jump♪ ♪Jump♪ ♪Jump♪ ♪Jump♪ ♪Jump♪")
console.log("%cVeryrrDefine",
    `background: rgba(252,234,187,1);
    background: -moz-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%,rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -webkit-gradient(left top, right top, color-stop(0%, rgba(252,234,187,1)), color-stop(12%, rgba(175,250,77,1)), color-stop(28%, rgba(0,247,49,1)), color-stop(39%, rgba(0,210,247,1)), color-stop(51%, rgba(0,189,247,1)), color-stop(64%, rgba(133,108,217,1)), color-stop(78%, rgba(177,0,247,1)), color-stop(87%, rgba(247,0,189,1)), color-stop(100%, rgba(245,22,52,1)));background: -webkit-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -o-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -ms-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: linear-gradient(to right, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fceabb', endColorstr='#f51634', GradientType=1 );
    font-size:5em`.replaceAll(/\s/g,""))
var showAllPrestigeLayers = false;
/*
if (location.host.includes("127.0.0.1")){
    showAllPrestigeLayers = true;
}*/

var A1to8 = [1,2,3,4,5,6,7,8];
var A9to16 = [9,10,11,12,13,14,15,16]


function get_pts_volume(x) {
    const meter_cubed = 2.3687253991903575e104
    if (x.gte(mlt(1))) return `如果你的每4次方毫米4维体积相当于1g，你的4维体积相当的质量足以制造${formatMass(x)}`
    if(x.gte("1e785")) return `如果你每秒写3个数字，那么把你的4维体积写下来需要${formatTime.fromSeconds(x.log10().floor().add(1).div(3)).toString(true)}`
    if(x.gte(Number.MAX_VALUE)) return `如果你的每个4维体积被3维化成一个普朗克单位，你的4维体积足以制造${x.div(Number.MAX_VALUE).format()}个无限`
    const prefixes = [
      { value: 1e113, name: "维度", verb: "制造" },
      { value: 3.4e80, name: "可观测宇宙", verb: "制造" },
      { value: 1e73, name: "玉夫座空洞", verb: "制造" },
      { value: 5e68, name: "本星系团", verb: "制造" },
      { value: 3.3e61, name: "星系", verb: "制造" },
      { value: 3.3e55, name: "本地泡", verb: "制造" },
      { value: 1.7e48, name: "奥尔特云", verb: "制造" },
      { value: 1.7e45, name: "星云", verb: "制造" },
      { value: 8e36, name: "超巨星", verb: "制造" },
      { value: 5e32, name: "红巨星", verb: "制造" },
      { value: 1.41e27, name: "太阳", verb: "制造" },
      { value: 1.53e24, name: "木星", verb: "制造" },
      { value: 1.08e21, name: "地球", verb: "制造" },
      { value: 4.5e17, name: "矮行星", verb: "制造" },
      { value: 5e12, name: "大型小行星", verb: "制造" },
      { value: 3.3e8, name: "万里长城", verb: "填满" },
      { value: 2.6006e6, name: "吉萨大金字塔", verb: "填满" },
      { value: 2.5e3, name: "奥运规模的游泳池", verb: "填满" },
      { value: 1, name: "冰箱", verb: "填满" },
      { value: 7.5e-4, name: "酒瓶", verb: "填满" },
      { value: 3.555e-6, name: "茶匙", verb: "填满" },
      { value: 5e-8, name: "米", verb: "制造" },
      { value: 6.2e-11, name: "沙子", verb: "制造" },
      { value: 9e-17, name: "红细胞", verb: "制造" },
      { value: 5e-21, name: "病毒", verb: "制造" },
      { value: 7.23e-30, name: "氢原子", verb: "制造" },
      { value: 1e-42, name: "原子核", verb: "制造" },
      { value: 2.82e-45, name: "质子", verb: "制造" },
      { value: 1e-54, name: "立方阿米", verb: "占据" },
      { value: 1e-63, name: "立方仄米", verb: "占据" },
      { value: 1e-72, name: "立方幺米", verb: "占据" },
      { value: 1e-81, name: "立方柔米", verb: "占据" },
      { value: 1e-90, name: "立方亏米", verb: "占据" },
    ]
    for (let prefix of prefixes) {
      if (x.gte(prefix.value * meter_cubed)) {
        return `如果你的每个4维体积被3维化成一个普朗克单位，你的4维体积足以${prefix.verb}${x.div(prefix.value * meter_cubed).format()}个${prefix.name}`
      }
    }
    return `如果你的每个4维体积被3维化成一个普朗克单位，你的4维体积足以占据${formatWhole(x)}个普朗克单位`
  }
function choiceFromList/*不重复*/(list, amount){
    if (amount > list.length){
        throw Error("cannot select more than "+list.length.toString());
    }
    var result = [];
    var resultIndex = [];
    while (result.length < amount){
        j = Math.floor(Math.random()*list.length);
        if (resultIndex.includes(j)){
            continue;
        }
        result.push(list[j]);
        resultIndex.push(j);
    
    }
    return result

}


var lastgain = PowiainaNum(0);
var thisgain = PowiainaNum(0);

var currentGainText = "";

function formatGain(a,e,res="") {
    const g = PowiainaNum.add(a,e)
    const DT = PowiainaNum("10^^6")

    if (g.neq(a)) {
        if (a.gte(DT)) {
            var oom =PowiainaNum(g).slog(10).sub(PowiainaNum(a).slog(10))
            if (oom.gte(1e-3)) return oom.format() + " 数量级^^2"
        }

        if (a.gte('ee100')) {
            var tower = PowiainaNum(a).slog(10).sub(1.3010299956639813).floor();
    
            var oom =PowiainaNum(g).iteratedlog(10,tower).sub(PowiainaNum(a).iteratedlog(10,tower)), rated = false;
    
            if (oom.gte(1)) rated = true
            else if (tower > 2) {
                tower--
                oom =PowiainaNum(g).iteratedlog(10,tower).sub(PowiainaNum(a).iteratedlog(10,tower))
                if (oom.gte(1)) rated = true
            }
    
            if (rated) return oom.format() + " 数量级^"+tower
        }
    
        if (a.gte(1e100)) {
            const oom = g.div(a).log10()
            if (oom.gte(1)) return oom.format() + " 数量级"
        }
    }

    return format(e) + res
}

function formatGainLoop(){
    thisgain = player.volumes.clone();

    currentGainText = formatGain(lastgain, thisgain.sub(lastgain), "mm<sup>4</sup>")

    lastgain = thisgain.clone();
}