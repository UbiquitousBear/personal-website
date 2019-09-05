import { Component, h } from 'preact';

function WrappedComponent(HOCComponent: Component, dependencies: object){
    return class extends Component {
        public state: {} = {}
        private dependencies: {} = {}

        constructor(props: {}) {
            super(props);
            this.dependencies = dependencies
        }
        
        public render(){
            return (
                <HOCComponent dependencies={this.dependencies} {...this.props} />
            );
        }
    }
}

export default WrappedComponent;