import ContainerInterface from './containerInterface'

class Container implements ContainerInterface {
    private entityCallableCollection: { [key: string]: any } = {}
    private entityInstanceCollection: { [key: string]: CallableFunction } = {}

    public get(id: string): any {
        if (!this.has(id)){
            return null // TODO: throw exception
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
            return // TODO: throw exception
        }
    }

    private validateIdIsNotAlreadyAnInstance(id: string): void {
        if (this.entityInstanceCollection.hasOwnProperty(id)) {
            return // TODO: throw exception
        }
    }
}

export default Container