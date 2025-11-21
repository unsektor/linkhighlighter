# linkhighlighter.js

Tiny native javascript library to highlight current URI link.

## Installation

```sh
npm i --save linkhighlighter
```

## Usage
### Direct include

Include script into your project and execute code right after DOM loaded.

```html
<!-- ... -->
<script src="https://unpkg.com/linkhighlighter@1/linkhighlighter.js"></script>
<script>
window.addEventListener('DOMContentLoaded', function (e) {
    var linkhighlighterInstance = new linkhighlighter();
    linkhighlighterInstance.highlight();
});
</script>
</body>
<!-- ... -->
```

### Include in frontend application

1. Include into an application
   ```js
   // AMD
   define(['linkhighlighter'], function (linkhighlighter) {
     // Initialize
     var linkhighlighterInstance = new linkhighlighter();
     
     // Invoke
     linkhighlighterInstance.highlight();
   })
   
   // ES6 / ES2015 module
   import linkhighlighter from 'linkhighlighter'
   
   // CommonJS
   var linkhighlighter = require('linkhighlighter');
   ```
2. Initialize
   ```js
   // Property of window object
   var linkhighlighterInstance = new window.linkhighlighter();
   // ... or simply
   var linkhighlighterInstance = new linkhighlighter();
   ```
3. Invoke
   ```js
   // Direct call
   linkhighlighterInstance.highlight();
   
   // ... Better this way (wait unitil DOM loaded):
   window.addEventListener('DOMContentLoaded', function(e) {
       linkhighlighterInstance.highlight();
   });
   ```

## Markup

Markup defines just only 3 custom HTML5 attributes.

### 1. `data-lh` attribute

`data-lh` attribute defines element to be highlighted.

**Example 1:**

Code without linkhighlighter markup (before):

```html
<!-- ... -->
<header>
    <nav class="header-navigation">
        <a class="header-navigation__item" href="/">Main</a>
        <a class="header-navigation__item" href="/blog/">Blog</a>
        <a class="header-navigation__item" href="/news/">News</a>
        <a class="header-navigation__item" href="/contacts">Contacts</a>
    </nav>
</header>
<!-- ... -->
```

Code within linkhighlighter markup (after):

```html
<!-- ... -->
<header>
    <nav class="header-navigation">
        <a data-lh class="header-navigation__item" href="/">Main</a>
        <a data-lh class="header-navigation__item" href="/blog/">Blog</a>
        <a data-lh class="header-navigation__item" href="/news/">News</a>
        <a data-lh class="header-navigation__item" href="/contacts">Contacts</a>
    </nav>
</header>
<!-- ... -->
```

It's enough to highlight current URI link elements.

#### `data-lh` values (options)

By default script highlights elements with `data-lh` attribute comparing element uri with current uri. There few options to extend functionality.

<table>
    <thead>
        <tr>
            <td><b>Option</b></td>
            <td><b>Compare method</b></td>
            <td><b>Description<b/></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>match-uri (default)</td>
            <td>Strict equality of link URI to current URI. <br></td>
            <td>Won't match any other url.</td>
        </tr>
        <tr>
            <td>match-domain</td>
            <td>Strict equality of link host to current host</td>
            <td>Global navigation item</td>
        </tr>
        <tr>
            <td>match-partial</td>
            <td>RegExp test</td>
            <td>Match parent directories to current URI</td>
        <tr>
    </tbody>
</table>

<div hidden>

#### Possible option combinations

*Notice: Combination value is not sensetive to space, case or tag order.*

- `match-domain match-uri`
- `match-domain match-child` 

</div>

**Example 2:**

Code without linkhighlighter markup (before):

```html
<!-- ... -->
<header>
    <nav class="header-navigation">
        <a class="header-navigation__item" href="//news.example.tld">News</a>
        <a class="header-navigation__item" href="//blog.example.tld">Blog</a>
        <a class="header-navigation__item" href="//www.example.tld">Main</a>
        <a class="header-navigation__item" href="//www.example.tld/contacts">Contacts</a>
    </nav>
</header>
<!-- ... -->
```

Code within linkhighlighter markup (after):

```html
<!-- ... -->
<header>
    <nav class="header-navigation">
        <a data-lh="match-domain" class="header-navigation__item" href="//news.example.tld">News</a>
        <a data-lh="match-domain" class="header-navigation__item" href="//blog.example.tld">Blog</a>
        <a data-lh class="header-navigation__item" href="//www.example.tld">Main</a>
        <a data-lh class="header-navigation__item" href="//www.example.tld/contacts">Contacts</a>
    </nav>
</header>
<!-- ... -->
```


### 2. `data-lh-scope` (optional attribute)

`data-lh-scope` attribute applies to element to define scope that contains anchor (`<a>`) elements to be highlighted. It's usefull to segregate few link blocks (eg. navigation blocks). (See `data-lh-class` below for more details). 

**Scope element definition example:**

```html
<!-- ... -->
<header>
    <nav data-lh-scope>
        <!-- anchor elements to be highlighted -->
    </nav>
</header>
<!-- ... -->
```

Note: if at least one scope was not defined, document root element (`<html>`) will be used as the only scope.

### 3. `data-lh-class` (optional attribute)

`data-lh-class` attribute defines scope classname for highlighted anchor element. This attribute applies only for scope element (DOM element that contains `data-lh-scope` attribute). It's useful to define specific highlighted element class name in scope.

`g-lh-active` is default class name to highlight link element (if `data-lh-class` for scope was not defined).

This feature provides compatibility with [BEM methodology](https://en.bem.info/).


**Example when using `data-lh-class` is useful:**

```scss
// SCSS code
.header-navigation {
    &__item {
        // Case 1. (without default class name definition for scope)
        // You have to define styles for default class name selector.
        // In BEM using case it's a dirty hack.
        &.g-lh-active { 
            // ...
        }
        
        // Case 2. (BEM ok)
        &_active {
            // ...
        }
    }
}
```

Result CSS code.

```css
/* CSS Code*/

/* Case 1 result */ 
.header-navigation__item.g-lh-active {/* ... */}

/* Case 2 result */
.header-navigation__item_active {/* ... */}
```

**Scope class name definition example:**

```html
<!-- ... -->
<header>
    <nav data-lh-scope data-lh-class="header-navigation__item_active">
        <!-- anchor elements to be highlighted -->
    </nav>
</header>
<!-- ... -->
```

<details>
  <summary><strong>Final example code:</strong></summary>

```html
<!-- ... -->
<header>
    <nav data-lh-scope data-lh-class="header-navigation__item_active" class="header-navigation">
        <a data-lh="match-domain" class="header-navigation__item" href="//news.example.tld">News</a>
        <a data-lh="match-domain" class="header-navigation__item" href="//blog.example.tld">Blog</a>
        <a data-lh class="header-navigation__item" href="//www.example.tld">Main</a>
        <a data-lh class="header-navigation__item" href="//www.example.tld/contacts">Contacts</a>
    </nav>
</header>
<!-- ... -->
<!-- Nested menu example -->
<!-- this markup allow to highlight nested categories for some entity (eg. blog article) -->
<ul class="list" data-lh-scope data-lh-class="list__link_active" >
    <li class="list__item">
        <a data-lh="match-partial" class="list__link" href="/*nix/">*NIX</a>
        <ul class="list">
            <li class="list__item"><a data-lh="match-partial" class="list__link" href="/*nix/os-x/">OS X</a></li>
            <li class="list__item"><a data-lh="match-partial" class="list__link" href="/*nix/linux/">Linux</a></li>
        </ul>
    </li>
    <li>
        <a data-lh="match-partial" class="list__link" href="/backend-development/">Backend development</a>
        <ul class="list">
            <li class="list__item"><a data-lh="match-partial" class="list__link" href="/backend-development/node.js/">Node.js</a></li>
            <li class="list__item"><a data-lh="match-partial" class="list__link" href="/backend-development/php/">PHP</a></li>
            <li class="list__item"><a data-lh="match-partial" class="list__link" href="/backend-development/mysql/">MySQL</a></li>
            <li class="list__item"><a data-lh="match-partial" class="list__link" href="/backend-development/nosql/">NoSQL</a></li>
        </ul>
    </li>
</ul>
<!-- ... -->
<footer>
    <nav data-lh-scope data-lh-class="footer-navigation__item_active" class="footer-navigation">
        <a data-lh class="footer-navigation__item" href="//www.example.tld/api">API</a>
        <a data-lh class="footer-navigation__item" href="//www.example.tld/status">Service status</a>
        <a data-lh class="footer-navigation__item" href="//www.example.tld/about">About</a>
    </nav>
</footer>
<!-- ... -->
```

</details>

## Notes & restrictions 

1. Currently, library does not watch DOM & URI changes, if your application manages it, it's simple to update state by simply calling main library method: `highlight`.
2. script uses `classList` DOM API & HTML5 custom data attributes.
3. script does not validate passed options.

## [Change Log](CHANGELOG.md)
## [License](LICENSE.md)