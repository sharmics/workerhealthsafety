import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/UserRegistration/Register";
import SignIn from "./components/UserLogin/SignIn";
import DashboardLayout from "./components/DashboardLayout/DashboardLayout";
import Dashboard from "./components/Dashboard/Dashboard";
import WorkforceTable from "./components/WorkforceTable/WorkforceTable";
import WorkforceDetails from "./components/Workforce_details/WorkforceDetails";
import WorkerVitalMonitor from "./components/Workforce_details/Worker-vital-sign-details/WorkerVitalMonitor";
import LiveBodycam from "./components/Workforce_details/Live-Bodycam/LiveBodycam";
import LiveRTLSfeed from "./components/Workforce_details/Live-RTLS-feed/LiveRTLSfeed";
import IncidentDetails from "./components/IncidentDetails/IncidentDetails";
import ZoneTable from "./components/ZoneTable/ZoneTable";
import IncidentTable from "./components/IncidentTable/IncidentTable";
import IncidentDetailsEdit from "./components/IncidentDetails/IncidentDetailsEdit";
import ZoneMap from "./components/ZoneDetails/ZoneMap/ZoneMap";
import ZoneDetails from "./components/ZoneDetails/ZoneDetails";
import MultipleLiveCCTV from "./components/ZoneDetails/LiveCCTV/MultipleLiveCCTV";

function RoutingModule() {
  const AppRoutes = createBrowserRouter([
    { path: "/", element: <SignIn/> },
    { path: "/signup", element: <Register/> },
    {
      path: "/dashboard",
      element: <DashboardLayout/>,
      children: [
        { path: "", element: <Dashboard /> },
        { path: "workforce", element: <WorkforceTable /> },
        { path: "incidents", element: <IncidentTable /> },
        { path: "incidents/:incidentId", element: <IncidentDetails/> },
        // { path: "edit-incident", element: <IncidentDetailsEdit /> },
        { path: "zones", element: <ZoneTable /> },
        
        {
          path: "incidents/:incidentId/edit",
          element: <IncidentDetailsEdit />,
        },
        
        { path: "workforce/:workerId", element: <WorkforceDetails />},
        { path: "worker-vital-monitor/:workerId", element: <WorkerVitalMonitor /> },
        { path: "live-rtls-feed/:workerId", element: <LiveRTLSfeed /> },
        { path: "live-bodycam/:workerId", element: <LiveBodycam /> },
        { path: "zone/:zoneId", element: <ZoneDetails /> },
        { path: "live-cctv/:zoneId", element: <MultipleLiveCCTV /> },
        { path: "zone-map/:zoneId", element: <ZoneMap /> },

      ],
    },
  ]);

  return <RouterProvider router={AppRoutes}></RouterProvider>;
}

export default RoutingModule;
