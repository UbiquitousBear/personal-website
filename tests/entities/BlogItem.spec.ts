import BlogContent from '../../src/entities/BlogContent'
import BlogItem from '../../src/entities/BlogItem'

describe('BlogItem entity', () => {
    it('constructs and exposes its properties', () => {
        // Arrange
        const title = 'Foo'
        const publishDate = (new Date).toUTCString()
        const summary = 'foo-summary'
        const uri = 'bar/baz'
        const content = new BlogContent('path', 'ContentType/foo')

        // Act
        const entity = new BlogItem(title, publishDate, summary, uri, content)

        // Assert
        expect(entity.title).toBe(title)
        expect(entity.publishDate).toBe(publishDate)
        expect(entity.summary).toBe(summary)
        expect(entity.uri).toBe(uri)
        expect(entity.content).toBe(content)
    })
})
