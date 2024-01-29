import chat from "@/assets/chat.png";
export const HomeChat = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <h1 className="text-4xl text-white">Welcome to IRC Chat!</h1>
      <p className="text-xl text-white">
        The best place to connect, communicate and collaborate.
      </p>
      <img
        alt="Welcome Image"
        className="object-cover aspect-[500/500] sm:aspect-[400/400] md:aspect-[500/500] lg:aspect-[600/600] xl:aspect-[700/700] max-w-[100%]"
        height={500}
        src={chat}
        width={500}
      />
    </div>
  );
};
