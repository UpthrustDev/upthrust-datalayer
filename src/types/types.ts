interface KeyValuePair {
  [key: string | number]: any;
}

interface DataLayerEvent extends KeyValuePair {
  event?: string;
}

export { KeyValuePair, DataLayerEvent };
