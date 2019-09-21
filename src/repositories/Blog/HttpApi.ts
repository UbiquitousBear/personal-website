import BlogItem from '../../entities/BlogItem'
import BlogRepositoryInterface from './BlogRepositoryInterface'

class HttpApi implements BlogRepositoryInterface {
    constructor(
        private readonly baseUrl: string
    ) {}

    public async fetchItemList(): Promise<BlogItem[]> {
        const response = await fetch(`${this.baseUrl}/index.json`)
        if (!response.ok) {
            throw new RepositoryError(response)
        }
        return await response.json()
    }

    public async fetchItemContent(item: BlogItem): Promise<string> {
        const response = await fetch(`${this.baseUrl}${item.content.path}`)
        return await response.text()
    }
}

export default HttpApi
