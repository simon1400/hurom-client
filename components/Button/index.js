import Link from 'next/link'

const Button = ({text, link, type, onClick}) => {
  return(
    <Link href={link} onClick={e => onClick(e)}>
      <a className={`button ${type}`}>
        {text}
        {type === 'bare' && <img src="/assets/chevron-right.svg" alt="right" uk-svg="" />}
      </a>
    </Link>
  )
}


export default Button
