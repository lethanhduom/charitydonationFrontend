
import "../../User/User.css"
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import DetailPage from "./DetailCampaign";

const CampaignUserPage=()=>{
  
    return (
        <div id="user_page">
        <div>
            <Header />
           
           <DetailPage/>
            <Footer/>
            </div>
          
        </div>
    )
}
export default CampaignUserPage;