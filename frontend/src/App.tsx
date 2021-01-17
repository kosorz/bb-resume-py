import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import styled, { ThemeProvider } from "styled-components";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
} from "react-router-dom";

import Viewer from "./components/viewer/util/Viewer";
import Editor from "./components/editor/Editor";
import Fonts from "./components/page/fonts/fonts-loader";

import { ResumeBubble } from "./bubbles/ResumeBubble";
import ResumeBubbleProvider from "./bubbles/ResumeBubble";
import theme from "./styled/theme";
import axios from "./util/axios";

const Wrapper = styled.section`
  display: flex;
  padding: 0 ${({ theme }) => theme.spaceSmall + "px"};
  padding-top: ${({ theme }) => theme.menuHeight + "px"};
  margin: auto;
  max-width: 1600px;
`;

const Resume = observer(() => {
  const { id } = useParams();
  const { isLoading, error } = useQuery(["resumes", id], () =>
    axios.get(`/resumes/${id}`).then((res) => {
      setResume(res.data);
      return res.data;
    })
  );
  const resumeBubble = useContext(ResumeBubble);
  const { resume, setResume } = resumeBubble;
  const { meta } = resume;

  if (isLoading) return <div>Loading..</div>;
  if (error) return <div>An error has occurred</div>;

  return (
    <>
      <Fonts />
      {meta && <Editor />}
      {meta && <Viewer bare={false} meta={meta} />}
    </>
  );
});

const Menu = styled.section`
  background: ${({ theme }) => theme.white};
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 3;
  height: ${({ theme }) => theme.menuHeight + "px"};
  box-shadow: ${({ theme }) => theme.cardShadow};
  transition: ${({ theme }) => theme.cardShadowTransition};
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
        <Menu />
        <Wrapper>
          <Router>
            <Switch>
              <Route path="/resume/:id">
                <ResumeBubbleProvider>
                  <Resume />
                </ResumeBubbleProvider>
              </Route>
              <Route path="/dashboard" exact={true}>
                <Link to={"/resume/1"}>Resume</Link>
              </Route>
              <Redirect to="/dashboard" />
            </Switch>
          </Router>
        </Wrapper>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
