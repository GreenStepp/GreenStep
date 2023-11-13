import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
import PloggingDivision from './PloggingDivision';

interface PloggingFooterProps {
  openModal: () => void;
}

const PloggingFooter: React.FC<PloggingFooterProps> = ({openModal}) => {
  return (
    <FooterContainer>
      <Footer>
        <PloggingDivisionContainer>
          <PloggingDivision name="AI 쓰레기 인식" size="small" />
          <Text>AI쓰레기 인식</Text>
        </PloggingDivisionContainer>
        <PloggingDivisionContainer>
          <PloggingDivision name="일반쓰레기" size="small" />
          <Text>일반 쓰레기</Text>
        </PloggingDivisionContainer>
        <PloggingDivisionContainer>
          <PloggingDivision name="재활용품" onPress={openModal} size="small" />
          <Text>재활용품</Text>
        </PloggingDivisionContainer>
      </Footer>
    </FooterContainer>
  );
};

export default PloggingFooter;

const FooterContainer = styled.View`
  position: absolute;
  justify-content: center;
  align-items: center;
  z-index: 10;
  width: 100%;
  bottom: 10px;
`;

const Footer = styled.View`
  z-index: 10;
  width: 90%;
  margin: 10px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.66);
  shadow-color: #000;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const PloggingDivisionContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;