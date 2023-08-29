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

  window.customClickEvent = () => {
    // The class instance contains a pushvent function for the ability to create custom triggers
    window.tracking.pushEvent("click", {
      type: "custom"
    });
  };
}
```

To prepare triggers, you need to add `data-tracking` attribute. To ensure that an event is sent, attribute `data-tracking-event` with the name of the event should be specified. Other attributes prefixed with `data-tracking-` will be parsed automatically.

```html
<button
  data-tracking=""
  data-tracking-event="button_click"
  data-tracking-label="Start accelerating my growth"
>
  Start accelerating my growth
</button>
```

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
