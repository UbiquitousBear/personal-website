interface ContainerInterface {
    get<T>(id: string): T
    set<T>(id: string, callable: (c: ContainerInterface) => T): void
    has(id: string): boolean
}

export default ContainerInterface