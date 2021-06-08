const ajax = new XMLHttpRequest();
const numbers = document.getElementById('bet-numbers');
const cardList = document.getElementById('card-list');
let data = []
let selectedNumber = []

const Form = {
    number: document.querySelector('input#number'),

    select(index, maxLimit) {
        let newEntry = index + 1

        if (selectedNumber.length >= maxLimit) {
            alert(`Já foram selecionados o número limite do jogo: ${maxLimit}, finalize adicionando ao carrinho. 🛒 `)
        } else {
            selectedNumber.push(newEntry)
            number[index].disabled = true
        }
        console.log(selectedNumber)
    },

    clearGame() {
        App.reload()
    },

    completeGame() {
        const min = 1;
        const max = 25;

        for (let i = 0; i < 15; i++) {
            let randomNum = Math.floor(Math.random() * max) + min;
            let check = selectedNumber.includes(randomNum);

            if (check === false) {
                selectedNumber.push(randomNum);
                number[randomNum - 1].disabled = true
            } else {
                while (check === true) {
                    randomNum = Math.floor(Math.random() * max) + min;
                    check = selectedNumber.includes(randomNum);
                    if (check === false) {
                        selectedNumber.push(randomNum);
                        number[randomNum - 1].disabled = true
                    }
                }
            }
        }
        console.log(selectedNumber)
    },

    submit() {

        const spanNumbers = selectedNumber.sort((a, b) => a - b).join()

        cardList.innerHTML = `
                            <div class="cart-card" id="card">
                                <img src="assets/trash.svg" class="cart-card-icon" onclick="Form.delete()"/>
                                    <div class="cart-card-content-lotofacil">
                                        <span class="cart-card-numbers">
                                        ${spanNumbers}
                                        </span>
                                        <div class="cart-card-game">
                                        <strong class="cart-card-lotofacil">Lotofácil</strong>
                                        <p class="cart-card-price">R$ 2,50</p>
                                        </div>
                                    </div>
                            </div>
                            `
    },

    delete() {
        const card = document.getElementById('card')
        cardList.removeChild(card)
        App.reload()
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
                selectedNumber = []

                for (let index = 0; index < data.range; index++) {
                    let html = `<input type="button" class="bet-number" value="${index + 1}" id="number" onclick="Form.select(${index}, ${data['max-number']})">`
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
                selectedNumber = []

                for (let index = 0; index < data.range; index++) {
                    let html = `<input type="button" class="bet-number" value="${index + 1}" id="number" onclick="Form.select(${index}, ${data['max-number']})">`
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
                selectedNumber = []

                for (let index = 0; index < data.range; index++) {
                    let html = `<input type="button" class="bet-number" value="${index + 1}" id="number" onclick="Form.select(${index}, ${data['max-number']})">`
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