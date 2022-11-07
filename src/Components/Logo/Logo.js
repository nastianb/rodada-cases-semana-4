import {
  BottomLeftHeart,
  BottomRightHeart,
  LogoContainer,
  TopLeftHeart,
  TopRightHeart,
} from "./Styled";

const Logo = () => {
  return (
    <LogoContainer>
      <TopRightHeart></TopRightHeart>
      <TopLeftHeart></TopLeftHeart>
      <BottomLeftHeart></BottomLeftHeart>
      <BottomRightHeart></BottomRightHeart>
    </LogoContainer>
  );
};

export default Logo;
