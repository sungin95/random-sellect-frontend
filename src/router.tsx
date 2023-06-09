import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import MyList from "./routes/MyList";
import CreateQuestion from "./routes/CreateQuestion";
import Start from "./routes/Start";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "my-list/start",
        element: <Start />,
      },
      {
        path: "my-list/:page",
        element: <MyList />,
      },
      {
        path: "create-question",
        element: <CreateQuestion />,
      },
      {
        path: ":page",
        element: <Home />,
      },
    ],
  },
]);

export default router;
