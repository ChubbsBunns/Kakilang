import React from "react";
import "./MessageBox.component.css";
import dylan1 from "./images/Dylan-img1.png";
import dylan2 from "./images/Dylan-img2.jpg";

/**Messaging UI of the user
 *
 * @TODO actually work with the backend to make this usable
 *
 * @component
 */

function MessageBox() {
  return (
    <div className="container">
      <div className="msg-header">
        <div className="msg-header-img">
          <img src={dylan1} className="dylan1-img" />
        </div>
        <div className="active">
          <h4>Dylan Ho</h4>
          <h6>Last seen 3 hours ago...</h6>
        </div>
        <div className="header-icons">
          <i className="fa fa-info-circle"></i>
        </div>
      </div>
      <div className="chat-page">
        <div className="msg-inbox">
          <div className="chats">
            <div className="msg-page">
              <div className="received-chats">
                <div className="received-chats-img">
                  <img src={dylan1} className="dylan1-img" />
                </div>
                <div className="received-msg">
                  <div className="received-msg-inbox">
                    <p>
                      Hi !! Loyeh Moyeh this is some messasge test lul from not
                      me
                    </p>
                    <span className="time">4:20 AM | October 27</span>
                  </div>
                </div>
              </div>

              <div className="outoing-chats">
                <div className="outgoing-chats-msg">
                  <p>First message from me</p>
                  <span className="time">4:20 AM | October 27</span>
                </div>
                <div className="outoing-chats-img">
                  <div className="outgoing-chats-img">
                    <img src={dylan2} className="dylan2-img" />
                  </div>
                </div>
              </div>

              <div className="received-chats">
                <div className="received-chats-img">
                  <img src={dylan1} className="dylan1-img" />
                </div>
                <div className="received-msg">
                  <div className="received-msg-inbox">
                    <p>Second message from not me</p>
                    <span className="time">4:20 AM | October 27</span>
                  </div>
                </div>
              </div>

              <div className="outoing-chats">
                <div className="outgoing-chats-msg">
                  <p>Second message from me</p>
                  <span className="time">4:20 AM | October 27</span>
                </div>
                <div className="outoing-chats-img">
                  <div className="outgoing-chats-img">
                    <img src={dylan2} className="dylan2-img" />
                  </div>
                </div>
              </div>

              <div className="received-chats">
                <div className="received-chats-img">
                  <img src={dylan1} className="dylan1-img" />
                </div>
                <div className="received-msg">
                  <div className="received-msg-inbox">
                    <p>Second message from not me</p>
                    <span className="time">4:20 AM | October 27</span>
                  </div>
                </div>
              </div>

              <div className="outoing-chats">
                <div className="outgoing-chats-msg">
                  <p>Second message from me</p>
                  <span className="time">4:20 AM | October 27</span>
                </div>
                <div className="outoing-chats-img">
                  <div className="outgoing-chats-img">
                    <img src={dylan2} className="dylan2-img" />
                  </div>
                </div>
              </div>

              <div className="received-chats">
                <div className="received-chats-img">
                  <img src={dylan1} className="dylan1-img" />
                </div>
                <div className="received-msg">
                  <div className="received-msg-inbox">
                    <p>Second message from not me</p>
                    <span className="time">4:20 AM | October 27</span>
                  </div>
                </div>
              </div>

              <div className="outoing-chats">
                <div className="outgoing-chats-msg">
                  <p>Second message from me</p>
                  <span className="time">4:20 AM | October 27</span>
                </div>
                <div className="outoing-chats-img">
                  <div className="outgoing-chats-img">
                    <img src={dylan2} className="dylan2-img" />
                  </div>
                </div>
              </div>

              <div className="received-chats">
                <div className="received-chats-img">
                  <img src={dylan1} className="dylan1-img" />
                </div>
                <div className="received-msg">
                  <div className="received-msg-inbox">
                    <p>Second message from not me</p>
                    <span className="time">4:20 AM | October 27</span>
                  </div>
                </div>
              </div>

              <div className="outoing-chats">
                <div className="outgoing-chats-msg">
                  <p>Second message from me</p>
                  <span className="time">4:20 AM | October 27</span>
                </div>
                <div className="outoing-chats-img">
                  <div className="outgoing-chats-img">
                    <img src={dylan2} className="dylan2-img" />
                  </div>
                </div>
              </div>

              <div className="received-chats">
                <div className="received-chats-img">
                  <img src={dylan1} className="dylan1-img" />
                </div>
                <div className="received-msg">
                  <div className="received-msg-inbox">
                    <p>Second message from not me</p>
                    <span className="time">4:20 AM | October 27</span>
                  </div>
                </div>
              </div>

              <div className="outoing-chats">
                <div className="outgoing-chats-msg">
                  <p>Second message from me</p>
                  <span className="time">4:20 AM | October 27</span>
                </div>
                <div className="outoing-chats-img">
                  <div className="outgoing-chats-img">
                    <img src={dylan2} className="dylan2-img" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="msg-bottom">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="write message..."
            ></input>
            <div className="input-group-append">
              <span className="input-group-text">
                <i className="fa fa-paper-plane"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageBox;
