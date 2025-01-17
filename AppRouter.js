import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Managetrainer from './ADMIN/Managetrainer';
import Addtrainer from './TRAINER/Addtrainer';
import Userregistration from './USER/Userregistration';
import Userhome from './USER/Userhome';
import Course from './USER/Course';
import Managepools from './ADMIN/Managepools';
import Addpools from './ADMIN/Addpools';
import Editpool from './ADMIN/Editpool';
import Userprofile from './USER/Userprofile';
import Edittrainer from './ADMIN/Edittrainer';
import Pools from './USER/Pools';
import Footers from './USER/Footers';
import Features from './USER/Features';
import Zoompool from './USER/Zoompool';
import Viewtrainers from './USER/Viewtrainers';
import Zoomtrainer from './USER/Zoomtrainer';
import Bookslots from './USER/Bookslots';
import Viewbooking from './USER/Viewbooking';
import Feedback from './USER/Feedback';
import Viewusers from './ADMIN/Viewusers';
import Viewreviews from './ADMIN/Viewreviews';
import Viewcomplaint from './ADMIN/Viewcomplaint';
import Manageslots from './ADMIN/Manageslots';
import Managecomp from './ADMIN/Managecomp';
import Viewcompetition from './USER/Viewcompetition';
import Trainerhome from './TRAINER/Trainerhome';
import Bookedshedule from './USER/Bookedshedule';
import Viewreply from './USER/Viewreply';
import NewAdminHome from './ADMIN/NewAdminHome';
import Addsession from './TRAINER/Addsession';
import Viewsesssion from './USER/Viewsesssion';
import Chat from './USER/Chat';
import Chattrainer from './TRAINER/Chattrainer';
import ViewTrainer from './ADMIN/ViewTrainer';
// import PaymentComponent from './USER/Payment';
import PaymentHistory from './USER/PaymentHistory';
import ViewPool from './USER/ViewPool';
import PieChart from './ADMIN/Piechart';








const AppRouter = () => {
  return (
    <>
      <Routes>
        {/* LOGIN */}
        <Route path='/login' element={<Login />} />
    
        {/* /ADMIN */}
        <Route path='/NewAdminHome' element={< NewAdminHome/>} />
        <Route path='/managetrainer' element={<Managetrainer />} />
        <Route path='/addtrainer' element={< Addtrainer/>} />
        <Route path='/pools' element={< Managepools/>} />
        <Route path='/addpools' element={< Addpools/>} />
        <Route path='/editpool/:id' element={< Editpool/>} />
        <Route path='/edittrainer/:id' element={< Edittrainer/>} />
        <Route path='/viewusers' element={< Viewusers/>} />
        <Route path='/viewreviews' element={< Viewreviews/>} />
        <Route path='/viewcomplaints' element={< Viewcomplaint/>} />
        <Route path='/manageslots' element={< Manageslots/>} />
        <Route path='/managecomp' element={< Managecomp/>} />
        <Route path='/viewtrainer' element={< ViewTrainer/>} />
        <Route path='/piechart' element={<PieChart/>} />
        {/* <Route path="/payment" element={<PaymentComponent/>} /> */}


      













        {/* USER */}

        <Route path='/signup' element={< Userregistration/>} />
        <Route path='/' element={< Userhome/>} />
        <Route path='/userprofile' element={< Userprofile/>} />
        <Route path='/viewpools' element={< Pools/>} />
        <Route path='/course' element={< Course/>} />
        <Route path='/footer' element={< Footers/>} />
        <Route path='/allpools' element={<ViewPool/>} />
        <Route path='/features' element={<Features/>} />
        <Route path='/zoompool/:id' element={<Zoompool/>} />
        <Route path='/viewtrainers' element={<Viewtrainers/>} />
        <Route path='/zoomtrainer/:id' element={<Zoomtrainer/>} />
        <Route path='/booking/:id' element={<Bookslots/>} />
        <Route path='/viewbooking' element={<Viewbooking/>} />
        <Route path='/bookedschedules' element={<Bookedshedule/>} />
        <Route path='/feedback' element={<Feedback/>} />
        <Route path='/viewcompetition' element={<Viewcompetition/>} />
        <Route path='/viewreply' element={<Viewreply/>} />
        <Route path='/viewsession' element={<Viewsesssion/>} />
        <Route path='/chat/:id' element={<Chat/>} />
        <Route path='/paymenthistory' element={<PaymentHistory/>} />
      
      





        


       



        {/* TRAINER */}

        <Route path='/signuptrainer' element={<Addtrainer/>}/>
        <Route path='/trainerhome' element={<Trainerhome/>}/>
        <Route path='/addsession' element={<Addsession/>}/>
        <Route path='/chattrainer/:id' element={<Chattrainer/>}/>


        


      </Routes>
    </>
  );
};

export default AppRouter;
