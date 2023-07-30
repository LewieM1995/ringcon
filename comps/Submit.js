import '../comps/comps.css'
import Link from 'next/link';

function Submit() {
  return (

    <div className='submit-container'>
        <button type="submit">Submit Data</button>
        <Link href="/graph">
          <button type='submit'>Chart Data/Next Page</button>
        </Link>
    </div>
  )
}

export default Submit