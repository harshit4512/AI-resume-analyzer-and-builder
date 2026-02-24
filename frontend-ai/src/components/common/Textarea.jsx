const TextArea = ({ label, error, ...props }) => {
  return (
    <div style={{ marginBottom: "16px" }}>
      {label && (
        <label style={{ display: "block", marginBottom: "6px", fontWeight: 500 }}>
          {label}
        </label>
      )}

      <textarea
        {...props}
        rows={4}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: error ? "1px solid red" : "1px solid #ccc",
          outline: "none",
          fontSize: "14px",
          resize: "vertical",
        }}
      />

      {error && (
        <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default TextArea;