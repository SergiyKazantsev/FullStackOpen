const Header = (props) => <h1>{props.course}</h1>

const Content = ({course}) => (
    <div>
        {course.parts.map(part => <Part key={part.id} part={part}/>)}
    </div>
)

const Part = (props) => (
    <p>
        {props.part.name} {props.part.exercises}
    </p>
)

const Course = ({course}) => (
    <div>
        <Header course={course.name}/>
        <Content course={course}/>
        <Total total={course.parts.reduce(
            (acc, part) =>
                acc + part.exercises, 0
        )}/>
    </div>
)

const Total = (props) => <p>Number of exercises {props.total}</p>

export default Course