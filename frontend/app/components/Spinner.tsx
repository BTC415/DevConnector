import React, { Fragment } from "react";
import Image from "next/image";
import spinner from "../../public/spinner.gif"

const Spinner: React.FC = () => {
  return (
    <Fragment>
      <Image
        src={spinner}
        alt="Loading..."
        width={100}
        height={100}
        layout="responsive"
      />
    </Fragment>
  )
}

export default Spinner;