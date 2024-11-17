
function overflow(number, start, power, meta=1) {
	start = PowiainaNum(start)

	if (number.gt(start)) {
		if (meta == 1) {
			let s = start.log10()
			number = number.log10().div(s).pow(power).mul(s).pow10()
		} else {
			let s = start.iteratedlog(10,meta)
			number = PowiainaNum.iteratedexp(10,meta,number.iteratedlog(10,meta).div(s).pow(power).mul(s));
		}
	}
	return number;
}
function calcOverflow(x,y,s,height=1) {
    return x.gte(s) ? x.max(1).iteratedlog(10,height).div(y.max(1).iteratedlog(10,height)) :PowiainaNum(1) 
}
/**
 * 
 * @param {Number|PowiainaNum} x 
 * @param {Number|PowiainaNum} reduction 
 * @param {Number|PowiainaNum} percent100
 */
function calcReduction(x, reduction, percent100){
    return PowiainaNum.add(x,PowiainaNum.sub(percent100,x).mul(reduction))
}
PowiainaNum.prototype.overflow = function (start, power, meta) { return overflow(this.clone(), start, power, meta) }
PowiainaNum.prototype.pow10 = function (){ return PowiainaNum.pow(10,this)}
PowiainaNum.prototype.softcap = function(start, power, mode, dis=false){return softcap(this, start, power, mode, dis)}
PowiainaNum.prototype.DEmul = function(other){
    if (this.lt(10)){
        return this.clone();
    }
    return this.log10().log10().mul(other).pow10().pow10()
}

function scaleCost(startcost, scaleperbought, boughtcount){
    return PowiainaNum.mul(startcost,PowiainaNum.pow(scaleperbought, boughtcount));
}


function invScaleCost(startcost, scaleperbought, resourcecount){
    return resourcecount.div(startcost).logBase(scaleperbought).ceil();
}



function softcap(value,start,power,mode,dis=false){
    var x = new PowiainaNum(value);
    if (!dis&&x.gte(start)) {
        if ([0, "pow"].includes(mode)) x = x.div(start).max(1).pow(power).mul(start)
        if ([1, "mul"].includes(mode)) x = x.sub(start).div(power).add(start)
        if ([2, "log"].includes(mode)) x = x.div(start).logBase(power).add(1).mul(start)
    }
    return x
}


/**
 * 反向软上限，一般的，antisoftcap(softcap(x,y,z,w),y,z,w)=x;
 * 
 * @param {Number} value 
 * @param {Number} start 
 * @param {Number} power 
 * @param {Number} mode 
 * @param {Number} dis 
 */
function antisoftcap(value,start,power,mode){

    var x = new PowiainaNum(value);
    if (x.gte(start)) {
        if ([0, "pow"].includes(mode)) x = softcap(value, start, PowiainaNum.rec(power), 0)
        if ([1, "mul"].includes(mode)) x = x.sub(start).mul(power).add(start)
        if ([2, "log"].includes(mode)) x = PowiainaNum.pow(power,x.div(start).sub(1)).mul(start)
    }
    return x
}

/**
 * 超出部分 ^power
 * 
 * @param {*} value 
 * @param {*} start 
 * @param {*} power 
 */
function scaleSuperCost(startcost, scaleperbought, boughtcount, superstart, superpower){
    return PowiainaNum.mul(startcost,PowiainaNum.pow(scaleperbought, softcap(boughtcount, superstart, superpower, 0)));
}
function invScaleSuperCost(startcost, scaleperbought, resourcecount, superstart, superpower){
    return antisoftcap(resourcecount.div(startcost).logBase(scaleperbought), superstart, superpower, 0).ceil();
}


/**
 * 返回 base^(log_base(a)^b)
 *
 * @param {*} a 
 * @param {*} b 
 * @param {*} base 
 * @returns 
 */
function expMult(a,b,base=10) { 
    
    return PowiainaNum.gte(a,10) ? 
    PowiainaNum.pow(base,PowiainaNum.logBase(a,base).pow(b)) 
    : 
    PowiainaNum(a) 
}
