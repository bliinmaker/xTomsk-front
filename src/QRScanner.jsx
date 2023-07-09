import { useState } from 'react'
import { QrReader } from 'react-qr-reader'
import { fetchHistoricalPlace } from './api/qrCode'

function QRScanner() {
	const [historicalPlace, setHistoricalPlace] = useState(null)

	const handleScan = async data => {
		if (data) {
			try {
				const place = await fetchHistoricalPlace(data)
				setHistoricalPlace(place)
			} catch (error) {
				console.error(error)
			}
		}
	}

	const handleError = err => {
		console.error(err)
	}

	return (
		<div>
			<QrReader
				delay={300}
				onError={handleError}
				onScan={handleScan}
				style={{ width: '100%' }}
			/>
			{historicalPlace && (
				<div>
					<h2>{historicalPlace.name}</h2>
					<p>{historicalPlace.description}</p>
					<img src={historicalPlace.photo} alt={historicalPlace.name} />
				</div>
			)}
		</div>
	)
}

export default QRScanner
