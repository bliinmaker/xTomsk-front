import fontawesome from '@fortawesome/fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'
import { QrReader } from 'react-qr-reader'
import { Link } from 'react-router-dom'
import { getHistPlaces } from '../../api/histPlace'

import './Header.scss'

fontawesome.library.add(faAngleRight)

export const Header = () => {
	const [findResults, setFindResults] = useState([])
	const [areas, setAreas] = useState([])
	const [titles, setTitles] = useState([])
	const [isFormTouched, setIsFormTouched] = useState(false)
	const titleRef = useRef(null)
	const areaRef = useRef(null)

	const [isShowScanner, setIsShowScanner] = useState(false)

	const [scanData, setScanData] = useState('')

	useEffect(() => {
		getHistPlaces({}).then(resp => {
			if (resp.status === 200) {
				const currentAreas = resp.data.map(item => item.area)
				const currentTitle = resp.data.map(item => item.title)
				let uniqueAreas = [...new Set(currentAreas)]
				let uniqueTitle = [...new Set(currentTitle)]
				setAreas(uniqueAreas)
				setTitles(uniqueTitle)
				console.log(resp.data)
			}
		})
	}, [])

	const onSubmitHandler = event => {
		event.preventDefault()
		setIsFormTouched(true)

		getHistPlaces({
			area: areaRef.current.value,
			title: titleRef.current.value,
		}).then(resp => {
			if (resp.status === 200) {
				setFindResults(resp.data)
				console.log(resp.data)
			}
		})
	}

	const handleClickScanQrBtn = () => {
		setIsShowScanner(val => !val)
	}

	return (
		<>
			<header className='flex'>
				<div className='container'>
					<div className='header-title'>
						<h1>Удивительный город Томск!</h1>
						<p>
							Приветствуем вас на сайте Томска, где вы можете погрузиться в
							богатую историю и культурное наследие этого уникального города.
							Томск - одно из старейших и наиболее значимых исторических мест в
							Сибири.
						</p>
					</div>
					<div className='header-form'>
						{scanData && <p>{scanData}</p>}
						<button onClick={handleClickScanQrBtn}>
							{isShowScanner ? 'Закрыть сканер' : 'Сканировать QR'}
						</button>
						{isShowScanner && (
							<QrReader
								onResult={(result, error) => {
									if (!!result) {
										setScanData(result?.text)
									}

									if (!!error) {
										console.info(error)
									}
								}}
								style={{ width: '100%' }}
							/>
						)}
						<h2>Поиск по достопримечательностям:</h2>
						<form className='flex' onSubmit={onSubmitHandler}>
							<select
								ref={titleRef}
								type='text'
								className='form-control'
								placeholder='Название'
								name='title'
							>
								<option></option>
								{titles.map((title, id) => (
									<option key={id} value={title}>
										{title}
									</option>
								))}
							</select>

							<select
								type='text'
								className='form-control'
								placeholder='Район'
								name='area'
								ref={areaRef}
							>
								<option></option>
								{areas.map((area, id) => (
									<option key={id} value={area}>
										{area}
									</option>
								))}
							</select>
							<input type='submit' className='btn' value='Поиск'></input>
						</form>
					</div>
				</div>
			</header>
			<section className='destination-search' id='destinations'>
				{findResults &&
					findResults.map((result, id) => (
						<div key={id}>
							<div className='box-container'>
								<div className='box'>
									<div className='content'>
										<h3>{result.title}</h3>
										<h4 className='area'>{result.area}</h4>
										<p className='description'>{result.description}</p>
										<Link to={`histPlace/${result._id}`}>
											подробнее{' '}
											<i>
												<FontAwesomeIcon icon='fas fa-angle-right' />
											</i>
										</Link>
									</div>
								</div>
							</div>
						</div>
					))}
				{isFormTouched && findResults.length === 0 && (
					<>
						<div key={findResults.id} className='destination-none'>
							<h3>Таких мест пока что нет</h3>
						</div>
					</>
				)}
			</section>
		</>
	)
}
