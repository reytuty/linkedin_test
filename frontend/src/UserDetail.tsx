import { useEffect, useState } from "react";
import { chatHistory, userDetail } from "./services/api";
import { IUserResume } from "./interfaces/users.interface";
import { useNavigate, useParams } from "react-router-dom";
import { IMessage } from "./interfaces/chat.interface";
import ChatForm from "./components/ChatForm";
import { Col, Container, Row } from "react-bootstrap";

function UserDetail() {
  const [detail, setDetail] = useState<IUserResume | undefined>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [lastmessage, setLastmessage] = useState("0");
  const navigate = useNavigate();
  const { id: userId } = useParams();
  const fetchHistory = async () => {
    chatHistory(userId!, lastmessage).then((resultMessage) => {
      console.log("chat history", lastmessage, resultMessage.data);
      if (
        !Array.isArray(resultMessage.data) ||
        resultMessage.data.length == 0
      ) {
        console.log("up to date");
        return;
      }
      const id = resultMessage.data[resultMessage.data.length - 1].id;
      console.log("last id now is", id);
      setLastmessage(id);
      setMessages([messages, ...resultMessage.data]);
    });
  };
  useEffect(() => {
    userDetail(userId!)
      .then((result) => {
        console.log(result.data);
        setDetail(result.data);
      })
      .catch(() => {
        setDetail(undefined);
      });

    fetchHistory();
    const intervalId = setInterval(fetchHistory, 10000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col xl={2}>
            <button onClick={() => navigate("/")}>back</button>
          </Col>
          <Col xl={10}></Col>
        </Row>
      </Container>
      <Container>
        <Row>
          {detail ? (
            <Container>
              <Row>
                <Col>
                  <Row>
                    <Col>
                      <img src={detail.picture} />
                    </Col>
                    <Col>
                      <h1>{detail.name}</h1>
                    </Col>
                  </Row>
                  <Row>
                    <div className="userDetail">
                      <div>Company: {detail.currentCompany}</div>
                      <div>Role: {detail.currentRole}</div>
                    </div>
                  </Row>
                  <Row>
                    <div className="userJobs">
                      <h2>Preview Jobs</h2>
                      <Container>
                        {detail.previews.map((job) => {
                          return (
                            <>
                              <Row>
                                <Col>Company:</Col>
                                <Col>
                                  <p className="jobCompanyName">
                                    {job.company}
                                  </p>
                                </Col>
                              </Row>
                              <Row>
                                <Col>Role:</Col>
                                <Col>
                                  <p className="roleName">{job.role}</p>
                                </Col>
                              </Row>
                              <Row>
                                <Col>Date:</Col>
                                <Col>
                                  <p className="roleDate">
                                    {job.startedAt} - {job.finishedAt}
                                  </p>
                                </Col>
                              </Row>
                            </>
                          );
                        })}
                      </Container>
                    </div>
                  </Row>
                </Col>
                <Col>
                  <div className="chat">
                    <h2>Chat</h2>
                    <div className="chatMessages">
                      <Container>
                        {messages.map((message) => {
                          return (
                            <>
                              <Row>
                                <p className="chatPerson">
                                  {message.user === userId
                                    ? detail.name
                                    : "you"}
                                </p>
                              </Row>
                              <Row>{message.message || "no message"}</Row>
                              <Row>
                                <hr />
                              </Row>
                            </>
                          );
                        })}
                      </Container>
                    </div>
                    <ChatForm userId={detail.id} onSent={fetchHistory} />
                  </div>
                </Col>
              </Row>
            </Container>
          ) : (
            <div className="userNotFound">User not found</div>
          )}
        </Row>
      </Container>
    </>
  );
}

export default UserDetail;
