import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { postAuthLoader, workspaceLoader, workItemsLoader } from "./loaders";

import { Login } from "./pages/Login";
import { WorkspaceLayout } from "./layouts/WorkspaceLayout";
import { Onboarding } from "./pages/Onboarding";
import { Dashboard } from "./pages/Dashboard";
import { Inbox } from "./pages/Inbox";
import { ProjectDetails } from "./pages/ProjectDetails";
import { WorkItemsTab } from "./pages/tabs/WorkItemsTab";
import { BaselinesTab } from "./pages/tabs/BaselinesTab";
import { RisksTab } from "./pages/tabs/RisksTab";
import { InterventionsTab } from "./pages/tabs/InterventionsTab";
import { OpsTab } from "./pages/tabs/OpsTab";
import { AuditTab } from "./pages/tabs/AuditTab";
import { AcceptInvite } from "./pages/AcceptInvite";
import { Invites } from "./pages/Invites";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/post-auth", loader: postAuthLoader, element: <div /> },
  { path: "/invite/:token", element: <AcceptInvite /> },

  {
    path: "/w/:workspaceId",
    loader: workspaceLoader,
    element: <WorkspaceLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "inbox", element: <Inbox /> },
      { path: "onboarding", element: <Onboarding /> },
      { path: "invites", element: <Invites /> },

      {
        path: "projects/:projectId",
        element: <ProjectDetails />,
        children: [
          { index: true, loader: workItemsLoader, element: <WorkItemsTab /> },
          { path: "work-items", loader: workItemsLoader, element: <WorkItemsTab /> },
          { path: "baselines", element: <BaselinesTab /> },
          { path: "risks", element: <RisksTab /> },
          { path: "interventions", element: <InterventionsTab /> },
          { path: "ops", element: <OpsTab /> },
          { path: "audit", element: <AuditTab /> }
        ]
      }
    ]
  },

  { path: "*", element: <Login /> }
]);

export default function App() {
  return <RouterProvider router={router} />;
}

