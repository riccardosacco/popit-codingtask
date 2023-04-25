import { useState, useEffect } from "react";

import Image from "next/image";

import Link from "next/link";

import axios from "axios";
import FeedItem from "@/components/FeedItem";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";

import { useQuery } from "@tanstack/react-query";

export default function Challenges() {
  const {
    isLoading,
    error,
    data: challenges,
  } = useQuery(["challenges"], async () => {
    return await axios.get("/challenges");
  });

  if (isLoading) return <Loading />;
  if (error) return <div>Error</div>;

  return (
    <Layout>
      <h2 className="text-2xl font-bold">Challenges</h2>
      <div className="grid grid-cols-4 gap-4">
        {challenges?.data.map((challenge: any) => {
          return (
            <Link
              href={`/challenges/${challenge.id}`}
              key={challenge.id}
              className="bg-gray-50 px-6 py-4 rounded-md"
            >
              <div className="flex justify-between">
                <span>{challenge.name}</span>
                <span className="font-bold text-sm">#{challenge.tags}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </Layout>
  );
}
