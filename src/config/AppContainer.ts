import { ComponentClass } from 'preact'
import Container from '../dependencyInjection/container'
import ContainerInterface from '../dependencyInjection/containerInterface'
import WrappedComponent from '../dependencyInjection/wrappedComponent'
import BlogRepositoryInterface from '../repositories/Blog/BlogRepositoryInterface'
import CachedEntity from '../repositories/Blog/CachedEntity'
import HttpApi from '../repositories/Blog/HttpApi'
import AboutMe from '../routes/aboutMe'
import Blog from '../routes/blog'
import BlogPost, { BlogPostProps } from '../routes/blogPost'
import Home, { HomeProps } from '../routes/home'
import BlogService from '../services/Blog/BlogService'
import BlogServiceInterface from '../services/Blog/BlogServiceInterface'
import HTMLSanitizer from '../services/Renderer/HTMLSanitizer'
import MarkdownCodeHighlight from '../services/Renderer/MarkdownCodeHighlight'
import RendererInterface from '../services/Renderer/RendererInterface'
import { CONFIG_KEYS } from './AppConfig'

class AppContainer extends Container {

    public static readonly CONFIG = 'CONFIG'
    public static readonly BLOG_SERVICE = 'BLOG_SERVICE'
    public static readonly BLOG_HTTP_API_REPOSITORY = 'BLOG_HTTP_API_REPOSITORY'
    public static readonly BLOG_REPOSITORY = 'BLOG_REPOSITORY'
    public static readonly HOME_COMPONENT = 'HOME_COMPONENT'
    public static readonly BLOG_COMPONENT = 'BLOG_COMPONENT'
    public static readonly ABOUTME_COMPONENT = 'ABOUTME_COMPONENT'
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
        this.set<{ [key: string]: string }>(AppContainer.CONFIG, () => {
            const config: { [key: string]: string } = {}
            CONFIG_KEYS.forEach((value: string) => {
                // config[value] = '/content/blog' // TODO: fetch config from somewhere
                config[value] = 'http://localhost:8090/blog' // TODO: fetch config from somewhere
            })

            return config
        })
    }

    private initServices(): void {
        this.set<RendererInterface>(AppContainer.HTML_SANITIZER_RENDERER, ((): HTMLSanitizer => {
            return new HTMLSanitizer()
        }))

        this.set<RendererInterface>(AppContainer.MARKDOWN_CODE_RENDERER, ((): MarkdownCodeHighlight => {
            return new MarkdownCodeHighlight(['markup-templating', 'java', 'javascript', 'typescript', 'php'])
        }))

        this.set<BlogRepositoryInterface>(AppContainer.BLOG_REPOSITORY, ((c: ContainerInterface) => {
            return new CachedEntity(c.get<BlogRepositoryInterface>(AppContainer.BLOG_HTTP_API_REPOSITORY))
        }))

        this.set<BlogRepositoryInterface>(AppContainer.BLOG_HTTP_API_REPOSITORY, ((c: ContainerInterface): BlogRepositoryInterface => {
            const config: { BLOG_REPOSITORY_API: string } = c.get(AppContainer.CONFIG)
            return new HttpApi(config.BLOG_REPOSITORY_API)
        }))
        
        this.set<BlogServiceInterface>(AppContainer.BLOG_SERVICE, ((c: ContainerInterface): BlogServiceInterface => {
            return new BlogService(
                c.get(AppContainer.BLOG_REPOSITORY),
                [ 
                    c.get<RendererInterface>(AppContainer.MARKDOWN_CODE_RENDERER),
                    c.get<RendererInterface>(AppContainer.HTML_SANITIZER_RENDERER)
                ]
            )
        }))
    }

    private initComponents(): void {
        this.set<ComponentClass>(AppContainer.HOME_COMPONENT, ((c: ContainerInterface): ComponentClass => {
            const props: HomeProps = {
                dependencies: { blogService: c.get<BlogServiceInterface>(AppContainer.BLOG_SERVICE)}
            }
            return WrappedComponent(props)(Home)
        }))

        this.set<ComponentClass>(AppContainer.BLOG_POST_COMPONENT, ((c: ContainerInterface): ComponentClass => {
            const props: BlogPostProps = {
                dependencies: { blogService: c.get<BlogServiceInterface>(AppContainer.BLOG_SERVICE) }
            }
            return WrappedComponent(props)(BlogPost)
        }))

        this.set<ComponentClass>(AppContainer.BLOG_COMPONENT, ((c: ContainerInterface): ComponentClass => {
            const props: HomeProps = {
                dependencies: { blogService: c.get<BlogServiceInterface>(AppContainer.BLOG_SERVICE)}
            }
            return WrappedComponent(props)(Blog)
        }))

        this.set<ComponentClass>(AppContainer.ABOUTME_COMPONENT, ((c: ContainerInterface): ComponentClass => {
            return AboutMe 
        }))
    }
}

export default AppContainer
