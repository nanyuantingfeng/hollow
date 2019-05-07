/**************************************************
 * Created by nanyuantingfeng on 2018/9/6 10:37.
 **************************************************/
import React from 'react'

function ddd(Component: React.ComponentClass) {
  return class extends React.Component {
    render() {
      return <Component />
    }
  }
}

@ddd
export default class Y extends React.Component {
  render() {
    return <div />
  }
}

export function demo(...args: any[]) {
  return [...args, 9990000, 21]
}
