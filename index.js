const ajax = new XMLHttpRequest();
let data = []


const getGames = {
    fetch() {
        ajax.open('GET', 'games.json')
        ajax.send()
        ajax.addEventListener('readystatechange', () => {
            if (ajax.readyState === 4 && ajax.status === 200) {
                data = JSON.parse(ajax.responseText)
            }
        })

    }
}

const App = {
    init() {
        console.log('iniciando')
        getGames.fetch()
    },
    reload() {
        this.init()
    }
}

App.init();