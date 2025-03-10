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
  const [activeUser, setActiveUser] = useState(null);
  const [applicationProperties, setApplicationProperties] = useState([]);
  const [applicationSecrets, setApplicationSecrets] = useState([]);
  const [applicationSettings, setApplicationSettings] = useState([]);
  const [applicationProperties, setApplicationProperties] = useState([]);
  const [userProperties, setUserProperties] = useState([]);
  const [userSettingOverrides, setUserSettingOverrides] = useState([]);
  const [applicationUsers, setApplicationUsers] = useState([]);

  // Update mock data when active application changes
  useEffect(() => {
    if (activeApplication) {
      setApplicationProperties([
        { id: 1, name: "Database URL", value: "https://db.example.com" },
        { id: 2, name: "API Key", value: "12345-abcde" },
        { id: 3, name: "Max Connections", value: "100" },
      ]);
      setApplicationSecrets([
        { id: 1, name: "JWT Secret", value: "••••••••••••••••••••" },
        { id: 2, name: "OAuth Client Secret", value: "••••••••••••••••••••" },
        { id: 3, name: "Encryption Key", value: "••••••••••••••••••••" },
      ]);
      setApplicationSettings([
        { id: 1, name: "Feature Toggle A", value: "Enabled" },
        { id: 2, name: "Feature Toggle B", value: "Disabled" },
        { id: 3, name: "Maintenance Mode", value: "Off" },
      ]);
      setApplicationUsers([
        { id: 1, name: "Alice Johnson", email: "alice.johnson@example.com", role: "Admin" },
        { id: 2, name: "Bob Smith", email: "bob.smith@example.com", role: "Editor" },
        { id: 3, name: "Charlie Brown", email: "charlie.brown@example.com", role: "Viewer" },
      ]);
    } else {
      setApplicationProperties([]);
      setApplicationSecrets([]);
      setApplicationSettings([]);
      setApplicationUsers([]);
    }
  }, [activeApplication]);

  // Update mock data when active user changes
  useEffect(() => {
    if (activeUser) {
      setUserProperties([
        { id: 1, name: "Theme", value: "Dark" },
        { id: 2, name: "Language", value: "English" },
        { id: 3, name: "Notifications", value: "Enabled" },
      ]);
      setUserSettingOverrides([
        { id: 1, name: "Max Login Attempts", value: "5" },
        { id: 2, name: "Session Timeout", value: "30 minutes" },
      ]);
    } else {
      setUserProperties([]);
      setUserSettingOverrides([]);
    }
  }, [activeUser]);

  // Function to update an existing application property
  const updateApplicationProperty = (updatedProperty) => {
    setApplicationProperties((prevProperties) =>
      prevProperties.map((property) =>
        property.id === updatedProperty.id ? updatedProperty : property
      )
    );
  };

  // Function to add a new application property
  const addApplicationProperty = (newProperty) => {
    setApplicationProperties((prevProperties) => [
      ...prevProperties,
      { id: prevProperties.length + 1, ...newProperty },
    ]);
  };

  const value = useMemo(
    () => ({
      applications,
      activeApplication,
      setActiveApplication,
      activeUser,
      setActiveUser,
      addApplication,
      updateApplication,
      deleteApplication,
      applicationProperties,
      applicationSecrets,
      applicationSettings,
      applicationUsers,
      updateApplicationProperty,
      addApplicationProperty,
    }),
    [
      applications,
      activeApplication,
      activeUser,
      applicationProperties,
      applicationSecrets,
      applicationSettings,
      applicationUsers,
    ]
  );

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationProvider;