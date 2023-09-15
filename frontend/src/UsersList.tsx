import { useEffect, useState } from "react";
import { getUsers } from "./services/api";
import { IUserResume } from "./interfaces/users.interface";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

function UsersList() {
  const [users, setUsers] = useState<{
    total: number;
    skip: number;
    limit: number;
    data: IUserResume[];
  }>();
  useEffect(() => {
    getUsers().then((recivedUsers) => {
      setUsers(recivedUsers);
    });
  }, []);
  const navigate = useNavigate();
  return (
    <Container>
      {users?.data.map((user) => {
        return (
          <Row className="userItem">
            <Col>
              <a onClick={() => navigate(`/user/${user.id}/detail/`)}>
                <Container>
                  <Row>
                    <Col>
                      <img src={user.picture} />
                    </Col>
                    <Col xs={6}>
                      <div>{user.name}</div>
                      <div>Company: {user.currentCompany}</div>
                      <div>Role: {user.currentRole}</div>
                    </Col>
                  </Row>
                </Container>
              </a>
            </Col>
          </Row>
        );
      })}
    </Container>
  );
}

export default UsersList;
