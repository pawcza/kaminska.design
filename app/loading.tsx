export default function Loading() {
  return (
    <div
      role="status"
      className="flex justify-center items-center h-screen z-[9999] fixed top-0 left-0 w-full"
    >
      <div className="w-10 h-10 bg-black animate-pulse" />
    </div>
  );
}
