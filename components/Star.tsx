import { getUser } from "@/utils/utils";
import Image from "next/image";
import { useState } from "react";

interface StarProps {
  documentId: number;
  isStarred: boolean;
}

const Star = ({ isStarred, documentId }: StarProps) => {
  const [starActive, setStarActive] = useState(isStarred);
  const user = getUser();
  const handleClick = () => {
    console.log(isStarred);
    if (!isStarred) {
      fetch(`/api/star/${documentId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.user_id,
          document_id: documentId,
        }),
      });
      setStarActive(!starActive);
    } else {
      fetch(`/api/star/${documentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.user_id,
          document_id: documentId,
        }),
      });
      setStarActive(!starActive);
    }
  };

  return (
    <button onClick={handleClick}>
      {starActive ? (
        <Image
          src={"/star_filled.svg"}
          width={24}
          height={24}
          alt={""}
          className="mx-auto"
        />
      ) : (
        <Image
          src="/star.svg"
          width={24}
          height={24}
          alt={""}
          className="mx-auto"
        />
      )}
    </button>
  );
};

export default Star;
