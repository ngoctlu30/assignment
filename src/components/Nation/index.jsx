import React from 'react';
import { TransformTime } from '../../helpers/transformTime';
import { transform } from '../../helpers/transformNumber';
import './styles.less'

const NationMemorized = React.memo(function Nation({ country, index, onTop }) {
  return <>
    <div className={`nationItem ${onTop ? 'onTop' : ''}`}>
      <div className="inforNation">
        {onTop ? '' : <p className="index">{index}</p>}
        <img className="flagNation" width="60" height="40" src={country.countryInfo.flag} alt={'Flag ' + country.country} />
        <div className="nameContainer">
          <label className="nameNation">{country.country}</label>
          <label className="lastUpdate">{TransformTime(country.updated)}</label>
        </div>
      </div>
      <div className="caseNation">
        {transform(country.cases)}
      </div>
    </div>
  </>
})
export default NationMemorized