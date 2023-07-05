import { useState } from "react";
import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";

export default function Topbar({user,profilee,setprofile,contract,finduser}) {
  const nav =useNavigate();
  const [text,settext] = useState("");
  const handleclick=()=>{
    setprofile(text);
  }
 
      
    
       
    

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">D-META</span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
          onChange={(e)=>{settext(e.target.value)}}
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span><button style={{cursor:"pointer",marginRight:"12px"}} 
          
          onMouseEnter={()=>{ text!==""&& setprofile(text);}}
          onClick={()=>{
            finduser();nav('/profile');
          }}> Find User </button></span>
          <span className="topbarLink" onClick={()=>{nav('/home')}}>Homepage</span>
          <span className="topbarLink"></span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <img onMouseEnter={()=>{setprofile(localStorage.getItem("name"))}} onClick={()=> { setprofile( localStorage.getItem("name"));finduser();nav('/profile')}} src={user ?user.profilepic:localStorage.getItem('pic')} alt="" className="topbarImg"/>
      </div>
    </div>
  );
}
