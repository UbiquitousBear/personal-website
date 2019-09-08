import { Component, h } from 'preact'
import { Route, Router, RouterOnChangeArgs } from 'preact-router'
import AppContainer from '../config/AppContainer'
import CurriculumVitae from '../routes/curriculum-vitae'
import Footer from './footer'
import Header from './header'

const container = new AppContainer()
const Home = container.get(AppContainer.HOME_COMPONENT)
const BlogPost = container.get(AppContainer.BLOG_POST_COMPONENT)
const Blog = container.get(AppContainer.BLOG_COMPONENT)

export default class App extends Component {	
	private currentUrl ?: string

	public handleRoute = (e: RouterOnChangeArgs) => this.currentUrl = e.url

	public render() {
		return (
			<div id="app">
				<Header />
				<Router onChange={this.handleRoute}>
					<Route path="/" component={Home} />
					<Route path="/blog/" component={Blog} />
					<Route path="/blog/:uri" component={BlogPost} />
					<Route path="/profile/" component={CurriculumVitae} user="me" />
					<Route path="/profile/:user" component={CurriculumVitae} />
				</Router>
				<Footer />
			</div>
		)
	}
}
