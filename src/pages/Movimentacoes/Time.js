const Time = ({timestamp}) =>{
    const date = new Date(timestamp)
    const day = '0'+ date.getDay()
    const month = '0' + date.getMonth()
    const year = date.getFullYear()
    const hours = date.getHours()
    const minutes = '0'+ date.getMinutes()
  
    return <p>{`${day.substr(-2)}/${month.substr(-2)}/${year} às ${hours}:${minutes.substr(-2)}`}</p>
  }

export default Time