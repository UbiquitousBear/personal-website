import { faCalendar, faClock } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Component, h } from 'preact'
import BlogItem from '../../entities/BlogItem'
import BlogServiceInterface from '../../services/Blog/BlogServiceInterface'
import * as template from './template'

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
    
    public componentWillMount() {
		this.getFirstBlogItemContent(this.uri)
	}

    public render({}: BlogPostProps, { blogItemContent, blogItem }) {
        if (blogItem && !this.state.notFound) { return template.BlogContent(blogItem, blogItemContent) } 
        if (this.state.notFound) { return template.NotFound }
        return(<div/>)
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
        .catch(() => this.setBlogItemNotFound())
    }
    
    private formatDateString(date: Date): string {
		return date.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
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