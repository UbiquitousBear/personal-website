import { Component, ComponentClass, ComponentType, h } from 'preact';

function WrappedComponent(props: object): <P extends object>(WrappedComponent: ComponentType<P>) => ComponentClass<P> {
    return <P extends object>(ComposedComponent: ComponentType<P>) =>
        class extends Component<P> {
            public render() {
                const constructedProps = { ...this.props, ...props };
                return (
                    <ComposedComponent { ...constructedProps } />
                );
            }
        }
}

export default WrappedComponent;