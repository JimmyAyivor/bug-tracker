import { useEffect } from "react";
import { useState, createContext } from "react";
import axios from "axios"
const API = process.env.REACT_APP_API_URL;

export const ProjectContext = createContext();
export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/projects`)
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [projects]);

  return (
    <ProjectContext.Provider value={[projects, setProjects]}>
      {children}
    </ProjectContext.Provider>
  );
};
