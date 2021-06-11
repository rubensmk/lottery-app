const ajax = new XMLHttpRequest();
const numbers = document.getElementById('bet-numbers');
const cardList = document.getElementById('card-list');
const totalPrice = document.getElementById('total-price');
const gamesList = document.getElementById('game-types');
const gamesDescription = document.getElementById('description');

let data = []
let selectedNumber = []
let cart = []

const Utils = {
    formatCurrency(value) {
        return value = value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })
    }
}

const Play = {
    number: document.querySelector('input#number'),


    selectNumber(index, maxLimit) {
        let newEntry = index + 1

        if (selectedNumber.length >= maxLimit) {
            alert(`Já foram selecionados o número limite do jogo: ${maxLimit}, finalize adicionando ao carrinho. 🛒`)
        } else {
            selectedNumber.push(newEntry)
            number[index].disabled = true
        }
        console.log(selectedNumber)
    },

    completeGame() {
        const min = 1
        let max = data.range
        let maxNumbers = data['max-number']

        if (selectedNumber.length === 0) {
            for (let i = 0; i < maxNumbers; i++) {
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
        } else {
            alert(`Selecione manualmente o restante dos números (${maxNumbers - selectedNumber.length}) ou utilize "Clear Game" em seguinda "Complete Game"`)
        }
    },

    clearGame() {
        selectedNumber.forEach(item => {
            number[item - 1].disabled = false
        })
        selectedNumber = []
    },

    addToCart() {

        const listOfNumbers = selectedNumber.sort((a, b) => a - b).join()

        let cardClass = ''
        if (data.type === 'Lotofácil') {
            cardClass = 'cart-card-lotofacil'
        }
        if (data.type === 'Mega-Sena') {
            cardClass = 'cart-card-megasena'
        }
        if (data.type === 'Quina') {
            cardClass = 'cart-card-quina'
        }
        cardList.innerHTML += `
                            <div class="cart-card" id="card-${data['max-number']}">
                                <img src="assets/trash.svg" class="cart-card-icon" onclick="Play.deleteCart(${data['max-number']})"/>
                                    <div class="${cardClass}-content">
                                        <span class="cart-card-numbers">
                                        ${listOfNumbers}
                                        </span>
                                        <div class="cart-card-game">
                                        <strong class="${cardClass}">${data.type}</strong>
                                        <p class="cart-card-price">${Utils.formatCurrency(data.price)}</p>
                                        </div>
                                    </div>
                            </div>
                            `
        cart.push({
            id: data['max-number'],
            price: data.price
        })
        this.calculateTotal()
    },

    deleteCart(id) {
        const item = document.getElementById(`card-${id}`)
        item.parentNode.removeChild(item)
        cart.map((item, index) => {
            if (item.id === id) {
                cart.splice(index, 1)
            }
        });
        this.calculateTotal()
    },

    calculateTotal() {
        let cartTotal = 0
        cart.map(item => {
            cartTotal += item.price
            return cartTotal
        })
        totalPrice.innerHTML = Utils.formatCurrency(cartTotal)
    }
}

const getGame = {

    getData() {
        ajax.open('GET', 'games.json')
        ajax.send()
        ajax.addEventListener('readystatechange', () => {
            if (ajax.readyState === 4 && ajax.status === 200) {
                data = JSON.parse(ajax.responseText)
                data.types.map(game => {
                    let gameClass = ''
                    if (game.type === 'Lotofácil') {
                        gameClass = 'lotofacil'
                    }
                    if (game.type === 'Mega-Sena') {
                        gameClass = 'megasena'
                    }
                    if (game.type === 'Quina') {
                        gameClass = 'quina'
                    }
                    gamesList.innerHTML += `<button id="${game.type}" class="game-button ${gameClass}" onclick="getGame.pickGame(${game['max-number']}, ${game.range})">${game.type}</button>`
                    gamesDescription.innerHTML = game.description
                })
            }
        })
    },
    pickGame(maxNumber, range) {

        if (maxNumber === 15) {
            document.getElementById('Lotofácil').setAttribute('class', 'lotofacil game-button lotofacil-selected')
            document.getElementById('Mega-Sena').setAttribute('class', 'megasena game-button')
            document.getElementById('Quina').setAttribute('class', 'quina game-button')
            this.renderNumbers(maxNumber, range)
        }
        if (maxNumber === 6) {
            document.getElementById('Lotofácil').setAttribute('class', 'lotofacil game-button')
            document.getElementById('Mega-Sena').setAttribute('class', 'megasena game-button megasena-selected')
            document.getElementById('Quina').setAttribute('class', 'quina game-button')
            this.renderNumbers(maxNumber, range)
        }
        if (maxNumber === 5) {
            document.getElementById('Lotofácil').setAttribute('class', 'lotofacil game-button')
            document.getElementById('Mega-Sena').setAttribute('class', 'megasena game-button')
            document.getElementById('Quina').setAttribute('class', 'quina game-button quina-selected')
            this.renderNumbers(maxNumber, range)
        }
    },
    renderNumbers(maxNumber, maxRange) {
        numbers.innerHTML = ''
        selectedNumber = []

        for (let index = 0; index < maxRange; index++) {
            let html = `<input type="button" class="bet-number" value="${index + 1}" id="number" onclick="Play.selectNumber(${index},${maxNumber})">`
            numbers.innerHTML += html
        }
    }
}

const App = {
    init() {
        getGame.getData()
    },
    reload() {
        this.init()
    }
}

App.init();