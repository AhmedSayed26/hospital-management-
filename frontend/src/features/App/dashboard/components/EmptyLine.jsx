export default function EmptyLine({ children }) {
  return (
    <p className="rounded-xl border border-dashed border-border bg-muted/40 px-3 py-6 text-center text-sm text-muted-foreground">
      {children}
    </p>
  );
}
