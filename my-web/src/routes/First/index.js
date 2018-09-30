import React from 'react';
import { connect } from 'dva';
import styles from './index.less';

@connect(({ example }) => ({
  example,
}))

class First extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      offWidth:document.querySelector('body').offsetWidth,
      offHeight:document.querySelector('body').offsetHeight,
      boxStyle : {
        transform: 'rotateX(0deg) rotateY(0deg)'
      },
      HStyle : {
        transform: 'rotateX(0deg) rotateY(0deg) translateZ(0.8rem) translateX(0) translateY(0)'
      }
    }
  }

  componentDidMount(){
    window.onresize = ()=>{
      this.setState({
        offWidth:document.querySelector('body').offsetWidth,
        offHeight:document.querySelector('body').offsetHeight,
      })
    }
  }

  handleMouseMove(e){
    const w = this.state.offWidth;
    const h = this.state.offHeight;
    const x = e.clientX;
    const y = e.clientY;
    const xDeg = -((w - 2*x)/w);
    const yDeg = ((h - 2*y)/h);
    this.setState({
      boxStyle : {
        transform: `rotateY(${xDeg*30}deg) rotateX(${yDeg*10}deg)`
      },
      HStyle : {
        transform: `rotateY(${xDeg*12}deg) rotateX(${yDeg*4}deg) translateZ(0.6rem) translateX(${xDeg*1}rem) translateY(${-yDeg*0.3}rem)`
      }
    })
  }

  render(){
      return (
        <div className={styles.bg} onMouseMove={this.handleMouseMove.bind(this)}>
          {/* <div className={styles.effect}>
            <div className={styles.blackball}></div>
            <div className={styles.redball}></div>
          </div> */}
          <div className={styles.myWorld}> 
          {/* 视距层 */}
            <div className={styles.worldInner}>
            {/* 3D父级层 */}
              <div style={this.state.boxStyle} className={styles.innerBox}>
              {/* 3D转换层   */}
                <div className={styles.boxAll}>
                  <h3 style={this.state.HStyle}>猴子称大王</h3>
                  <div className={styles.allPart}>
                    <div className={styles.partItem}>
                      <div className={styles.itemCont}>
                        <div className={styles.itemImg}>
                          <img src={'https://yt3.ggpht.com/a-/AN66SAyM_WccbaTtRyXJWnmbgBxbzj0aMW5ijhJHCQ=s900-mo-c-c0xffffffff-rj-k-no'} alt="monkey"/>
                        </div>
                        <h4>叫什么名字</h4>
                      </div>
                      <div className={styles.itemCont}>
                        <div className={styles.itemImg}>
                          <img src={'https://yt3.ggpht.com/a-/AN66SAyM_WccbaTtRyXJWnmbgBxbzj0aMW5ijhJHCQ=s900-mo-c-c0xffffffff-rj-k-no'} alt="monkey"/>
                        </div>
                        <h4>叫什么名字</h4>
                      </div>
                      <div className={styles.itemCont}>
                        <div className={styles.itemImg}>
                          <img src={'https://yt3.ggpht.com/a-/AN66SAyM_WccbaTtRyXJWnmbgBxbzj0aMW5ijhJHCQ=s900-mo-c-c0xffffffff-rj-k-no'} alt="monkey"/>
                        </div>
                        <h4>叫什么名字</h4>
                      </div>
                    </div>
                  </div>
                </div> 
              </div>
            </div>
          </div>
        </div>
      );
  }
  
};


export default First;