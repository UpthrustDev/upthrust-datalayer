interface KeyValuePair {
  [key: string | number]: any;
}

interface DataLayerEvent extends KeyValuePair {
  event?: string;
}

type PropNameFormat = 'camel' | 'snake'

export { KeyValuePair, DataLayerEvent, PropNameFormat };
