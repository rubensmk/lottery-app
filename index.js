const ajax = new XMLHttpRequest();
const numbers = document.getElementById('bet-numbers');
let data = []
let selectedNumber = []

const Form = {
    number: document.querySelector('input#number'),
    submit(index, maxNum) {
        let newEntry = index + 1
        if (selectedNumber.includes(newEntry) || selectedNumber.length >= maxNum) {
            console.log('repetido')
        } else {
            selectedNumber.push(newEntry)
        }
        console.log(selectedNumber)
    }
}

const getGames = {
    lotofacil() {
        document.getElementById('lotofacil').setAttribute('class', 'lotofacil game-button lotofacil-selected')
        document.getElementById('megasena').setAttribute('class', 'megasena game-button')
        document.getElementById('quina').setAttribute('class', 'quina game-button')
        ajax.open('GET', 'games.json')
        ajax.send()
        ajax.addEventListener('readystatechange', () => {
            if (ajax.readyState === 4 && ajax.status === 200) {
                data = JSON.parse(ajax.responseText)
                data = data.types[0]

                document.getElementById('description').innerHTML = data.description

                numbers.innerHTML = ''

                for (let index = 0; index < data.range; index++) {
                    let html = `<input type="button" class="bet-number" value="${index + 1}" id="number" onclick="Form.submit(${index}, ${data['max-number']})">`
                    numbers.innerHTML += html
                }
            }
        })

    },
    megasena() {
        document.getElementById('lotofacil').setAttribute('class', 'lotofacil game-button')
        document.getElementById('quina').setAttribute('class', 'quina game-button')
        document.getElementById('megasena').setAttribute('class', 'megasena game-button megasena-selected')
        ajax.open('GET', 'games.json')
        ajax.send()
        ajax.addEventListener('readystatechange', () => {
            if (ajax.readyState === 4 && ajax.status === 200) {
                data = JSON.parse(ajax.responseText)
                data = data.types[1]

                document.getElementById('description').innerHTML = data.description

                numbers.innerHTML = ''

                for (let index = 0; index < data.range; index++) {
                    let html = `<input type="button" class="bet-number" value="${index + 1}" id="number" onclick="Form.submit(${index})">`
                    numbers.innerHTML += html
                }
            }
        })

    },
    quina() {
        document.getElementById('lotofacil').setAttribute('class', 'lotofacil game-button')
        document.getElementById('megasena').setAttribute('class', 'megasena game-button')
        document.getElementById('quina').setAttribute('class', 'quina game-button quina-selected')
        ajax.open('GET', 'games.json')
        ajax.send()
        ajax.addEventListener('readystatechange', () => {
            if (ajax.readyState === 4 && ajax.status === 200) {
                data = JSON.parse(ajax.responseText)
                data = data.types[2]

                document.getElementById('description').innerHTML = data.description

                numbers.innerHTML = ''

                for (let index = 0; index < data.range; index++) {
                    let html = `<input type="button" class="bet-number" value="${index + 1}" id="number" onclick="Form.submit(${index})">`
                    numbers.innerHTML += html
                }
            }
        })

    },
}

const App = {
    init() {
        console.log('iniciando')
        getGames.lotofacil()
    },
    reload() {
        this.init()
    }
}

App.init();