import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css"

export default function Home({user,contract, account, provider,profilee,setprofile,finduser,profiledata}) {
  return (
    <>
      <Topbar user={user} profilee={profilee} setprofile={setprofile} contract={contract} account={account} finduser= {finduser}/>
      <div className="homeContainer">
        <Sidebar  user={user} contract={contract}/>
        <Feed user={user} contract={contract} account={account} provider={provider} profilee={profilee} profiledata={profiledata}/>
        <Rightbar user={user} contract={contract} account={account} provider={provider} finduser={finduser} />
      </div>
    </>
  );
}
