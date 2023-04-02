import { useState, useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Clock = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [clockedIn, setClockedIn] = useState(true);
  const [modalTime, setModalTime] = useState("");

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  const handleClick = () => {
    setModalTime(time);
    setModalIsOpen(true);
    setClockedIn(!clockedIn);
  };

  const handleModalClose = () => setModalIsOpen(false);

  const modalText = clockedIn
    ? 'You have now clocked out at:' + modalTime
    : 'You have now clocked in at:' + modalTime;

  const buttonText = clockedIn ? "Clock in" : "Clock out";

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center my-4">
        {/* <h3 className="text-2xl">The current time is:</h3> */}
        <div className="ml-4 text-5xl font-bold">{time}</div>
      </div>

      <button class="clockInButton" onClick={handleClick}>{buttonText}<img src="https://cdn-icons-png.flaticon.com/512/899/899054.png" class="clockImg"></img></button>
      
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        contentLabel="Clock in/out modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "300px",
            height: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <p className="text-xl mb-4">{modalText}</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleModalClose}
        >
          Ok
        </button>
      </Modal>
    </div>
  );
};

export default Clock;