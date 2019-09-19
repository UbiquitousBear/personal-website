import Container from '../../src/dependencyInjection/container'
import ContainerInterface from '../../src/dependencyInjection/containerInterface'
import ContainerError from '../../src/dependencyInjection/error/ContainerError'
import NotFoundError from '../../src/dependencyInjection/error/NotFoundError'

const container = new Container()

describe('Container', () => {

    it('exposes the presence of an entity after setting', () => {
        // Arrange
        const id = 'date.yesterday'
        const callable = () => {}

        // Act
        container.set(id, callable)

        // Assert
        const hasId = container.has(id)
        expect(hasId).toBe(true)
    })

    it('exposes the lack of an entity which has not been set', () => {
        // Arrange
        const id = 'foo.bar'

        // Act
        const hasId = container.has(id)

        // Assert
        expect(hasId).toBe(false)
    })

    it('exposes an entity after setting', () => {
        // Arrange
        const id = 'date.yesterday'
        const date = new Date
        const callable = () => date

        // Act
        container.set(id, callable)

        // Assert
        const hasId = container.get(id)
        expect(hasId).toMatchObject(date)
    })

    it('throws an exception when getting an id which does not exist', () => {
        // Arrange
        const id = 'foo.bar'

        // Act / Assert
        const error = new NotFoundError(`ID not found in container ${id}`)
        expect(() => container.get(id)).toThrow(error)
    })

    it('throws an exception if the id is empty when setting', () => {
        // Arrange
        const id = ''
        const callable = () => {}

        // Act / Assert
        const error = new ContainerError('Cannot supply an empty ID')
        expect(() => container.set(id, callable)).toThrow(error)
    })

    it('exposes the same instance after multiple gets', () => {
        // Arrange
        const id = 'fooobj.bar'
        const testObject = { foo: 'bar' }
        const callable = () => testObject

        // Act
        container.set(id, callable)

        // Assert
        const hasId = container.get(id)
        expect(hasId).toMatchObject(testObject)
        expect(hasId).toMatchObject(testObject)
    })

    it('throws an exception if the id is already set', () => {
        // Arrange
        const id = 'fooobj.bar'
        const testObject = { foo: 'bar' }
        const callable = () => testObject

        // Act / Assert
        const error = new ContainerError(`ID ${id} already set`)
        expect(() => container.set(id, callable)).toThrow(error)
    })

    it('passes the container into the callable', () => {
        // Arrange
        const collaboratorId = 'collaborator.test.value'
        const collaboratorCallable = () => 'bar'
        container.set(collaboratorId, collaboratorCallable)

        const dependentId = 'service.foo.bar'
        const dependentCallable = (c: ContainerInterface) => ({ 'injected_collaborator_test_value': c.get(collaboratorId) })
        container.set(dependentId, dependentCallable)

        // Act
        const dependentInstance = container.get(dependentId)

        // Assert
        expect(dependentInstance).toHaveProperty('injected_collaborator_test_value', 'bar')
    })
})
