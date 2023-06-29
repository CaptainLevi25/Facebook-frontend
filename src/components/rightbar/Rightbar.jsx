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
  sendreq
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
  },[])

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
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
          {myfriend && myfriend.map((u) => <Online user={u} contract={contract} />)}
        </ul>
      </>
    );
  };

  const ProfileRightbar = ({sendreq}) => {
    return (
      <>
        <h3 className="rightbarTitle">Send Friend Request</h3>
        <div className="rightbarInfo">
          <button
            onClick={()=>sendreq()}
            style={{
              all: "unset",
              cursor: "pointer",
              backgroundColor: "blue",
              color: "white",
              height: "40px",
              borderRadius: "12px",
            }}
          >
            {" "}
            <h4 color="white">send friend Request</h4>
          </button>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img
              src="assets/person/1.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
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
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar sendreq={sendreq} /> : <HomeRightbar />}
      </div>
    </div>
  );
}
