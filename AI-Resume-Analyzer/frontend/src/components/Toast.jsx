export default function Toast({ message, type = "info", onClose }) {
  if (!message) return null;
  return (
    <div className={`toast ${type}`}>
      <span>{type === "success" ? "✓" : type === "error" ? "!" : "i"}</span>
      <div>{message}</div>
      <button onClick={onClose}>×</button>
    </div>
  );
}
