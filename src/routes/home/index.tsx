import { Component, h } from 'preact'
import { Badge, Button, Col, Container, Row } from 'reactstrap'
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
		document.title = 'Shamil Nunhuck - Site Reliability Engineer'
	}

	public render({}: HomeProps, { blogItems }) {
		return (
			<div className={ style.home }>
				<Container>
					<Row>
						<Col xs="12">
							<h1>Hi, I'm Shamil.</h1>
						</Col>
						<Col xs="10">
							<p className="lead">I'm a London-based Site Reliability Engineer with an interest in software architecture and distributed systems. Having worked in both devops and software engineering roles, I harness my experience to build and consult on reliable, scalable systems.</p>
						</Col>
						<Col xs="2">
							<img src="/assets/img/qEGeFOOE_200x200.jpg" alt="Shamil's Photo" className={ style.profileImg } height="200px" width="200px"/>
						</Col>
					</Row>
					<Row className={ style.contentRealm }>
						<Col sm="12">
							<h3>Latest Posts <Button color="light" href="/blog" size="sm">View All</Button></h3>
							{ blogItems.map((blogItem: BlogItem) => (
								<Button className={ style.postButton } block={true} href={ this.buildBlogUrl(blogItem) }>
									<img src={blogItem.icon.data} height="150" width="150" />
									{ blogItem.title }
									{ this.renderNewBadge(blogItem) }
								</Button>
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

	private renderNewBadge (blogItem: BlogItem) {
		const dateOneMonthAgo = new Date()
		dateOneMonthAgo.setMonth(dateOneMonthAgo.getMonth() - 1)
		
		if (new Date(blogItem.publishDate) > dateOneMonthAgo) {
			return (
				<Badge className={ style.badgeNew }>New!</Badge>
			)
		}

		return ''
	}
}

export default Home
export { HomeProps }

