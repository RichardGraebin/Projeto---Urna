let textSVP = document.querySelector('.text span')
let role = document.querySelector('.role span')
let infos = document.querySelector('.geral-infos')
let instrucoes = document.querySelector('.info')
let images = document.querySelector('.screen-right')
let numero = document.querySelector('.code')

let parteAtual = 0
let numeroInteiro = ''

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
    infos.innerHTML = ''
    images.innerHTML = ''
    numero.innerHTML = qntDigitos
}

function refresh_page() {
    let parte = partes[parteAtual]
    let candidato = parte.candidatos.filter((i)=> {
        if(i.numero === numeroInteiro) {
            return true
        } else {
            return false
        }
    })

    if(candidato.length > 0) {
        candidatoAtual = candidato[0]
        textSVP.style.display = 'block'
        instrucoes.style.display = 'block'
        infos.innerHTML = `Nome: ${candidatoAtual.nome}</br>Partido: ${candidatoAtual.partido}`
        
        let fotosHTML = ''
        for(let i in candidatoAtual.fotos) {
            fotosHTML += `<div class='image'><img src="/images/${candidatoAtual.fotos[i].url}" alt="role 1">${candidatoAtual.fotos[i].alt}</div>`
        }
        images.innerHTML = fotosHTML
    }
}

function clicked(n) {
    /*window.alert(`Dígito ${n} pressionado.`)*/

    let digitoAtual = document.querySelector('.code-number.blink')

    if(digitoAtual !== null) {
        digitoAtual.innerHTML = n
        numeroInteiro += n

        digitoAtual.classList.remove('blink')

        if(digitoAtual.nextElementSibling !== null) {
            digitoAtual.nextElementSibling.classList.add('blink')
        } else {
            refresh_page()
        }
    }
}

function branco() {}

function corrige() {}

function confirma() {}

start()