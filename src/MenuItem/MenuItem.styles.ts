import { css } from "@emotion/css";

const styles = {
  li: css({
    width: "calc(33.33% - 8px * 2 / 3)",
    maxWidth: "calc(33.33% - 8px * 2 / 3)",
  }),
  link: css({
    textDecoration: "none",
    color: "#000",

    "&:hover": css({
      "& img": css({
        transform: "scale(1.1)"
      }),
      "& $content > div:first-of-type": css({
        textDecoration: "underline"
      })
    })
  }),
  wrapper: css({
    color: "inherit",
    height: "100%",
    position: "relative"
  }),
  main: css({
    position: "relative",
    boxSizing: "border-box",
    borderRadius: "0.4rem",
    border: "0.1rem solid rgb(20, 20, 20, 0.2)",
    "--ratio-percent": "66.66666666666666%",
    marginBottom: 8
  }),
  inner: css({
    display: "flex",
    position: "relative",
    alignItems: "stretch",
    width: "100%",
    "--ratio-percent": "66.66666666666666%",

    "&:before": css({
      content: '""',
      width: 0,
      height: 0,
      paddingBottom: "66.66666666666666%",
    }),
  }),
  innerMedia: css({
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    overflow: "hidden",
    zIndex: 0,
    borderRadius: "calc(0.4rem - 0.1rem)",
    margin: 0,
    width: "100%",
    bottom: 0,
    position: "absolute",
    top: 0,

    "& > img": css({
      display: "block",
      maxWidth: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      transition: "transform 100ms ease-out",
    })
  }),
  content: css({
    position: "relative",
    padding: "1rem",
    display: "grid",
    gridTemplateRows: "minmax(0,1fr) max-content minmax(0,1fr)",
    width: "calc(100% - 2rem)",
    flexGrow: 1,

    "& > div:first-of-type": css({
      fontWeight: "600",
      marginBottom: 8
    })
  }),
  addToCartButton: css({
    fontSize: "1.1rem",
    letterSpacing: "0.1rem",
    marginTop: 16,
    textAlign: "center",
    fontWeight: "bold",
    color: "#ffffff",
    background: "#206b19",
    border: "2px solid #206b19",
    padding: "0.8rem",
    minWidth: "100%",
    boxSizing: "border-box",
    width: "100%",
    borderRadius: "0.4rem",
    cursor: "pointer",

    "&:hover": css({
      background: "#13420f",
      borderColor: "#13420f"
    })
  })
};

export default styles;
