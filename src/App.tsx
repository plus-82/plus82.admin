import { BrowserRouter, Routes, Route } from "react-router";
import Main from "./page/index";
import BoardList from "./page/board/index";
import CreateBoard from "./page/board/create";
import BoardDetail from "./page/board/[boardId]";

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
