import React, { Component } from 'react'
import './ranking.less'
import { connect } from "react-redux"
import { officialRankDetail, nationalRankDetail } from '../../actions/rank'

class Ranking extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.props.dispatch(officialRankDetail())
		this.props.dispatch(nationalRankDetail())
	}

	render() {
		const { officialRank, nationalRank } = this.props
		return (
			<div style={{ width: '100%', background: '#f5f5f9' }}>
				<div className='rank-title'>官方榜</div>
				{
					officialRank.map((item, index) => {
						return (
							<div key={index} className='official-content'>
								<img src={item.coverImgUrl} />
							</div>
						)
					})
				}
				<div className='rank-title'>全球榜</div>
				{
					nationalRank.map((item, index) => {
						return (
							<div key={index} className='official-content'>
								<img src={item.coverImgUrl} />
							</div>
						)
					})
				}
			</div>
		)
	}
}

export default connect(state => {
	return {
		officialRank: state.rank.officialRank,
		nationalRank: state.rank.nationalRank
	}
})(Ranking);