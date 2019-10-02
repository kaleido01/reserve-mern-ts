import React from 'react'
import baseUrl from '../../utils/baseUrl'
import cookie from 'js-cookie'
import Axios from 'axios'
import { Header, Icon, Table, Checkbox } from 'semantic-ui-react'
import { UserType } from '../../models/User'
const AccountPermissions = () => {
  const [users, setUsers] = React.useState([])

  const getUsers = async () => {
    const url = `${baseUrl}/api/users`
    const token = cookie.get('token')
    const payload = { headers: { authorization: token } }
    const response = await Axios.get(url, payload)
    setUsers(response.data)
  }
  React.useEffect(() => {
    getUsers()
  }, [])

  return (
    <div style={{ margin: '2em 0' }}>
      <Header as="h2">
        <Icon name="settings" />
        User Permissions
      </Header>
      <Table compact celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Joind</Table.HeaderCell>
            <Table.HeaderCell>Updated</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((user: UserType) => (
            <UserPermission user={user} key={user._id} />
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

type UserPermissionProps = {
  user: UserType
}
const UserPermission = ({ user }: UserPermissionProps) => {
  const [admin, setAdmin] = React.useState(user.role === 'admin')

  const isFirstRun = React.useRef(true)
  React.useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }

    const updatePermission = async () => {
      const url = `${baseUrl}/api/account`
      const payload = { _id: user._id, role: admin ? 'admin' : 'user' }
      await Axios.put(url, payload)
    }
    updatePermission()
  }, [admin])

  const handleChangePermission = () => {
    setAdmin(prevState => !prevState)
  }

  return (
    <Table.Row>
      <Table.Cell collapsing>
        <Checkbox toggle onChange={handleChangePermission} checked={admin} />
      </Table.Cell>
      <Table.Cell>{user.name}</Table.Cell>
      <Table.Cell>{user.email}</Table.Cell>
      <Table.Cell>{user.createdAt}</Table.Cell>
      <Table.Cell>{user.updatedAt}</Table.Cell>
      <Table.Cell>{admin ? 'admin' : 'user'}</Table.Cell>
    </Table.Row>
  )
}

export default AccountPermissions
