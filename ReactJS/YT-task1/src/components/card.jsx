import React from 'react'

const card = (props) => {
  return (   
    <div className="container-card">
        <div className="top-cont">
            <div className="img-cont">
                <img src={props.src} alt="" />
            </div>
            <div className="save-icon">
                <span><i className="ri-bookmark-line"></i>save</span>
            </div>
        </div>
        <div className="text-area">
            <h3>{props.postName}<span> 9 days ago</span></h3>
            <h2>{props.jobRole}</h2>
            <div className="text-icon-grp">
                <span className="text-padding">{props.contractRole}</span>
                <span className="text-padding">{props.ranking}</span>
            </div>
        </div>
        <div className="fooder-cont">
        <hr className="bottom-line"></hr>
        <div className="botton-grp">
                  <div className="bottom-left"><h2>$xxx/</h2><span>month</span></div>
            <div className="bottom-right"><h2>Apply Now</h2></div>
        </div>
      
        </div>

    </div>
  )
}

export default card