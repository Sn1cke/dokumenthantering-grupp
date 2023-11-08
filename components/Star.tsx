import { useEffect, useState } from 'react';

interface StarProps {
 documentId: number;
 userId: number;
 addStar: (documentId: number, userId: number) => void;
 removeStar: (documentId: number, userId: number) => void;
}

const Star: React.FC<StarProps> = ({ documentId, userId}) => {
//const [isStarred, setIsStarred] = useState(false);
console.log(documentId, userId);

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
   const response = await fetch(`/api/stars/${documentId}`, {
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
    const response = await fetch(`/api/stars/${documentId}`, {
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

//  const handleClick = () => {
//   addStarToDocument(documentId, userId);
//   setIsStarred(!isStarred);
//  };


const handleClick = () => {
    if (isStarred) {
      removeStarFromDocument(documentId, userId)
        .then(() => {
          setIsStarred(false);
        })
        .catch((error) => {
          console.error('Failed to remove star:', error);
        });
    } else {
      addStarToDocument(documentId, userId)
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
    {isStarred ? '⭐' : '☆'}
  </button>
 );
};

export default Star;