import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const colorClip = {
  warm: ['#FFED0D', '#E8A805', '#FF7F08', '#E82F05', '#FF0061'],
  colorfull: ['#25FF0F', '#E3E80E', '#FFC61C', '#EB710C', '#FF1F0C'],
  dark: ['#58637D', '#58637D', '#404653', '#363C49', '#2B303B']
}
const StepsPrograssBar = ({ 
  showPrecentage,
  colors,
  colorSet,
  partialValue,
  totalValue,
  isStepIncrese,
  pWrapStayle,
  chankStyle,
  pTextStyle,
  lastElStyle,
  firstElStyle
}) => {

  const [Percent,setPercent] = React.useState(0);
  const [ColorSetArr, SetUserColorSet] = React.useState(colorClip[colorSet]);
  const [TreshHoldsNum, SetTreshHoldsNum] = React.useState(0);
  
  React.useEffect(() => {
    setPercent((100 * partialValue) / totalValue);
    SetTreshHoldsNum(100 / ColorSetArr.length)
    SetUserColorSet(colors.length ? colors : colorClip[colorSet])
  },[ColorSetArr, colorSet, colors, partialValue, totalValue])
  
  const getBgColor = (i,l) => Percent >= i * TreshHoldsNum ? ColorSetArr[i] : 'transparent';

  const precentageComponent = (i,arr) => {
      let l = arr.length;
    if(showPrecentage){
      if(showPrecentage === 'end'){
        if((getBgColor(i + 1,l) === 'transparent' && getBgColor(i ,l) !== 'transparent') || (i === l && Percent === 100)){
          return <h3 style={pTextStyle}>{Percent}</h3>
        }else{
          return null;
        }        
      }else if(showPrecentage === 'start'){
        return i === 0 ? <h3 style={pTextStyle}>{Percent}</h3> : null;
      }
    } else {
      return null;
    }
  }
  
  const getChankStyle = (i,l) => {
    let s = {
        flexGrow: isStepIncrese ? i + 1 : 1,
        backgroundColor: getBgColor(i,ColorSetArr),
        ...chankStyle       
        }
    return  i === 0 ? {...s, ...firstElStyle} : i === l-1 ? {...s, ...lastElStyle} : s;
  }

  const getChanks = () => ColorSetArr.map((chnk,i) => <div key={`pb_${i}`} style={getChankStyle(i,ColorSetArr.length)} >{precentageComponent(i, ColorSetArr)}</div>);

  return (<div className="App">
      <div className='p-wrap' style={pWrapStayle}>
        {getChanks()}
      </div>
    </div>);
}

export default StepsPrograssBar;

StepsPrograssBar.propTypes = {
  showPrecentage: PropTypes.string,
  colors: PropTypes.array,
  colorSet: PropTypes.string,
  partialValue: PropTypes.number,
  totalValue: PropTypes.number,
  isStepIncrese: PropTypes.bool,
  pWrapStayle: PropTypes.object,
  chankStyle: PropTypes.object,
  pTextStyle: PropTypes.object,
  firstElStyle: PropTypes.object,
  lastElStyle: PropTypes.object,
};

StepsPrograssBar.defaultProps = {
  showPrecentage: null, // default === null, can get 'start' || 'end' ( display precentage number on the graph )
  colors: [], // default empty Array, if recived will determen the number of chanks and there colors  
  colorSet: 'colorfull', // default color set - can be 'colorfull', 'warm', 'dark'. to make it work colors prop shuld be empty Array
  partialValue: 98, // the value of the precentage to be calculate
  totalValue:100, // the total amount from witch precentage will be taken
  isStepIncrese: false, // default False, if true will start as a small chank and grow at the end
  pWrapStayle: {}, // give user style controll for wrap
  chankStyle: {}, // give user style controll for chank div component
  pTextStyle: {}, // give user style controll for text precantage
  firstElStyle: {}, // give user style controll for first chank
  lastElStyle: {} // give user style controll for last chank
};
