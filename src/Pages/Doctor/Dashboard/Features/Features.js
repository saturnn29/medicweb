/*
  File: Features.js

  Description:
  This file defines the Features component, showcasing various statistics related to appointments and payments.
  The component uses the 'Features.scss' stylesheet for styling and includes the 'CircularProgressbar' component for visualization.

  Components:
  - Features: Functional component rendering various statistics and a circular progress bar.
*/

import './Features.scss'
import {CircularProgressbar} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const Features = () => {
    return (
        <div className="doctorfeatures">
            <div className='top'>
                <h1 className='title'>Total Appointment</h1>
                <div className='icon'>
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                </div>
            </div>
            <div className='last'>
                <div className='chart'>
                    <CircularProgressbar value={70} text={'70%'} strokeWidth={2}/>
                </div>
                <p className='title'>Payment processed today</p>
                <p className='number'>$230</p>
                <p className='description'>Waiting for the next purchase process...</p>
            </div>
            <div className='sum'>
                <div className='item'>
                    <div className='sumtitle'>Total</div>
                    <div className='sumresult negative'>
                        <i class="fa-solid fa-chevron-down"></i>
                        <div className='resultamount'>$12k</div>
                    </div>
                </div>
                <div className='item'>
                    <div className='sumtitle'>Last week</div>
                    <div className='sumresult positive'>
                        <i class="fa-solid fa-chevron-up"></i>
                        <div className='resultamount'>$13k</div>
                    </div>

                </div>
                <div className='item'>
                    <div className='sumtitle'>Last month</div>
                    <div className='sumresult positive'>
                        <i class="fa-solid fa-chevron-up"></i>
                        <div className='resultamount'>$30k</div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Features;