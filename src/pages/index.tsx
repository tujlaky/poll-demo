import type { NextPage } from 'next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePollHorizontal } from '@fortawesome/free-solid-svg-icons'

import buttonStyles from '../components/button/Button.module.css';
import inputStyles from '../components/input/Input.module.css';

const IndexPage: NextPage = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="container flex flex-col items-center justify-center h-full">
        <FontAwesomeIcon className='mb-8' size='6x' icon={faSquarePollHorizontal}></FontAwesomeIcon>
        <h1 className='mb-5'>Create simple shareable polls in seconds. <br/>
        No sign up required.</h1>

        <div className="max-w-md w-full flex flex-col justify-center items-stretch">
          <div className="mb-5">
            <input className={`${inputStyles.input}`} placeholder="Option 1" type="text" />
          </div>

          <div className="mb-5">
            <input className={`${inputStyles.input}`} placeholder="Option 2" type="text" />
          </div>

          <div className="mb-5">
            <input className={`${inputStyles.input}`} placeholder="Option 3" type="text" />
          </div>


          <button className={`${buttonStyles.button} ${buttonStyles.buttonXl} mt-8`}>Create Poll</button>
        </div>

      </div>

    </div>
  )
}

export default IndexPage
