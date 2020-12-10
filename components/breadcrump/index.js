import Link from 'next/link'

const Breadcrumb = ({data, head = false}) => {
  if(data){
    return <div className={`breadcrumb-wrap ${head && 'uk-position-top breadcrumb-head'}`}>
      <div className="uk-container">
        <ul className="breadcrumb">
          <li><Link href="/"><a>Úvod</a></Link><img src="/assets/chevron-right.svg" alt="right" uk-svg="" /></li>
          {data.map((item, index) => <li key={index}>
            {index === data.length - 1 ? <span>{item.title}</span> : <Link href={item.link}><a>{item.title}</a></Link>}
            {index === data.length - 1 ? '' : <img src="/assets/chevron-right.svg" alt="right" uk-svg="" />}
          </li>)}
        </ul>
      </div>
    </div>
  }else{
    return ''
  }

}

export default Breadcrumb
