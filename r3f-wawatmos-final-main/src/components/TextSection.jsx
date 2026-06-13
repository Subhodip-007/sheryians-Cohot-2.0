import { Text, GradientTexture } from "@react-three/drei";
import { fadeOnBeforeCompileFlat } from "../utils/fadeMaterial";

export const TextSection = ({ title, subtitle, ...props }) => {
  return (
    <group {...props}>
      {/* TITLE TEXT */}
      {!!title && (
        <Text
          anchorX={"left"}
          anchorY="bottom"
          fontSize={0.52}
          maxWidth={2.5}
          lineHeight={1}
          font={"./fonts/DMSerifDisplay-Regular.ttf"}
        >
          {title}
          <meshStandardMaterial
            transparent={true}
            opacity={0.8}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          >
            {/* Title Gradient: Pink to Blue */}
            <GradientTexture
              stops={[0, 1]} 
              colors={['#FF69B4', '#00BFFF']} 
              size={1024} 
            />
          </meshStandardMaterial>
        </Text>
      )}

      {/* SUBTITLE TEXT */}
      <Text
        anchorX={"left"}
        anchorY="top"
        fontSize={0.2}
        maxWidth={2.5}
        font={"./fonts/Inter-Regular.ttf"}
      >
        {subtitle}
        <meshStandardMaterial
          transparent={true}
          opacity={0.9}
          onBeforeCompile={fadeOnBeforeCompileFlat}
        >
          {/* Subtitle Gradient: Orange to Yellow */}
          <GradientTexture
            stops={[0, 1]} 
            colors={['#FF8C00', '#FFD700']} 
            size={1024} 
          />
        </meshStandardMaterial>
      </Text>
    </group>
  );
};