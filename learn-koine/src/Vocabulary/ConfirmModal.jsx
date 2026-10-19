import "./ConfirmModal.css";

export default function ConfirmModal({ title, message, confirmLabel = "Confirm", onConfirm, onCancel }) {
  return (
    <div className="confirm-modal-backdrop" role="presentation" onMouseDown={onCancel}>
      <section className="confirm-modal" role="dialog" aria-modal="true" aria-labelledby="confirm-modal-title" onMouseDown={(event) => event.stopPropagation()}>
        <h2 id="confirm-modal-title">{title}</h2>
        <p>{message}</p>
        <div className="confirm-modal-actions">
          <button type="button" onClick={onCancel}>Cancel</button>
          <button type="button" className="confirm-modal-danger" onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </section>
    </div>
  );
}
