/*!
 *  linkhighlighter.js - Tiny library to highlight active link on web page.
 *
 *  @author     Михаил Драгункин <contact@unsektor.com>
 *  @url        https://github.com/unsektor/linkhighlighter.js/
 *  @license    ISC
 *  @since      June 25, 2017
 *  @ver 	    1.0.0
 */

;(function (root, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define('linkhighlighter', factory)
    } else if (typeof exports === 'object') {
        exports = module.exports = factory()
    } else {
        root.linkhighlighter = factory()
    }
})(this, function () {
    return function () {
        /**
         * Highlights scope link elements.
         *
         * @param scopeElement - DOM element representing linkhighlighter scope
         */
        var highlightScope = function (scopeElement) {
            var scopeHighlightClass = scopeElement.getAttribute('data-lh-class') || 'g-lh-active';
            var anchorElementList = scopeElement.querySelectorAll('[data-lh]');

            anchorElementList.forEach(function (anchorElement) {
                // this code is not complicated too strict to validate option value is correct.
                // in case incorrect option passed it will be used as is.
                var anchorElementOption = anchorElement.getAttribute('data-lh') || 'match-uri';

                if ((anchorElementOption === 'match-domain' && anchorElement.host === window.location.host) ||
                    (anchorElementOption === 'match-uri' && anchorElement.href === window.location.href) ||
                    (anchorElementOption === 'match-partial' && window.location.href.toLowerCase().startsWith(anchorElement.href.toLowerCase()))
                ) {
                    anchorElement.classList.add(scopeHighlightClass);
                    return;
                }

                // remove class name added earlier
                anchorElement.classList.remove(scopeHighlightClass);
            });
        };

        /**
         * Main function
         */
        this.highlight = function () {
            var scopeElementList = document.querySelectorAll('[data-lh-scope]');

            // if at least one scope was not defined, root element as only scope will be used.
            if (0 === scopeElementList.length) {
                scopeElementList = document.querySelectorAll('html');
            }

            scopeElementList.forEach(highlightScope);
        };
    }
});