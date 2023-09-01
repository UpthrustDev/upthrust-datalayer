import { DataLayerEvent, PropNameFormat } from "./types/types";

export class DataLayer {
  private static instance: DataLayer;

  private eventProps: Map<string, DataLayerEvent>;
  private eventValidators: Map<string, any>;
  private readonly eventTriggers: Set<Element>;

  constructor() {
    window.dataLayer = window.dataLayer || [];

    this.eventProps = new Map();
    this.eventValidators = new Map();
    this.eventTriggers = new Set(
      ...[document.querySelectorAll("[data-tracking]")]
    );

    if (this.eventTriggers.size) {
      this.setTriggerListeners();
    }
  }

  public static getInstance(): DataLayer {
    if (!DataLayer.instance) {
      DataLayer.instance = new DataLayer();
    }
    return DataLayer.instance;
  }

  private setTriggerListeners() {
    [...this.eventTriggers].map((trigger) =>
      trigger.addEventListener("click", this.triggerListener)
    );
  }

  private triggerListener = (event: Event) => {
    if (event.currentTarget instanceof Element) {
      const props = this.createPropsFromAttributes(
        event.currentTarget.attributes
      );

      if (props.event) {
        this.pushEvent(props.event, props);
      }
    }
  };

  public setEventDefaultProps(event: string, props: object): void {
    this.eventProps.set(event, props);
  }

  public setEventValidator(
    event: string,
    callback: (props: DataLayerEvent) => boolean
  ): void {
    this.eventValidators.set(event, callback);
  }

  public pushEvent(event: string, props: DataLayerEvent) {
    if (this.eventValidators.has(event)) {
      if (this.eventValidators.get(event)(props) === true) {
        this.sendEvent(event, props);
      } else {
        console.warn(`DataLayer: Event "${event}" wasn't validated`);
      }
    } else {
      this.sendEvent(event, props);
    }
  }

  private sendEvent(event: string, props: DataLayerEvent) {
    window.dataLayer.push({
      event: event,
      ...props,
      ...this.eventProps.get(event),
    });
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

  formatPropName(propName: string, format: PropNameFormat = "camel"): string {
    const propNameArray = propName.replace("data-tracking-", "").split("-");

    const propNames: Record<PropNameFormat, string> = {
      snake: propNameArray.join("_"),
      camel: propNameArray
        .map((word, index) =>
          index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(""),
    };

    return propNames[format];
  }
}
