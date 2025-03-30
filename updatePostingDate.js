import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "./FireBaseConfig"; // Adjust the path as necessary

const updatePostingDate = async () => {
  const querySnapshot = await getDocs(collection(db, "jobListings"));
  
  const updatePromises = querySnapshot.docs.map(async (docSnapshot) => {
    const jobRef = doc(db, "jobListings", docSnapshot.id);
    const postingDate = new Date().toISOString(); // Ensure posting date is in ISO format

    await updateDoc(jobRef, { postingDate });
    console.log(`Updated job ${docSnapshot.id} with posting date: ${postingDate}`);
  });

  await Promise.all(updatePromises);
  console.log("All job documents updated successfully.");
};

updatePostingDate().catch((error) => {
  console.error("Error updating job documents: ", error);
});
