# Gtag helper

## Introduction

This package was created to help developers quickly set up and send custom events to tagmanager.

## Getting started

### Installation

`npm install`

### Basic usage

The package checks for window.dataLayer and Google Tag Manager to be implemented on the page.

Best would be to initialize the class after the page has been fullt loaded.

```javascript
window.addEventListener('DOMContentLoaded', () => {
    new GtagHelper(window.dataLayer).init().then(() => {
        doSomething();
    }).catch((e) => console.error(e));
});
```

```html
<div class="class-name" gtag-helper-click="my-event-name" data-gtag-helper-classes data-gtag-helper-innertext>
    Some text
</div>
```

Above code will result in the following event being send to GTM when clicked:

```json
{
  "event": "my-event-name",
  "gtagHelper_classes": "class-name",
  "gtagHelper_innertext": "Some text"
}
```

## Todo:

- [ ] List available events
