// import { Counter } from "./components/Counter";
import { DocQnA } from "./components/DocQnAView/DocQnA";
import { Home } from "./components/Home";
import { Ingestion } from "./components/IngestionView/Ingestion";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/qna',
    element: <DocQnA />
  },
  {
    path: '/ingest-data',
    element: <Ingestion />
  }
];

export default AppRoutes;
