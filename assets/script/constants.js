const E = PowiainaNum;
const ExpantaNum = PowiainaNum;
PowiainaNum.prototype.format = function(){return format(this)}
const DIMENSIONS_POINTS = 0;
const DIMENSIONS_MULTI = 1;
const DIMENSIONS_BOUGHT = 2;
const DIMENSIONS_COST = 3;
const DIMENSIONS_EXPONENT = 4;
const DIMENSIONS_DBEXPONENT = 5;

const Endgame = E("ee1461");

const mm3Require = E("e200");

const K9E15 = ExpantaNum.expansion(10,2**53-1)

const F10 = PowiainaNum.tetrate(10,10);

const FE30825 = PowiainaNum.tetrate(10,Number.MAX_VALUE);