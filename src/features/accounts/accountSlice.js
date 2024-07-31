import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
    isLoading: false


}

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        deposit(state, action){
            state.balance += action.payload ;
            state.isLoading = false
        },
        withdraw(state,action){
            state.balance -= action.payload
        },
        requestLoan:{
            prepare(amount, purpose){
                return {
                    payload: {amount,purpose}
                }
            },
            reducer(state,action){
            if(state.loan>0) return;
            state.loan = action.payload.amount;
            state.loanPurpose = action.payload.purpose;
            state.balance += action.payload.amount
        }},
        payLoan(state, action){
            state.loan = 0;
            state.loanPurpose = '';
            state.balance -= state.loan
        },
        convertingCurrency(state, action){
           state.isLoading = true 
        }
    }
})
const host = 'api.frankfurter.app';

export default accountSlice.reducer;
export const { withdraw, requestLoan, payLoan} = accountSlice.actions; 

export function deposit(amount, currency){
    if(currency === 'USD') return {type:'account/deposit', payload: amount}
    return async function(dispatch, getState){
        dispatch({type:'account/convertingCurrency'})
      const res = await  fetch(`https://${host}/latest?amount=${amount}&from=${currency}&to=USD`)
    const data = await res.json()
    const converted = data.rates.USD
    console.log(converted)
    dispatch({type: 'account/deposit', payload: converted})

    }
}


/* 
export default function AccountReducer(state = initialStateAccount,action){
    switch(action.type){
        case 'account/deposit':
            return {...state, balance:state.balance + action.payload, isLoading: false}
        case 'account/withdraw':
            return {...state, balance: state.balance - action.payload}
        case 'account/requestLoan':
            if(state.loan>0) return state
            return {...state , loan: action.payload.amount, loanPurpose: action.payload.purpose, balance: state.balance + action.payload.amount}
        case 'account/payLoan':
            if(state.balance < state.loan) return state
            return {...state, loan:0, balance: state.balance - state.loan}
        case 'account/convertingCurrency':
            return {...state, isLoading: true}
        default: 
            return state

    }
}

const host = 'api.frankfurter.app';

export function deposit(amount, currency){
    if(currency === 'USD') return {type:'account/deposit', payload: amount}
    return async function(dispatch, getState){
        dispatch({type:'account/convertingCurrency'})
      const res = await  fetch(`https://${host}/latest?amount=${amount}&from=${currency}&to=USD`)
    const data = await res.json()
    const converted = data.rates.USD
    console.log(converted)
    dispatch({type: 'account/deposit', payload: converted})

    }
}
export function withdraw(amount){
    return {type:'account/withdraw', payload: amount}
    
}
export function payLoan(){
    return {type:'account/payLoan'}
    
}
export function requestLoan(amount,purpose){
    return {type:'account/requestLoan', payload: {amount, purpose}}

}

 */