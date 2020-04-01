import { Component, h } from 'preact'
import { Badge, Col, Container, Row } from 'reactstrap'
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
        document.title = 'Blog Posts'
        this.getBlogItems()
	}

    public render({}: BlogProps, { blogItems }) {
        return (
            <Container>
            <div>
                <div class={ style.pageHeader }>
                    <h1>Blog Posts</h1>
                    <p class="lead">My thoughts, theories and ramblings</p>
                </div>
                <div class={ style.pageContent }>
                    { blogItems.map((blogItem: BlogItem) => (
                        <Row key={blogItem.uri}>
                            <Col xs="12"><h5><a href={ this.buildBlogUrl(blogItem) }>{ blogItem.title }</a></h5></Col>
                            <Col xs="12">
                                <p>
                                    <div className={ style.tagContainer }>
                                    { blogItem.tags.map(tag => (
                                        <Badge color="light" size="xs" key={ tag.name }>{ tag.name }</Badge>
                                    )) }
                                    </div>
                                    { blogItem.summary }
                                </p>
                            </Col>
                        </Row>
                    )) }
                </div>
            </div>
            </Container>

        )
    }
    
    private getBlogItems() {
		this.blogService.newestItems(100)
		.then((blogItems: BlogItem[]) => this.setState({ blogItems }))
	}

	private buildBlogUrl(blogItem: BlogItem): string {
		return '/blog/' + blogItem.uri 
	}
}

export default Blog
