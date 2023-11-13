import Image from 'next/image'
import { useEffect, useState } from 'react';

interface StarProps {
  documentId: number;
  userId: number | undefined;
}



const Star: React.FC<StarProps> = ({ documentId }) => {
  const [userId, setUserId] = useState<number>();

  useEffect(() => {
    const userJSON = localStorage.getItem("user");
    if (userJSON) {
      const user = JSON.parse(userJSON);
      setUserId(user.id);
    }
  }, [userId]);


  const [isStarred, setIsStarred] = useState<boolean>(() => {
    // hämta det sparade tillståndet från localStorage när komponenten laddas in
    const savedState = window.localStorage.getItem(`star-${documentId}`);
    return savedState === 'true';
  });

  useEffect(() => {
    // uppdatera det sparade tillståndet i localStorage när isStarred ändras
    window.localStorage.setItem(`star-${documentId}`, String(isStarred));
  }, [documentId, isStarred]);


  const addStarToDocument = async (documentId: number, userId: number) => {

    const response = await fetch(`/api/star/${documentId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId, document_id: documentId }),
    });

    if (!response.ok) {
      throw new Error('Failed to add star');
    }
  };


  const removeStarFromDocument = async (documentId: number, userId: number) => {
    const response = await fetch(`/api/star/${documentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId, document_id: documentId }),
    });

    if (!response.ok) {
      console.error('Failed to remove star:', response);
      throw new Error('Failed to remove star');
    }
  };


  const handleClick = () => {
    if (isStarred) {
      removeStarFromDocument(documentId, userId as number)
        .then(() => {
          setIsStarred(false);
        })
        .catch((error) => {
          console.error('Failed to remove star:', error);
        });
    } else {
      addStarToDocument(documentId, userId as number)
        .then(() => {
          setIsStarred(true);
        })
        .catch((error) => {
          console.error('Failed to add star:', error);
        });
    }
  };


  return (
    <button onClick={handleClick}>
      {isStarred ?
        <Image
          src={'/star_filled.svg'}
          width={24}
          height={24}
          alt={''}
          className='mx-auto'
        />
        :
        <Image
          src='/star.svg'
          width={24}
          height={24}
          alt={''}
          className='mx-auto'
        />
      }
    </button>
  );
};

export default Star;