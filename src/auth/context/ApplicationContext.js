import React, { createContext, useState, useContext, useMemo } from "react";

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
  { id: 1, name: "Application A", status: "Active", owner: "User 1" },
  { id: 2, name: "Application B", status: "Inactive", owner: "User 2" },
  { id: 3, name: "Application C", status: "Pending", owner: "User 3" },
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
  const value = useMemo(
    () => ({
      applications,
      addApplication,
      updateApplication,
      deleteApplication,
    }),
    [applications]
  );

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationProvider;
