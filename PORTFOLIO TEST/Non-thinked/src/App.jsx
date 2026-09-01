import { useState } from "react";
import Loading from "./components/Loading";
import loadingVideo from "./assets/loading.mp4";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
     <Loading
  videoSrc={loadingVideo}
  duration={3000}
  onFinish={() => setLoading(false)}
/>

      <h1>My Website</h1>
    </>
  );
}

export default App;