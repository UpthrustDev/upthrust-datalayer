import { DataLayerEvent } from "./types/types";

export class DataLayer {
  private static instance: DataLayer;

  private eventProps: Map<string, DataLayerEvent>;
  private eventValidators: Map<string, any>;

  constructor() {
    window.dataLayer = window.dataLayer || [];

    this.eventProps = new Map();
    this.eventValidators = new Map();

    this.setEventListeners();
  }

  public static getInstance(): DataLayer {
    if (!DataLayer.instance) {
      DataLayer.instance = new DataLayer();
    }
    return DataLayer.instance;
  }

  private setEventListeners() {
    document.addEventListener('click', this.clickListener);
  }

  private clickListener = (event: MouseEvent) => {

    if (event.target instanceof HTMLElement && event.target.matches('[data-tracking]')) {
      const props = this.createPropsFromAttributes(event.target.attributes);

      if (props.event) {
        this.pushEvent(props.event, props);
      }
    }

  }

  public setEventProps(event: string, props: object): void {
    this.eventProps.set(event, props);
  }

  public setEventValidator(event: string, callback: (props: DataLayerEvent) => boolean): void {
    this.eventProps.set(event, callback);
  }

  public pushEvent(event: string, props: DataLayerEvent) {

    if (this.eventValidators.has(event)) {
      if (this.eventValidators.get(event)(props) === true) {
        window.dataLayer.push({
          event: event,
          page: window.location.href,
          ...props,
          ...this.eventProps.get(event),
        });
      } else {
        console.warn(`DataLayer: Event "${event}" wasn't validated`);
      }
    } else {
      window.dataLayer.push({
        event: event,
        page: window.location.href,
        ...props,
        ...this.eventProps.get(event),
      });
    }
  }

  createPropsFromAttributes(attributes: NamedNodeMap): DataLayerEvent {
    return [...attributes]
        .filter((attr) => /^data-tracking-/g.test(attr.name))
        .reduce(
            (acc, attr) => ({
              ...acc,
              [this.formatPropName(attr.name)]: attr.value,
            }),
            {}
        ) as DataLayerEvent;
  }

  formatPropName(propName: string): string {
    return propName
        .replace("data-tracking-", "")
        .split("-")
        .join("_")
  }
}
