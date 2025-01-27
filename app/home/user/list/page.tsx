import { authOptions } from "@/app/utils/auth";
import { prisma } from "@/app/utils/db";
import { getServerSession } from "next-auth";

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
  const data = await getData("abc");
  return <div>Watchlist</div>;
}
