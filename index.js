const ajax = new XMLHttpRequest();
const numbers = document.getElementById('bet-numbers');
const cardList = document.getElementById('card-list');
const totalPrice = document.getElementById('total-price');
const gamesList = document.getElementById('game-types');
const gamesDescription = document.getElementById('description');

let data = []
let selectedNumber = []
let cart = []
let currentGameMaxNumbers = 0
let currentGameRange = 0
let currentGamePrice = 0
let currentGameType = ''

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

        if (selectedNumber.includes(newEntry)) {
            selectedNumber.splice(selectedNumber.indexOf(newEntry), 1)
            selectedNumber.sort((a, b) => a - b)
            number[index].classList.remove('bet-number-selected')
        } else if (selectedNumber.length >= maxLimit) {
            alert(`Já foram selecionados o número limite do jogo: ${maxLimit}, finalize adicionando ao carrinho. 🛒`)
        }
        else {
            selectedNumber.push(newEntry)
            selectedNumber.sort((a, b) => a - b)
            number[index].classList.add('bet-number-selected')
        }
        console.log(selectedNumber)
    },

    completeGame() {
        const min = 1
        let max = currentGameMaxNumbers
        let range = currentGameRange
        let currentArray = []

        for (i = 1; i <= range; i++) {
            currentArray.push(i)
        }

        if (selectedNumber.length === 0) {
            for (let i = 0; i < max; i++) {
                let randomNum = Math.floor(Math.random() * range) + min;
                let check = selectedNumber.includes(randomNum);

                if (check === false) {
                    selectedNumber.push(randomNum);
                    number[randomNum - 1].classList.add('bet-number-selected')
                } else {
                    while (check === true) {
                        randomNum = Math.floor(Math.random() * range) + min;
                        check = selectedNumber.includes(randomNum);
                        if (check === false) {
                            selectedNumber.push(randomNum);
                            number[randomNum - 1].classList.add('bet-number-selected')
                        }
                    }
                }
            }
        }
        if (selectedNumber.length > 0) {
            let changedMax = max - selectedNumber.length
            for (let i = 0; i < changedMax; i++) {
                console.log('laço iniciado', i)
                let randomNum = Math.floor(Math.random() * range) + min;
                let check = selectedNumber.includes(randomNum);

                if (check === false) {
                    selectedNumber.push(randomNum);
                    number[randomNum - 1].classList.add('bet-number-selected')
                } else {
                    while (check === true) {
                        randomNum = Math.floor(Math.random() * range) + min;
                        check = selectedNumber.includes(randomNum);
                        if (check === false) {
                            selectedNumber.push(randomNum);
                            number[randomNum - 1].classList.add('bet-number-selected')
                        }
                    }
                }
            }
        }
    },

    clearGame() {
        selectedNumber.forEach(item => {
            number[item - 1].classList.remove('bet-number-selected')
        })
        selectedNumber = []
    },

    addToCart() {

        const listOfNumbers = selectedNumber.sort((a, b) => a - b).join()

        let cardClass = ''
        if (currentGameMaxNumbers === 15) {
            cardClass = 'cart-card-lotofacil'
        }
        if (currentGameMaxNumbers === 6) {
            cardClass = 'cart-card-megasena'
        }
        if (currentGameMaxNumbers === 5) {
            cardClass = 'cart-card-quina'
        }
        cardList.innerHTML += `
                            <div class="cart-card" id="card-${currentGameMaxNumbers}">
                                <img src="assets/trash.svg" class="cart-card-icon" onclick="Play.deleteCart(${currentGameMaxNumbers})"/>
                                    <div class="${cardClass}-content">
                                        <span class="cart-card-numbers">
                                        ${listOfNumbers}
                                        </span>
                                        <div class="cart-card-game">
                                        <strong class="${cardClass}">${currentGameType}</strong>
                                        <p class="cart-card-price">${Utils.formatCurrency(currentGamePrice)}</p>
                                        </div>
                                    </div>
                            </div>
                            `
        cart.push({
            id: currentGameMaxNumbers,
            price: currentGamePrice
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
                    gamesList.innerHTML +=
                        `<button 
                        id="${game.type}"
                        style="border: 2px solid ${game.color}; color:${game.color}"
                        class="game-button" 
                        onclick="getGame.pickGame(${game['max-number']},${game.range},'${game.type}',${game.price},'${game.description}')">
                        ${game.type}
                      </button>`

                })
            }
        })
    },
    pickGame(maxNumber, range, type, price, description) {
        getGame.renderNumbers(maxNumber, range)
        gamesDescription.innerHTML = description
        currentGameMaxNumbers = maxNumber
        currentGameRange = range
        currentGameType = type
        currentGamePrice = price

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