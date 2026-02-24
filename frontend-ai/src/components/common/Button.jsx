const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  ...props
}) => {
  const baseStyle = {
    padding: "10px 18px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 500,
  };

  const variants = {
    primary: {
      backgroundColor: "#2563eb",
      color: "white",
    },
    secondary: {
      backgroundColor: "#e5e7eb",
      color: "#111",
    },
    danger: {
      backgroundColor: "#dc2626",
      color: "white",
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      style={{ ...baseStyle, ...variants[variant] }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;