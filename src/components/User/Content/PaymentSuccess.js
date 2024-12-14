import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { introspect } from '../../../Service/AccountService';
import { createDonation } from '../../../Service/DonationService';
import { updateCurrentMoney } from '../../../Service/Campaign';
import { getDetailCampaign } from '../../../Service/Campaign';
const PaymentSuccess = () => {
  const query = new URLSearchParams(useLocation().search);
  const responseCode = query.get("vnp_ResponseCode");
  const txnRef = query.get("vnp_TxnRef");
  const amount = query.get("vnp_Amount");
  const location = useLocation();
  const navigate = useNavigate();
  const hasRunRef = useRef(false);
  
  useEffect(() => {
    if (hasRunRef.current) return;
    const token =localStorage.getItem('userToken');
    //   const res= await introspect(token);
    const date = dayjs().format('YYYY/MM/DD');
    const getdonation=JSON.parse(localStorage.getItem("inforPayment"));
    console.log(getdonation);
  
  
    if(getdonation.idAccount!==0){
        const donation=({
            amount:parseFloat(getdonation.amount),
            donationDate:date,
            accountDto:{
       
                idAccount:parseInt(getdonation.idAccount)
                
            },
            campaignsDto:{
                idCampaign:parseInt(getdonation.idCampaign)
            }
        }
        )
      
createDonation(donation).then((resDonation)=>{
        if(resDonation.status===201){
            const form=new FormData();
            form.append("money",parseFloat(getdonation.amount));
            form.append("id",parseInt(getdonation.idCampaign));
             updateCurrentMoney(form).then((resUpdate)=>{
                // alert(resUpdate.data)
                // getDetailCampaign(getdonation.idCampaign).then((resDetail)=>{
                //   if(resDetail.data.currentAmmout>=resDetail.data.targetAmount){

                //   }
                      
                // })
             })
        }else{
            alert(resDonation.status)
        }
    })
         
    
    }else if(getdonation.other!==null){
  const donation=({
        amount:parseFloat(getdonation.amount),
        donationDate:date,
        other:getdonation.other,
        campaignsDto:{
            idCampaign:parseInt(getdonation.idCampaign)
        }
     

    })
    console.log(donation)
    createDonation(donation).then((resDonation)=>{
        if(resDonation.status===201){
            const form=new FormData();
            form.append("money",parseFloat(getdonation.amount));
            form.append("id",parseInt(getdonation.idCampaign));
             updateCurrentMoney(form).then((resUpdate)=>{
                alert(resUpdate.data)
             })
        }else{
            alert(resDonation.status)
        }
    })
}else{
  const donation=({
    amount:parseFloat(getdonation.amount),
    donationDate:date,
   
    campaignsDto:{
        idCampaign:parseInt(getdonation.idCampaign)
    }
 

})
console.log(donation)
createDonation(donation).then((resDonation)=>{
    if(resDonation.status===201){
        const form=new FormData();
        form.append("money",parseFloat(getdonation.amount));
        form.append("id",parseInt(getdonation.idCampaign));
         updateCurrentMoney(form).then((resUpdate)=>{
            alert(resUpdate.data)
         })
    }else{
        alert(resDonation.status)
    }
})

}

    

    const timer = setTimeout(() => {
      navigate('/');  // Điều hướng về trang Home
    }, 10000); // 10 giây
    hasRunRef.current = true
    // Xóa timer khi component bị hủy
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
      {responseCode === "00" ? (
        <h1>Thanh toán thành công!</h1>
      ) : (
        <h1>Thanh toán thất bại.</h1>
      )}
      <p>Mã giao dịch: {txnRef}</p>
    </div>
  );
};

export default PaymentSuccess;