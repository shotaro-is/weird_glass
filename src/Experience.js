import { RGBELoader } from 'three-stdlib'
import { Canvas, useLoader } from "@react-three/fiber";
import { 
    OrbitControls,
    Instances,
    Instance,
    Center,
    Text3D, 
    MeshTransmissionMaterial,
    Environment,
    Lightformer,
    AccumulativeShadows,
    RandomizedLight
} from "@react-three/drei";
import { useControls } from 'leva';

export function Experience(){
    const { text, shadow, ...config } = useControls({
        text: 'Weird',
        backside:true,
        backsideThickness: { value: 0.3, min: 0, max: 2 },
        thickness: { value: 0.3, min: 0, max: 2 },
        samples: { value: 16, min: 1, max: 32, step: 1 },
        resolution: { value: 1024, min: 64, max: 2048, step: 64 },
        transmission: { value: 0.56, min: 0, max: 1 },
        chromaticAberration: { value: 5, min: 0, max: 5 },
        anisotropy: { value: 0.3, min: 0, max: 1, step: 0.01 },
        roughness: { value: 0, min: 0, max: 1, step: 0.01 },
        distortion: { value: 0.5, min: 0, max: 4, step: 0.01 },
        distortionScale: { value: 0.1, min: 0.01, max: 1, step: 0.01 },
        color: '#9cffe1',
        shadow: '#0d751b'
    })
    console.log(config)
    return (
       <Canvas shadows orthographic camera={{ position: [10, 20, 20], zoom: 80 }} gl={{ preserveDrawingBuffer: true }}>
            <color attach="background" args={['#f2f2f5']} />
            <Text config={config} rotation={[-Math.PI/2, 0, 0]} position={[0, -1, 2.25]}>
                {text}
            </Text>
            <OrbitControls
                zoomSpeed={0.25}
                minZoom={40}
                maxZoom={140}
                enablePan={false}
                dampingFactor={0.05}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 3}
            />
            <Environment resolution={32}>
                <group rotation={[-Math.PI / 4, -0.3, 0]}>
                <Lightformer intensity={20} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
                <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} />
                <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[10, 2, 1]} />
                <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 2, 1]} />
                <Lightformer type="ring" intensity={2} rotation-y={Math.PI / 2} position={[-0.1, -1, -5]} scale={10} />
                </group>
            </Environment>
            <AccumulativeShadows frames={100} color={shadow} colorBlend={5} toneMapped={true} alphaTest={0.9} opacity={1} scale={30} position={[0, -1.01, 0]}>
                 <RandomizedLight amount={4} radius={10} ambient={0.5} intensity={7} position={[0, 10, -10]} size={15} mapSize={1024} bias={0.0001} />
            </AccumulativeShadows>
        </Canvas>
)}

const Grid = ({number=23, lineWidth=0.056, height=0.5}) => (
    <>
        <Instances position={[0, -1.02, 0]}>
            <planeGeometry args={[lineWidth, height]} />
            <meshBasicMaterial color="#999" />
            {Array.from({ length:number }, (_, x) =>(
                Array.from({length:number}, (_, y) => (
                    <group key={x + ':' + y} position={[4 *(x - Math.floor(number / 2)),-0.01, 4 *(y - Math.floor(number / 2))]}>
                        <Instance rotation={ [-Math.PI/2, 0, 0] }/>
                        <Instance rotation={ [-Math.PI/2, 0, Math.PI /2] }/>
                    </group>
                ))
            ))}
        </Instances>
        <gridHelper args={[100, 100, '#bbb', '#bbb']} position={[0, -1.01, 0]} scale={[0.8, 0.8, 0.8]}/>
    </>
)

const Text=({children, config, font='/Neue_Haas_Unica_W1G_Regular.json', ...props})=>{
    console.log(props)
    console.log(config)
    const texture = useLoader(RGBELoader, './textures/aerodynamics_workshop_1k.hdr')
    return( 
    <>
        <group>
            <Center  scale={[1, 1, 1]} front top {...props}>
                <Text3D
                    font={font}
                    scale = {5}
                    letterSpacing={-0.07}
                    height={0.25}
                    castShadow
                    bevelEnabled
                    bevelSize = {0.01}
                    bevelSegments={10}
                    curveSegments={128}
                    bevelThickness={0.01}>
                    {children}
                    <MeshTransmissionMaterial {...config} background={texture} />
                </Text3D>
            </Center>
            <Grid />
        </group>
    </>)
}
