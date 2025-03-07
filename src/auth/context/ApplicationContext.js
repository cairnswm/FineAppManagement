import React, { createContext, useState, useEffect, useContext, useMemo } from "react";

// Create the ApplicationContext
const ApplicationContext = createContext();

// Custom hook to use the ApplicationContext
export const useApplication = () => {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error("useApplication must be used within an ApplicationProvider");
  }
  return context;
};

// Mock data based on a hypothetical database schema
const mockApplications = [
  {
    id: 1,
    uuid: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
    name: "Application A",
    description: "This is the first application.",
    owner: "User 1",
    date_created: "2023-01-01",
  },
  {
    id: 2,
    uuid: "b2c3d4e5-f6g7-8h9i-0j1k-l2m3n4o5p6q7",
    name: "Application B",
    description: "This is the second application.",
    owner: "User 2",
    date_created: "2023-02-01",
  },
  {
    id:3,
        uuid: "c3d4e5f6-g7h8-9i0j-1k2l-m3n4o5p6q7r8",
    name: "Application C",
    description: "This is the third application.",
    owner: "User 3",
    date_created: "2023-03-01",
  },
];

// ApplicationProvider component
export const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState(mockApplications);

  // Function to add a new application
  const addApplication = (newApplication) => {
    setApplications((prevApplications) => [
      ...prevApplications,
      { id: prevApplications.length + 1, ...newApplication },
    ]);
  };

  // Function to update an existing application
  const updateApplication = (updatedApplication) => {
    setApplications((prevApplications) =>
      prevApplications.map((app) =>
        app.id === updatedApplication.id ? updatedApplication : app
      )
    );
  };

  // Function to delete an application
  const deleteApplication = (id) => {
    setApplications((prevApplications) =>
      prevApplications.filter((app) => app.id !== id)
    );
  };

  // Memoized value to avoid unnecessary re-renders
  const [activeApplication, setActiveApplication] = useState(null);

  useEffect(()=>{
    console.log("ActiveApplication", activeApplication?.name)
  }, [activeApplication])

  const value = useMemo(
    () => ({
      applications,
      activeApplication,
      setActiveApplication,
      addApplication,
      updateApplication,
      deleteApplication,
    }),
    [applications, activeApplication]
  );

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationProvider;