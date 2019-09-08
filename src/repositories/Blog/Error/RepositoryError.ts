class RepositoryError extends Error {
    constructor(
        public response: Response
    )
    {
        super()
    }
}