import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import back from "./artifacts/contracts/socialMedia.sol/socialMedia.json";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes, redirect } from "react-router-dom";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [profiledata, setprofiledata] = useState(null);
  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";

        const contract = new ethers.Contract(contractAddress, back.abi, signer);
        //console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);
  const [user, setuser] = useState(null);
  const [profilee, setprofile] = useState("");
  useEffect(() => {
    console.log(user);
    console.log(account);
  }, [user]);
  const finduser=async()=>{
    try{ const reg = await contract.findUser(profilee);
          const regNo = parseInt(reg);
          const usedata = await contract.getOthersUserStruct(parseInt(regNo)) 
          setprofiledata(usedata);
          console.log(profiledata)
        }catch{console.log("Could not fetch from profile file jsx");}
    
    
}
const sendreq = async () => {
  try {
   await contract.sendFriendRequest(profiledata.userName);
    //  setsent(true)
  } catch (err) {
    console.log(err);
    console.log(profiledata.userName);
  }
};

  return (
    <Routes>
      <Route
        exact
        path="login"
        element={
          !user ? (
            <Login
              account={account}
              provider={provider}
              contract={contract}
              setuser={setuser}
              user={user}
            />
          ) : (
            <Navigate to="/" />
          )
        }
      ></Route>

      <Route
        exact
        path="/"
        element={
          user ? (
            <Home
              profilee={profilee}
              setprofile={setprofile}
              account={account}
              provider={provider}
              contract={contract}
              user={user}
              finduser={finduser}
              profiledata={profiledata}
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      ></Route>
      <Route
        exact
        path="/profile"
        element={
          <Profile
            account={account}
            provider={provider}
            contract={contract}
            user={user}
            profilee={profilee}
            profiledata={profiledata}
            finduser={finduser}
            sendreq={sendreq}
            setprofile={setprofile}

          />
        }
      ></Route>
    </Routes>
  );
}

export default App;
