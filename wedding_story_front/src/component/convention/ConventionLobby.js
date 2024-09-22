import { Route, Routes } from "react-router-dom"
import ConventionMain from "./ConventionMain"
import InsertConvention from "./InsertConvention"
import UpdateConvention from './UpdateConvention';

const ConventionLobby = () => {
  return (
    <Routes>

      <Route path="main" element={<ConventionMain />} />
      <Route path="write" element={<InsertConvention />} />
      <Route path="update/:conventionNo" element={<UpdateConvention />} />

    </Routes>
  )
}
export default ConventionLobby