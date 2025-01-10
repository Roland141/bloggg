import { addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore"
import { db } from "./firebaseApp"



export const readCategories=(setCategories)=>{
    const collectionRef=collection(db,'categories')
    const q=query(collectionRef,orderBy('name','asc'))
    const unSubscribe= onSnapshot(q,(snapshot)=>{
        setCategories(snapshot.docs.map(doc=>({...doc.data(),id:doc.id})))
    })
    return unSubscribe;
}
export const addPost=async (formdata)=>{
    const collectionRef = collection(db,'posts')
    const newItem={...formdata,timestamp:serverTimestamp()}
    await addDoc(collectionRef,newItem)
}


export const readPosts=(setPosts,selCateg)=>{
    const collectionRef=collection(db,'posts')
    const q=selCateg.length==0 ? query(collectionRef,orderBy('timestamp','desc')) :
    query(collectionRef,where('category','in',selCateg))

    const unSubscribe= onSnapshot(q,(snapshot)=>{
        setPosts(snapshot.docs.map(doc=>({...doc.data(),id:doc.id})))
    })
    return unSubscribe;
}
export const ReadPost=async(id,setPost)=>{
    const docRef=doc(db,'posts',id)
    const docSnap=await getDoc(docRef)
    setPost({...docSnap.data(),id:docSnap.id})
}
export const deletePost = async (id)=>{
	const docRef = doc(db,'posts',id)
	await deleteDoc(docRef)
}
export const toggleLikes=async(id,uid)=>{
	const docRef = doc(db,'posts',id)
	const docSnap = await getDoc(docRef)
	const likesArr = docSnap.data().likes || []
	if(likesArr.includes(uid)){
		console.log('unlike');
		await updateDoc(docRef,{likes:likesArr.filter(id=>id!=uid)})		
	}else{
		console.log('like');
		await updateDoc(docRef,{likes:[...likesArr,uid]})
		
	}
}