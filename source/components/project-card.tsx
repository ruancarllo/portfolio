import * as Preact from 'preact';

import './project-card.scss';

type Props = {
  title: string,
  description: string,
  mainIcon: string,
  backgroundColor: string,
  fontColor: string
}

class ProjectCard extends Preact.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    let cardStyle: Preact.JSX.CSSProperties = {
      backgroundColor: this.props.backgroundColor,
      color: this.props.fontColor
    }

    return (
      <div className="project-card" style={cardStyle}>
        <h1>{this.props.title}</h1>
        <p>{this.props.description}</p>
        <div className="icon-ball">
          <img src={this.props.mainIcon}/>
        </div>
      </div>
    );
  }
}

export default ProjectCard;