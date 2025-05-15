export default function Home() {
  return (
    <main className="h-screen p-4 bg-black flex flex-col gap-y-4">
      <div className="h-16 w-full border border-white bg-gray-200 rounded-2xl flex items-center justify-center">
        Weather
      </div>
      <div className="grid grid-cols-2 gap-4 flex-1">
        <div className="flex h-full w-full border border-white bg-gray-200 rounded-2xl items-center justify-center">
          App
        </div>
        <div className="flex h-full w-full border border-white bg-gray-200 rounded-2xl items-center justify-center">
          App
        </div>
        <div className="flex h-full w-full border border-white bg-gray-200 rounded-2xl items-center justify-center">
          App
        </div>
        <div className="flex h-full w-full border border-white bg-gray-200 rounded-2xl items-center justify-center">
          App
        </div>
      </div>
    </main>
  );
}

