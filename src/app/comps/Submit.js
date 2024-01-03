
import Link from 'next/link';
import { Button } from 'react-bootstrap';

function Submit() {
  return (
    <div className='submit-container'>
      <Button type="submit">Submit Data</Button>
      <Link href="/graphs">
        <Button>Next Page</Button>
      </Link>
    </div>
  )
}

export default Submit