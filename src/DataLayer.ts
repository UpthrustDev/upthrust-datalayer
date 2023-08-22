export class DataLayer {
  private readonly selector: string = "[data-tracking]";
  private readonly triggers: NodeList;
  private static instance: DataLayer;

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

  pushEvent(event: string, config: object) {
    window.dataLayer.push({
      event: event,
      page: window.location.href,
      ...config,
    });
  }
}
