import BlogContent from '../../src/entities/BlogContent'

describe('BlogContent entity', () => {
    it('constructs and exposes its properties', () => {
        // Arrange
        const path = 'foo/bar'
        const contentType ='ContentType/foo'

        // Act
        const entity = new BlogContent(path, contentType)

        // Assert
        expect(entity.path).toBe(path)
        expect(entity.contentType).toBe(contentType)
    })
})
