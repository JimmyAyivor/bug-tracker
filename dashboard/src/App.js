import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { FirebaseProvider } from "./contexts/FirebaseContext";

import routes, { renderRoutes } from "./routes";
import { BASENAME } from "./config/constant";
import { UserProvider } from "./contexts/UserContext";
import { TicketProvider } from "./contexts/TicketContext";
import { ProjectProvider } from "./contexts/ProjectContext";

const App = () => {
  return (
    <React.Fragment>
      <Router basename={BASENAME}>
        <FirebaseProvider>
          <TicketProvider>
            <ProjectProvider>
              <UserProvider>{renderRoutes(routes)}</UserProvider>
            </ProjectProvider>
          </TicketProvider>
        </FirebaseProvider>
      </Router>
    </React.Fragment>
  );
};

export default App;
