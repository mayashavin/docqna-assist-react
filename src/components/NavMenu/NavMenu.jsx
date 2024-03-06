import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <header>
        <nav className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3">
          <Link tag={Link} to="/">Doc Assistant Demo</Link>
            <ul className="navbar-nav flex-grow">
              <li>
                <Link className="text-dark" to="/qna">Q&A</Link>
              </li>
              <li>
                <Link className="text-dark" to="/ingest-data">Ingest</Link>
              </li>
            </ul>
        </nav>
      </header>
    );
  }
}
