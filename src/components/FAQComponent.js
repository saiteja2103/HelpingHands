import React, { useState } from "react";
import { Accordion, Card, Button } from "react-bootstrap";
// import "./FAQComponent.css";

const FAQComponent = () => {
  const [activeKey, setActiveKey] = useState("0");

  const handleSelect = (key) => {
    // Toggle the selected accordion item between open and closed
    setActiveKey(activeKey === key ? null : key);
  };

  return (
    <div>
      <h2>Frequently Asked Questions</h2>
      <Accordion activeKey={activeKey} onSelect={handleSelect}>
        <Card>
          <Accordion.Header>
            <Button variant="text" className="w-100 text-left">
              How do I donate?
            </Button>
          </Accordion.Header>
          <Accordion.Body>
            You can donate through our platform by selecting a campaign and choosing your donation amount. Payment methods include credit cards and PayPal.
          </Accordion.Body>
        </Card>
      </Accordion>
      
      <Accordion>  
        <Card>
          <Accordion.Header>
            <Button variant="text" className="w-100 text-left">
              How do I create a fundraising campaign?
            </Button>
          </Accordion.Header>
          <Accordion.Body>
            You can create a fundraising campaign by signing up as an organizer. Then, you can provide details about your cause, set goals, and start sharing it with your network.
          </Accordion.Body>
        </Card>
      </Accordion>
    </div>
  );
};

export default FAQComponent;
