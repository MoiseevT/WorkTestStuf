import WithLib from "./Components/WithLib";
import WithoutLib from "./Components/WithoutLib";
import ImageDropZone from "./Components/ImageDropZone";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <WithoutLib />
    </DndProvider>
  );
};

export default App;
