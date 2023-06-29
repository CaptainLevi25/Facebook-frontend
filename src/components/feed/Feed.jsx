import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { Posts } from "../../dummyData";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


export default function Feed({user,contract, account, provider,profiledata,profilee }) {
  const loc =  useLocation() ;
  const [post,setpost] = useState(null);
  const [names,setnames] = useState(null);
  

  
 

  const seeallpost = async ()=> {
    try {
      if(loc.pathname==='/'){
      const  mypost =  await  contract.seeAllPosts();
      const allimagearray= await Promise.all(
        mypost.map((player)=>{
          return player
        })
      )
      console.log(user)
   
      // console.log(allimagearray);
      setpost(allimagearray);
       console.log(post);
      }

     if(loc.pathname==='/profile'){
      console.log("i am profile loc")
      
      const num =  profiledata.registrationNumber;
      const num2 = parseInt(num)
      const  mypost =  await  contract.seeSpecificFriendsPost(parseInt(num2));
      const allimagearray= await Promise.all(
        mypost.map((player)=>{
          return player
        })
      )
      console.log(user)
   
      console.log(allimagearray);
      setpost(allimagearray);
       console.log(post);
    }  
    } catch (error) {
      console.log(error);
    }
}
useEffect(()=>{
  console.log(loc.pathname)

   seeallpost();
},[loc.pathname,profiledata])


  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share user={user} contract={contract} account={account} provider={provider} seeallpost={seeallpost}/>
        {post && post.map((p) => (
          <Post  post={p} contract={contract}/>
        ))}
      </div>
    </div>
  );
}
