import React, {useState, useEffect} from 'react';
import styled from "styled-components";

const Users = () => {

    const [users, setUsers] = useState()

    return (
        <UsersStyled>
            {users?.length ? users.map((user, index) => (
                <div key={index}>
                    {user?.username}
                </div>
            )) : <p>No Users</p>}
        </UsersStyled>
    );
};

const UsersStyled = styled.div`
    width: 500px;
  height: 800px;
  background-color: white;
  display: flex;
  flex-direction: column;
`

export default Users;