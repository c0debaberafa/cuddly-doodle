import Image from "next/image";
import React from "react";

const LogoTitleBar: React.FC = () => {
  return (
    <div style={styles.titleBar}>
      <Image src="/logo.png" alt="Logo" width={280} height={50} />
    </div>
  );
};

const styles = {
  titleBar: {
    width: "100%",
    height: "60px",
    backgroundColor: "#0c0430",
    display: "flex",
    alignItems: "center",
    padding: "0 20px",
  },
};

export default LogoTitleBar;
