import { SortBy, type User } from "../types.d"

interface Props {
    changeSorting: (sort: SortBy) => void
    deleteUser: (uuid: string) => void,
    showColors: boolean,
    users: User[]
}

export function UsersList ({ changeSorting, deleteUser, showColors, users } : Props) {
    return (
        <table width="100%">
            <thead>
                <tr>
                    <th>Photo</th>
                    <th className='pointer' onClick={() => { changeSorting(SortBy.NAME) }}>Name</th>
                    <th className='pointer' onClick={() => { changeSorting(SortBy.LAST) }}>LastName</th>
                    <th className='pointer' onClick={() => { changeSorting(SortBy.COUNTRY) }}>Country</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {
                    users.map((user, index ) => {
                        const backgroundColor = index % 2 === 0 ? "#333" :"#555"
                        const color = showColors ? backgroundColor: "transparent"
                        console.log(color)

                        return(
                            <tr key={user.login.uuid}  style={{ backgroundColor:color}}>
                                <td>
                                    <img src={user.picture.thumbnail} />  
                                </td>
                                <td>
                                    {user.name.first}
                                </td>
                                <td>
                                    {user.name.last}
                                </td>
                                <td>
                                    {user.location.country}
                                </td>
                                <td>
                                    <button onClick={() => {
                                        deleteUser(user.login.uuid)
                                    }}>
                                    Delete 
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}