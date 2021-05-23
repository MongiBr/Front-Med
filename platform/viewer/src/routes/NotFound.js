import React from 'react';
import './NotFound.css';
import image from './found.png'
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function NotFound({ message = '404 | Page not found ', showGoBackButton = true }) {

  const context = useAppContext();

  return (
    <div className={'not-found'}>
      <div>
        <img className='image' src={image} width='600px' height='450px'></img>

        {showGoBackButton && context.appConfig.showStudyList && (
          <div className='alg'>
            <center><Link className='hrf' to={'/'}>Go back to home page or login</Link></center>
          </div>
        )}
      </div>
    </div>
  );
}
