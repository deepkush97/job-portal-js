import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { AppliedJobsScreen } from "./screens/AppliedJobsScreen";
import { CreatedJobsScreen } from "./screens/CreatedJobsScreen";
import { CreateJobScreen } from "./screens/CreateJobScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { JobsScreen } from "./screens/JobsScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { RegisterScreen } from "./screens/RegisterScreen";
import { ViewCandidatesScreen } from "./screens/ViewCandidatesScreen";

export const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/jobs" component={JobsScreen} />
          <Route path="/applied-jobs" component={AppliedJobsScreen} />
          <Route path="/create-job" component={CreateJobScreen} />
          <Route path="/created-jobs" component={CreatedJobsScreen} />
          <Route
            path="/view-candidates/:uuid"
            component={ViewCandidatesScreen}
          />
          <Route exact path="/" component={HomeScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};
