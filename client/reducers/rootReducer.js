import { combineReducers } from 'redux'
import home from './home'
import rank from './rank'

const rootReducer = combineReducers({
	home,
	rank
})

export default rootReducer