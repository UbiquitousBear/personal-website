import BlogItem from '../../entities/BlogItem'

interface BlogServiceInterface {
    newestItems(numberItemsToReturn: 3): Promise<BlogItem[]>
    renderBlogToHtml(item: BlogItem): Promise<string>
    findByUri(uri: string): Promise<BlogItem[]>
}

export default BlogServiceInterface
