import {useState} from 'react'

const Statistics = ({good, neutral, bad}) => {
    const total = good + neutral + bad
    if (total === 0) {
        return (
            <p>No feedback given.</p>
        )
    }
    const average = (good + bad) === 0 ? 0 : (good - bad) / (good + bad)
    const positive = total === 0 ? 0 : good * 100 / (total)

    return (
        <>
            <h2>Statistics</h2>
            <table>
                <tbody>
                <StatisticLine text="Good" value={good}/>
                <StatisticLine text="Neutral" value={neutral}/>
                <StatisticLine text="Bad" value={bad}/>
                <tr>
                    <th>Average</th>
                    <td>{average}</td>
                </tr>
                <tr>
                    <th>Positive</th>
                    <td>{positive}</td>
                </tr>
                </tbody>
            </table>
        </>
    )
}

const StatisticLine = ({text, value}) => {
    return (
        <tr>
            <th>{text}</th>
            <td>{value}</td>
        </tr>
    )
}

const Button = (props) => {
    return (
        <button onClick={props.onClick}>{props.text}</button>
    )
}
const App = () => {

    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleSetGood = () => {
        const updatedGood = good + 1
        setGood(updatedGood)
    }

    const handleSetNeutral = () => {
        const updatedNeutral = neutral + 1
        setNeutral(updatedNeutral)
    }

    const handleSetBad = () => {
        const updatedBad = bad + 1
        setBad(updatedBad)
    }

    return (
        <div>
            <h1>Give feedback</h1>
            <br/>
            <Button onClick={handleSetGood} text={"Good"}>Good</Button>
            <Button onClick={handleSetNeutral} text={"Neutral"}>Neutral</Button>
            <Button onClick={handleSetBad} text={"Bad"}>Bad</Button>
            <hr/>
            <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
        </div>
    )
}

export default App