import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { Users } from "../../dummyData";
import { useEffect, useState } from "react";

export default function Post({ post,contract }) {
  const [like,setLike] = useState(post.like)
  const [isLiked,setIsLiked] = useState(false)
  const [userdata,setuserdata] = useState(null);

 const getuserInfo = async()=>{
  try{
  const userdata = await contract.getOthersUserStruct(parseInt(post.registrationNumber)) 
  setuserdata(userdata);
    console.log(userdata)
}
  catch{alert("sorry could not fetch user data")}
}
  useEffect(()=>{
    post &&  getuserInfo();
  },[post])


  const likeHandler =async()=>{
          await contract.doALike(parseInt(post.allPostIndex));
          
  }
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={userdata?userdata.profilePic:post.imageLink}
              alt=""
            />
            <span className="postUsername">
              {userdata?userdata.userName:"dummy"}
            </span>
            <span className="postDate">  </span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">                </span>
          <img className="postImg" src={post.imageLink} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src="assets/like.png" onClick={likeHandler} alt="" />
            <img className="likeIcon" src="assets/heart.png" onClick={likeHandler} alt="" />
            <span className="postLikeCounter"> {parseInt(post.likes._hex)} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
