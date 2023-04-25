import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import Link from "next/link";

import axios from "axios";
import FeedItem from "@/components/FeedItem";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import { useQuery } from "@tanstack/react-query";

import { HiArrowLeft } from "react-icons/hi2";

export default function Challenges() {
  const router = useRouter();

  const {
    isLoading: isChallengeLoading,
    error: errorChallenge,
    data: challenge,
  } = useQuery(["challenges", router.query.id], async ({ queryKey }) => {
    return await axios.get(`/challenges/${queryKey[1]}`);
  });

  const {
    isLoading: isContentsLoading,
    error: errorContents,
    data: contents,
  } = useQuery(
    ["challenges", router.query.id, "contents"],
    async ({ queryKey }) => {
      return await axios.get(`/challenges/${queryKey[1]}/contents`);
    }
  );

  if (isChallengeLoading || isContentsLoading) return <Loading />;
  if (errorChallenge || errorContents) return <div>Error</div>;

  // Group the likes by user using reduce()
  const userLikes = contents?.data.reduce((acc: any, curr: any) => {
    const user = curr.user.instagram_uname;
    if (!acc[user]) {
      acc[user] = 0;
    }
    acc[user] += curr.likes;
    return acc;
  }, {});

  // Sort the object by likes to display the rankings
  const rankings =
    userLikes &&
    Object.entries(userLikes)
      .sort(([, a]: any, [, b]: any) => b - a)
      .map(([user, likes], index) => ({
        user,
        likes,
        rank: index + 1,
      }));

  return (
    <Layout>
      <div className="flex gap-4 items-center">
        <Link href={"/challenges"}>
          <HiArrowLeft size={20} />
        </Link>
        <span className="text-2xl font-bold">{challenge?.data.name}</span>
        <span>#{challenge?.data.tags}</span>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {rankings?.map((ranking: any) => (
          <div key={ranking.user} className="bg-gray-50 px-6 py-4 rounded-md">
            <div className="flex justify-between">
              <div className="space-x-4">
                <span>{ranking.rank}.</span>
                <span>{ranking.user}</span>
              </div>
              <span>
                Likes: <b>{ranking.likes}</b>
              </span>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
