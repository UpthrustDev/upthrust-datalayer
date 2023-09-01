# Upthrust Datalayer module

**This module only works with `dataLayer` array**

## Installation

`npm install @upthrust/datalayer`

## Usage

```js
import { DataLayer } from "@upthrust/datalayer";
```

### HTML triggers

To prepare triggers(click), just add `data-tracking` attribute to any DOM element.
To ensure that an event is sent, attribute `data-tracking-event` with the name of the event should be specified as well.
Add as many `data-tracking-props-name` attributes as needed. All attributes prefixed with `data-tracking-` will be parsed automatically.

#### Example

```html
<button
  data-tracking=""
  data-tracking-event="download"
  data-tracking-label="Start accelerating my growth"
  data-tracking-download-type="ebook"
>
  Download eBook
</button>
```

Object that will be pushed to the datalayer
```json
{
  "event": "download",
  "label": "Start accelerating my growth",
  "download_type": "ebook"
}
```

### Customize behavior

`setEventDefaultProps` adds default props to the event, these props will be added to any event with the given name

```js
DataLayer.setEventDefaultProps('download', {
    page: window.location.href
})
```

Since the default props for the "download" event were specified, click on the trigger from the example above will generate the following result

```json
{
  "event": "download",
  "label": "Start accelerating my growth",
  "download_type": "ebook",
  "page": "https://github.com/UpthrustDev/upthrust-datalayer/"
}
```

To filter and prevent certain objects from being sent use `setEventValidator`. Just provide callback function to validate props

```js
/**
 * Send event to dataLayer only if `download_type` is `ebook`
 */
DataLayer.setEventValidator('download', props => props.download_type === "ebook")

/**
 * This event will not be pushed to dataLayer since `download_type` prop is not passed validation
 */
const handleClickDownloadButton = (props) => DataLayer.pushEvent('download', {
    ...props,
    download_type: "file"
})

/**
 * This event is valid and will be pushed to dataLayer
 */
const handleClickDownloadButton2 = (props) => DataLayer.pushEvent('download', {
    ...props,
    download_type: "ebook"
})
```
