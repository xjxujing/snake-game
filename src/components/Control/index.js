import { Component } from 'react';
import control from '../../assert/control.png';
import './index.css'

class Control extends Component {
 
  render() {
    return (
      <div className="control-box">
        <div className="control-left">
          <div className={`arrow-${this.props.direction}`}>
            <span><i className="iconfont icon-jiantou"></i></span>
          </div>

          <div className="control-speed">
            <small>SPEED</small>
            <div style={{ lineHeight: '4.5rem' }}>
              <span onClick={() => this.props.changeSpeed('SPEED_DOWN')}><i className="iconfont icon-jian"></i></span>
              <span onClick={() => this.props.changeSpeed('SPEED_UP')}><i className="iconfont icon-jia"></i></span>
            </div>
          </div>

        </div>

        <div className="control-direction-box">
          <div className="button">
            <div>
              <img onClick={() => this.props.clickDirection('UP')} className="control-direction d1" src={control} alt="方向"></img>
              <img onClick={() => this.props.clickDirection('RIGHT')} className="control-direction d4" src={control} alt="方向"></img>
            </div>
            <div className="item2">
              <img onClick={() => this.props.clickDirection('LEFT')} className="control-direction d3" src={control} alt="方向"></img>
              <img onClick={() => this.props.clickDirection('DOWN')} className="control-direction d2" src={control} alt="方向"></img>
            </div>
          </div>
        </div>

        <div className="control-right" >
          <div className="record">
            <h6>{`${(this.props.snakeBody.length  - 2) * 5}`}</h6>
            <h6>{}</h6>
          </div>

          <div style={{ display: `${this.props.gameState === 'CONTINUE' ? 'block' : 'none'}` }}>
            <span onClick={this.props.onGameStateChange}><i className="iconfont icon-pause"></i></span>
          </div>
        </div>

      </div>
    )
  }
}

export default Control