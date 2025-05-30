import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import RootLeout from "./leout/RootLeout";

function App() {

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <RootLeout></RootLeout>,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/:id",
          element: <Details />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
