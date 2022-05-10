// eslint-disable-next-line no-unused-vars
import React, { ComponentType, FunctionComponent } from 'react'
import FlexCenter from '../FlexCenter'
import useMeasure from 'react-use-measure'
import { useDebounce } from 'use-debounce';

const withMaxDiv = <P extends {}>(WrappedComponent: ComponentType<P>) => {
  const MaxDivComp: FunctionComponent<P> = (props: P) => {
    const [ref, bounds] = useMeasure()
    const [updateBounds] = useDebounce(bounds, 1000)
    return <FlexCenter ref={ref} style={{ height: '100%', width: '100%' }}>
      <WrappedComponent {...props} bounds={updateBounds} />
    </FlexCenter>
  }
  const hocComponent = (hocProps: P) => {
    return <MaxDivComp {...hocProps} />
  }
  return hocComponent;
}

export default withMaxDiv;
