interface ErrorStateProps {
  message: string;
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="status-note error" role="alert">
      {message}
    </div>
  );
}
