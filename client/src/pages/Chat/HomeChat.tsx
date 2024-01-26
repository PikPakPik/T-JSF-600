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
        className="object-cover"
        height={500}
        src={chat}
        style={{
          aspectRatio: "500/500",
          objectFit: "cover",
        }}
        width={500}
      />
    </div>
  );
};
