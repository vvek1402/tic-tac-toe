import Board from "@/components/Board";
import { Navbar } from "@/components/Navbar";
import { NicknameDialog } from "@/components/NicknameDialog";
import { Toaster } from "@/components/ui/toaster";

//dawew90335@azduan.com
function App() {
  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-800 min-h-screen">
        <Navbar />
        <Board />
        <NicknameDialog />
        <Toaster />
      </div>
    </>
  );
}

export default App;
