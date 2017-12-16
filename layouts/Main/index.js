// @flow
import * as React from 'react'
import PageHead from './PageHead'
import GlobalStyle from './GlobalStyle'

type Props = {
  children: React.Node,
}

const Main = (props: Props) => (
  <div>
    <PageHead />
    <GlobalStyle />
    {props.children}
  </div>
)

export default Main
