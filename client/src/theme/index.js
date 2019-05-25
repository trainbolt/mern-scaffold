// Material helpers
import { createMuiTheme } from "@material-ui/core";

import spacing from "./spacing";
import palette from "./palette";
import mixins from "./mixins";
import typography from "./typography";
import overrides from "./overrides";

const spacingUnit = spacing(1);

console.log("spacingUnit: ", spacingUnit);

const theme = createMuiTheme({
  spacing: 8,
  palette,
  mixins,
  typography,
  overrides,
  zIndex: {
    appBar: 1200,
    drawer: 1100
  }
});

console.log("theme from file: ", theme);

export default theme;
