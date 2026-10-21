import styled from 'styled-components';

type IconWrapProps = { $size: number };

const IconWrap = styled.span<IconWrapProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => $size}px;
  min-width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  line-height: 1;
  flex-shrink: 0;
`;

export { IconWrap };
