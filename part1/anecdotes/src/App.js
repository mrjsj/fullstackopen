import { useState } from 'react'

const Header = ({text}) => {
  return (
    <h3>{text}</h3>
  )
}

const Button = ({clickHandler, text}) => {
  return (
      <button onClick={clickHandler}>{text}</button>
  )
}

const Anecdote = ({text}) => {
  return (
    <p>
      {text}
    </p>
  )
}

const Votes = ({value}) => {
  return (
    <p>
      has {value} votes
    </p>
  )
} 

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const header = "Anecdote of the day"
  const subheader = "Anecdote with most votes"

  const [votes, setVotes] = useState({0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0})
   
  const [selected, setSelected] = useState(0)

  const setRandomSelected = () => {
    const random = Math.round(Math.random() * (anecdotes.length - 1))
    setSelected(random)
  }

  const voteSelected = (selected) => {
    const tmpVotes = { ...votes }
    tmpVotes[selected] += 1
    setVotes(tmpVotes)
    getMostVoted(votes)
  }

  let sortable = [];
  const getMostVoted = (votes) => {
    for (let item in votes) {
      sortable.push([item, votes[item]])
    }

    sortable.sort(function(a, b) {
      return b[1] - a[1]
    })
  }

  getMostVoted(votes)

  return (
    <div>
      <Header text={header} />
      <Anecdote text={anecdotes[selected]} />
      <Votes value={votes[selected]} /> 
      <div>
        <Button clickHandler={() => voteSelected(selected)} text="vote" />
        <Button clickHandler={() => setRandomSelected()} text="next anecdote" />
      </div>
      <Header text={subheader} />
      <Anecdote text={anecdotes[sortable[0][0]]} />
      <Votes value={votes[sortable[0][0]]} />
    </div>
  )
}

export default App