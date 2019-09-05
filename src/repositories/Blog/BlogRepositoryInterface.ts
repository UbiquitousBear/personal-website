import BlogItem from '../../entities/BlogItem';

interface BlogRepositoryInterface {
    fetchItemList(): Promise<BlogItem[]>;
    fetchItemContent(item: BlogItem): Promise<string>;
}

export default BlogRepositoryInterface;