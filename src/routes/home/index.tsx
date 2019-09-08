import { Component, h } from 'preact'
import { Col, Container, Row } from 'reactstrap'
import BlogItem from '../../entities/BlogItem'
import BlogServiceInterface from '../../services/Blog/BlogServiceInterface'
import * as style from './style.css'

interface HomeProps {
	dependencies?: { 
		blogService: BlogServiceInterface
	}
}

class Home extends Component<HomeProps> {

	public state = { blogItems: [] }
	private readonly blogService: BlogServiceInterface

	constructor(props: HomeProps) {
		super(props)
		this.blogService = props.dependencies!.blogService
	}

	public componentDidMount() {
		this.getBlogItems()
	}

	public render({}: HomeProps, { blogItems }) {
		return (
			<div className={ style.home }>
				<Container>
					<Row>
						<Col xs="10">
							<h1>Hi, I'm Shamil.</h1>
							<p className="lead">I'm a London-based software engineer, currently working as a Production Engineer.</p>
						</Col>
						<Col xs="2">
							<img src="https://shamil.co.uk/assets/img/qEGeFOOE_200x200.jpg" alt="Shamil's Photo" className={ style.profileImg } />
						</Col>
					</Row>
					<Row>
						<Col sm="6">
						<p>
						I'm a engineer: both in site reliability and software. I believe in abstracting ideas to see what works best for each situation. Putting my ScrumMaster hat on, no team
						is ever the same, and I am focused on helping teams produce maximum value. When it comes to engineering challenges, I always defer to my experience as an engineer but also rely on my operational knowledge to complement solutions.
						</p>
						<p>
						In my spare time I write web and service applications as well as entertain deep discussions about software patterns
						and architures - a <a href="http://www.amazon.co.uk/dp/0321127420">book</a> by Martin Fowler is always within reach!
						</p>
						<p>
						I'm a maintainer of an IRC bot residing on multiple <abbr title="Internet Relay Chat">IRC</abbr> networks,
						providing fun and utility functionalities
						and have released a few <a href="https://github.com/theTeddyBear/textual-whisper">themes</a> for the Textual IRC client on OS X.
						Most of my projects are private, as I tend to write for specific things in mind, but I sometimes release my code on <a href="https://github.com/UbiquitousBear/">GitHub</a>.
						</p>
						<p>
						Beside software engineering, I'm also heavily involved in infrastructure and operations. Yes, I have fun setting up kubernetes clusters and administering them. This website is hosted on a personal k8s cluster, with namespaces separating projects. I follow a full SDLC from issue tracking to deployment using CI and CD pipelines.
						</p>
						<p>
						In my spare time, I'm learning functional programming with Scala simply because I recognise that the different paradigms
						enable for a unique advantages.. but it always forces me to think in a completely new way.
						</p>
						<p>
						Stepping away from the computer, I am learning new (human) languages, enjoy reading and weight lifting.
						</p>
						<p>
						I also love flying? I have a pilot's license and I've always said that my office is in the sky!
						</p>
						</Col>
						<Col sm="6">
						{ blogItems.map((blogItem: BlogItem) => (
							<Row sm="6">
								<h5><a href={ this.buildBlogUrl(blogItem) }>{ blogItem.title }</a></h5>
								<p>{ blogItem.summary }</p>
							</Row>
						)) }
						</Col>
					</Row>
				</Container>
			</div>
		)
	}

	private getBlogItems() {
		this.blogService.newestItems(3)
		.then((blogItems: BlogItem[]) => this.setState({ blogItems }))
	}

	private buildBlogUrl (blogItem: BlogItem): string {
		return '/blog/' + blogItem.uri 
	}
}

export default Home
export { HomeProps }

