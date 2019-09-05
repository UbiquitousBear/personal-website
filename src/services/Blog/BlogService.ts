import dompurify from 'dompurify'
import * as marked from 'marked' 
import BlogItem from '../../entities/BlogItem'
import BlogRepositoryInterface from '../../repositories/Blog/BlogRepositoryInterface'

class BlogService {
    
    constructor(
        private repository: BlogRepositoryInterface
    ) {}

    public async newestItems(numberItemsToReturn: 3): Promise<BlogItem[]> {
        return this.repository.fetchItemList()
        .then((items: BlogItem[]) => items.sort(this.sortByDatePublished))
        .then((items: BlogItem[]) => items.splice(0, numberItemsToReturn))
    }

    public async renderBlogToHtml(item: BlogItem): Promise<string> {
        return this.repository.fetchItemContent(item)
        .then((content: string) => marked(content))
        .then((content: string) => dompurify.sanitize(content, {}))
    }

    public async findByUri(uri: string): Promise<BlogItem[]> {
        return this.repository.fetchItemList()
        .then((items: BlogItem[]) => items.filter((item: BlogItem) => item.uri === uri))
    }

    private sortByDatePublished(a: BlogItem, b: BlogItem): number {
        const dateA = new Date(a.publishDate);
        const dateB = new Date(b.publishDate);
        return (dateA > dateB) ? - 1 
        : (dateA < dateB) ? 1 
        : 0;
    }
}

export default BlogService;