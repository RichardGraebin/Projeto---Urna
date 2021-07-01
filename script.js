let textSVP = document.querySelector('.text span')
let role = document.querySelector('.role span')
let infos = document.querySelector('.geral-infos')
let instrucoes = document.querySelector('.info')
let images = document.querySelector('.screen-right')
let numero = document.querySelector('.code')

let parteAtual = 0


function start() {
    let parte = partes[parteAtual]
    let qntDigitos = ''

   /* for(let i in parte.digitos) {
        qndDigitos += '<div class="code-number"></div>'
    }*/

    for(let i=0; i<parte.digitos;i++) {
        if(i === 0) {
            qntDigitos += "<div class='code-number blink'></div>"
        } else {
            qntDigitos += "<div class='code-number'></div>"
        }
    }

    role.innerHTML = parte.cargo
    textSVP.style.display = 'none'
    instrucoes.style.display = 'none'
    infos.style.display = 'none' 
    images.style.display = 'none'
    numero.innerHTML = qntDigitos
}

function clicked(n) {
    window.alert(`Dígito ${n} pressionado.`)
}

function branco() {}

function corrige() {}

function confirma() {}

start()