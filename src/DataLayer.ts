import {DataLayerObject} from "./types/types";

export class DataLayer {
  private static instance: DataLayer;
  private defaultProps: Record<string, any> = {};
  private validators: Record<string, any> = {};
  private readonly triggers: NodeList;
  private readonly selector: string = "[data-tracking]";

  constructor() {
    window.dataLayer = window.dataLayer || [];
    this.triggers = document.querySelectorAll(this.selector);

    if (this.triggers) {
      Array.from(this.triggers).map((trigger) => {
        trigger.addEventListener("click", (e: Event) => {
          if (e.currentTarget instanceof HTMLElement) {
            const event = e.currentTarget.dataset.trackingEvent || "";
            const config = [...e.currentTarget.attributes]
                .filter((attr) => /^data-tracking-/g.test(attr.name))
                .reduce(
                    (acc, attr) => ({
                      ...acc,
                      [attr.name
                          .replace("data-tracking-", "")
                          .split("-")
                          .join("_")]: attr.value,
                    }),
                    {}
                );

            if (event) {
              this.pushEvent(event, config);
            }
          }
        });
      });
    }
  }

  public static getInstance(): DataLayer {
    if (!DataLayer.instance) {
      DataLayer.instance = new DataLayer();
    }
    return DataLayer.instance;
  }

  registerEventDefaultProps(event: string, props: object) {
    this.defaultProps = {
      ...this.defaultProps,
      [event]: props,
    }
  }

  registerEventValidators(event: string, callback: (config: DataLayerObject) => boolean ) {
    this.validators = {
      ...this.validators,
      [event]: callback,
    }
  }

  pushEvent(event: string, props: DataLayerObject) {

    if (this.validators[event]) {
      if (this.validators[event](props) === true) {
        window.dataLayer.push({
          event: event,
          page: window.location.href,
          ...props,
          ...this.defaultProps[event],
        });
      } else {
        console.warn(`DataLayer: Event "${event}" wasn't validated`);
      }
    } else {
      window.dataLayer.push({
        event: event,
        page: window.location.href,
        ...props,
        ...this.defaultProps[event],
      });
    }
  }
}
