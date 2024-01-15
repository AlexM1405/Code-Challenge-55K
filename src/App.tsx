import { useEffect, useMemo, useRef, useState} from 'react'
import './App.css'
import { SortBy, type User } from "./types.d"
import { UsersList } from './Components/UserList'

function App() {
  const [users, setUsers ] = useState<User[]>([])
  const [showColors, setShowColors ] =useState(false)
  const [ sorting , setSorting] = useState<SortBy>(SortBy.NONE)
  const [ filterCountry, setFilterCountry ] = useState <string | null>(null)
  const originalUsers = useRef<User[]>([])

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  const handleDelete = (uuid: string) => {
    const filteredUsers = users.filter((user) => user.login.uuid !== uuid)
    setUsers(filteredUsers)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  useEffect(() => {
    fetch("https://randomuser.me/api?results=100")
      .then(async res => await res.json())
      .then(res => {
        setUsers(res.results)
        originalUsers.current = res.results
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  const filterUsers = useMemo (() => {
   return  filterCountry !== null && filterCountry.length > 0
   ? users.filter(user => {
    return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
  })
 : users
}, [users, filterCountry])
  
const sortedUsers = useMemo(() => {
  console.log('calculate sortedUsers')

  if (sorting === SortBy.NONE) return filterUsers

  const compareProperties: Record<string, (user: User) => any> = {
    [SortBy.COUNTRY]: user => user.location.country,
    [SortBy.NAME]: user => user.name.first,
    [SortBy.LAST]: user => user.name.last
  }

  return filterUsers.toSorted((a, b) => {
    const extractProperty = compareProperties[sorting]
    return extractProperty(a).localeCompare(extractProperty(b))
  })
}, [filterUsers, sorting])



  return (
    <>
      <h1>Code-Challenge</h1>
      <header>
      <button onClick={toggleColors}>
       To color The Row
      </button>

      <button onClick={toggleSortByCountry}>
      {sorting === SortBy.COUNTRY ? 'Dont Sort by Country' : 'Sort by Country'}
      </button>

      <button onClick={handleReset}>
      Reset the List
      </button>

      <input placeholder='Filter by Country' onChange={(e) => {
        setFilterCountry(e.target.value)
      }}/>


      </header>
      <main>
      <UsersList changeSorting={handleChangeSort} deleteUser={handleDelete} showColors={showColors} users={sortedUsers}/> 
      </main>
    </>
  )
}

export default App
