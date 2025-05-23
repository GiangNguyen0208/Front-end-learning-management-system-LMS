import { db } from './config';
import { collection, addDoc, serverTimestamp, query, getDocs, where, onSnapshot } from 'firebase/firestore';


export const addDocument = async (collectionName, data) => {
  try {
    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    console.log("🔥 Dữ liệu chuẩn bị thêm:", cleanData);
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
    });
    console.log("✅ Document written with ID:", docRef.id);
  } catch (error) {
    console.error("❌ Lỗi khi thêm document:", error);
  }
};

export async function getRoomsForUser(userId) {
  const q = query(collection(db, 'rooms'), where('members', 'array-contains', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export function getMessagesInRoom(roomId, setMessages) {
  const q = query(collection(db, 'messages'), where('roomId', '==', roomId));
  return onSnapshot(q, (snapshot) => {
    setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  });
}

// tao keywords cho displayName, su dung cho search
export const generateKeywords = (displayName) => {
  // liet ke tat cac hoan vi. vd: name = ["David", "Van", "Teo"]
  // => ["David", "Van", "Teo"], ["David", "Teo", "Van"], ["Teo", "David", "Van"],...
  if (typeof displayName !== "string") {
    displayName = String(displayName || "");
  }
  const name = displayName.split(' ').filter((word) => word);

  const length = name.length;
  let flagArray = [];
  let result = [];
  let stringArray = [];

  /**
   * khoi tao mang flag false
   * dung de danh dau xem gia tri
   * tai vi tri nay da duoc su dung
   * hay chua
   **/
  for (let i = 0; i < length; i++) {
    flagArray[i] = false;
  }

  const createKeywords = (name) => {
    const arrName = [];
    let curName = '';
    name.split('').forEach((letter) => {
      curName += letter;
      arrName.push(curName);
    });
    return arrName;
  };

  function findPermutation(k) {
    for (let i = 0; i < length; i++) {
      if (!flagArray[i]) {
        flagArray[i] = true;
        result[k] = name[i];

        if (k === length - 1) {
          stringArray.push(result.join(' '));
        }

        findPermutation(k + 1);
        flagArray[i] = false;
      }
    }
  }

  findPermutation(0);

  const keywords = stringArray.reduce((acc, cur) => {
    const words = createKeywords(cur);
    return [...acc, ...words];
  }, []);

  return keywords;
};