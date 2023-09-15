import "./App.css";
import { Outlet } from "react-router-dom";
import { AiOutlineLinkedin } from "react-icons/ai";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";

function Header() {
  return (
    <Container>
      <Row>
        <Col>
          <Container>
            <Row>
              <Col xl={1}>
                <AiOutlineLinkedin className="icon" />
              </Col>
              <Col xl={11} className="logoName">
                <h1>Linkedin</h1>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
