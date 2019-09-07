import dompurify from 'dompurify'
import RendererInterface from './RendererInterface';

class HTMLSanitizer implements RendererInterface {
    public render(content: string): string {
        return dompurify.sanitize(content, {});
    }

}

export default HTMLSanitizer;