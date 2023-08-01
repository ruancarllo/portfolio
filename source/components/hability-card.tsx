import * as Preact from 'preact';
import './hability-card.scss';

type Props = {
  name: string,
  icon: string,
  background: string,
  animationTime: number,
}

class HabilityCard extends Preact.Component<Props> {
  reference = Preact.createRef<HTMLDivElement>();

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div className="hability-card" style={{background: this.props.background}} ref={this.reference}>
        <div className="icon" style={{backgroundImage: `url("${this.props.icon}")`}}/>
        <p className="name">{this.props.name}</p>
      </div>
    );
  }

  componentDidMount() {
    if (!this.reference.current) return;

    let card = this.reference.current;

    let { animationTime: animationDuration } = this.props;

    let isAnimating: boolean;

    function animateCard() {
      if (isAnimating) return;
      isAnimating = true;

      card.animate([
        {transform: 'scale(1)'},
        {transform: 'scale(1.1)'},
        {transform: 'scale(1)'}
      ], {
        duration: animationDuration,
        easing: 'ease-in-out'
      });

      setTimeout(() => isAnimating = false, animationDuration);
    }

    card.addEventListener('mouseover', animateCard);
  }
}

export default HabilityCard;