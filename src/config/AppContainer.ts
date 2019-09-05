import { Component } from 'preact';
import Container from '../dependencyInjection/container';
import ContainerInterface from '../dependencyInjection/containerInterface';
import WrappedComponent from '../dependencyInjection/wrappedComponent';
import BlogRepositoryInterface from '../repositories/Blog/BlogRepositoryInterface';
import HttpApi from '../repositories/Blog/HttpApi';
import Blog from '../routes/blog';
import Home from '../routes/home';
import BlogService from '../services/Blog/BlogService';
import BlogServiceInterface from '../services/Blog/BlogServiceInterface';
import { CONFIG_KEYS } from './AppConfig'

class AppContainer extends Container {

    public static readonly CONFIG = 'CONFIG';
    public static readonly BLOG_SERVICE = 'BLOG_SERVICE';
    public static readonly BLOG_REPOSITORY = 'BLOG_REPOSITORY';
    public static readonly HOME_COMPONENT = 'HOME_COMPONENT';
    public static readonly BLOG_COMPONENT = 'BLOG_COMPONENT';

    constructor() {
        super();
        this.initConfig();
        this.initServices();
        this.initComponents();
    }

    private initConfig(): void {
        this.set(AppContainer.CONFIG, () => {
            const config: { [key: string]: string } = {};
            CONFIG_KEYS.forEach((value: string) => {
                config[value] = 'http://localhost:8000/content/blog' // TODO: fetch config from somewhere
            })

            return config;
        })
    }

    private initServices(): void {
        this.set(AppContainer.BLOG_REPOSITORY, ((container: ContainerInterface): BlogRepositoryInterface => {
            const config: { blog_repository_api: string } = container.get(AppContainer.CONFIG)
            return new HttpApi(config.blog_repository_api)
        }))
        
        this.set(AppContainer.BLOG_SERVICE, ((container: ContainerInterface): BlogServiceInterface => {
            return new BlogService(container.get(AppContainer.BLOG_REPOSITORY))
        }))
    }

    private initComponents(): void {
        this.set(AppContainer.HOME_COMPONENT, ((container: ContainerInterface): Component => {
            return WrappedComponent(Home, { blogService: container.get(AppContainer.BLOG_SERVICE) })
        }))

        this.set(AppContainer.BLOG_COMPONENT, ((container: ContainerInterface): Component => {
            return WrappedComponent(Blog, { blogService: container.get(AppContainer.BLOG_SERVICE) })
        }))
    }
}

export default AppContainer;
