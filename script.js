let textSVP = document.querySelector('.text span')
let role = document.querySelector('.role span')
let infos = document.querySelector('.geral-infos')
let instrucoes = document.querySelector('.info')
let images = document.querySelector('.screen-right')
let numero = document.querySelector('.code')

let parteAtual = 0
let numeroInteiro = ''
let votoBranco = false
let votoCerto = false
let votoNulo = false
let votos = []

function start() {
    let parte = partes[parteAtual]
    let qntDigitos = "<div class='code-name'>Numero:</div>"
    votoCerto = false
    votoBranco = false
    votoNulo = false
    numeroInteiro = ''

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
            votoCerto = true
            return true
        } else {
            return false
        }
    })

    if(candidato.length > 0) {
        candidatoAtual = candidato[0]
        textSVP.style.display = 'block'
        instrucoes.style.display = 'block'

        if(partes[parteAtual].cargo == 'GOVERNADOR') {
            infos.innerHTML = `Nome: ${candidatoAtual.nome}</br>Partido: ${candidatoAtual.partido}`
        } else if(partes[parteAtual].cargo == 'PRESIDENTE') {
            infos.innerHTML = `Nome: ${candidatoAtual.nome}</br>Partido: ${candidatoAtual.partido}</br>Vice-Presidente: ${candidatoAtual.vice}`
        }
        
        let fotosHTML = ''
        for(let i in candidatoAtual.fotos) {
            if(candidatoAtual.fotos[i].small === true) {
                fotosHTML += `<div class='image small'><img src="/images/${candidatoAtual.fotos[i].url}" alt="role 1">${candidatoAtual.fotos[i].alt}</div>`

            } else {
                fotosHTML += `<div class='image'><img src="/images/${candidatoAtual.fotos[i].url}" alt="role 1">${candidatoAtual.fotos[i].alt}</div>`
            }
        }
        images.innerHTML = fotosHTML
    } else {
        votoNulo = true
        textSVP.style.display = 'block'
        instrucoes.style.display = 'block'
        infos.innerHTML = `<div class='warning blink'>VOTO NULO</div>`
    }
}

function clicked(n) {
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

function branco() {
    if(numeroInteiro === '') {
        votoBranco = true
        numeroInteiro = ''
        textSVP.style.display = 'block'
        instrucoes.style.display = 'block'
        infos.innerHTML = `<div class='warning blink'>VOTO EM BRANCO</div>`
    } else {
        window.alert('Para votar em BRANCO, o campo de digitos deve estar vazio.')
    }
}

function corrige() {
    start()
}

function confirma() {
    let parte = partes[parteAtual]
    let votoConfirmado = false

    if(votoBranco === true) {
        votoConfirmado = true
        votos.push({
            parte: partes[parteAtual].cargo,
            voto: 'branco'
        })
    } else if(votoCerto === true) {
        votoConfirmado = true
        votos.push({
            parte: partes[parteAtual].cargo,
            voto: numeroInteiro
        })
    } else if(votoNulo === true) {
        votoConfirmado = true
        votos.push({
            parte: partes[parteAtual].cargo,
            voto: 'nulo'
        })
    }

    if(votoConfirmado) {
        parteAtual++
        if(partes[parteAtual] !== undefined) {
            start()
        } else {
            document.querySelector('.screen').innerHTML = `<div class='end-warning blink'>FIM!</div>`
        }
    }
}

start()