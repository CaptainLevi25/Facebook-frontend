import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Rightbar({
  profile,
  user,
  contract,
  account,
  provider,
  profilee,
  finduser,
  profiledata,
  sendreq,
  ans,
  otherfrnd,
  already,j
}) {
  const nav = useNavigate();
  const [userdata, setuserdata] = useState(null);
  const all = async () => {
    const data = await contract.allUsers();
    const alldata = await Promise.all(
      data.map((player) => {
        return player;
      })
    );
    console.log(alldata);
    setuserdata(alldata);
    nav("/profile");
  };
  const [sent, setsent] = useState(false);
  const [myfriend,setmyfriend] = useState(null);
  const seemyfriend = async()=>{
      try {
        const friend = await contract.seeMyfriends();
        setmyfriend(friend);
      } catch (error) {
        console.log("could not fetch my friend list");
      }
  } 
  useEffect(()=>{
    contract &&  seemyfriend();
  },[j,contract])
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //   seemyfriend();
  //   }, 15000);
  //   return () => clearInterval(interval);
  // }, []);

  const HomeRightbar = ({j}) => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            {/* <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today. */}
          </span>
        </div>
        <img className="rightbarAd" src="https://cdn.gencraft.com/prod/user/197e1270-9ccc-4ce0-a2dd-b0d7a42af02b/9d23a7f8-8535-4730-bbb2-ed32eba748e8/images/image0_1024_1024_watermark.jpg?Expires=1688543838&Signature=PmDSki4LG1nunUFY1bQfyeQnnwmaL8VqtmD74ujYIuIS0uR3vPz9dok61Dhh92SjlETVZGbxLOJ8JZ3FPK~KTwucAQJL2nsGxmiGBxyEdDHNU0KpQhrA51cCUZtO0t5PCqI3lEBtacq3~4KjfTkTWzoko5T6QYRpNgLWAV0vMYcjpszQjyDjsHpCSwb5Wz6mBa3PW-BER9XcbfQ7rPahyjrovFMNpSS1B7DjYhis-RB1Y8UZYvJL~HfE37beP5nJELCjkTxfxsDgdG1J0B5W360HpU3vBoNA9JmRcHzy0lVCkkaDEU8f-Cqg~wmfbQO4PCXUx2T9MY-qcrZSi1ldXw__&Key-Pair-Id=K3RDDB1TZ8BHT8" alt="" />
        <h4 className="rightbarTitle">My Friends</h4>
        {/* <button
          onClick={() => {
           finduser();
          //  // sendreq();
            nav("/profile");
          }}
        >
          all user
        </button> */}
        <ul className="rightbarFriendList">
          {myfriend && myfriend.map((u) => <Online user={u} contract={contract} j={j}/>)}
        </ul>
      </>
    );
  };

  const ProfileRightbar = ({sendreq,ans,user,profiledata,contract,otherfrnd,already}) => {

    

   const Frndcom = ({item})=>{
    const [userdataa, setuserdataa] = useState(null);
    const finduserrr = async () => {
      try {
        const reg = await contract.findUser(item);
        const regNo = parseInt(reg);
        const usedata = await contract.getOthersUserStruct(parseInt(regNo));
        setuserdataa(usedata);
        console.log(userdataa);
      } catch {
        console.log("Could not fetch from profile file jsx");
      }
    };
    useEffect(()=>{
     finduserrr();
    },[profiledata,j])


      return (
        <div className="rightbarFollowing">
            
        <img
         src={userdataa && userdataa.profilePic}
          alt=""
          className="rightbarFollowingImg"
          />
        <span className="rightbarFollowingName">{userdataa && userdataa.userName}</span>
      </div>


      )


   }
   
   
   
 
    return (
      <>
        <h3 className="rightbarTitle"></h3>
        <div className="rightbarInfo">

          {((profiledata && profiledata.userName!==localStorage.getItem('name'))  && !already) &&
          <button
            onClick={()=>sendreq()}
            style={{
              all: "unset",
              cursor: "pointer",
              backgroundColor: "blue",
              color: "white",
              height: "40px",
              borderRadius: "12px",
              padding: "7px"
              
            }}
          >
            {" "}
            <h4 color="white">{(!ans?"Send Friend Request": "already sent")}</h4>
          </button>}
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {/* ///////////////////////////////////////////////////////////// */}
         {otherfrnd.length!==0 && otherfrnd.map((item)=>
                  <Frndcom item = {item}/>
              )}
          {/* //////////////////////////////////////////////////////// */}
          {/* <div className="rightbarFollowing">
            <img
              src="assets/person/2.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/3.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/4.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/5.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/6.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div> */}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar sendreq={sendreq} ans={ans} user = {user} profiledata = {profiledata} contract={contract} otherfrnd={otherfrnd} already={already}/> : <HomeRightbar j={j}/>}
      </div>
    </div>
  );
}
