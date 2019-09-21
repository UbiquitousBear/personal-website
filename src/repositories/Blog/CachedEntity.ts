import BlogItem from '../../entities/BlogItem'
import BlogRepositoryInterface from './BlogRepositoryInterface'

class CachedEntity implements BlogRepositoryInterface {
    private cachedItemList: BlogItem[] = []
    private cachedItemContent: { [key: string]: string } = {}

    constructor(
        private readonly repository: BlogRepositoryInterface 
    ) {}

    public async fetchItemList(): Promise<BlogItem[]> {
        if (this.cachedItemList.length === 0) {
            this.cachedItemList = await this.repository.fetchItemList()
        }

        return new Promise(resolve => resolve([...this.cachedItemList]))
    }

    public async fetchItemContent(item: BlogItem): Promise<string> {
        
        if (!this.cachedItemContent.hasOwnProperty(item.uri)){
            this.cachedItemContent[item.uri] = await this.repository.fetchItemContent(item)
        }

        return new Promise(resolve => resolve(this.cachedItemContent[item.uri]))
    }
}

export default CachedEntity