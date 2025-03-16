import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./page/index";
import BoardList from "./page/board/index";
import CreateBoard from "./page/board/create";
import BoardDetail from "./page/board/[boardId]";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Main />} />
        <Route path="/board" element={<BoardList />} />
        <Route path="/board/create" element={<CreateBoard />} />
        <Route path="/board/:boardId" element={<BoardDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
