/*!
 * linkhighlighter - Tiny library to highlight active link on web page.
 *
 * @author  Михаил Драгункин <contact@md.land>
 * @url     https://github.com/unsektor/linkhighlighter/
 * @license ISC
 * @since   June 25, 2017
 * @ver     1.2.2
 */

export default class {
    constructor(private location: Location = window.location) {
    }

    private highlightScope(scopeElement: Element): void {
        const scopeHighlightClass = scopeElement.getAttribute('data-lh-class') || 'g-lh-active';
        const anchorElementList: NodeListOf<HTMLAnchorElement> = scopeElement.querySelectorAll('a[data-lh]');
        const self = this;

        anchorElementList.forEach(function (anchorElement: HTMLAnchorElement): void {
            const anchorElementOption = anchorElement.getAttribute('data-lh') || 'match-uri';

            if ((anchorElementOption === 'match-domain' && anchorElement.host === self.location.host) ||
                (anchorElementOption === 'match-uri' && anchorElement.href === self.location.href) ||
                (anchorElementOption === 'match-partial' && self.location.href.toLowerCase().startsWith(anchorElement.href.toLowerCase()))
            ) {
                anchorElement.classList.add(scopeHighlightClass);
                return;
            }
            anchorElement.classList.remove(scopeHighlightClass);
        })
    }

    public highlight(): void {
        let scopeElementList: NodeListOf<Element> = document.querySelectorAll('[data-lh-scope]');
        if (0 === scopeElementList.length) {
            this.highlightScope(document.body);
            return;
        }

        scopeElementList.forEach((scopeElement) => this.highlightScope(scopeElement));
    }
}
