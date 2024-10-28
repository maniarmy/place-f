import React from 'react';
import { Link } from 'react-router-dom';

import Avatari from '../../shared/component/uiElement/Avatari';
import Card from '../../shared/component/uiElement/Card';
import './userItems.css'

function UserItem(props) {
  return (
    <li className='user-item'>
    <Card className='user-item__content'>
    <Link to={`/${props.id}/places`}> 
    <div className='user-item__image'>
    <Avatari image={`http://localhost:5000/${props.image}`} alt={props.name} />
    </div>
    <div className='user-item__info'>
        <h2>{props.name}</h2>
        <h3>{props.placeCount} {props.placeCount === 1 ? 'place' : 'places'}</h3>
    </div>
    </Link>
    </Card>
    </li>
  )
}

export default UserItem