export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#070708] p-4 text-[#f2f0eb] antialiased">
      {children}
    </div>
  );
}
