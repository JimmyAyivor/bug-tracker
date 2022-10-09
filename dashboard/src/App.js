import { BrowserRouter, Route, Routes } from "react-router-dom";

import { FirebaseProvider } from "./contexts/FirebaseContext";
// import { BASENAME } from "./config/constant";
import { UserProvider } from "./contexts/UserContext";
import { TicketProvider } from "./contexts/TicketContext";
import { ProjectProvider } from "./contexts/ProjectContext";
import DashDefault from "./views/dashboard/DashDefault";
import TicketShow from "./views/tickets/TicketShow";
import TicketNew from "./views/tickets/TicketNew";
import TicketIndex from "./views/tickets/TicketIndex";
import TicketEdit from "./views/tickets/TicketEdit";
import AdminLayout from "./layouts/AdminLayout";
import ProjectIndex from "./views/projects/Projectndex";
import ProjectNew from "./views/projects/ProjectNew";
import ProjectShow from "./views/projects/ProjectShow";
import ProjectEdit from "./views/projects/ProjectEdit";
import ProfileEdit from "./views/users/profile/ProfileEdit";
import Profile from "./views/users/profile/Profile";
import ProfileSettings from "./views/users/profile/ProfileSettings";
import UserIndex from "./views/users/UserIndex";
import UserNew from "./views/users/UserNew";
import UserShow from "./views/users/UserShow";
import UserEdit from "./views/users/UserEdit";
import Signin1 from "./views/auth/signin/SignIn";
import SignUp1 from "./views/auth/signup/SignUp1";
import { RequireAuth } from "./components/Auth/RequireAuth";
import FourOFour from "./views/Four0Four";
import RolesManage from "./views/users/manage/ManageRoles";

const App = () => {
  return (
    <>
      <FirebaseProvider>
        <TicketProvider>
          <ProjectProvider>
            <UserProvider>
              <BrowserRouter>
                <Routes>
                  <Route path='/signin' element={<Signin1 />} />
                  <Route path='/signup' element={<SignUp1 />} />
                  <Route element={<RequireAuth> <AdminLayout /></RequireAuth>}>
                    <Route path='/' element={<DashDefault />} />
                    <Route path='/tickets' element={<TicketIndex />} />
                    <Route path='/tickets/new' element={<TicketNew />} />
                    <Route path='/tickets/:id' element={<TicketShow />} />
                    <Route path='/tickets/:id/edit' element={<TicketEdit />} />
                    <Route path='/projects' element={<ProjectIndex />} />
                    <Route path='/projects/new' element={<ProjectNew />} />
                    <Route path='/projects/:id' element={<ProjectShow />} />
                    <Route
                      path='/projects/:id/edit'
                      element={<ProjectEdit />}
                    />
                    <Route path='/profile' element={<Profile />} />
                    <Route
                      path='/profile/settings'
                      element={<ProfileSettings />}
                    />
                    <Route path='/profile/edit' element={<ProfileEdit />} />
                    <Route path='/users' element={<UserIndex />} />
                    <Route path='/users/new' element={<UserNew />} />
                    <Route path='/users/:id' element={<UserShow />} />
                    <Route path='/users/:id/edit' element={<UserEdit />} />
                    <Route path='/manage/roles' element={<RolesManage />} />
                    </Route>
                    {/* <Route path='/users' element={<UserIndex />} />
                    <Route path='/users/new' element={<UserNew />} />
                    <Route path='/users/:id' element={<UserShow />} />
                    <Route path='/users/:id/edit' element={<UserEdit />} />
                    </Route> */}
                    <Route path='*' element={<FourOFour />} />
                </Routes>
              </BrowserRouter>
            </UserProvider>
          </ProjectProvider>
        </TicketProvider>
      </FirebaseProvider>
    </>
  );
};

export default App;
