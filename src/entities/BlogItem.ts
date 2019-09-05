import BlogContent from "./BlogContent";

class BlogItem {

    constructor(
        readonly title: string,
        readonly publishDate: string,
        readonly summary: string,
        readonly uri: string,
        readonly content: BlogContent,
    ) {}

}

export default BlogItem
