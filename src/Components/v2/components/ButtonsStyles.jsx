export const styling = (_type) => {
  const type = String(_type);
  const firstIndex = type.charAt(0);
  const secondIndex = type.charAt(1);
  const thirdIndex = type.charAt(2);

  let styles = {
    textTransform: "none",
    transition: "all 0.3s ease",
  };

  if (firstIndex === "0") {
    styles = {
      ...styles,
      colors: {
        text: {
          default: "#000",
          hover: "#000",
        },
        background: {
          default: "auto",
          hover: "auto",
        },
      },
    };
  } else if (firstIndex === "1") {
    styles = {
      ...styles,
      colors: {
        text: {
          default: "#fff",
          hover: "#fff",
        },
        background: {
          default: "var(--tae-orange)",
          hover: "var(--tae-orange-light)",
        },
      },
    };
  } else if (firstIndex === "2") {
    styles = {
      ...styles,
      colors: {
        text: {
          default: "#fff",
          hover: "#fff",
        },
        background: {
          default: "#000",
          hover: "#111",
        },
      },
    };
  }

  if (secondIndex === "0") {
    styles = {
      ...styles,
      size: {
        font: "small",
      },
    };
  } else if (secondIndex === "1") {
    styles = {
      ...styles,
      size: {
        font: "large",
      },
    };
  } else if (secondIndex === "2") {
    styles = {
      ...styles,
      size: {
        font: "larger",
      },
    };
  }

  if (thirdIndex === "0") {
    styles = {
      ...styles,
      padding: 5,
    };
  } else if (thirdIndex === "1") {
    styles = {
      ...styles,
      padding: "auto",
    };
  } else if (thirdIndex === "2") {
    styles = {
      ...styles,
      padding: 10,
    };
  }

  return {
    styles,
  };
};
