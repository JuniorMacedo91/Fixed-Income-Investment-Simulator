let initialAmount = 23000
let monthlyAmount = 0
let period = 6
let total = 0

async function fetchSelicRate(){

    const url = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.1178/dados/ultimos?formato=json'
    const response = await fetch(url)
    const data = await response.json()

    calcInvestiment(data)
}

async function calcInvestiment(data){
    fetchSelicRate()
    
    const currentRate = Number(data[0].valor)
    const monthlyRate = (1 + currentRate / 100)**(1/12)-1

    for(let i=1; i <= period; i++){
        let selicYield = initialAmount * monthlyRate
        total = initialAmount += selicYield
    }
}
