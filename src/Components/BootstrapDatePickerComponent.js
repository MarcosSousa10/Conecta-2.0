import React from 'react';
import { Form } from 'react-bootstrap';

class BootstrapDatePickerComponent extends React.Component {
  render() {
    const { onChange } = this.props;

    return (
      <div>
            <Form.Group  controlId="dob">
              <Form.Control
                type="date"
                name="dob"
                placeholder="Date of Birth"
                onChange={onChange} 
              />
            </Form.Group>
      </div>
    );
  }
}

export default BootstrapDatePickerComponent;
