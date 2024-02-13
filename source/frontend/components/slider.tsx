import * as Preact from 'preact';
import './slider.scss';

type Props = {
  children: Array<Preact.JSX.Element>,
  animationTime: number,
  autoDelay?: number
}

class Slider extends Preact.Component<Props> {
  reference = Preact.createRef<HTMLDivElement>();

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div className="slider" ref={this.reference}>
        {this.props.children}
      </div>
    );
  }

  componentDidMount() {
    if (!this.reference.current) return;

    let slider = this.reference.current;
    let slides = Array.from(slider.children);

    let { animationTime, autoDelay } = this.props;

    let actualIndex: number;
    let actualSlides: Array<any>;
    
    let isAnimating: boolean;

    let autoInterval: NodeJS.Timeout | undefined;

    function circularIndex(position: number, length: number) {
      let remainder = position % length;

      if (remainder === 0) return 0;
      if (position >= 0) return remainder;
      if (position < 0) return length + remainder;

      return NaN;
    }

    function centerSlides(centralIndex: number) {
      let orderedSlides = [
        slides[circularIndex(centralIndex - 1, slides.length)].cloneNode(true),
        slides[centralIndex].cloneNode(true),
        slides[circularIndex(centralIndex + 1, slides.length)].cloneNode(true)
      ]

      slider.replaceChildren(...orderedSlides);

      actualSlides = orderedSlides;
      actualIndex = centralIndex;
    }

    function animateSlides(startIndex: number, advanceFactor: -1 | 1) {
      let centralIndex = circularIndex(startIndex + advanceFactor, slides.length);

      if (isAnimating) return;
      isAnimating = true;

      actualSlides.forEach((animatedSlide: Element, index: number) => {
        let dislocationFactor: number = 0;
        
        if (index === 0) dislocationFactor = -100;
        if (index === 1) dislocationFactor = 0;
        if (index === 2) dislocationFactor = +100;

        animatedSlide.animate([
          {transform: `translateX(${-advanceFactor * 100 + dislocationFactor}%)`}
        ], {
          duration: animationTime,
          easing: 'ease-in-out',
        });
      });

      setTimeout(() => {
        centerSlides(centralIndex);
        isAnimating = false;
      }, animationTime);
    }

    centerSlides(0);

    if (autoDelay) {
      autoInterval = setInterval(() => animateSlides(actualIndex, +1), autoDelay);
    }

    slider.addEventListener('click', (event) => {
      event.preventDefault();

      if (autoInterval) {
        clearInterval(autoInterval);
        autoInterval = undefined;
      }

      animateSlides(actualIndex, +1);
    });

    slider.addEventListener('contextmenu', (event) => {
      event.preventDefault();

      if (autoInterval) {
        clearInterval(autoInterval);
        autoInterval = undefined;
      }

      animateSlides(actualIndex, -1);
    });
  }
}

export default Slider;