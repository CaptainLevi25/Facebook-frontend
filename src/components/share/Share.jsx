import { useEffect, useState } from "react";
import "./share.css";
import {PermMedia, Label,Room, EmojiEmotions} from "@material-ui/icons"
import axios from "axios";
import ProgressBar from 'react-bootstrap/ProgressBar';


export default function Share({user,contract, account, provider,seeallpost,setjugaad}) {
  const [myposts,setmyposts] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const [uploaded, setUploaded] = useState(null);
  const [coverpic,setcoverpic] = useState(null);
  
  

  const sharepost=async(hello)=>{
      try{
        const tx  = await contract.doAPost(hello);
        // const receipt = await wait();
        await tx.wait();
        console.log("hello");
        setjugaad("hello");
       
    }
      catch{alert("sorry could not upload")};
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (file) {
        try {
          const formData = new FormData();
          formData.append("file", file);
  
          const resFile = await axios({
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
            data: formData,
            headers: {
              pinata_api_key: `1a6eebac74dc1928e70f`,
              pinata_secret_api_key: `
              ec8173f8000f1a51f1f87a08fc7db3c22c8f239f0163c74163e4d2ffad2fd08b`,
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (data) => {
            setUploaded(Math.round((data.loaded / data.total) * 100));}
         
            
          });
          const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
          console.log(ImgHash);
          setcoverpic(ImgHash);
          setjugaad(ImgHash);

          alert("Successfully Image Uploaded");
          sharepost(ImgHash);
          setFileName("No image selected");
          setFile(null);
        } catch (e) {
          alert("Unable to upload image to Pinata");
        }
      }
     // alert("Successfully Image Uploaded");
      setFileName("No image selected");
      setFile(null);                                                                                                                           
      
     
    };
    const retrieveFile = (e) => {
      const data = e.target.files[0]; //files array of files object
      // console.log(data);
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(data);
      reader.onloadend = () => {
        setFile(e.target.files[0]);
      };
      setFileName(e.target.files[0].name);
      e.preventDefault();
     
    };


      
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={user.profilepic} alt="" />
          <div  className="shareInput">
              <div className="mana">
            <div><h5>What's in your mind {user.name}</h5></div>
            {uploaded&&uploaded!==100 &&
          <div className="progressbar"   style={{ width: `${uploaded}%` }}>
              <ProgressBar now={uploaded} striped variant="success"  label={`${uploaded}%`}/>
          </div>
}
            </div>
            </div>
           
          
        </div>
        <hr className="shareHr"/>
        <div className="shareBottom">
            <div className="shareOptions">
                <div className="shareOption">
                  <input type="file" id="file" onChange={retrieveFile}/>
                  <label for = "file"><PermMedia htmlColor="tomato" className="shareIcon" />
                    <span className="shareOptionText">Photo or Video</span></label>
                </div>
                <div className="shareOption">
                    <Label htmlColor="blue" className="shareIcon"/>
                    <span className="shareOptionText"></span>
                </div>
                <div className="shareOption">
                    <Room htmlColor="green" className="shareIcon"/>
                    <span className="shareOptionText"></span>
                </div>
                <div className="shareOption">
                    <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                    <span className="shareOptionText"></span>
                </div>
            </div>
            <button onClick={handleSubmit}className="shareButton">Share</button>
          
        </div>
      </div>
    </div>
  );
}
