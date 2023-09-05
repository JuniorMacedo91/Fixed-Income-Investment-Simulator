let initial_amount = document.querySelector('#initial_amount').value
let monthly_amount = document.querySelector('#monthly_amount').value
let period = document.querySelector('#period').value
let amount_invested = document.querySelector('#amount-invested')
let gross_total_amount = initial_amount
let income_tax = 0
let invest_interest_gain = 0
let invest_value = 0
let invest_net_total = 0

async function fetchSelicRate(){

    const url = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.1178/dados/ultimos?formato=json'
    const response = await fetch(url)
    const data = await response.json()

    calcInvestiment(data)
}

async function calcInvestiment(data){
    
    const currentRate = Number(data[0].valor)
    const monthly_rate = (1 + currentRate / 100)**(1/12)-1

    for(let i=1; i <= period; i++){
      if(!monthly_amount){
        
        let selic_yield = gross_total_amount  * monthly_rate
        gross_total_amount = gross_total_amount += selic_yield
      } 
      else if(monthly_amount){
        
        let selic_yield = gross_total_amount  * monthly_rate
        let yield_plus_montly_amount = selic_yield += monthly_amount
        gross_total_amount = gross_total_amount += yield_plus_montly_amount
      }
    }
}
