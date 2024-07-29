import { combineReducers, createStore } from "redux"

const initialStateCustomer ={
    fullName: '',
    nationalID: '',
    createdAt: ''

}


const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: '',


}

function customerReducer(state = initialStateCustomer, action){
    switch(action.type){
        case 'customer/createCustomer':
            return {...state, fullName:action.payload.fullName,  nationalID: action.payload.nationalID, createdAt:action.payload.createdAt}
        case 'customer/updateName':
            return {...state, fullName:action.payload}
        default:
            return state;
    }
}


function AccountReducer(state = initialStateAccount,action){
    switch(action.type){
        case 'account/deposit':
            return {...state, balance:state.balance + action.payload}
        case 'account/withdraw':
            return {...state, balance: state.balance - action.payload}
        case 'account/requestLoan':
            if(state.loan>0) return state
            return {...state , loan: action.payload.amount, loanPurpose: action.payload.purpose, balance: state.balance + action.payload.amount}
        case 'account/payLoan':
            if(state.balance < state.loan) return state
            return {...state, loan:0, balance: state.balance - state.loan}
        default: 
            return state

    }
}

const rootReducer = combineReducers({
    account: AccountReducer,
    customer: customerReducer,
})

const store = createStore(rootReducer)
store.dispatch({type:'account/deposit', payload: 500})
console.log(store.getState())
store.dispatch({type: 'account/withdraw', payload: 200});
console.log(store.getState())
store.dispatch({type: 'account/requestLoan', payload: {amount: 300, purpose: 'I wanna buy a goat'}})
console.log(store.getState())

store.dispatch({type:'account/payLoan'})
console.log(store.getState())

function deposit(amount){
    store.dispatch({type:'account/deposit', payload: amount})
    
}
function withdraw(amount){
    return {type:'account/withdraw', payload: amount}
    
}
function payLoan(){
    return {type:'account/payLoan'}
    
}
function requestLoan(amount,purpose){
    return {type:'account/requestLoan', payload: {amount, purpose}}

}


function updateName(fullName){
    return {type: 'updateName', payload: fullName}
}

function createCustomer(fullName, nationalID){
    return {type: 'createCustomer', payload: {fullName,nationalID, createdAt: new Date().toISOString()}}
}



console.log(store.dispatch(withdraw(600)))



console.log(store.dispatch(createCustomer('Damian','29843854')))