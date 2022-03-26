import { NextPage } from "next";
import { useRouter } from 'next/router'
import { useState } from "react";
import buttonStyles from '../../components/button/Button.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePollHorizontal } from '@fortawesome/free-solid-svg-icons'

const PostPage: NextPage<{
  question: {
    id: number,
    title: string
  },
  answers: {
    id: number
    title: string
  }[]
}> = ({ question, answers }) => {

  const [percentages, setPercentages] = useState<{
    [key: string]: number
  }>({});

  const [total, setTotal] = useState(0);

  const [active, setActive] = useState<number|null>(null);

  const onClick = (value) => 
    async (e) => {
      e.preventDefault();

      if (active) {
        alert('Already voted!');
        return;
      }

      await fetch('https://sc-votes.herokuapp.com/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          answer_id: value
        })
      });

      const response = await fetch(`https://sc-votes.herokuapp.com/poll/${question.id}/votes`);
      const result = await response.json();
      const total = result.reduce((prev, current) => prev + current.count, 0);
      const percentages = result.reduce((prev, current) => ({
        ...prev,
        [current.id]: (current.count/total) * 100
      }), {});

      setActive(value);
      setPercentages(percentages);
      setTotal(total);

      console.log(percentages);
    };

  return (
    <div className="container px-5 lg:px-0 max-w-md flex flex-col items-stretch justify-center h-full">
          <FontAwesomeIcon className='m-5 absolute top-0 left-0 text-indigo-500' size='3x' icon={faSquarePollHorizontal}></FontAwesomeIcon>

          <h1 className="mb-10 text-indigo-500 normal-case">{question.title}</h1>
          {answers.map(({ id, title }) => (
            <div key={id} className="flex justify-center items-center  mb-5">
              <button  onClick={onClick(id)} className={`${buttonStyles.button} flex-1 ${active ? 'cursor-default' : 'cursor-pointer'} ${active === id ? buttonStyles.pollItemActive : ''} ${buttonStyles.pollItem}`}>
                {title} {(typeof percentages[id] !== 'undefined') && <span className="ml-5 text-right">{percentages[id].toFixed(0)}%</span>}
              </button>
            </div>
          ))}

          {total > 0 && <h3>Out of {total} votes</h3>}
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const pollResponse = await fetch(`https://sc-votes.herokuapp.com/poll/${params.id}`);
  const poll = await pollResponse.json();
  const answersResponse = await fetch(`https://sc-votes.herokuapp.com/poll/${params.id}/answers`);
  const answers = await answersResponse.json();

  return {
    props: {
      question: poll,
      answers: answers
    }
  };
}

export default PostPage;