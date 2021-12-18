import styled from "styled-components";
import CenterControls from "./center_controls/center_controls";
import LeftControls from "./left_controls/left_controls";
import RightControls from "./right_controls/right_controls";
const GlobalHeaderContainer = styled.header`
  position: relative;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  background: var(--global-header-background);
  border-bottom: solid 1px rgba(var(--center-channel-color-rgb), 0.08);
  color: rgba(var(--global-header-text-rgb), 0.64);
  padding: 0 12px;
  z-index: 100;

  > * + * {
    margin-left: 12px;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const GlobalHeader = () => {
  return (
    <GlobalHeaderContainer id="global-header">
      <LeftControls />
      <CenterControls />
      <RightControls />
    </GlobalHeaderContainer>
  );
};

export default GlobalHeader;
