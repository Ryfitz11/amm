import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'

const Swap = () => {
  const [price, setPrice] = useState(0)

  const account = useSelector(state => state.provider.account)

  const tokens = useSelector(state => state.tokens.contracts)
  
  const amm = useSelector(state => state.amm.contract)

  const getPrice = async () => {
    setPrice(await amm.token2Balance() / await amm.token1Balance())
  }

  useEffect(() => {
    if(amm) {
      getPrice()
    }
  }, [amm]);

  return (
    <div>
      <Card style={{maxWidth: '450px'}} className='mx-auto px-4'>
        {account ? (
          <Form style={{maxWidth:'450px', margin: '50px auto'}}>

            <Row className='my-3'>
              <div className='d-flex justify-content-between'>
                <Form.Label><strong>Input:</strong></Form.Label>
                <Form.Text muted>
                  Balance: 
                </Form.Text>
              </div>
              <InputGroup>
                <Form.Control type="number" placeholder="0.0" min="0.0" step="any" disabled={false} />
                <DropdownButton variant="outline-sencondary" title="Select Token">
                  <Dropdown.Item>DAPP</Dropdown.Item>
                  <Dropdown.Item>USD</Dropdown.Item>
                </DropdownButton>
              </InputGroup>
            </Row>

            <Row className='my-4'>
              <div className='d-flex justify-content-between'>
                <Form.Label><strong>Output:</strong></Form.Label>
                <Form.Text muted>
                  Balance: 
                </Form.Text>
              </div>
              <InputGroup>
                <Form.Control type="number" placeholder="0.0" disabled />
                <DropdownButton variant="outline-sencondary" title="Select Token">
                  <Dropdown.Item>DAPP</Dropdown.Item>
                  <Dropdown.Item>USD</Dropdown.Item>
                </DropdownButton>
              </InputGroup>
            </Row>

            <Row className='my-3'>
              <Button type='submit'>Swap</Button>
              <Form.Text muted>
                Exchange Rate: {price}
              </Form.Text>

            </Row>
          </Form>
        ):(
          <p className='d-flex justify-content-center align-items-center' style={{height:'300px'}}>Please connect wallet</p>
        )}

      </Card>
    </div>
  );
}

export default Swap;