import BlogItem from '../../entities/BlogItem'

interface BlogServiceInterface {
    newestItems(numberItemsToReturn: number): Promise<BlogItem[]>
    renderBlogToHtml(item: BlogItem): Promise<string>
    findByUri(uri: string): Promise<BlogItem[]>
}

export default BlogServiceInterface
