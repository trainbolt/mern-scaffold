import React from "react";

import { Container, Section } from "../../components/ui/layout";

class Dashboard extends React.Component {
  render() {
    return (
      <Container>
        <Section>
          <h1>Dashboard</h1>
          <p>Show a list of all survey campaigns.</p>
        </Section>
      </Container>
    );
  }
}

export default Dashboard;
