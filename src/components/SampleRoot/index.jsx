import { PureComponent } from 'react';

export default class SampleRoot extends PureComponent {
  render() {
    return (
      <div>
        <h1>Wrapper</h1>
        {this.props.children}
      </div>
    );
  }
}
