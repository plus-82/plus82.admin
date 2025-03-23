import { BrowserRouter, Routes, Route } from "react-router-dom";

import BoardDetail from "./page/board/[boardId]";
import EditBoard from "./page/board/[boardId]/edit";
import CreateBoard from "./page/board/create";
import BoardList from "./page/board/index";
import Login from "./page/index/login";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/board" element={<BoardList />} />
        <Route path="/board/create" element={<CreateBoard />} />
        <Route path="/board/:boardId" element={<BoardDetail />} />
        <Route path="/board/:boardId/edit" element={<EditBoard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
