import { useState } from "react";
import { createChatCompletion } from "./api/gpt";
import "./App.css";
import { prompts } from "./data/prompts";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const sendMessage = async (text: string) => {
    setInput("");
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: text,
      },
    ]);

    const prompt = `${prompts.offensiveness}\n${text}`;

    const res = await createChatCompletion(prompt);

    setMessages((prev) => [...prev, res.choices[0].message]);

    console.log("res", res);
  };

  console.log("transcript", transcript);
  return (
    <div className="App">
      <div>
        <p>Microphone: {listening ? "on" : "off"}</p>
        <button
          onClick={() =>
            SpeechRecognition.startListening({
              continuous: true,
              language: "en-US",
            })
          }
        >
          Start
        </button>
        <button
          onClick={() => {
            SpeechRecognition.stopListening();
            sendMessage(transcript);
          }}
        >
          Stop
        </button>
        <button onClick={resetTranscript}>Reset</button>
        <p>{transcript}</p>
      </div>
      <input
        type="text"
        placeholder="Enter your message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage(input);
          }
        }}
      />
      <button onClick={() => sendMessage(input)}>Send Message</button>
      {messages.map((item) => {
        return (
          <div>
            <span
              style={{
                color: item.role === "user" ? "blue" : "red",
              }}
            >
              {item.role}
            </span>{" "}
            :<p>{item.content}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
