import Appbar from "./components/baselayout/Appbar";
import Sidebar from "./components/baselayout/Sidebar";
import DashboardScreen from "./components/dashboard/DashboardScreen";

function App() {
  return (
    <div className="App w-full bg-[#212121] text-white">
      <div className="page_wrapper h-screen flex">
        <Sidebar />
        <div className="content_wrapper ml-[calc(20%+5px)] w-full">
          <Appbar />
          <DashboardScreen />
        </div>
      </div>
    </div>
  );
}

export default App;
