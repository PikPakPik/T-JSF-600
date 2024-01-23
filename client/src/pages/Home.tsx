import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Home = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold dark:text-gray-100">
          {t("home.h1_title")}
        </h1>
        <p className="text-xl text-center dark:text-gray-100">
          {t("home.p_description")}
        </p>
        <div className="flex gap-5 mt-5">
          <>
            <Link
              to="/login"
              className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              {t("home.signin")}
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
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
