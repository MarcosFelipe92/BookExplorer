"use client";

export default function RootError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <>
      <div className="h-screen gap-4 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold">
          Ocorreu um erro inesperado tente novamente mais tarde!
        </h1>
        <button className="bg-green-400 p-2 rounded-md" onClick={() => reset()}>
          Tentar novamente
        </button>
      </div>
    </>
  );
}
