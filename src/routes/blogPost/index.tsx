import { faCalendar, faClock } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Component, h } from 'preact'
import { Container } from 'reactstrap'
import BlogItem from '../../entities/BlogItem'
import BlogServiceInterface from '../../services/Blog/BlogServiceInterface'
import * as style from './style.css'

interface BlogPostProps {
    matches?: { uri: string }, 
    dependencies?: { blogService: BlogServiceInterface }
}

class BlogPost extends Component<BlogPostProps> {

    public state = { blogItemContent: null, blogItem: null, notFound: false }
    private readonly blogService: BlogServiceInterface
    private readonly uri: string

	constructor(props: BlogPostProps) {
        super(props)
        this.uri = props.matches!.uri
		this.blogService = props.dependencies!.blogService
    }
    
    public componentDidMount() {
		this.getFirstBlogItemContent(this.uri)
	}

    public render({}: BlogPostProps, { blogItemContent , blogItem }) {
        if (blogItem) {
            return this.renderBlogContent(blogItem, blogItemContent)
        } 

        if (this.state.notFound) {
            return this.renderBlogItemNotFound()
        }

        return(<div/>)
    }

    private renderBlogContent(blogItem: BlogItem, blogItemContent: string) {
        return(
            <div>
                <div class={style.postHeading}>
                    <Container>
                        <h1>{ blogItem.title }</h1>
                        <p>
                            <small>
                                { this.buildMetadata(blogItem) }
                            </small>
                        </p>
                    </Container>
                </div>
                <div class={style.postContent}>
                    <Container>
                        <div dangerouslySetInnerHTML={{ __html: blogItemContent }} />
                    </Container>
                </div>
            </div>
        )
    }

    private renderBlogItemNotFound() {
        return (
            <div class={style.container}>
                <h1>Post Not Found!</h1>
            </div>
        )
    }

    private getFirstBlogItemContent(uri: string) {
        this.blogService.findByUri(uri)
        .then((items: BlogItem[]): BlogItem => items[0] || null)
        .then((item: BlogItem) => {
            if (item === null) {
                this.setBlogItemNotFound()
                return
            }

            document.title = item.title
            return this.blogService.renderBlogToHtml(item)
            .then((content: string) => this.setState({ blogItemContent: content, blogItem: item }))
        })
        .catch((error: Error) => this.setBlogItemNotFound())
    }
    
    private formatDateString(dateString: string): string {
		const date = new Date(dateString)
		return date.toLocaleDateString("en-GB", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    }
    
    private buildMetadata(blogItem: BlogItem) {
        return (
            <div>
                <span class="text-muted">
                    <FontAwesomeIcon icon={ faCalendar } /> { this.formatDateString(blogItem.publishDate) } <FontAwesomeIcon icon={ faClock } /> 5 minutes
                </span>
            </div>
        )
    }

    private setBlogItemNotFound(): void {
        this.setState({ notFound: true })
    }
}

export default BlogPost
export { BlogPostProps }