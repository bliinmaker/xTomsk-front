import { Footer } from '../footer/Footer'
import {NavBar} from '../navBar/NavBar'

export const Layout = props => {
	return (
		<>
			<NavBar />
			{props.children}
			<Footer />
		</>
	)
}