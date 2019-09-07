import { faCalendar, faClock } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Component, h } from 'preact';
import { Container } from 'reactstrap'
import BlogItem from '../../entities/BlogItem';
import BlogServiceInterface from '../../services/Blog/BlogServiceInterface';
import * as style from './style.css'

interface BlogProps {
    matches?: { uri: string }, 
    dependencies?: { blogService: BlogServiceInterface }
}

class Blog extends Component<BlogProps> {

    public state = { blogItemContent: null, blogItem: null }
    private readonly blogService: BlogServiceInterface;
    private readonly uri: string;

	constructor(props: BlogProps) {
        super(props);
        this.uri = props.matches!.uri;
		this.blogService = props.dependencies!.blogService;
    }
    
    public componentDidMount() {
		this.getFirstBlogItemContent(this.uri);
	}

    public render({}: BlogProps, { blogItemContent , blogItem }) {
        if (blogItem) {
            return this.renderBlogContent(blogItem, blogItemContent)
        } 

        return this.renderBlogItemNotFound();
    }

    private renderBlogContent(blogItem: BlogItem, blogItemContent: string) {
        return(
            <div>
                <div class={style.postHeading}>
                    <Container>
                        <h1>{ blogItem.title }</h1>
                        <p className="lead">{ blogItem.summary }</p>
                        <p>
                            <small>
                                { this.buildPublishDate(blogItem) }
                                { this.buildReadingTime(blogItem) }
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
        );
    }

    private renderBlogItemNotFound() {
        return (
            <div class={style.container}>
                <h1>Post Not Found!</h1>
            </div>
        );
    }

    private getFirstBlogItemContent(uri: string) {
        this.blogService.findByUri(uri)
        .then((items: BlogItem[]): BlogItem => items[0] || null)
        .then((item: BlogItem) => {
            if (item !== null) {
                return this.blogService.renderBlogToHtml(item)
                .then((content: string) => this.setState({ blogItemContent: content, blogItem: item }))
            }
        })
        .catch((error) => console.log(error))
    }
    
    private formatDateString(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-GB", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }
    
    private buildPublishDate(blogItem: BlogItem) {
        return (
            <div>
                <FontAwesomeIcon icon={ faCalendar } /> { this.formatDateString(blogItem.publishDate) }
            </div>
        );
    }

    private buildReadingTime(blogItem: BlogItem) {
        return (
            <div>
                <FontAwesomeIcon icon={ faClock } /> 5 minutes
            </div>
        );
    }
}

export default Blog;
export { BlogProps }