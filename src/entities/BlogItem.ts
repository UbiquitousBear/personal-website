import BlogContent from './BlogContent'
import BlogIcon from './BlogIcon'
import BlogTag from './BlogTag'

class BlogItem {

    constructor(
        readonly title: string,
        readonly publishDate: Date,
        readonly summary: string,
        readonly uri: string,
        readonly tags: BlogTag[],
        readonly content: BlogContent,
        readonly icon: BlogIcon
    ) {}

}

export default BlogItem
