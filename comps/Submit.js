
import Link from 'next/link';
import { Button } from 'react-bootstrap';

function Submit() {
  return (

    <div className='submit-container'>
        <Button type="submit" style={{margin: '10px', width: '120px'}}>Submit Data</Button>
        <Link href="/graph">
          <Button style={{width: '120px'}}>Next Page</Button>
        </Link>
    </div>
  )
}

export default Submit