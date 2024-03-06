import React, { Component } from 'react';
import { NavMenu } from '../NavMenu/NavMenu';
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <FluentProvider theme={teamsLightTheme} style={{ display: 'flex', flexDirection: 'column', gap: '2rem'}}>
        <NavMenu />
        <main style={{ marginInline: '2rem' }}>
          {this.props.children}
        </main>
      </FluentProvider>
    );
  }
}
