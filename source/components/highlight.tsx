import * as Preact from 'preact';
import './highlight.scss';

type Props = {
  children: string
}

class Highlight extends Preact.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    let animateAll = () => {
      document.querySelectorAll('.highlight').forEach((element) => {
        element.classList.add('animating')
      });
    }
    
    let disanimateAll = () => {
      document.querySelectorAll('.highlight').forEach((element) => {
        element.classList.remove('animating')
      });
    }
  
    return (
      <span className="highlight" onMouseEnter={animateAll} onMouseLeave={disanimateAll}>
        {this.props.children}
      </span>
    );
  }
}

export default Highlight;