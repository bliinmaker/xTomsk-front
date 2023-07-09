import dayjs from 'dayjs'
import { Formik } from 'formik'
import { useEffect, useState } from 'react'
import * as yup from 'yup'
import { createComment } from '../../api/comment'
import { getHistPlace } from '../../api/histPlace'
import { uploadImage } from '../../api/uploads'
import { API_HOST } from '../../config/config'
import './Comment.scss'

const formCommentSchema = yup.object().shape({
	nickName: yup.string().required('Поле Имя необходимо заполнить'),
	message: yup.string().required('Поле Отзыв необходимо заполнить'),
})

export const Comments = ({ histPlaceId, comments = [] }) => {
	const [file, setFile] = useState(null)
	const [imageSrc, setImageSrc] = useState(null)
	const [commentsFresh, setCommentsFresh] = useState([])

	useEffect(() => {
		setCommentsFresh(comments)
	}, [comments])

	const onSubmitHandlerComment = async (values, { resetForm }) => {
		const { nickName, message } = values
		console.log(values)

		let imageUrl = ''

		if (file) {
			const imageData = new FormData()
			imageData.append('uploadFile', file, file.name)

			const resp = await uploadImage(imageData)
			console.log(resp)
			imageUrl = resp.data.fileName
		}

		createComment(histPlaceId, {
			nickName,
			message,
			image: imageUrl || '',
		}).then(resp => {
			console.log(resp)

			getHistPlace(histPlaceId).then(resp => {
				if (resp.status === 200) {
					setCommentsFresh(resp.data.comments)
				}
			})
			resetForm()
			setFile(null)
			setImageSrc(null)
		})
	}

	const handleFileChange = event => {
		if (event.target.files) {
			const image = event.target.files[0]
			setImageSrc(URL.createObjectURL(image))
			setFile(event.target.files[0])
		}
	}

	console.log(comments)

	return (
		<div className='comments-container container'>
			<h1>Коментарии</h1>
			<div className='create-comment'>
				<Formik
					initialValues={{
						nickName: '',
						message: '',
						image: '',
					}}
					validationSchema={formCommentSchema}
					onSubmit={onSubmitHandlerComment}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
					}) => (
						<form onSubmit={handleSubmit} method='post'>
							{touched.nickName && errors.nickName && (
								<span style={{ color: 'tomato' }}>{errors.nickName}</span>
							)}
							<h3>
								<input
									value={values.nickName}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder='Ваше имя'
									type='text'
									name='nickName'
								></input>
							</h3>
							{touched.message && errors.message && (
								<span style={{ color: 'tomato' }}>{errors.message}</span>
							)}
							<textarea
								value={values.message}
								onChange={handleChange}
								onBlur={handleBlur}
								type='text'
								name='message'
								placeholder='Ваш отзыв'
								rows={2}
							></textarea>
							{imageSrc ? (
								<img style={{ width: 200 }} width={200} src={imageSrc} />
							) : (
								<>
									<label htmlFor='file-upload' className='custom-file-upload'>
										Выберите файл
										<input
											id='file-upload'
											type='file'
											onChange={handleFileChange}
										/>
									</label>
								</>
							)}
							<div className='wrap-send'>
								<button type='submit'>Отправить</button>
							</div>
						</form>
					)}
				</Formik>
			</div>
			{commentsFresh.length > 0 && (
				<div className='comments-output'>
					{commentsFresh.map((comment, id) => (
						<div key={id} className='comment-body'>
							<div className='left-part'>
								<h4 className='comment-nickname'>{comment.nickName}</h4>
								<p className='comment-message'>{comment.message}</p>
								{comment.image && (
									<img
										style={{ width: 200 }}
										width={100}
										src={API_HOST + '/uploads/images/' + comment.image}
									/>
								)}
							</div>
							<div className='right-part'>
								<p>{dayjs(comment.createdAt).format('hh:mm DD.MM.YYYY')}</p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}
