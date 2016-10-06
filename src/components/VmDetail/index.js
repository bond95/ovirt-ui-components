import React, { Component } from 'react'

import style from './style.css'

import {closeVmDetail} from '../../vmactions'

import VmIcon from '../VmIcon/index'

class VmDetail extends Component {
  componentDidMount () {
    this.onKeyDown = (event) => {
      if (event.keyCode === 27) { // ESC
        this.onClose()
      }
    }
    this.onClose = () => {
      this.props.dispatch(closeVmDetail())
    }

    window.addEventListener('keydown', this.onKeyDown)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.onKeyDown)
  }

  render () {
    const vm = this.props['vm'] // optional

    if (vm) {
      return (
        <div className={'container-fluid ' + style['move-left-detail']}>
          <a href='#' className={style['move-left-close-detail']} onClick={this.onClose}><i className='pficon pficon-close'>Close</i></a>

          <h1><VmIcon vmIcon={vm.getIn(['icons', 'small'])} missingIconClassName='pficon pficon-virtual-machine' className={style['vm-detail-icon']} /> {vm.get('name')}</h1>
          <dl>
            <dt>Operating System</dt>
            <dd>{vm.getIn(['os', 'type'])}</dd>
            <dt>State</dt>
            <dd>{vm.get('status')}</dd>
            <dt>ID</dt>
            <dd>{vm.get('id')}</dd>
            <dt>Defined Memory</dt>
            <dd>{vm.getIn(['memory', 'total'])}</dd>
            <dt>CPUs</dt>
            <dd>{vm.getIn(['cpu', 'vCPUs'])}</dd>
            <dt>CPU Arch</dt>
            <dd>{vm.getIn(['cpu', 'arch'])}</dd>
            <dt>High Availability</dt>
            <dd>{vm.getIn(['highAvailability', 'enabled'])}</dd>
            <dt>Address</dt>
            <dd>{vm.get('fqdn')}</dd>
          </dl>
        </div>
      )
    } else {
      return (<div className={style['move-left-detail-invisible']} />)
    }
  }
}
VmDetail.propTypes = {
  vm: React.PropTypes.object,
  dispatch: React.PropTypes.func
}

export default VmDetail