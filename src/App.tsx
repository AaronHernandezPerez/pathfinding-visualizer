import AlgorithmsSelector from 'components/stateful/AlgorithmsSelector';
import AllowDiagonals from 'components/stateful/AllowDiagonals/AllowDiagonals';
import Grid from 'components/stateful/Grid';
import ResizeGrid from 'components/stateful/ResizeGrid/ResizeGrid';
import Header from 'components/stateless/Header';

function App() {
  return (
    <>
      <Header
        title={<h1 className="text-2xl text-white">Pathfinder visualizer</h1>}
      >
        <div className="flex flex-col gap-2 md:flex-row">
          <AllowDiagonals />
          <div className="flex flex-wrap justify-between gap-2 md:flex-nowrap">
            <AlgorithmsSelector />
            <ResizeGrid />
          </div>
        </div>
      </Header>
      <Grid />
    </>
  );
}

export default App;
