
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import Layout from "./components/Layout";
import HomeFeed from "./pages/HomeFeed";
import CommunityExplorer from "./pages/CommunityExplorer";
import PostDetails from "./pages/PostDetails";
import UserProfile from "./pages/UserProfile";
import DirectMessages from "./pages/DirectMessages";
import NotificationCenter from "./pages/NotificationCenter";
import CommunityPage from "./pages/CommunityPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomeFeed />} />
              <Route path="/explore" element={<CommunityExplorer />} />
              <Route path="/post/:id" element={<PostDetails />} />
              <Route path="/community/:id" element={<CommunityPage />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/messages" element={<DirectMessages />} />
              <Route path="/notifications" element={<NotificationCenter />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
