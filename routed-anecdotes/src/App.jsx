import { useState,useEffect } from 'react'
import {BrowserRouter as Router,Route,Routes,Link, useParams,useNavigate} from 'react-router-dom'
import {Menu} from './components/Menu'
import {useField} from './hooks/index'
const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} ><Link to={`/anecdote/${anecdote.id}`}>{anecdote.content}</Link></li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const CreateNew = (props) => {
  // const [notification,setNotification] = useState('')
  const Navigate = useNavigate()
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const handlereset = () => {
    content.reset()
    author.reset()
    info.reset()
  }
  
  
  


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    props.setnotification(`${content.value} is added by ${author.value}`)
    
    Navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name={content.type} value={content.value} onChange={content.onChange} />
        </div>
        <div>
          author
          <input name={author.type} value={author.value} onChange={author.onChange} />
        </div>
        <div>
          url for more info
          <input name={info.type} value={info.value} onChange={info.onChange} />
        </div>
        <button type ='submit'>create</button>
        <button type = 'button'onClick={handlereset}>reset</button>
      </form>
    </div>
  )

}

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const Anecdote = ({ anecdotes }) => {
  const {id} = useParams()
  const ane = anecdotes.find(n => n.id === Number(id))
  console.log(anecdotes)
  return (
    <div>
      <h2>{ane.content} by {ane.author}</h2>
      <p>has {ane.votes} votes</p>
      <p>for more info see <a href={ane.info}>{ane.info}</a></p>
    </div>
  )
}


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification('')
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }
  

  return (
    <Router>
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
        {notification && <div style={{ border: '2px solid green', padding: '10px', marginBottom: '10px' }}>{notification}</div>}
        <Routes>
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path="/about" element={<About />} />
          <Route path="/create" element={<CreateNew addNew={addNew} setnotification ={setNotification}/>} />
          <Route path="anecdote/:id" element={<Anecdote anecdotes={anecdotes} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
