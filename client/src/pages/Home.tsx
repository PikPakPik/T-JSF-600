import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold dark:text-gray-100">
          {t("home.h1_title")}
        </h1>
        <p className="text-xl dark:text-gray-100 text-center">
          {t("home.p_description")}
        </p>
        <div className="flex gap-5 mt-5">
          <>
            <Link
              to="/login"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
            >
              {t("home.signin")}
            </Link>
            <Link
              to="/signup"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
            >
              {t("home.signup")}
            </Link>
          </>
        </div>
      </div>
    </>
  );
};

export default Home;
