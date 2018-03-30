import React from 'react'
import { GridPrimary, Variables, boxColor, LabelSecondary } from './styles'
import { convertToGrid, copyToClipboard } from './helpers'

class DrawRectangle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      downCoordinates: null,
      upCoordinates: null,
      drawing: false,
    }
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
  }

  handleMouseDown(event) {
    event.preventDefault()
    // Reset when drawing a new rectangle
    this.setState({ drawing: true })
    this.setState({
      downCoordinates: convertToGrid(
        this.props.position.y,
        this.props.position.x
      ),
    })
  }

  handleMouseUp(event) {
    event.preventDefault()
    const upCoordinates = convertToGrid(
      this.props.position.y,
      this.props.position.x
    )

    this.setState({ upCoordinates })
    this.setState({ drawing: false })

    const { downCoordinates } = this.state

    copyToClipboard(`${downCoordinates}/${upCoordinates}`)
  }

  render() {
    const boxDrawn = `${this.state.downCoordinates}/${this.state.upCoordinates}`

    return (
      <Variables>
        <GridPrimary>
          <div
            style={{
              zIndex: 4,
              background: boxColor,
              gridArea: boxDrawn,
              display: this.state.drawing ? 'none' : 'block',
            }}
          >
            {<LabelSecondary>{boxDrawn} copied!</LabelSecondary>}
          </div>
          <div
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
          >
            {this.props.children}
          </div>
        </GridPrimary>
      </Variables>
    )
  }
}

export default DrawRectangle
