import { useState, useEffect } from "react";

import Image from "next/image";

import axios from "axios";

export interface FeedItemProps {
  content: any;
}

const FeedItem: React.FC<FeedItemProps> = ({ content }) => {
  const [likes, setLikes] = useState<number>(content.likes);

  const like = async () => {
    setLikes((likes) => likes + 1);
    await axios.patch(`/contents/${content.id}`, { likes: likes + 1 });
  };
  return (
    <div>
      <div>
        <p>
          <b>{content.challenge.name}</b> #{content.challenge.tags}
        </p>
      </div>
      <Image
        src={content.image_url}
        alt={content.id}
        className="cursor-pointer hover:opacity-90"
        onDoubleClick={() => {
          like();
        }}
        width={500}
        height={500}
      ></Image>
      <div>
        <p>Likes: {likes}</p>
      </div>
    </div>
  );
};

export default FeedItem;
