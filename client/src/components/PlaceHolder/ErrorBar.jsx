import React from 'react'
import Alert from '@material-ui/lab/Alert';

export default function ErrorBar(props) {
  return (
    <>
      <Alert severity="error">/{props.error}</Alert>
    </>
  )
}
