

const INFINITY_NUM = E(2).pow(1024);
const SUBSCRIPT_NUMBERS = "₀₁₂₃₄₅₆₇₈₉";
const SUPERSCRIPT_NUMBERS = "⁰¹²³⁴⁵⁶⁷⁸⁹";

function toSubscript(value) {
    return value.toFixed(0).split("")
      .map((x) => x === "-" ? "₋" : SUBSCRIPT_NUMBERS[parseInt(x, 10)])
      .join("");
}

function toSuperscript(value) {
    return value.toFixed(0).split("")
      .map((x) => x === "-" ? "₋" : SUPERSCRIPT_NUMBERS[parseInt(x, 10)])
      .join("");
}

const FORMAT_MODES = [
    {
        id: 0,
        name: "PsiCubed2's Letter Notation + 我要玩SMM2到{10,100[1[1\\75]2]2}年后，开发马造树中's # Notation",
        format() {return formatFP(...arguments)},
        formatWhole(){return formatWholeFP(...arguments)},
        formatSmall(){return formatSmallFP(...arguments)},
    },
    {
        id: 3,
        name: "Placeholder format 1",
        format(num, precision=4, small=false) {
            return num.toString()
        },
        formatWhole(){return this.format(...arguments)},
        formatSmall(){return this.format(...arguments)},
    },
    {
        id: 2,
        name: "Placeholder format 2",
        format(num, precision=4, small=false, recursion = 4) {
            /*
            if (recursion == 0){
                return "..."
            }
            if (num.lt(10)){
                return `${num.floor().toString()}`
            }else if (num.lt(100)){
                if (num.lt(20)){
                    return "ω"+(
                        num.sub(10).gt(0) ? "+"+(
                            num.sub(10).floor().toString()
                        ) : ""
                    )
                }else{
                    let temp1 = num.div(10).floor()
                    return "ω"+temp1.toString()+((
                        num.modular(10).gt(0) ? "+"+(
                            num.modular(10).floor().toString()
                        ) : "")
                        )
                }

            }else if (num.lt(1000)){
                if (num.lt(200)){
                    return "ω^2"+(
                        num.modular(100).gt(0) ? ("+"+this.format(num.modular(100),precision,small,recursion-1)) :
                        ""
                    )
                }else{
                    let temp1 = num.div(100).floor()
                    return "(ω^2)"+temp1.toString()+(
                        num.modular(100).gt(0) ? ("+"+this.format(num.modular(100),precision,small,recursion-1)) :
                        ""
                    )
                }
            }
            
            if (num.lt(E.pow(10,"1e10"))){
                let i=num.logarithm(10).floor().add(1)
                
                if (num.lt(E.pow(10,i))){
                    if (num.lt(2*E.pow(10,i.sub(1)))){
                        return "ω^("+this.format(i.sub(1),precision,small.recursion)+(
                            num.modular(E.pow(10,i.sub(1))).gt(0) ? (")+"+this.format(num.modular(E.pow(10,i.sub(1))),precision,small,recursion-1)) :
                            ")"
                        )
                    }else{
                        let temp1 = num.div(E.pow(10,i.sub(1))).floor()
                        return "(ω^("+this.format(i.sub(1),precision,small.recursion)+"))"+temp1.toString()+(
                            num.modular(E.pow(10,i.sub(1))).gt(0) ? ("+"+this.format(num.modular(E.pow(10,i.sub(1))),precision,small,recursion-1)) :
                            ""
                        )
                    }

                }
            }else if (E.pow(10,E.pow(10,"1e10"))){ // slog < 3
                return `ω^(${this.format(num.logarithm(10),precision,small,recursion)})`
            }
            let tetrate = num.slog(10).ceil();
            if (tetrate.lt(10)){
                if (num.lt(E.tetrate(10,tetrate))){
                    return "ω^".repeat(tetrate.sub(2).toNumber().parseInt()) +this.format(getExponentLayer(num,tetrate.sub(1)))
                }
            }
*/
            //3.0802243410286554
            return num.toString()
        },
        formatWhole(){return this.format(...arguments)},
        formatSmall(){return this.format(...arguments)},
    },
    {
        id: 3,
        name: "Placeholder format 3",
        format(num, precision=4, small=false) {
            return num.toString()
        },
        formatWhole(){return this.format(...arguments)},
        formatSmall(){return this.format(...arguments)},
    }
]

function format(...args){
    if (!player.format_mode) return formatFP(...args)
    return FORMAT_MODES[player.format_mode].format(...args)
    //return args[0].toString()
}
function formatWhole(...args) {
    if (!player.format_mode) return formatWholeFP(...args)
    return FORMAT_MODES[player.format_mode].formatWhole(...args)
}
function formatSmall(...args) {
    if (!player.format_mode) return formatSmallFP(...args)
    return FORMAT_MODES[player.format_mode].formatSmall(...args) 
}