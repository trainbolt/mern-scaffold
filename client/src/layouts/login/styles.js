import sideImage from "../../assets/images/sign_up_1.jpg";
import spacing from "../../theme/spacing";

export default theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: "100vh"
  },
  grid: {
    height: "100%"
  },
  quoteWrapper: {
    paddingRight: 1,
    background:
      "linear-gradient(180deg, rgba(243,243,243,1) 0%, rgba(243,243,230,1) 20%, rgba(213,237,243,1) 40%, rgba(230,243,230,1) 100%)",
    boxShadow: "0 0 30px rgba(0,0,0,0.05)",
    backgroundAttachment: "fixed",
    [theme.breakpoints.down("md")]: {
      display: "none"
    }
  },
  quote: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,242,1) 20%, rgba(225,250,255,1) 40%, rgba(242,255,242,1) 100%)",
    backgroundAttachment: "fixed"
  },
  quoteInner: {
    textAlign: "center",
    flexBasis: "600px",
    padding: `0 ${spacing(6)}px`
  },
  quoteText: {
    color: theme.palette.common.black,
    fontWeight: 300
  },
  name: {
    marginTop: spacing(3),
    color: theme.palette.common.black
  },
  bio: {
    color: theme.palette.common.black
  },
  contentWrapper: {},
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  contentHeader: {
    display: "flex",
    alignItems: "center",
    paddingTop: spacing(5),
    paddingBototm: spacing(2),
    paddingLeft: spacing(2),
    paddingRight: spacing(2)
  },
  backButton: {},
  logoImage: {
    marginLeft: spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center"
    }
  },
  form: {
    paddingLeft: "100px",
    paddingRight: "100px",
    paddingBottom: "125px",
    flexBasis: "700px",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: spacing(2),
      paddingRight: spacing(2)
    }
  },
  title: {
    marginTop: spacing(3)
  },
  subtitle: {
    color: theme.palette.text.secondary,
    marginTop: spacing(0.5)
  },
  suggestion: {
    color: theme.palette.text.secondary,
    marginTop: spacing(2),
    textAlign: "center"
  },
  fields: {
    marginTop: spacing(2)
  },
  textField: {
    width: "100%",
    "& + & ": {
      marginTop: spacing(2)
    }
  },
  policy: {
    display: "flex",
    alignItems: "center"
  },
  policyCheckbox: {
    marginLeft: "-14px"
  },
  policyText: {
    display: "inline",
    color: theme.palette.text.secondary
  },
  policyUrl: {
    color: theme.palette.text.primary,
    "&:hover": {
      cursor: "pointer",
      color: theme.palette.primary.main
    }
  },
  progress: {
    display: "block",
    marginTop: spacing(2),
    marginLeft: "auto",
    marginRight: "auto"
  },
  signInUpButton: {
    marginTop: spacing(2),
    width: "100%"
  },
  signInUp: {
    marginTop: spacing(2),
    color: theme.palette.text.secondary
  },
  signInUpUrl: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
    "&:hover": {
      color: theme.palette.primary.main
    }
  },
  fieldError: {
    color: theme.palette.danger.main,
    marginBottom: spacing(2),
    marginTop: spacing(2)
  },
  submitError: {
    color: theme.palette.danger.main,
    alignText: "center",
    marginBottom: spacing(2),
    marginTop: spacing(2)
  }
});
