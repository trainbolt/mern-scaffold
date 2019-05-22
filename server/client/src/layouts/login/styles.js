import sideImage from "../../assets/images/sign_up_1.jpg";

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
    padding: `0 ${theme.spacing.unit * 6}px`
  },
  quoteText: {
    color: theme.palette.common.black,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing.unit * 3,
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
    paddingTop: theme.spacing.unit * 5,
    paddingBototm: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  backButton: {},
  logoImage: {
    marginLeft: theme.spacing.unit * 4
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
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2
    }
  },
  title: {
    marginTop: theme.spacing.unit * 3
  },
  subtitle: {
    color: theme.palette.text.secondary,
    marginTop: theme.spacing.unit * 0.5
  },
  suggestion: {
    color: theme.palette.text.secondary,
    marginTop: theme.spacing.unit * 2,
    textAlign: "center"
  },
  fields: {
    marginTop: theme.spacing.unit * 2
  },
  textField: {
    width: "100%",
    "& + & ": {
      marginTop: theme.spacing.unit * 2
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
    marginTop: theme.spacing.unit * 2,
    marginLeft: "auto",
    marginRight: "auto"
  },
  signInUpButton: {
    marginTop: theme.spacing.unit * 2,
    width: "100%"
  },
  signInUp: {
    marginTop: theme.spacing.unit * 2,
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
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit
  },
  submitError: {
    color: theme.palette.danger.main,
    alignText: "center",
    marginBottom: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2
  }
});
