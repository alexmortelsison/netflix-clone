import MovieCard from "@/app/components/MovieCard";
import { authOptions } from "@/app/utils/auth";
import { prisma } from "@/app/utils/db";
import { getServerSession } from "next-auth";
import Image from "next/image";

async function getData(userId: string) {
  const data = await prisma.watchList.findMany({
    where: {
      userId: userId,
    },
    select: {
      Movie: {
        select: {
          title: true,
          age: true,
          duration: true,
          imageString: true,
          release: true,
          overview: true,
          id: true,
          WatchLists: true,
          youtubeString: true,
        },
      },
    },
  });
  return data;
}

export default async function Watchlist() {
  const session = await getServerSession(authOptions);
  const data = await getData(session?.user?.email as string);
  return (
    <>
      <h1 className="text-white text-4xl font-bold underline mt-10 px-5 sm:px-0">
        Your Watchlist
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 sm:px-0 mt-10 gap-6">
        {data.map((movie) => (
          <div key={movie.Movie?.imageString} className="relative h-60">
            <Image
              src={movie.Movie?.imageString as string}
              alt="movie"
              width={500}
              height={400}
              className="rounded-sm absolute w-full h-full object-cover"
            />
            <div className="h-60 relative z-10 w-full transform transition duration-500 hover:scale-125 opacity-0 hover:opacity-100">
              <div className="bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg flex items-center justify-center">
                <Image
                  src={movie.Movie?.imageString as string}
                  alt="movie"
                  width={800}
                  height={800}
                  className="absolute w-full h-full -z-10 rounded-lg object-cover"
                />
                <MovieCard
                  key={movie.Movie?.id}
                  title={movie.Movie?.title as string}
                  overview={movie.Movie?.overview as string}
                  movieId={movie.Movie?.id as number}
                  watchList={
                    (movie.Movie?.WatchLists.length as number) > 0
                      ? true
                      : false
                  }
                  watchListId={movie.Movie?.WatchLists[0]?.id as string}
                  youtubeUrl={movie.Movie?.youtubeString as string}
                  year={movie.Movie?.release as number}
                  age={movie.Movie?.age as number}
                  time={movie.Movie?.duration as number}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
