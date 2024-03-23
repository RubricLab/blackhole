'use client'

import {MeshDistortMaterial, Sphere, useTexture} from '@react-three/drei'
import {useFrame} from '@react-three/fiber'
import {useRef} from 'react'
import {Mesh} from 'three'

export default function BlackHole({warp}: {warp: number}) {
	const meshRef = useRef<Mesh>(null)

	const texture = useTexture('space.jpg')

	useFrame(() => {
		if (meshRef.current) meshRef.current.rotation.y += 0.003 + 0.01 * (warp - 1)
	})

	return (
		<>
			<Sphere
				ref={meshRef}
				args={[1 + warp / 50, 100, 100]}>
				<MeshDistortMaterial
					attach='material'
					map={texture}
					distort={0.5 * warp}
					speed={2 + 0.01 * warp}
				/>
			</Sphere>
			<ambientLight intensity={2 + warp/2} />
			{/* <Environment
				preset='sunset'
				background={false}
			/> */}
		</>
	)
}
