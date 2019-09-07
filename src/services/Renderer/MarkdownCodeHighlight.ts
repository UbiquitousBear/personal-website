import * as marked from 'marked'
import prism from 'prismjs';
import RendererInterface from './RendererInterface';

class MarkdownCodeHighlight implements RendererInterface {
    
    constructor(
        supportedLanguages: string[] = []
    ) 
    {
        this.importSupportedLanguages(supportedLanguages);
    }

    public render(content: string): string {
        return marked(content, {
            highlight(code, lang) {
                return prism.highlight(code, prism.languages[lang || 'markup'], lang || 'markup');
            },
        });
    }

    private importSupportedLanguages(supportedLanguages: string[]): void {
        supportedLanguages.map((language: string) => require('prismjs/components/prism-' + language))
    }
}

export default MarkdownCodeHighlight;