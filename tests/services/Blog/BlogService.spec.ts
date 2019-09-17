import BlogItem from '../../../src/entities/BlogItem'
import BlogRepositoryInterface from '../../../src/repositories/Blog/BlogRepositoryInterface'
import BlogService from '../../../src/services/Blog/BlogService'
import RendererInterface from '../../../src/services/Renderer/RendererInterface'

describe('BlogService', () => {
    it('fetches all blog items', async () => {
        // Arrange
        const blogItems: BlogItem[] = [ jest.mock('../../../src/entities/BlogItem') as unknown as BlogItem ]

        const repository = jest.fn<BlogRepositoryInterface, []>(() => ({
            fetchItemList: (): Promise<BlogItem[]> => new Promise(resolve => resolve(blogItems)),
            fetchItemContent: (): Promise<string> => new Promise((_, reject) => reject('Not Implemented'))
        }))

        const service = new BlogService(new repository, [])

        // Act / Assert
        expect.assertions(1)
        await expect(service.newestItems(3)).resolves.toEqual([ jest.mock('../../../src/entities/BlogItem') as unknown as BlogItem ])
    })

    it('fetches the blog content', async () => {
        // Arrange
        const blogItem = jest.mock('../../../src/entities/BlogItem') as unknown as BlogItem 

        const repository = jest.fn<BlogRepositoryInterface, []>(() => ({
            fetchItemList: (): Promise<BlogItem[]> => new Promise((_, reject) => reject('Not Implemented')),
            fetchItemContent: (): Promise<string> => new Promise(resolve => resolve('foo'))
        }))

        const service = new BlogService(new repository, [])

        // Act / Assert
        expect.assertions(1)
        await expect(service.renderBlogToHtml(blogItem)).resolves.toEqual('foo')
    })

    it('returns a BlogItem when found by URL', async () => {
        // Arrange
        const blogItem: BlogItem = jest.mock('../../../src/entities/BlogItem') as unknown as BlogItem

        const repository = jest.fn<BlogRepositoryInterface, []>(() => ({
            fetchItemList: (): Promise<BlogItem[]> => new Promise(resolve => resolve([ blogItem])),
            fetchItemContent: (): Promise<string> => new Promise((_, reject) => reject('Not Implemented'))
        }))

        const service = new BlogService(new repository, [])

        // Act / Assert
        expect.assertions(1)
        await expect(service.findByUri(blogItem.uri)).resolves.toEqual([ blogItem ])
    })

    it('renders a BlogItem to HTML', () => {
        // Arrange
        const blogItem: BlogItem = jest.mock('../../../src/entities/BlogItem') as unknown as BlogItem
        const mockContent = 'foo'

        const repository = jest.fn<BlogRepositoryInterface, []>(() => ({
            fetchItemList: (): Promise<BlogItem[]> => new Promise((_, reject) => reject('Not Implemented')),
            fetchItemContent: (): Promise<string> => new Promise(resolve => resolve(mockContent))
        }))

        const renderer = jest.fn<RendererInterface, []>(() => ({
            render: (content: string) => content
        }))

        const service = new BlogService(new repository, [ new renderer ])

        // Act / Assert
        expect(service.renderBlogToHtml(blogItem)).resolves.toEqual(mockContent)
    })
})