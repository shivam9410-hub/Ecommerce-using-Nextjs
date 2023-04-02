import Link from 'next/link';
import React from 'react'
const DropdownLink = (props) => {
  let {href,children,...rest}=props; 
    return (
    <div>
      <Link legacyBehavior href={href}>
        <a {...rest}>{children}</a>
      </Link>
    </div>
  )
}

export default DropdownLink
