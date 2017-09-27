import * as Ajax from './ajax'

export const GET_OFFICIAL_RANK = 'GET_OFFICAIL_RANK'
export const GET_NATIONAL_RANK = 'GET_NATIONAL_RANK'

//获取官方榜
const getOfficialRank = (response) => ({
	type: GET_OFFICIAL_RANK,
	officialRank: response
})

export const officialRankDetail = () => {
	return (dispatch) => {
		Ajax.getAjax(`/api/officialrank`, function (response) {
			if (response) {
				dispatch(getOfficialRank(response.data))
			}
		})
	}
}

//获取全球榜
const getNationalRank = (response) => ({
	type: GET_NATIONAL_RANK,
	nationalRank: response
})

export const nationalRankDetail = () => {
	return (dispatch) => {
		Ajax.getAjax(`/api/nationalrank`, function (response) {
			if (response) {
				// 通过dispatch调用getNationalRank函数，将获取的值传给reducer,更新action对应的函数
				dispatch(getNationalRank(response.data))
			}
		})
	}
}