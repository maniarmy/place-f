import React from 'react';
import './userList.css';
import UserItem from './userItem';

function UserList(props) {
  
    if(props.items.length === 0){
        return(
            <div className='center'>
            <h2>user not found</h2>
            </div>
        );
    }

    return(
        <ul className="users-list">
            {props.items.map(user =>(
                <UserItem
                key={user.id}
                id={user.id}
                image={user.image}
                name={user.name}
                placeCount={user.places.length}
            />
            ))}
        </ul>
    )
}

export default UserList