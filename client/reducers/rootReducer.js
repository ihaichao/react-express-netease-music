import { combineReducers } from 'redux'
import home from './home'
import rank from './rank'
import search from './search'

const rootReducer = combineReducers({
	home,
	rank,
	search
})

export default rootReducer