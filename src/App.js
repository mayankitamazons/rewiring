import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Main from './Admin/Routes/Main';
import Dashboard from './Admin/Pages/Dashboard/Dashboard'
import Sound from './Admin/Pages/Sound/Sound';
import Category from './Admin/Pages/Category/Category';
import Subcategory from './Admin/Pages/Category/Subcategory/Subcategory';
import Challenges from './Admin/Pages/Challenges/Challenges';
import Viewchallenges from './Admin/Pages/Challenges/Viewchallenges';
import Content from './Admin/Pages/Content/Content'
import Help from './Admin/Pages/Help-Faq/Help'
import Meditation from './Admin/Pages/Meditaton/Meditation'
import Notification from './Admin/Pages/Notification/Notificaton'
import Problem from './Admin/Pages/Problem/Problem';
import Questions from './Admin/Pages/Questions/Questions';
import QuestionView from './Admin/Pages/Questions/QuestionView';
import Changepassword from './Admin/Pages/Setting/Changepassword/Changepassword'
import Logout from './Admin/Pages/Setting/Logout/Logout'
import Profile from './Admin/Pages/Setting/Profile/Profile';
import Transaction from './Admin/Pages/Transaction/Transaction';
import Users from './Admin/Pages/Users/Users'
import UserView from './Admin/Pages/Users/UserView';
import Subscription from './Admin/Pages/Subscription/Subscription'
import Recent from './Admin/Pages/Recent/Recent';
import Community from './Admin/Pages/Community/Community';
import Journey from './Admin/Pages/Journey/Journey';
import Login from './Admin/Login/Login';
// import ProblemView from './Admin/Pages/Problem/ProblemView';
import SoundView from './Admin/Pages/Sound/SoundView';

import ChallengeViewDays from './Admin/Pages/Challenges/ChallengeViewDays';
function App() {
  return (
    <div className="wrapper" >
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Main />} >
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='sound' element={<Sound />} />
          <Route path='sound/view/:id' element={<SoundView />} />
          <Route path='category' element={<Category />} />
          <Route path='category/subcategory' element={<Subcategory />} />
          <Route path='challenges' element={<Challenges />} />
          <Route path='challenges/view/:id' element={<Viewchallenges />} />
          <Route path='challenges/view/:id/:day' element={<ChallengeViewDays />} />
          <Route path='content' element={<Content />} />
          <Route path='help' element={<Help />} />
          <Route path='meditation' element={<Meditation />} />
          <Route path='notification' element={<Notification />} />
          <Route path='problem' element={<Problem />} />
          {/* <Route path='problem/view/:id' element={<ProblemView />} /> */}
          <Route path='questions' element={<Questions />} />
          <Route path='questions/view/:id' element={<QuestionView />} />
          <Route path='recent' element={<Recent />} />
          <Route path='setting/changepassword' element={<Changepassword />} />
          <Route path='setting/logout' element={<Logout />} />
          <Route path='setting/profile' element={<Profile />} />
          <Route path='transaction' element={<Transaction />} />
          <Route path='users' element={<Users />} />
          <Route path='users/view/:id' element={<UserView />} />
          <Route path='subscription' element={<Subscription />} />
          <Route path='community' element={<Community />} />
          <Route path='journey' element={<Journey />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
