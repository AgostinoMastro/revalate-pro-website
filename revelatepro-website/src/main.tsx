import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { NotificationProvider } from "./components/NotificationSystem";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find root element");
}

createRoot(rootElement).render(
  <NotificationProvider>
    <App />
  </NotificationProvider>
);

// Development testing utilities
if (import.meta.env.DEV) {
  // Import testing functions dynamically to make them globally available
  import('./components/FullScreenMetricsModal').then((module) => {
    // biome-ignore lint/suspicious/noExplicitAny: Development testing utilities
    ;(window as any).testFullScreenModal = module.testFullScreenModal
    // biome-ignore lint/suspicious/noExplicitAny: Development testing utilities
    ;(window as any).runMobileMetricsTest = module.runMobileMetricsTest
    // biome-ignore lint/suspicious/noExplicitAny: Development testing utilities
    ;(window as any).simulateMobileViewport = module.simulateMobileViewport
    // biome-ignore lint/suspicious/noExplicitAny: Development testing utilities
    ;(window as any).checkModalPositioning = module.checkModalPositioning
    // biome-ignore lint/suspicious/noExplicitAny: Development testing utilities
    ;(window as any).forceShowFullScreenButton = module.forceShowFullScreenButton

    console.log('🧪 Development Testing Functions Available:')
    console.log('   testFullScreenModal() - Basic device & modal tests')
    console.log('   runMobileMetricsTest() - Comprehensive mobile testing suite')
    console.log('   simulateMobileViewport() - Desktop mobile simulation')
    console.log('   checkModalPositioning() - Check modal viewport positioning')
    console.log('   forceShowFullScreenButton() - Force button visibility')
    console.log('')
    console.log('To test mobile metrics: Use browser dev tools device simulation')
    console.log('Navigate to Why RevalatePro section and trigger a demo to see ROI metrics')
  })
}
