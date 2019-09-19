interface ContainerInterface {
    get<T>(id: string): T
    has(id: string): boolean
    set(id: string, callable: CallableFunction): void
}

export default ContainerInterface