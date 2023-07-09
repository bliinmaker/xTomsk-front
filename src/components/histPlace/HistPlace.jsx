import { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'
import slug from 'slug'
import { useParams } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import { getHistPlace } from '../../api/histPlace'
import { getHistPlaceRating, rateHistPlace } from '../../api/rateHistPlace'
import { API_HOST } from '../../config/config'
import { Comments } from '../comments/Comments'
import './HistPlace.scss'

export const HistPlace = () => {
	const [histPlace, setHistPlace] = useState(null)
	const [rating, setRating] = useState(0)
	let { histPlaceId } = useParams()

	useEffect(() => {
		getHistPlace(histPlaceId).then(resp => {
			if (resp.status === 200) {
				setHistPlace(resp.data)
				console.log(resp.data)
			}
		})
	}, [])

	useEffect(() => {
		getHistPlaceRating(histPlaceId).then(resp => {
			if (resp.status === 200) {
				setRating(resp.data.average)
				console.log(resp.data.average)
				console.log(resp.data.rating)
			}
		})
	}, [])

	const handleRating = rating => {
		// const isRated = localStorage.getItem('isRated')

		// if (isRated !== 'true') {
		rateHistPlace(histPlaceId, rating)
		// localStorage.setItem('isRated', 'true')
		// }
	}

	if (!histPlace) {
		return <div>Loading...</div>
	}

	return (
		<section className='histPlace container' id='histPlace'>
			<div className='histPlace-wrap'>
				<div className='photo-container'>
					<img src={API_HOST + '/' + histPlace.image} className='image' />
				</div>
				<div className='content'>
					<div className='stars'>
						<Rating onClick={handleRating} initialValue={rating} />
					</div>
					<h3>{histPlace.title}</h3>
					<span>{histPlace.area}</span>
					<p>{histPlace.description}</p>
					<div>
						<QRCode
							size={100}
							style={{ height: 'auto', maxWidth: '30%', width: '30%' }}
							value={slug(histPlace.description, ' ')}
							viewBox={`0 0 100 100`}
						/>
					</div>
				</div>
			</div>
			{histPlace && (
				<Comments histPlaceId={histPlaceId} comments={histPlace.comments} />
			)}
		</section>
	)
}
