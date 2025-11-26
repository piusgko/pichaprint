import { useSnapshot } from "valtio";

import Canvas from "@/canvas";
import Customizer from "@/pages/Customizer";
import Home from "@/pages/Home";
import state from "@/store";

function App() {
  const snap = useSnapshot(state);
  const containerClass = snap.intro
    ? "min-h-screen overflow-x-hidden bg-gradient-to-b from-slate-50 to-white"
    : "h-screen overflow-hidden bg-white";

  return (
    <main className={`app transition-all ease-in ${containerClass}`}>
      {snap.intro ? (
        <Home />
      ) : (
        <div className="flex h-screen items-center justify-center px-4 md:px-6">
          <div className="grid w-full max-w-6xl gap-6 md:grid-cols-2 md:items-center">
            {/* Canvas card */}
            <div className="order-1">
              <div className="relative h-[320px] sm:h-[360px] md:h-[420px] w-full">
                <div className="absolute inset-0 rounded-[36px] bg-gradient-to-br from-emerald-200/50 via-white/60 to-slate-100 blur-2xl" />
                <div className="relative h-full overflow-hidden rounded-[32px] border border-white/80 bg-white/70 p-3 shadow-2xl backdrop-blur">
                  <div className="h-full w-full rounded-[28px] border border-white/40 bg-gradient-to-br from-slate-950/90 to-slate-700/80">
                    <Canvas />
                  </div>
                  <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-gradient-to-t from-black/10 via-transparent" />
                </div>
              </div>
            </div>

            {/* Upload / controls */}
            <div className="order-2">
              <Customizer />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
