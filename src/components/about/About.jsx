import './About.scss'
import aboutImg from '../../assets/tg_image_4242443394.jpeg'

export const About = () => {
	return (
		<section id='about' className='py-4'>
			<div className='container'>
				<div className='title-wrap'>
					<span className='sm-title'>немного</span>
					<h2 className='lg-title'>О нас</h2>
				</div>

				<div className='about-row'>
					<div className='about-left my-2'>
						<img
							src={aboutImg}
							alt='about img'
						></img>
					</div>
					<div className='about-right'>
						<h2>Мы верим, что историю должен знать каждый</h2>
						<p className='text'>
							В современном мире, люди всё чаще думают о будущем и совсем не
							думают о прошлом. Чтобы исправить это, мы приняли решение создать
							удобный сайт, на котором каждый сможет прочитать про уникальный
							город Томск и в последствии посетить интересные, исторический
							места данного города.
						</p>
						<p className='text'></p>
					</div>
				</div>
			</div>
		</section>
	)
}
