// Palette
import palette from "../palette";

export default {
  outlined: {},
  contained: {
    boxShadow: "none",
    backgroundColor: palette.common.white,
    "&:hover": {
      backgroundColor: palette.common.neutral
    }
  }
};
