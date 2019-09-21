import BlogTag from '../../src/entities/BlogTag'

describe('BlogTag entity', () => {
    it('constructs and exposes its properties', () => {
        // Arrange
        const name = 'foo'

        // Act
        const entity = new BlogTag(name)

        // Assert
        expect(entity.name).toBe(name)
    })
})