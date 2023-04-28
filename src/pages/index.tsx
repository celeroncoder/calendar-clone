import { type NextPage } from "next";
import { Calendar } from "~/components";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-5 bg-slate-50">
      <p className="text-3xl text-slate-600">
        simplepractice.com's calendar clone
      </p>
      <Calendar />
    </div>
  );
};

export default Home;
