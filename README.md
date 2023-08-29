# Upthrust Datalayer module

In this example, a module is imported into the project and initialized. It listens for triggers and automatically collects click events.

```js
import { DataLayer } from "@upthrust/datalayer";

(async function () {
  if ("complete" === document.readyState) {
    init();
  } else {
    window.addEventListener("load", () => {
      init();
    });
  }
})();

function init() {
  window.tracking = new DataLayer();

  window.changeLanguage = (language) => {
    // The class instance contains a pushvent function for the ability to create custom triggers
    window.tracking.pushEvent("click", {
      type: "language_change",
      language
    });
  };
}
```

To prepare triggers, you need to add `data-tracking` attribute. To ensure that an event is sent, attribute `data-tracking-event` with the name of the event should be specified. Other attributes prefixed with `data-tracking-` will be parsed automatically.

## Usage

### Trigger #1

```html
<button
  data-tracking=""
  data-tracking-event="button_click"
  data-tracking-label="Start accelerating my growth"
>
  Start accelerating my growth
</button>
```

event object that will be sent to the datalayer
```json
{
  "event": "button_click"
  "label": "Start accelerating my growth"
}
```

### Trigger #2

```html
<button
  data-tracking=""
  data-tracking-event="download_click"
  data-tracking-label="Reversed Funnel"
  data-tracking-user-id="2030"
>
  Download
</button>
```

event object that will be sent to the datalayer
```json
{
  "event": "download_click"
  "label": "Reversed Funnel",
  "user_id": "2030"
}
```

### Trigger #2

```html
<button
  data-tracking=""
  data-tracking-event="cta_click"
  data-tracking-label="Digital Product Studio"
  data-tracking-layout="home"
>
  Build Digital Products
</button>
```

event object that will be sent to the datalayer
```json
{
  "event": "cta_click"
  "label": "Digital Product Studio",
  "layout": "home"
}
```

### Custom Trigger

```html
<button onclick="changeLanguage("en")">
  Change Language
</button>
```

```json
{
  "event": "language_change"
  "language": "en",
}
```
