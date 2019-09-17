import ContainerInterface from './containerInterface'
import ContainerError from './error/ContainerError'
import NotFoundError from './error/NotFoundError'

class Container implements ContainerInterface {
    private entityCallableCollection: { [key: string]: any } = {}
    private entityInstanceCollection: { [key: string]: CallableFunction } = {}

    public get(id: string): any {
        if (!this.has(id)){
            throw new NotFoundError(`ID not found in container ${id}`)
        }

        if (this.entityInstanceCollection.hasOwnProperty(id)){
            return this.entityInstanceCollection[id]
        }

        this.entityInstanceCollection[id] = this.entityCallableCollection[id](this)

        return this.entityInstanceCollection[id]
    }

    public has(id: string): boolean {
        return this.entityCallableCollection.hasOwnProperty(id)
    }

    public set(id: string, callable: CallableFunction): void {
        this.validateNotEmpty(id)
        this.validateIdIsNotAlreadyAnInstance(id)
        this.entityCallableCollection[id] = callable
    }

    private validateNotEmpty(id: string): void {
        if (!id || id === '') {
            throw new ContainerError('Cannot supply an empty ID')
        }
    }

    private validateIdIsNotAlreadyAnInstance(id: string): void {
        if (this.entityInstanceCollection.hasOwnProperty(id)) {
            throw new ContainerError(`ID ${id} already set`)
        }
    }
}

export default Container