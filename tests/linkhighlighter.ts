import {default as linkhighlighter} from '../src/linkhighlighter';

describe('linkhighlighter', () => {
    let highlighter: linkhighlighter;
    let location = {'href': 'http://example.com/test/', 'host': 'example.com'};

    beforeEach(() => {
        let location1 = location as unknown as Location;
        highlighter = new linkhighlighter(location1);
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    describe('highlight', () => {
        it('should add default class when data-lh="match-uri" and href matches current URL', () => {
            // Arrange
            const currentUrl = location.href;
            console.log(location.href)
            const scopeElement = document.createElement('div');
            const anchorElement = document.createElement('a');

            scopeElement.setAttribute('data-lh-scope', 'true');
            anchorElement.href = currentUrl;
            anchorElement.setAttribute('data-lh', 'match-uri');
            scopeElement.appendChild(anchorElement);
            document.body.appendChild(scopeElement);

            // Act
            highlighter.highlight();

            // Assert
            expect(anchorElement.classList.contains('g-lh-active')).toBe(true);
        });

        it('should use custom class from data-lh-class attribute', () => {
            // Arrange
            const customClass = 'custom-highlight';
            const currentUrl = location.href;
            const scopeElement = document.createElement('div');
            const anchorElement = document.createElement('a');

            scopeElement.setAttribute('data-lh-scope', 'true');
            scopeElement.setAttribute('data-lh-class', customClass);
            anchorElement.href = currentUrl;
            anchorElement.setAttribute('data-lh', 'match-uri');
            scopeElement.appendChild(anchorElement);
            document.body.appendChild(scopeElement);

            // Act
            highlighter.highlight();

            // Assert
            expect(anchorElement.classList.contains(customClass)).toBe(true);
        });

        it('should add class when data-lh="match-domain" and host matches', () => {
            // Arrange
            const scopeElement = document.createElement('div');
            const anchorElement = document.createElement('a');

            location.host = 'example.com'
            scopeElement.setAttribute('data-lh-scope', 'true');
            anchorElement.href = 'https://example.com/page';
            anchorElement.setAttribute('data-lh', 'match-domain');
            scopeElement.appendChild(anchorElement);
            document.body.appendChild(scopeElement);

            location.href = 'https://example.com/different-page';

            // Act
            highlighter.highlight();

            // Assert
            expect(anchorElement.classList.contains('g-lh-active')).toBe(true);
        });

        it('should add class when data-lh="match-partial" and current URL starts with anchor href', () => {
            // Arrange
            const baseUrl = 'https://example.com/section';
            const scopeElement = document.createElement('div');
            const anchorElement = document.createElement('a');

            scopeElement.setAttribute('data-lh-scope', 'true');
            anchorElement.href = baseUrl;
            anchorElement.setAttribute('data-lh', 'match-partial');
            scopeElement.appendChild(anchorElement);
            document.body.appendChild(scopeElement);

            location.href = 'https://example.com/section/subsection/page';

            // Act
            highlighter.highlight();

            // Assert
            expect(anchorElement.classList.contains('g-lh-active')).toBe(true);
        });

        it('should remove class when no conditions match', () => {
            // Arrange
            const scopeElement = document.createElement('div');
            const anchorElement = document.createElement('a');

            scopeElement.setAttribute('data-lh-scope', 'true');
            anchorElement.classList.add('g-lh-active');
            anchorElement.href = 'https://different-domain.com/page';
            anchorElement.setAttribute('data-lh', 'match-uri');
            scopeElement.appendChild(anchorElement);
            document.body.appendChild(scopeElement);

            location.href = 'https://example.com/different-page';

            // Act
            highlighter.highlight();

            // Assert
            expect(anchorElement.classList.contains('g-lh-active')).toBe(false);
        });

        it('should handle multiple anchor elements in scope', () => {
            // Arrange
            const scopeElement = document.createElement('div');
            const anchor1 = document.createElement('a');
            const anchor2 = document.createElement('a');

            scopeElement.setAttribute('data-lh-scope', 'true');
            anchor1.href = location.href;
            anchor1.setAttribute('data-lh', 'match-uri');
            anchor2.href = 'https://different.com';
            anchor2.setAttribute('data-lh', 'match-uri');

            scopeElement.appendChild(anchor1);
            scopeElement.appendChild(anchor2);
            document.body.appendChild(scopeElement);

            // Act
            highlighter.highlight();

            // Assert
            expect(anchor1.classList.contains('g-lh-active')).toBe(true);
            expect(anchor2.classList.contains('g-lh-active')).toBe(false);
        });

        it('should process all elements with data-lh-scope attribute', () => {
            // Arrange
            const scope1 = document.createElement('div');
            const scope2 = document.createElement('div');
            const anchor1 = document.createElement('a');
            const anchor2 = document.createElement('a');

            scope1.setAttribute('data-lh-scope', 'true');
            scope2.setAttribute('data-lh-scope', 'true');

            anchor1.href = location.href;
            anchor1.setAttribute('data-lh', 'match-uri');
            anchor2.href = location.href;
            anchor2.setAttribute('data-lh', 'match-uri');

            scope1.appendChild(anchor1);
            scope2.appendChild(anchor2);
            document.body.appendChild(scope1);
            document.body.appendChild(scope2);

            // Act
            highlighter.highlight();

            // Assert
            expect(anchor1.classList.contains('g-lh-active')).toBe(true);
            expect(anchor2.classList.contains('g-lh-active')).toBe(true);
        });

        it('should use body element as scope when no data-lh-scope elements found', () => {
            // Arrange
            document.body.innerHTML = '';
            const body = document.body;
            const anchor = document.createElement('a');

            anchor.href = location.href;
            anchor.setAttribute('data-lh', 'match-uri');
            body.appendChild(anchor);

            // Act
            highlighter.highlight();

            // Assert
            expect(anchor.classList.contains('g-lh-active')).toBe(true);
        });

        it('should handle case sensitivity for match-partial option', () => {
            // Arrange
            const baseUrl = 'https://example.com/SECTION';
            const scopeElement = document.createElement('div');
            const anchorElement = document.createElement('a');

            scopeElement.setAttribute('data-lh-scope', 'true');
            anchorElement.href = baseUrl.toLowerCase();
            anchorElement.setAttribute('data-lh', 'match-partial');
            scopeElement.appendChild(anchorElement);
            document.body.appendChild(scopeElement);

            location.href = baseUrl;

            // Act
            highlighter.highlight();

            // Assert
            expect(anchorElement.classList.contains('g-lh-active')).toBe(true);
        });

        it('should handle anchor without data-lh attribute by using default "match-uri"', () => {
            // Arrange
            const scopeElement = document.createElement('div');
            const anchorElement = document.createElement('a');

            scopeElement.setAttribute('data-lh-scope', 'true');
            anchorElement.href = location.href;
            anchorElement.setAttribute('data-lh', '')
            scopeElement.appendChild(anchorElement);
            document.body.appendChild(scopeElement);

            // Act
            highlighter.highlight();

            // Assert
            expect(anchorElement.classList.contains('g-lh-active')).toBe(true);
        });

        it('should handle scope without data-lh-class attribute by using default class', () => {
            // Arrange
            const scopeElement = document.createElement('div');
            const anchorElement = document.createElement('a');

            scopeElement.setAttribute('data-lh-scope', 'true');
            anchorElement.href = location.href;
            anchorElement.setAttribute('data-lh', 'match-uri');
            scopeElement.appendChild(anchorElement);
            document.body.appendChild(scopeElement);

            // Act
            highlighter.highlight();

            // Assert
            expect(anchorElement.classList.contains('g-lh-active')).toBe(true);
        });

        it('should not throw error when scope contains no anchor elements', () => {
            // Arrange
            const emptyScope = document.createElement('div');
            emptyScope.setAttribute('data-lh-scope', 'true');
            document.body.appendChild(emptyScope);

            // Act & Assert
            expect(() => {
                highlighter.highlight();
            }).not.toThrow();
        });

        it('should handle multiple scopes with different configurations', () => {
            // Arrange
            const scope1 = document.createElement('div');
            const scope2 = document.createElement('div');
            const anchor1 = document.createElement('a');
            const anchor2 = document.createElement('a');

            scope1.setAttribute('data-lh-scope', 'true');
            scope1.setAttribute('data-lh-class', 'custom-class-1');
            scope2.setAttribute('data-lh-scope', 'true');
            scope2.setAttribute('data-lh-class', 'custom-class-2');

            anchor1.href = location.href;
            anchor1.setAttribute('data-lh', 'match-uri');
            anchor2.href = location.href;
            anchor2.setAttribute('data-lh', 'match-uri');

            scope1.appendChild(anchor1);
            scope2.appendChild(anchor2);
            document.body.appendChild(scope1);
            document.body.appendChild(scope2);

            // Act
            highlighter.highlight();

            // Assert
            expect(anchor1.classList.contains('custom-class-1')).toBe(true);
            expect(anchor2.classList.contains('custom-class-2')).toBe(true);
        });
    });
});