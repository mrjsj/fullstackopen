import React from 'react'

const Header = ({header}) => {
  return (
    <h2>{header}</h2>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part => 
        <Part key={part.id} part={part}/>
      )}
    </div>
  )
}

const CourseStats = ({parts}) => {
  
  const sumOfExercices = parts.reduce((sum,  {exercises}) => {
    return sum + exercises
  },0)
  const style = {
    fontWeight: 'bold'
  }

  return (
      <p style={style}>
        total of {sumOfExercices} exercises
      </p>
    )
}

const Part = ({part}) => {
  return (
      <p>{part.name} {part.exercises}</p>
      )
}
    
const Course = ({course}) => {

  return (
    <div>
      <Header header={course.name}/>
      <Content parts={course.parts}/>
      <CourseStats parts={course.parts} />
    </div>
  )
}

export default Course