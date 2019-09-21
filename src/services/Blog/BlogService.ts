 
import BlogItem from '../../entities/BlogItem'
import BlogRepositoryInterface from '../../repositories/Blog/BlogRepositoryInterface'
import RendererInterface from '../Renderer/RendererInterface'
import BlogServiceInterface from './BlogServiceInterface'

class BlogService implements BlogServiceInterface {
    
    constructor(
        private readonly repository: BlogRepositoryInterface,
        private readonly blogRenderers: RendererInterface[]
    ) {}

    public async newestItems(numberItemsToReturn: number = 3): Promise<BlogItem[]> {
        return this.repository.fetchItemList()
            .then((items: BlogItem[]) => items.sort(this.sortByDatePublished))
            .then((items: BlogItem[]) => items.splice(0, numberItemsToReturn))
    }

    public async renderBlogToHtml(item: BlogItem): Promise<string> {
        return this.repository.fetchItemContent(item)
            .then((content: string) => this.blogRenderers.reduce(
                (currentContent: string, renderer: RendererInterface, _, []): string =>
                    renderer.render(currentContent), content
            ))
    }

    public async findByUri(uri: string): Promise<BlogItem[]> {
        return this.repository.fetchItemList()
            .then((items: BlogItem[]) => items.filter((item: BlogItem) => item.uri === uri))
    }

    private sortByDatePublished(a: BlogItem, b: BlogItem): number {
        return (a.publishDate > b.publishDate) ? - 1 
            : (a.publishDate < b.publishDate) ? 1 
            : 0
    }
}

export default BlogService
