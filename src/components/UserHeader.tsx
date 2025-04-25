export default function UserHeader({ username }: { username: string }) {
  return (
    <header className="bg-gray-800 text-white p-4">
      <button>
        <h1 className="text-2xl font-bold">Welcome, {username}</h1>
      </button>
    </header>
  );
}
