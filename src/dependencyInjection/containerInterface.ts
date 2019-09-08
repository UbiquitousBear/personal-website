interface ContainerInterface {
    get(id: string): any
    has(id: string): boolean
    set(id: string, callable: CallableFunction): void
}

export default ContainerInterface