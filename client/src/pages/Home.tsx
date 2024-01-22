import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold dark:text-gray-100">
          Welcome to IRC Chat
        </h1>
        <p className="text-xl dark:text-gray-100">
          A simple chat app built with React, Vite, TailwindCSS and Socket.IO
        </p>
        <div className="flex gap-5 mt-5">
          <>
            <Link
              to="/login"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
            >
              Me Connecter
            </Link>
            <Link
              to="/signup"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
            >
              M'inscrire
            </Link>
          </>
        </div>
      </div>
    </>
  );
};

export default Home;
