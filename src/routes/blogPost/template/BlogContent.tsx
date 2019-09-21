import { h } from 'preact'
import { Badge, Container } from 'reactstrap'
import BlogItem from '../../../entities/BlogItem'
import * as style from '../style.css'

const BlogContent = (blogItem: BlogItem, blogItemContent: string) => (
    <div>
        <Container>
            <div class={style.postHeading}>
                <h1>{ blogItem.title }</h1>
                <p><h4>{ blogItem.tags.map(tag => (
                    <Badge color="primary">{ tag.name }</Badge>
                )) }</h4></p>
            </div>
        </Container>
        <div class={style.postContent}>
            <Container>
                <div dangerouslySetInnerHTML={{ __html: blogItemContent }} />
            </Container>
        </div>
    </div>
)

export { BlogContent }