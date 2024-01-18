import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

const AgreementCheckbox = () => {
  const [isAgreed, setIsAgreed] = useState(0);

  const handleAgreementChange = (event) => {
    const newValue = event.target.value === '1' ? 1 : 0;
    setIsAgreed(newValue);
  };

  return (
    <div>
        <Row>
            <Col xs={3}>
             <label>
        <input
          type="radio"
          name="agreement"
          value="1"
          checked={isAgreed === 1}
          onChange={handleAgreementChange}
        />
        Concordo com os termos
      </label>
            </Col>
            <Col xs={3}>
            <label>
        <input
          type="radio"
          name="agreement"
          value="0"
          checked={isAgreed === 0}
          onChange={handleAgreementChange}
        />
        Não concordo com os termos
      </label>
            </Col>
        </Row>
     
      
    </div>
  );
};

export default AgreementCheckbox;
