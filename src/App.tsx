import { BrowserRouter, Routes, Route } from "react-router-dom";

import EditAcademy from "./page/academy/[academyId]";
import CreateAcademy from "./page/academy/create";
import AcademyList from "./page/academy/index";
import BoardDetail from "./page/board/[boardId]";
import EditBoard from "./page/board/[boardId]/edit";
import CreateBoard from "./page/board/create";
import BoardList from "./page/board/index";
import Login from "./page/index/login";
import JobPostList from "./page/job-post";
import JobPostDetail from "./page/job-post/[id]";
import CreateJobPost from "./page/job-post/create";
import ResumeList from "./page/resume";
import ResumeDetail from "./page/resume/[id]";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/academy" element={<AcademyList />} />
        <Route path="/academy/create" element={<CreateAcademy />} />
        <Route path="/academy/:academyId" element={<EditAcademy />} />
        <Route path="/job-post" element={<JobPostList />} />
        <Route path="/job-post/create" element={<CreateJobPost />} />
        <Route path="/job-post/:jobPostId" element={<JobPostDetail />} />
        <Route path="/resume" element={<ResumeList />} />
        <Route path="/resume/:resumeId" element={<ResumeDetail />} />
        <Route path="/board" element={<BoardList />} />
        <Route path="/board/create" element={<CreateBoard />} />
        <Route path="/board/:boardId" element={<BoardDetail />} />
        <Route path="/board/:boardId/edit" element={<EditBoard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
