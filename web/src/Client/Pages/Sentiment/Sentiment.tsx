import React, { useState } from "react";
import { Input, Button, Result } from "antd";
import { FrownTwoTone, MehTwoTone, SmileTwoTone, setTwoToneColor } from "@ant-design/icons";
import { SentimentService } from "../../Services";
import "./Sentiment.scss";

const Sentiment = () => {
  const [text, setText] = useState<string>("");
  const [snack, setSnack] = useState<"positive" | "neutral" | "negative">(null);
  const [error, setError] = useState(null);

  const getSentiment = async () => {
    try {
      const d = await SentimentService.getSentiment({ text });
      const sentiment = d.sentiment.result;
      if(sentiment === 1) setSnack("positive");
      else if(sentiment === 0) setSnack("neutral");
      else if(sentiment === -1) setSnack("negative");
      setError(null);
    } catch(e) {
      setError(e);
    }
  };

  let icon;
  if(snack === "negative") icon = <FrownTwoTone twoToneColor="red" />;
  else if(snack === "neutral") icon = <MehTwoTone twoToneColor="blue" />;
  else if(snack === "positive") icon = <SmileTwoTone twoToneColor="green" />;

  return (
    <div className="SentimentPage">
      <div className="container">
        <Input.TextArea name="text" onChange={e => setText(e.target.value)} size="large" placeholder="Enter your text here..." />
        <Button disabled={!text} type="primary" onClick={getSentiment}> Check Sentiment </Button>

        { snack && <Result icon={icon} title={snack} subTitle="This is result from our AI system" /> }
        {error && error.code === 503 && <Result status="error" title={error.data.message} />}
      </div>
    </div>
  );
};

export default Sentiment;
