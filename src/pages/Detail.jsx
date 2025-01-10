import React from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { deletePost, ReadPost, toggleLikes } from '../utility/crudUtility';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useConfirm } from 'material-ui-confirm';
import { delPhoto } from '../utility/uploadFile';
import parse from 'html-react-parser'
import { MdDelete } from 'react-icons/md'
export const Detail = () => {
  const {user} = useContext(UserContext)
  const [post,setPost] = useState(null)
  const confirm = useConfirm()
  const navigate = useNavigate()
  const params = useParams()
  const [txt, setTxt] = useState(null)
  //console.log(params.id);
  useEffect(()=>{
    ReadPost(params.id,setPost)
  })
  const handleDelete=async()=>{
		try {
			await confirm({
				description:"Warning! This action cannot be undone",
				confirmationText:"Yes",
				cancellationText:"No",
				title: "Are you sure you want to delete your account?"
			})
			deletePost(post.id)
			delPhoto(post.photo.id)
			navigate('/posts')
		} catch (error) {
			console.log("Cancel: ", error);
			
		}
	}
 // post&&console.log(post);
  const handleLikes =async()=>{
		if(!user) setTxt("Csak bejelentkezett felhasználók likeolhatnak!")
		else toggleLikes(post.id,user.uid)
	}
  return (
    <div>
      <div className='page'>
	  {post && <>
	  	<img src={post.photo['url']} alt={post.title} style={{maxWidth:"300px"}}/>
	  	<p>{parse(post.story)}</p>
	  </>}
	  <div>
		<button onClick={handleLikes}>👍</button>
		{post && <span>Likes nr.:{post?.likes.length||0}</span>}
	  </div>
	  <button className='btn btn-secondary' onClick={()=>navigate('/posts')}>Return</button>
		{user && post && (user.uid==post.userId) &&
		<>
			<button><MdDelete onClick={handleDelete}/></button>
			<button onClick={()=>navigate('/update/'+post.id)}>update</button>
			</>
		}
	</div>
    </div>
  )
}


