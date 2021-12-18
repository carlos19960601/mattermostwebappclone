import styled from "styled-components";

const LeftControlsContainer = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  flex-shrink: 0;

  > * + * {
    margin-left: 12px;
  }
`;
const LeftControls = () => {
  return <LeftControlsContainer></LeftControlsContainer>;
};

export default LeftControls;
