 
import BlogItem from '../../entities/BlogItem'
import BlogRepositoryInterface from '../../repositories/Blog/BlogRepositoryInterface'
import RendererInterface from '../Renderer/RendererInterface';

class BlogService {
    
    constructor(
        private repository: BlogRepositoryInterface,
        private blogRenderers: RendererInterface[]
    ) {}

    public async newestItems(numberItemsToReturn: 3): Promise<BlogItem[]> {
        return this.repository.fetchItemList()
        .then((items: BlogItem[]) => items.sort(this.sortByDatePublished))
        .then((items: BlogItem[]) => items.splice(0, numberItemsToReturn))
    }

    public async renderBlogToHtml(item: BlogItem): Promise<string> {
        return this.repository.fetchItemContent(item)
        .then((content: string) => this.blogRenderers.reduce(
            (currentContent: string, renderer: RendererInterface, _, []): string => renderer.render(currentContent), content
        ))
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