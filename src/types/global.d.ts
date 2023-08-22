import { DataLayerObject } from "./types";

export {};

declare global {
  interface Window {
    dataLayer: DataLayerObject[];
  }
}
