import { ComponentClass } from 'preact'
import Container from '../dependencyInjection/container'
import ContainerInterface from '../dependencyInjection/containerInterface'
import WrappedComponent from '../dependencyInjection/wrappedComponent'
import BlogRepositoryInterface from '../repositories/Blog/BlogRepositoryInterface'
import HttpApi from '../repositories/Blog/HttpApi'
import Blog from '../routes/blog'
import BlogPost, { BlogPostProps } from '../routes/blogPost'
import Home, { HomeProps } from '../routes/home'
import BlogService from '../services/Blog/BlogService'
import BlogServiceInterface from '../services/Blog/BlogServiceInterface'
import HTMLSanitizer from '../services/Renderer/HTMLSanitizer'
import MarkdownCodeHighlight from '../services/Renderer/MarkdownCodeHighlight'
import { CONFIG_KEYS } from './AppConfig'

class AppContainer extends Container {

    public static readonly CONFIG = 'CONFIG'
    public static readonly BLOG_SERVICE = 'BLOG_SERVICE'
    public static readonly BLOG_REPOSITORY = 'BLOG_REPOSITORY'
    public static readonly HOME_COMPONENT = 'HOME_COMPONENT'
    public static readonly BLOG_COMPONENT = 'BLOG_COMPONENT'
    public static readonly BLOG_POST_COMPONENT = 'BLOG_POST_COMPONENT'
    public static readonly MARKDOWN_CODE_RENDERER = 'MARKDOWN_CODE_RENDERER'
    public static readonly HTML_SANITIZER_RENDERER = 'HTML_SANITIZER_RENDERER'


    constructor() {
        super()
        this.initConfig()
        this.initServices()
        this.initComponents()
    }

    private initConfig(): void {
        this.set(AppContainer.CONFIG, () => {
            const config: { [key: string]: string } = {}
            CONFIG_KEYS.forEach((value: string) => {
                // config[value] = '/content/blog' // TODO: fetch config from somewhere
                config[value] = 'http://localhost:8000/content/blog/' // TODO: fetch config from somewhere
            })

            return config
        })
    }

    private initServices(): void {
        this.set(AppContainer.HTML_SANITIZER_RENDERER, ((container: ContainerInterface): HTMLSanitizer => {
            return new HTMLSanitizer()
        }))

        this.set(AppContainer.MARKDOWN_CODE_RENDERER, ((container: ContainerInterface): MarkdownCodeHighlight => {
            return new MarkdownCodeHighlight(['markup-templating', 'java', 'javascript', 'typescript', 'php'])
        }))

        this.set(AppContainer.BLOG_REPOSITORY, ((container: ContainerInterface): BlogRepositoryInterface => {
            const config: { blog_repository_api: string } = container.get(AppContainer.CONFIG)
            return new HttpApi(config.blog_repository_api)
        }))
        
        this.set(AppContainer.BLOG_SERVICE, ((container: ContainerInterface): BlogServiceInterface => {
            return new BlogService(
                container.get(AppContainer.BLOG_REPOSITORY),
                [ 
                    container.get(AppContainer.MARKDOWN_CODE_RENDERER),
                    container.get(AppContainer.HTML_SANITIZER_RENDERER)
                ]
            )
        }))
    }

    private initComponents(): void {
        this.set(AppContainer.HOME_COMPONENT, ((container: ContainerInterface): ComponentClass => {
            const props: HomeProps = {
                dependencies: { blogService: container.get(AppContainer.BLOG_SERVICE) as BlogServiceInterface }
            }
            return WrappedComponent(props)(Home)
        }))

        this.set(AppContainer.BLOG_POST_COMPONENT, ((container: ContainerInterface): ComponentClass => {
            const props: BlogPostProps = {
                dependencies: { blogService: container.get(AppContainer.BLOG_SERVICE) }
            }
            return WrappedComponent(props)(BlogPost)
        }))

        this.set(AppContainer.BLOG_COMPONENT, ((container: ContainerInterface): ComponentClass => {
            const props: HomeProps = {
                dependencies: { blogService: container.get(AppContainer.BLOG_SERVICE) as BlogServiceInterface }
            }
            return WrappedComponent(props)(Blog)
        }))
    }
}

export default AppContainer
