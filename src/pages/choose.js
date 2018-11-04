import React from 'react';
import {styled} from 'fusion-plugin-styletron-react';
import {unescape} from 'fusion-core';

const Layout = styled('div', {
  display: 'flex',
  height: 'calc(100% - 20px)',
  padding: '10px 15px',
  backgroundColor: '#FFFFFF',
  '@media (max-width: 600px)': {
    flexDirection: 'column'
  }
});

const LeftColumn = styled('aside', {
  paddingTop: '10px',
  paddingBottom: '10px',
  '@media (min-width: 600px)': {
    flexBasis: '25%'
  }
});

const RightColumn = styled('main', {
  height: '100%',
  '@media (min-width: 600px)': {
    flexBasis: '75%'
  }
});

const Link = styled('a', {
  display: 'block',
  marginTop: '5px',
  marginBottom: '5px',
});

class Choose extends React.Component {
  state = {
    color: 'white',
    counts: {}
  }

  componentDidMount () {
    this.setState({
      color: document.querySelector('#color').value,
      counts: JSON.parse(unescape(document.querySelector("#__COUNTS__").innerText))
    });
  }

  render () {
    return (
      <Layout>
        <style>
          {`
            html,body,#root{height:100%;}
            html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0);}
            body{margin:0;}
            button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0;}
            input::-webkit-inner-spin-button,input::-webkit-outer-spin-button,input::-webkit-search-cancel-button,input::-webkit-search-decoration,input::-webkit-search-results-button,input::-webkit-search-results-decoration{display:none;}
            `}
        </style>
        <LeftColumn>
          <Link href="/red">Red (visits: {this.state.counts.red || 0})</Link>
          <Link href="/orange">Orange (visits: {this.state.counts.orange || 0})</Link>
          <Link href="/yellow">Yellow (visits: {this.state.counts.yellow || 0})</Link>
          <Link href="/green">Green (visits: {this.state.counts.green || 0})</Link>
          <Link href="/blue">Blue (visits: {this.state.counts.blue || 0})</Link>
          <Link href="/indigo">Indigo (visits: {this.state.counts.indigo || 0})</Link>
          <Link href="/violet">Violet (visits: {this.state.counts.violet || 0})</Link>
        </LeftColumn>
        <RightColumn style={{backgroundColor: this.state.color}}>
        </RightColumn>
      </Layout>
    );
  }
}
export default Choose;
