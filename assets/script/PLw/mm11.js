/* this file is test only */


var mass_type = 'standard'
const VERSES = {
    standard: [
        [
            // Pre-Archverse Verses
            'multi',  'mega',   'giga'   ,'tera'  ,'peta'   ,'exa'   ,'zetta'   ,'yotta' ,'ronna'   ,'quetta',
            'xenna',  'weka',   'vendeka','uda'   ,'tradaka','sorta' ,'quexa'   ,'pepta' ,'ocha'    ,'nena',
            'minga',  'luma',   'kema'   ,'jretta','iqatta' ,'huitta','gatextta','feqesa','enscenda','desyta',
            'ceanata','bevvgta','avta'
        ],[
            // Pre-Lodeverse Verses
            'multi','meta','xeno','hyper','ultra','omni'
        ],
    ],
    short: [
        [
            // Pre-Archverse Verses
            'mlt','mg','gi','te','pe','ex','ze','yo','rn','qu',
             'xn','wk','ve','ud','tr','sr','qx','pp','oc','ne',
             'mi','lu','ke','jr','iq','hu','ga','fe','en','ds',
             'ce','be','av'
        ],[
            // Pre-Lodeverse Verses
            'mlt','met','xen','hyp','ult','omv'
        ],
    ]
}
const MASS_NAMES = {
    standard: [
        'gramm',
        'kilogramm',
        'tonne',
        'mass of mount everest',
        'mass of earth',
        'mass of sun',
        'mass of milky way galaxy',
        'universe',

        'verse', // 8
        'arch',  // 9
        'lode',  // 10
    ],
    short: [
        'g',
        'kg',
        'tonne',
        'MME',
        'M⊕',
        'M☉',
        'MMWG',
        'uni',

        'v',  // 8
        'ar', // 9
        'ld', // 10
    ],
}

function getMltValue(mass){
	mass = E(mass);
	if(mass.lte(1e50)){
		return mass.div(1.5e56).mul(Decimal.log10(Decimal.exp(1))).div(1e9);
	}else{
		return mass.div(1.5e56).add(1).log10().div(1e9);
	}
}

function getARVName(i,lode) { const n = MASS_NAMES[mass_type], v = VERSES[mass_type][0][i-1]; return i > 0 ? v ? v + (!lode && (mass_type == 'standard' || i != 1) ? n[8] : "") : (lode ? n[9] : n[9]+n[8])+formatPow(i,0) : "" }

function formatARV(ex,lode) {
    if (lode && ex.lt(1e15)) return format(ex) + " "
    const n = MASS_NAMES[mass_type]
    const mlt = lode ? ex.div(1e15) : getMltValue(ex);
    const arv = mlt.log10().div(15)
	if(arv.add(1).gte(1000)) return format(arv.add(1))+" "+n[9]+ (lode ? "s-" : n[8]+"s");
    return format(mlt.div(PowiainaNum.pow(1e15,arv.floor()))) + " " + getARVName(arv.add(1).floor().toNumber(),lode) + (lode ? "-" : "")
}

function formatLDV(ex) {
    const n = MASS_NAMES[mass_type]
    const ldv = E(ex).slog(10).toNumber() - 1.9542425094393248
    const ldv_floor = Math.floor(ldv)
    if (ldv >= 1000) return format(ldv)+' '+n[10]+n[8]+'s'
    var v = VERSES[mass_type][1][ldv_floor-1]
    return formatARV(ex.iteratedlog(10,ldv_floor).div(1e9),true) + "" + (v ? v + (mass_type == 'standard' ? n[8] : "") : n[10]+n[8]+formatPow(ldv_floor,0))
    // Decimal.tetrate(10, ldv % 1 + 1).div(10)
}

function formatMass(ex) {
    ex = E(ex)

    const n = MASS_NAMES[mass_type]
    let md = 0

    if (md == 1 || ex.gte(PowiainaNum.POSITIVE_INFINITY)) return format(ex) + ' ' + n[n.length-1]+ n[n.length-3]

    if (ex.gte('eee9')) return formatLDV(ex)
    if (ex.gte('1.5e1000000056')) return formatARV(ex)
    if (ex.gte(1.5e56)) return format(ex.div(1.5e56)) + ' ' + n[7]
    if (ex.gte(2.9835e45)) return format(ex.div(2.9835e45)) + ' ' + n[6]
    if (ex.gte(1.989e33)) return format(ex.div(1.989e33)) + ' ' + n[5]
    if (ex.gte(5.972e27)) return format(ex.div(5.972e27)) + ' ' + n[4]
    if (ex.gte(1.619e20)) return format(ex.div(1.619e20)) + ' ' + n[3]
    if (ex.gte(1e6)) return format(ex.div(1e6)) + ' ' + n[2]
    if (ex.gte(1e3)) return format(ex.div(1e3)) + ' ' + n[1]
    return format(ex) + ' ' + n[0]
}


function capitalFirst(str) {
	if (str=="" || str==" ") return str
	return str
		.split(" ")
		.map(x => x[0].toUpperCase() + x.slice(1))
		.join(" ");
}

function uni(x) { return E(1.5e56).mul(x) }
function mlt(x) { return uni("ee9").pow(x) }

function simulateOverflow(q){
    let temp1 = q.clone();

    let o = temp1.clone();
    let os = PowiainaNum("ee50");
    let op = E(.5);

    temp1 = overflow(temp1, os, op, 2);

    tmp.overflowBefore.mm4 = o;
    tmp.overflow.mm4 = calcOverflow(o,temp1,os,2);
    tmp.overflow_start.mm4 = [os];
    tmp.overflow_power.mm4 = [op];
    //#endregion
    console.log(`由于4维体积在<b>${tmp.overflow_start.mm4[0]}</b>溢出，因此你的4维体积获取的指数${overflowFormat(tmp.overflow.mm4)}!`)
    return temp1
}