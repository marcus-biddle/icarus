import React, { ReactNode } from 'react'
import StatsBar from '../StatsBar/StatsBar'
import { useIsMobile } from '../../utilities/hooks/useIsMobile';
import './index.css'

const TwoColumnGrid = ({ children}: { children: ReactNode }) => {
    const isMobile = useIsMobile({});

  return (
    <div className={"two-column-container"}>
          <div className="left-column" style={{ padding: isMobile ? '0' : '20px', minHeight: isMobile ? '80vh' : '' }}>
            {children}
          </div>
          {!isMobile && <div className="right-column">
            {/* Content for the right column */}
            <StatsBar />
          </div>}
        </div>
  )
}

export default TwoColumnGrid