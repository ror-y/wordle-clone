import React from "react";

const LetterBlock: React.FC<{
  isGreen?: boolean;
  isBlue?: boolean;
  isActive?: boolean;
}> = ({ isGreen, isBlue, isActive, children }: any) => {
  const backgroundColor = isGreen ? "green" : isBlue ? "blue" : "#222";
  return (
    <div
      style={{
        color: "#fff",
        backgroundColor,
        width: "100px",
        height: "100px",
        fontSize: "30px",
        textTransform: "uppercase",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: "10px",
        outline: isActive ? "1px solid white" : ""
      }}
    >
      {children}
    </div>
  );
};

export default LetterBlock;
