"use client";
import { Button } from "@/components/ui/button";
import { HeartIcon, PlayCircleIcon } from "lucide-react";
import PlayVideoModal from "./PlayVideoModal";
import { useState } from "react";

interface iAppProps {
  title: string;
  overview: string;
  movieId: number;
  watchList: boolean;
  watchListId: string;
  youtubeUrl: string;
  year: number;
  age: number;
  time: number;
}

export default function MovieCard({
  title,
  overview,
  movieId,
  watchList,
  watchListId,
  youtubeUrl,
  year,
  age,
  time,
}: iAppProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)} className="mt-14">
        <PlayCircleIcon className="h-20 w-20" />
      </button>
      <div className="right-5 top-5 absolute z-10">
        {watchList ? (
          <form>
            <Button variant={"outline"} size="icon">
              <HeartIcon className="w-4 h-4 text-red-500" />
            </Button>
          </form>
        ) : (
          <form>
            <Button variant={"outline"} size="icon">
              <HeartIcon className="w-4 h-4" />
            </Button>
          </form>
        )}
      </div>
      <div className="p-5 absolute bottom-0 left-0">
        <h1 className="font-bold text-lg line-clamp-1">{title}</h1>
        <div className="flex gap-x-2 items-center">
          <p className="font-normal text-sm">{year}</p>
          <p className="font-normal border py-0.5 px-1 border-gray-200 rounded text-sm">
            {age}+
          </p>
          <p className="font-normal text-sm">{time}H</p>
        </div>
        <p className="line-clamp-1 text-sm text-gray-200 font-light">
          {overview}
        </p>
      </div>
      <PlayVideoModal
        key={movieId}
        title={title}
        overview={overview}
        youtubeUrl={youtubeUrl}
        state={open}
        changeState={setOpen}
        release={year}
        age={age}
        duration={time}
      />
    </>
  );
}
