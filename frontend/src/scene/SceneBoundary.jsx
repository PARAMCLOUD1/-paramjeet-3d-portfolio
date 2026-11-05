import { Component } from 'react'

export default class SceneBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(error, info) {
    this.props.onFailure(error, this.props.stage || 'scene-render', { componentStack: info.componentStack })
  }
  render() { return this.state.failed ? (this.props.fallback ?? null) : this.props.children }
}
