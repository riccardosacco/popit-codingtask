import axios from "axios";
import FeedItem from "@/components/FeedItem";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";

import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const {
    isLoading,
    error,
    data: contents,
  } = useQuery(["contents"], async () => {
    return await axios.get("/contents");
  });

  if (isLoading) return <Loading />;
  if (error) return <div>Error</div>;

  return (
    <Layout>
      <h2 className="text-2xl font-bold">Feed</h2>
      <div className="grid grid-cols-4 gap-4">
        {contents?.data.map((content: any) => (
          <FeedItem key={content.id} content={content} />
        ))}
      </div>
    </Layout>
  );
}
