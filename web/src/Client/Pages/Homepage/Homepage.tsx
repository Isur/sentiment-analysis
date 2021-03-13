import React, { useState } from "react";
import { Button, Form, Input } from "@client/Components";
import "./Homepage.scss";
import { Layout } from "@client/Containers";
import { SentimentService } from "@client/Services";

interface SentimentForm {
  text: string,
}

const Homepage = () => {
  const [result, setResult] = useState<{ text: string, result: string}>();

  const handleCheck = async (data: SentimentForm) => {
    const response = await SentimentService.checkSentiment(data);
    setResult({ result: res(response.sentiment), text: response.text });
  };

  const res = (num: number): "POSITIVE" | "NEGATIVE" | "NEUTRAL" => {
    if(num < 0.3) return "NEGATIVE";
    if(num < 0.7) return "NEUTRAL";
    return "POSITIVE";
  };

  return (
    <Layout>
      <div className="Page Homepage">
        <Form<SentimentForm> onSubmit={handleCheck} validation={{}}>
          <Input label="" name="text" placeholder="Enter your sentence..." />
          <Button content="Check" />
        </Form>
        {result
          && <p> Result for text "{result.text}" is {result.result}  </p>
        }
      </div>
    </Layout>
  );
};

export default Homepage;
