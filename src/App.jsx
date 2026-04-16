import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./router/router";
import { SnackbarProvider, closeSnackbar } from "notistack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
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
            <FontAwesomeIcon
              onClick={() => closeSnackbar(key)}
              icon={faClose}
              style={{ marginInlineStart: "10px", cursor: "pointer" }}
            />
          )}
          maxSnack={snackbarOptions.maxSnack}
          anchorOrigin={snackbarOptions.anchorOrigin}
          autoHideDuration={snackbarOptions.autoHideDuration}
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
          }}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
