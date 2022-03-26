import type { NextPage } from 'next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePollHorizontal } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'

import buttonStyles from '../components/button/Button.module.css';
import inputStyles from '../components/input/Input.module.css';
import { useForm } from '../app/hooks';

const IndexPage: NextPage = () => {
  const router = useRouter();
  
  const onSubmit = async ({question, ...options}) => {
    const response = await fetch('https://sc-votes.herokuapp.com/poll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: question
      })
    });

    const { id: pollId } = await response.json();

    const answerResponses = await Promise.all(
      Object.values(options).map(option => fetch('https://sc-votes.herokuapp.com/answer', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              title: option,
              poll_id: pollId
            })
          })
      )
    );

    router.push(`/poll/${pollId}`);
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="container flex flex-col items-center justify-center h-full">
        <FontAwesomeIcon className='mb-5 text-indigo-500' size='4x' icon={faSquarePollHorizontal}></FontAwesomeIcon>

        <div className="mb-5 text-center">
          <h1 className='text-gray-700 mb-2'>Create polls in seconds</h1>
        </div>

        <div className="max-w-md w-full">
          <form className=' flex flex-col justify-center items-stretch' onSubmit={useForm({})(onSubmit)}>
            <div className="mb-10">
              <input name="question" className={`${inputStyles.input}`} placeholder="What is your question?" type="text" />
            </div>

            <div className="mb-5">
              <input name="option[0]" className={`${inputStyles.input}`} placeholder="Option 1" type="text" />
            </div>

            <div className="mb-5">
              <input name="option[1]"  className={`${inputStyles.input}`} placeholder="Option 2" type="text" />
            </div>

            <div className="mb-5">
              <input name="option[2]"  className={`${inputStyles.input}`} placeholder="Option 3" type="text" />
            </div>


            <button type="submit" className={`${buttonStyles.button} ${buttonStyles.buttonXl} mt-8`}>Create Poll</button>
          </form>

        </div>

      </div>

    </div>
  )
}

export default IndexPage
