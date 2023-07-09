import fontawesome from '@fortawesome/fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './NavBar.scss'

fontawesome.library.add(faBars, faTimes)

export const NavBar = () => {
	const [isNavExpanded, setIsNavExpanded] = useState(false)


	return (<nav className="navigation">
		<Link to={`/`} className='navbar-site-brand'>
			Исторический<span>Томск</span>
		</Link>
		<button
			className="hamburger"
			onClick={() => {
				setIsNavExpanded(!isNavExpanded)
			}}
		>
			{isNavExpanded ? <FontAwesomeIcon icon="fa-solid fa-bars" />
				: <FontAwesomeIcon icon='fas fa-close' />}
		</button>
		<div
			className={
				isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
			}
		>
			<ul className='navbar-nav'>
				<li className='nav-item'>
					<Link to={`/`} className='nav-link'>
						Главная
					</Link>
				</li>
				<li className='nav-item'>
					<Link to={`/AllHistPlacesPage`} className='nav-link'>
						Исторические места
					</Link>
				</li>
				<li className='nav-item'>
					<Link to={`/about`} className='nav-link'>
						О нас
					</Link>
				</li>
			</ul>
		</div>
	</nav>)
}
