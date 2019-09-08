import { Component, h } from 'preact'
import { Col, Container, Row } from 'reactstrap'
import BlogItem from '../../entities/BlogItem'
import BlogServiceInterface from '../../services/Blog/BlogServiceInterface'
import * as style from './style.css'

interface BlogProps {
	dependencies?: { 
		blogService: BlogServiceInterface
	}
}

class Blog extends Component<BlogProps> {
    
    public state = { blogItems: [] }
    private readonly blogService: BlogServiceInterface

    constructor(props: BlogProps) {
        super(props)
		this.blogService = props.dependencies!.blogService
    }

    public componentDidMount() {
		this.getBlogItems()
	}

    public render({}: BlogProps, { blogItems }) {
        return (
            <div>
                <div class={ style.pageHeader }>
                    <Container>
                        <h1>Blog Posts</h1>
                        <p class="lead">My thoughts, theories and ramblings</p>
                    </Container>
                </div>
                <div class={ style.pageContent }>
                    <Container>
                        { blogItems.map((blogItem: BlogItem) => (
                            <Row>
                                <Col xs="12"><h5><a href={ this.buildBlogUrl(blogItem) }>{ blogItem.title }</a></h5></Col>
                                <Col xs="12"><p>{ blogItem.summary }</p></Col>
                                <Col xs="12"><hr /></Col>
                            </Row>
                        )) }
                    </Container>
                </div>
            </div>
        )
    }
    
    private getBlogItems() {
		this.blogService.newestItems(3)
		.then((blogItems: BlogItem[]) => this.setState({ blogItems }))
	}

	private buildBlogUrl(blogItem: BlogItem): string {
		return '/blog/' + blogItem.uri 
	}
}

export default Blog
