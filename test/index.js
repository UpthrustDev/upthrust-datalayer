import { DataLayer } from "../dist/index.mjs";

DataLayer.registerEventDefaultProps("download", {
  page: window.location.href,
});

DataLayer.registerEventValidators("download", (props) => Number(props.age) > 10);
