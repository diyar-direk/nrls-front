import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./router/router";
import { SnackbarProvider, closeSnackbar } from "notistack";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      retry: false,
    },
  },
});

const snackbarOptions = {
  maxSnack: 4,
  anchorOrigin: {
    horizontal: "right",
    vertical: "top",
  },
  autoHideDuration: 3000,
};

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
        <SnackbarProvider
          action={(key) => (
            <button onClick={() => closeSnackbar(key)}>close</button>
          )}
          maxSnack={snackbarOptions.maxSnack}
          anchorOrigin={snackbarOptions.anchorOrigin}
          autoHideDuration={snackbarOptions.autoHideDuration}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
