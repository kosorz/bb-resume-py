import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";

import theme from "./util/theme";
import Routes from "./chunks/routing/Routes";
import Menu from "./chunks/menu/Menu";

const Content = styled.section`
  padding: 0 ${({ theme }) => theme.spaceSmall + "px"};
  padding-top: ${({ theme }) => theme.menuHeight + "px"};
  margin: auto;
  max-width: 1600px;
`;

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { refetchOnWindowFocus: false },
      mutations: {
        onError: (error) => {
          console.log(`Something went wrong... ${error}`);
        },
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>
          <Menu />
          <Content>
            <Routes />
          </Content>
        </Router>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
