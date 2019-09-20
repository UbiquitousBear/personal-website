import ContainerInterface from './containerInterface'
import ContainerError from './error/ContainerError'
import NotFoundError from './error/NotFoundError'

class Container implements ContainerInterface {
    private instanceCallableCollection: { [key: string]: (c: ContainerInterface) => any } = {}
    private instanceCacheCollection: { [key: string]: any } = {}

    public get<T>(id: string): T {
        if (!this.has(id)){
            throw new NotFoundError(`ID not found in container ${id}`)
        }

        if (this.instanceCacheCollection.hasOwnProperty(id)){
            return this.instanceCacheCollection[id] as T
        }

        this.instanceCacheCollection[id] = this.instanceCallableCollection[id](this) as T

        return this.instanceCacheCollection[id]
    }

    public has(id: string): boolean {
        return this.instanceCallableCollection.hasOwnProperty(id)
    }

    public set<T>(id: string, callable: (c: ContainerInterface) => T): void {
        this.validateNotEmpty(id)
        this.validateIdIsNotAlreadyAnInstance(id)
        this.instanceCallableCollection[id] = callable
    }

    private validateNotEmpty(id: string): void {
        if (!id || id === '') {
            throw new ContainerError('Cannot supply an empty ID')
        }
    }

    private validateIdIsNotAlreadyAnInstance(id: string): void {
        if (this.instanceCacheCollection.hasOwnProperty(id)) {
            throw new ContainerError(`ID ${id} already set`)
        }
    }
    
}

export default Container