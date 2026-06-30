interface LoadingStateProps {
  label?: string;
}

export function LoadingState({ label = "Loading" }: LoadingStateProps) {
  return (
    <div className="status-note" role="status" aria-live="polite">
      {label}
    </div>
  );
}
