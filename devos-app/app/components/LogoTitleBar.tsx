import Image from "next/image";
import React from "react";

const LogoTitleBar: React.FC = () => {
  return (
    <div style={styles.titleBar}>
      <Image
        src="/logo.png"
        alt="Logo"
        width="150"
        height="64"
        style={styles.logo}
      />
    </div>
  );
};

const styles = {
  titleBar: {
    width: "100%",
    // Remove fixed height to let the logo define the height
    backgroundColor: "#0c0430",
    display: "flex",
    alignItems: "center", // Centers items vertically
    justifyContent: "center",
  },
  logo: {
    maxWidth: "100%", // Ensure the logo scales responsively
    height: "auto", // Keep the aspect ratio of the logo
  },
};

export default LogoTitleBar;
