import { useState } from 'react'

const Header = ({displayText}) => {
  return (
    <h2>{displayText}</h2>
  )
}

const Button = ({button, handleClick}) => {
  return (
    <>
      <button onClick={handleClick}>{button.name}</button>
    </>
  )
}

const StatisticsLine = ({text, value}) => {

  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td> 
    </tr>
  )
}

const Statistics = ({content}) => {

  const render = content.feedback.map(item => <StatisticsLine text={item.name} value={item.score} key={item.name} />) 

  return (
    <table>
      <tbody>
        {render}
        <StatisticsLine text="all" value={content.statistics.all} />
        <StatisticsLine text="average" value={content.statistics.average} />
        <StatisticsLine text="positive" value={content.statistics.positive * 100 + "%"} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [{good, neutral, bad, all, average, positive}, setState] = useState({good: 0, neutral: 0, bad: 0, all: 0, average: 0, positive: 0})

  const setStateValues = (key) => {
    let tmp_good = good
    let tmp_neutral = neutral
    let tmp_bad = bad
    
    if (key === "good"){
      tmp_good += 1
    }else if (key === "neutral"){
      tmp_neutral += 1
    }else if (key === "bad"){
      tmp_bad += 1
    }
    const tmp_all = tmp_good + tmp_neutral + tmp_bad
    const tmp_average = (tmp_good - tmp_bad) / tmp_all
    const tmp_positive = tmp_good / tmp_all

    const newState = {
      good: tmp_good,
      neutral: tmp_neutral,
      bad: tmp_bad,
      all: tmp_all,
      average: tmp_average,
      positive: tmp_positive
    }

    setState(newState)
    
  }

  const content = {
    header: "give feedback",
    subheader: "statistics",
    feedback: [
      {
        name: "good",
        score: good
      },
      {
        name: "neutral",
        score: neutral
      },
      {
        name: "bad",
        score: bad
      }
    ],
    statistics: {
      all: all,
      average: average,
      positive: positive
    }
  }

  const statistics = all > 0 ? <Statistics content={content} /> : "No feedback given"

  return (
    <div>
      <Header displayText={content.header}/> 
      <Button handleClick={() => setStateValues("good")} button={content.feedback[0]} />
      <Button handleClick={() => setStateValues("neutral")} button={content.feedback[1]} />
      <Button handleClick={() => setStateValues("bad")} button={content.feedback[2]} />
      <Header displayText={content.subheader}/>
      {statistics}
    </div>
  )
}

export default App