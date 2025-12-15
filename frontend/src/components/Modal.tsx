export default function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-full max-w-lg">
        <button
          className="float-right text-gray-500"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
