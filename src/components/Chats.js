import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom"; //importing useHistory from react-router-dom
import { ChatEngine } from "react-chat-engine"; // importing ChatEngine from react-chate-engine
import { auth } from "../firebase"; // importing auth from firebase
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

function Chats() {
  const history = useHistory();
  const { user } = useAuth();
  const { loading, setLoading } = useState(true);

  const handleLogout = async () => {
    console.log(handleLogout);
    await auth.signOut();

    history.push("/");
  };

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!user || user === null) {
      history.push("/");

      return;
    }
    axios
      .get("https://api.chatengine.io/users/me/", {
        headers: {
          "project-id": "5dcc0ef1-85d8-4e5c-aa86-d2d052f749c1",
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);

        getFile(user.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);

          axios
            .post("https://api.chatengine.io/users/", formdata, {
              headers: {
                "private-key": "65644dac-1a63-44ad-bc29-2b0145bf4000",
              },
            })
            .then(() => setLoading(false))
            .catch((error) => console.log(error));
        });
      });
  }, [user, history]);

  if (!user || loading) return "Loading...";

  return (
    <div>
      <div className="chats-page">
        <div className="nav-bar">
          <div className="logo-tab">chatapp</div>
          <div onClick={handleLogout} className="logout-tab">
            logout
          </div>
        </div>
        <ChatEngine
          height="calc(100vh-66px)"
          projectID="5dcc0ef1-85d8-4e5c-aa86-d2d052f749c1"
          userName={user.email}
          userSecret={user.uid}
        />
      </div>
    </div>
  );
}

export default Chats;
