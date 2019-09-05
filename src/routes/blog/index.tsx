import { Component, h } from 'preact';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import 'preact-material-components/LayoutGrid/style.css';
import Typography from 'preact-material-components/Typography';
import 'preact-material-components/Typography/style.css';
import BlogItem from '../../entities/BlogItem';
import BlogServiceInterface from '../../services/Blog/BlogServiceInterface';
import * as style from './style.css'

class Blog extends Component {

    public state = { blogItemContent: null, blogItem: null }
    private readonly blogService: BlogServiceInterface;
    private readonly uri: string;

	constructor(props: { dependencies: { blogService: BlogServiceInterface }, matches: { uri: string }}) {
        super(props);
        this.uri = props.matches.uri;
		this.blogService = props.dependencies.blogService;
    }
    
    public componentDidMount() {
		this.getFirstBlogItemContent(this.uri);
	}

    public render({}, { blogItemContent , blogItem }) {
        if (blogItem) {
            return this.renderBlogContent(blogItem, blogItemContent)
        } 

        return this.renderBlogItemNotFound();
    }

    private renderBlogContent(blogItem: BlogItem, blogItemContent: string) {
        return(
            <div>
                <LayoutGrid>
				    <LayoutGrid.Inner>
                        <LayoutGrid.Cell cols="12" class={style.postHeading}>
                            <div><Typography headline4={true}>{ blogItem.title }</Typography></div>
                            <div><Typography headline5={true}>{ blogItem.summary }</Typography></div>
                        </LayoutGrid.Cell>
				    </LayoutGrid.Inner>
			    </LayoutGrid>
                <LayoutGrid>
                    <LayoutGrid.Inner>
                        <LayoutGrid.Cell cols="12" class={style.postContent}>
                            <div dangerouslySetInnerHTML={{ __html: blogItemContent }} />
                        </LayoutGrid.Cell>
                    </LayoutGrid.Inner>
                </LayoutGrid>
            </div>
        );
    }

    private renderBlogItemNotFound() {
        return (
            <div class={style.container}>
                <LayoutGrid>
                    <LayoutGrid.Inner>
                        <LayoutGrid.Cell cols="12">
                            <div><Typography headline4={true}>Post Not Found!</Typography></div>
                        </LayoutGrid.Cell>
                    </LayoutGrid.Inner>
			    </LayoutGrid>
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
}

export default Blog;