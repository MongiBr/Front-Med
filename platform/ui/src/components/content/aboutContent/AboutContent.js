import React from 'react';
import detect from 'browser-detect';
import { useTranslation } from 'react-i18next';

import './AboutContent.styl';

const AboutContent = () => {
  const { t } = useTranslation('AboutContent');

  const { os, version, name } = detect();
  const capitalize = s =>
    s.substr(0, 1).toUpperCase() + s.substr(1).toLowerCase();

  const itemsPreset = () => {
    return [
      {
        name: t('MEDzone Repository URL'),
        value: 'https://github.com/mongibr',
        link: 'https://github.com/MongiBr/Front-Med',
      },
      {
        name: t('Created by'),
        value: 'Strivers Team (Students)',

      },
      {
        name: t('Copyright'),
        value: 'All copyright 2021 © reserved OHIF & Strivers ',

      },


    ];
  };

  const renderTableRow = ({ name, value, link }) => (
    <tr key={name} style={{ backgroundColor: 'transparent' }}>
      <td>{name}</td>
      <td>
        {link ? (
          <a target="_blank" rel="noopener noreferrer" href={link}>
            {value}
          </a>
        ) : (
          value
        )}
      </td>
    </tr>
  );

  return (
    <div className="AboutContent" data-cy="about-modal">
           <div>

        <table className="table table-responsive">

          <tbody>{itemsPreset().map(item => renderTableRow(item))}</tbody>
        </table>
      </div>
    </div>
  );
};

export { AboutContent };
export default AboutContent;
