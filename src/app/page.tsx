'use client'

import {Canvas} from '@react-three/fiber'
import {useRef, useState} from 'react'
import BlackHole from '~/ui/BlackHole'

export default function Page() {
	const [warp, setWarp] = useState(1)
	const animationRef = useRef<any>();
  const warpRef = useRef(warp); // Reference to keep track of warp without causing re-renders

  const animateWarp = (direction, target) => {
    warpRef.current += direction * 0.2; // Adjust this value to control the speed of change

    // Round to one decimal place to prevent overly precise floating point numbers
    warpRef.current = Math.round(warpRef.current * 10) / 10;
    setWarp(warpRef.current);

    if ((direction === 1 && warpRef.current < target) || (direction === -1 && warpRef.current > target)) 
      animationRef.current = requestAnimationFrame(() => animateWarp(direction, target));
     else if (warpRef.current >= 15) 
      // Hold at the top value briefly before starting to ramp down
      setTimeout(() => {
        animationRef.current = requestAnimationFrame(() => animateWarp(-1, 1));
      }, 0); // Adjust this duration to control how long it holds at the maximum value
    
  };

  const doWarp = () => {
    if (animationRef.current) 
      cancelAnimationFrame(animationRef.current); // Cancel any ongoing animation before starting a new one
    
    animateWarp(1, 15); // Start animating towards 10
  };

	return (
		<div
			className='canvas-container h-screen w-full'
			onClick={() => doWarp()}>
			<Canvas>
				<BlackHole warp={warp} />
			</Canvas>
		</div>
	)
}
