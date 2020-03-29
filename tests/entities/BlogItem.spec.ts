import BlogContent from '../../src/entities/BlogContent'
import BlogIcon from '../../src/entities/BlogIcon'
import BlogItem from '../../src/entities/BlogItem'
import BlogTag from '../../src/entities/BlogTag'

describe('BlogItem entity', () => {
    it('constructs and exposes its properties', () => {
        // Arrange
        const title = 'Foo'
        const publishDate = new Date
        const summary = 'foo-summary'
        const uri = 'bar/baz'
        const content = new BlogContent('path', 'ContentType/foo')
        const tags = [ new BlogTag('foo') ]
        const icon = new BlogIcon('foo')

        // Act
        const entity = new BlogItem(title, publishDate, summary, uri, tags, content, icon)

        // Assert
        expect(entity.title).toBe(title)
        expect(entity.publishDate).toBe(publishDate)
        expect(entity.summary).toBe(summary)
        expect(entity.uri).toBe(uri)
        expect(entity.tags).toBe(tags)
        expect(entity.content).toBe(content)
        expect(entity.icon).toBe(icon)
    })
})
