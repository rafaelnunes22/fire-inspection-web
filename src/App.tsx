import "./App.css";
import {
  getGeneralActivities,
  getNextActivities,
  getUrgentPendingActivities,
} from "./metrics/getGeneralActivities";
import data from "./fire_inspection_mock.json";

function App() {
  console.log("getGeneralActivities:", getGeneralActivities(data));
  console.log("getUrgentPendingActivities:", getUrgentPendingActivities(data));
  console.log("getNextActivities:", getNextActivities(data));
  return (
    <>
      <div>
        <div className="w-3xs h-64 border"></div>
      </div>
    </>
  );
}

export default App;
