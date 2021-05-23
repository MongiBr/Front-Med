import React, { useState, useEffect } from 'react';
import { Link, withRouter,NavLink, Route, useHistory } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Dropdown, AboutContent, withModal, Icon } from '@ohif/ui';
import { UserPreferences } from './../UserPreferences';
import OHIFLogo from '../OHIFLogo/OHIFLogo.js';
import './Header.css';
import logo from './logo.png'

function Header(props) {
  const {
    t,
    user,
    userManager,
    modal: { show },
    useLargeLogo,
    linkPath,
    linkText,
    location,
    children,
  } = props;

  const [options, setOptions] = useState([]);
  const [optionsuser, setOptionsuser] = useState([]);
  const hasLink = linkText && linkPath;
  const email=localStorage.getItem('email');
  let history= useHistory();
  useEffect(() => {
    const optionsValue = [
      {
        title: t('About'),
        icon: { name: 'info' },
        onClick: () =>
          show({
            content: AboutContent,
            title: t('MEDzone - About'),
          }),
      },
      {
        title: t('Add Patient'),
        icon: { name: 'soft-tissu' },
        onClick: () =>
          history.push('/add-patient')
      },

    ];

    const optionsValue2 = [

      {
        title: 'Logout',

        onClick: () =>
         logout()
      },
    ];

    if (user && userManager) {
      optionsValue.push({
        title: t('Logout'),
        icon: { name: 'power-off' },
        onClick: () => userManager.signoutRedirect(),
      });
    }

    setOptions(optionsValue);
    setOptionsuser(optionsValue2);
  }, [setOptions, show, t, user, userManager]);


  function logout(){
    localStorage.removeItem('email');
    history.push('/')
    window.location.reload(false);

  }

  return (
    <>

      <div
        className={classNames('entry-heade')}
      >
        <div className="header-left-box">

          <div className='logo'>
          <img src={logo} width='180px' height='50px'></img>
</div>

        </div>

       {email? <div className="header-menu">

        <NavLink to='/studylist' activeClassName="active" > <span className="research-use"> Home</span></NavLink>
          <NavLink to='/local'  activeClassName="active" ><span className="research-use">Local</span></NavLink>

          {options.map(op=>(<span className="research-use" onClick={op.onClick} >{op.icon.name=='soft-tissue' ?(<Icon name={op.icon.name}/>):(null)} {op.title}</span>))}
<span className="research-use" >
<Icon name='user'/>
{<Dropdown title={email} list={optionsuser} align="right" />}

</span>

{/*<span className="research-use" >
<button className='btn-study' onClick={e=>history.push('/add-patient')}><Icon className='icon' name='plus'></Icon> Patient</button>
  </span>*/}

        </div> : <div className="header-menu">
          <span className="research-use" onClick ={e=> history.push('/')}>

you need to log in

</span>
          </div>}
      </div>
    </>
  );
}

Header.propTypes = {
  // Study list, /
  linkText: PropTypes.string,
  linkPath: PropTypes.string,
  useLargeLogo: PropTypes.bool,
  //
  location: PropTypes.object.isRequired,
  children: PropTypes.node,
  t: PropTypes.func.isRequired,
  userManager: PropTypes.object,
  user: PropTypes.object,
  modal: PropTypes.object,
};

Header.defaultProps = {
  useLargeLogo: false,
  children: OHIFLogo(),
};

export default withTranslation(['Header', 'AboutModal'])(
  withRouter(withModal(Header))
);
