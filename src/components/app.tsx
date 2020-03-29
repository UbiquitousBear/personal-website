import { Component, ComponentClass, h } from 'preact'
import { Route, Router, RouterOnChangeArgs } from 'preact-router'
import AppContainer from '../config/AppContainer'
import CurriculumVitae from '../routes/curriculum-vitae'
import Footer from './footer'
import Header from './header'

const container = new AppContainer()
const Home = container.get<ComponentClass>(AppContainer.HOME_COMPONENT)
const AboutMe = container.get<ComponentClass>(AppContainer.ABOUTME_COMPONENT)
const BlogPost = container.get<ComponentClass>(AppContainer.BLOG_POST_COMPONENT)
const Blog = container.get<ComponentClass>(AppContainer.BLOG_COMPONENT)

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
					<Route path="/me" component={AboutMe} />
				</Router>
				<Footer />
			</div>
		)
	}
}
